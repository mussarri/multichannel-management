/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useActionState, useEffect, useState } from "react";

import ImageInput from "@/app/components/products/image-uploader";

import { Button } from "@/components/ui/button";
import { Brand, Category } from "@prisma/client";
import { createProduct } from "@/app/action";
import { toast } from "react-toastify";
import { Steps } from "rsuite";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import "rsuite/Steps/styles/index.css";

import ProductAddForm1 from "./price";
import BrandSelect from "./BrandSelect";
import CategorySelect from "./CategorySelect";
import TitleAndName from "./TitleAndName";
import DesiBarkodSku from "./DesiBarkodSku";
import SubtitleDescription from "./SubtitleDescription";

const New = ({
  categories,
  brands,
}: {
  categories: Category[];
  brands: Brand[];
}) => {
  const [message, formAction, isPending] = useActionState(createProduct, null);
  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
      redirect("/products/");
    }
  }, [message?.error, message?.message, message?.success, message?.id]);

  const [errors, setErrors] = useState<any>({});
  const [formValues, setFormValues] = useState<any>({
    title: "",
    name: "",
    sub_title: "",
    categoryId: "",
    brandId: "",
    description: "",
    is_active: false,
    is_default: true,
    desi: 1,
    barkod: "",
    sku: "",
    variants: [],
    images: [],
    salePrice: 0,
    listPrice: 0,
    costPrice: 0,
    vatRate: 18,
    stock: 0,

    // stock: "",
    // sku: "",
    // combination: {},
    // variant_code: "",
  });

  const [index, setIndex] = useState(0);
  const forms = [
    <div
      key={0}
      className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative"
    >
      <BrandSelect
        brands={brands}
        errors={errors}
        formValues={formValues}
        setFormValues={setFormValues}
        setErrors={setErrors}
      />
      <CategorySelect
        categories={categories}
        errors={errors}
        setErrors={setErrors}
        setFormValues={setFormValues}
        formValues={formValues}
      />
      <TitleAndName
        formValues={formValues}
        setFormValues={setFormValues}
        errors={errors}
        setErrors={setErrors}
      />
      <DesiBarkodSku
        formValues={formValues}
        setFormValues={setFormValues}
        errors={errors}
      />
      <SubtitleDescription
        formValues={formValues}
        setFormValues={setFormValues}
        setErrors={setErrors}
        errors={errors}
      />
    </div>,
    <div
      key={1}
      className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative"
    >
      <ImageInput
        preview={true}
        setForm={setFormValues}
        setErrors={setErrors}
      />
    </div>,
    <div
      key={2}
      className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative"
    >
      <ProductAddForm1
        form={formValues}
        setForm={setFormValues}
        errors={errors}
        setErrors={setErrors}
      />
    </div>,
  ];

  function validateStep1() {
    const errors: Record<string, string> = {};
    console.log(formValues);

    if (formValues.title == "") errors.title = "Başlık zorunludur";
    if (!formValues.categoryId) errors.categoryId = "Kategori seçilmelidir";
    if (!formValues.brandId) errors.brandId = "Marka seçilmelidir";
    if (!formValues.desi) errors.desi = "Desi zorunludur";
    return errors;
  }

  function validateStep2() {
    const errors: Record<string, string> = {};
    if (formValues.images.length == 0) {
      errors.images = "Görsel yükleyiniz.";
    }
    return errors;
  }
  function validateStep3() {
    const errors: Record<string, string> = {};
    if (!formValues.salePrice) {
      errors.salePrice = "Satış fiyatı zorunludur";
    }
    if (!formValues.listPrice) {
      errors.listPrice = "Piyasa fiyatı zorunludur";
    }

    if (!formValues.vatRate) {
      errors.vatRate = "KDV oranı zorunludur";
    }
    return errors;
  }

  const handleNext = () => {
    let errors = {};
    if (index === 0) {
      errors = validateStep1();
    } else if (index === 1) {
      errors = validateStep2();
    } else if (index === 2) {
      errors = validateStep3();
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // geçişi engelle
    }

    setIndex((prev) => prev + 1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("sub_title", formValues.sub_title);
        formData.append("sku", formValues.sku);
        formData.append("name", formValues.name);
        formData.append("categoryId", formValues.categoryId);
        formData.append("brandId", formValues.brandId);
        formData.append("description", formValues.description);
        formData.append("is_active", formValues.is_active);
        formData.append("is_default", formValues.is_default);
        formData.append("desi", formValues.desi);
        formData.append("model", formValues.model);
        formData.append("barkod", formValues.barkod);
        formData.append("variants", JSON.stringify(formValues.variants));
        formData.append("listPrice", formValues.listPrice);
        formData.append("salePrice", formValues.salePrice);
        formData.append("costPrice", formValues.costPrice);
        formData.append("vatRate", formValues.vatRate);
        formData.append("stock", formValues.stock);

        for (let i = 0; i < formValues.images.length; i++) {
          formData.append("images", formValues.images[i]);
        }
        formAction(formData);
      }}
      className="pb-10 overflow-x-auto"
    >
      <div className="justify-between flex max-w-[700px] w-full">
        <h2 className="text-xl font-semibold mb-4">Ürün Ekle</h2>
      </div>

      <div className="max-w-[750px] mb-5 text-sm">
        <Steps current={index} small>
          <Steps.Item title="Ürün Bilgileri" />
          <Steps.Item title="Görseller" />
          <Steps.Item title="Fiyat Bilgileri" />
        </Steps>
      </div>

      {forms[index]}
      {errors.images && (
        <p className="text-sm mt-1 text-error">{errors.images}</p>
      )}
      <div className="max-w-[750px] w-full flex justify-between items-center text-right mt-4 ">
        {index > 0 ? (
          <a
            href="#"
            className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 text-[13px] gap-2 font-bold"
            onClick={() => {
              setIndex(index - 1);
            }}
          >
            Geri
            <ArrowLeft size={15} />
          </a>
        ) : (
          <div></div>
        )}
        {index < forms.length - 1 && (
          <a
            href="#"
            className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 text-[13px] gap-2 font-bold"
            onClick={handleNext}
          >
            Devam
            <ArrowRight size={15} />
          </a>
        )}
        {index == forms.length - 1 && (
          <Button type="submit" disabled={isPending}>
            Tamamla
          </Button>
        )}
      </div>
    </form>
  );
};

export default New;
