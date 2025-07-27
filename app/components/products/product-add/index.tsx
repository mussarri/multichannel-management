/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MarkaForm } from "@/app/components/products/marka-form";
import React, { useActionState, useEffect, useState } from "react";
import SelectInput from "@/app/components/settings/select-input";
import TextInput from "@/app/components/settings/text-input";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import ImageInput from "@/app/components/products/image-uploader";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { createProduct } from "@/app/action";
import { toast } from "react-toastify";
import VariantSettings from "@/app/components/products/variant-settings";
import { Steps } from "rsuite";
import "rsuite/Steps/styles/index.css";
import ProductAddForm1 from "./price";
import { ArrowLeft, ArrowRight, MoveRightIcon } from "lucide-react";

const New = ({
  categories,
  brands,
}: {
  categories: Category[];
  brands: any[];
}) => {
  const [message, formAction, isPending] = useActionState(createProduct, null);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.error(message?.message);
    }
  }, [message?.error, message?.message, message?.success]);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {});

  const [formValues, setFormValues] = useState<any>({
    title: "",
    sub_title: "",
    categoryId: "",
    brandId: "",
    description: "",
    is_active: false,
    is_default: true,
    desi: "",
    model: "",
    barkod: "",
    variants: [],
    images: [],
    salePrice: 0,
    listPrice: 0,
    vatRate: 0,
    stock: 0,

    // stock: "",
    // sku: "",
    // combination: {},
    // variant_code: "",
  });

  const handleModelChange = (event: InputEvent) => {
    setFormValues((prev: any) => {
      return { ...prev, model: event };
    });
  };

  const settings = [
    {
      label: "Barkod",
      name: "barkod",
      value: formValues.barkod,
      placeholder: "placeholder",
    },
    {
      label: "Desi",
      name: "desi",
      value: formValues.desi,
      placeholder: "placeholder",
    },
  ];

  const onChange = (value, name) => {
    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);

  const [index, setIndex] = useState(0);
  const forms = [
    <div
      key={0}
      className="box p-4 max-w-[1000px] w-full flex flex-col gap-5 relative"
    >
      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm font-semibold" htmlFor="">
          Ürün Satış Durumu
        </label>
        <div
          className={
            " p-2 text-sm text-center  rounded cursor-pointer w-full max-w-[400px] transition-all duration-200 " +
            (formValues.is_active
              ? "bg-green-500 text-white"
              : " bg-secondary text-secondary-foreground")
          }
          onClick={() => {
            setFormValues({
              ...formValues,
              is_active: !formValues.is_active,
            });
          }}
        >
          {formValues.is_active ? "Aktif" : "Pasif"}
        </div>
      </div>
      <div className="flex gap-4 items-end ">
        <div className=" flex-1">
          <SelectInput
            label={"Ürün Markasi"}
            name={"brandId"}
            options={brands.map((item) => item)}
            required={true}
            onChange={(value: any) => {
              onChange(value, "brandId");
            }}
            vertical={true}
            value={formValues.brandId}
            error={errors.brandId}
          />
        </div>
        <MarkaForm />
        <div className="flex-1">
          <SelectInput
            label={"Ürün Kategorisi"}
            name={"categoryId"}
            options={categories}
            required={true}
            onChange={(value: any) => {
              setErrors((prev) => {
                return { ...prev, categoryId: "" };
              });
              setFormValues((prev) => {
                return { ...prev, categoryId: value };
              });
            }}
            vertical={true}
            value={formValues.categoryId}
            error={errors.categoryId}
          />
        </div>
      </div>
      <div className="flex gap-4 items-end ">
        <div className="flex-1">
          <TextInput
            label={"Ürün Basligi"}
            name={"title"}
            value={formValues.title}
            error={errors.title}
            required={true}
            placeholder="Ürün başlığı"
            onChange={(value: string) => {
              setErrors((prev) => {
                return { ...prev, title: "" };
              });
              setFormValues({ ...formValues, title: value });
            }}
            type="text"
            vertical={true}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {settings.map((item, didem) => (
          <TextInput
            key={didem}
            label={item.label}
            name={item.name}
            value={formValues[item.name]}
            error={errors[item.name]}
            required={true}
            placeholder={item.name}
            onChange={(value: string) => {
              setFormValues({ ...formValues, [item.name]: value });
            }}
            type="text"
            vertical={true}
          />
        ))}
      </div>
      <div className="flex gap-4 items-end my-4 ">
        <div className=" flex-1">
          <TextInput
            label={"Ürün Alt Başlığı(Maksımum 60 karakter)"}
            name={"sub_title"}
            required={true}
            onChange={(value: string) => {
              setErrors((prev) => {
                return { ...prev, sub_title: "" };
              });
              setFormValues({ ...formValues, sub_title: value });
            }}
            vertical={true}
            error={errors.sub_title}
            type={"text"}
            placeholder="1"
            value={formValues.sub_title}
          />
        </div>
      </div>
      <div>
        <FroalaEditorComponent
          tag="textarea"
          config={{
            placeholderText: "Edit Your Content Here!",
            charCounterCount: false,
          }}
          model={formValues.model}
          onModelChange={handleModelChange}
        />
      </div>
    </div>,
    <VariantSettings
      key={1}
      formData={formValues}
      setForm={setFormValues}
      errors={errors}
      setErrors={setErrors}
    />,
    <div
      key={2}
      className="box p-4 max-w-[1000px] w-full flex flex-col gap-5 relative"
    >
      <ImageInput setForm={setFormValues} setErrors={setErrors} />
    </div>,

    <div
      key={3}
      className="box p-4 max-w-[1000px] w-full flex flex-col gap-5 relative"
    >
      <ProductAddForm1
        formValues={formValues}
        setForm={setFormValues}
        errors={errors}
        setErrors={setErrors}
      />
    </div>,
    <div
      key={4}
      className="box p-4 max-w-[1000px] w-full flex flex-col gap-5 relative"
    ></div>,
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
    if (!formValues.is_default && formValues.variants.length == 0) {
      errors.variants = "Variantlari ayarlayiniz.";
    }
    return errors;
  }

  function validateStep3() {
    const errors: Record<string, string> = {};
    if (formValues.images.length == 0) {
      errors.images = "Görsel yükleyiniz.";
    }
    return errors;
  }
  function validateStep4() {
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
    } else if (index === 3) {
      errors = validateStep4();
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // geçişi engelle
    }

    setIndex((prev) => prev + 1);
  };

  console.log(formValues);
  console.log(errors);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("sub_title", formValues.sub_title);
        formData.append("categoryId", formValues.categoryId);
        formData.append("brandId", formValues.brandId);
        formData.append("description", formValues.description);
        formData.append("is_active", formValues.is_active);
        formData.append("is_default", formValues.is_default);
        formData.append("desi", formValues.desi);
        formData.append("model", formValues.model);
        formData.append("barkod", formValues.barkod);
        formData.append("variants", JSON.stringify(formValues.variants));
        formData.append("salePrice", formValues.salePrice);
        formData.append("listPrice", formValues.listPrice);
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

      <div className="max-w-[1000px] mb-5 text-sm">
        <Steps current={index} small>
          <Steps.Item title="Ürün Bilgileri" />
          <Steps.Item title="Varyant Bilgileri" />
          <Steps.Item title="Görseller" />
          <Steps.Item title="Fiyat Bilgileri" />
          <Steps.Item title="Detaylar" />
        </Steps>
      </div>

      {forms[index]}
      {errors.images && (
        <p className="text-sm mt-1 text-error">{errors.images}</p>
      )}
      <div className="max-w-[1000px] w-full flex justify-between items-center text-right mt-4 ">
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
        {index < forms.length - 2 && (
          <a
            href="#"
            className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 text-[13px] gap-2 font-bold"
            onClick={handleNext}
          >
            Devam
            <ArrowRight size={15} />
          </a>
        )}
        {index == forms.length - 2 && (
          <Button type="submit" disabled={isPending}>
            Tamamla
          </Button>
        )}
      </div>
    </form>
  );
};

export default New;
