/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MarkaForm } from "@/app/components/products/marka-form";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/app/components/products/image-uploader";
import React, { useActionState, useEffect, useState } from "react";
import SelectInput from "@/app/components/settings/select-input";
import TextInput from "@/app/components/settings/text-input";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

import "rsuite/Steps/styles/index.css";

import { Button } from "@/components/ui/button";
import { redirect, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Blocks, Settings, Trash } from "lucide-react";
import { Category } from "@prisma/client";
import { updateProductAction } from "@/app/action";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { Steps } from "rsuite";
import "rsuite/Steps/styles/index.css";
import ProductAddForm1 from "../product-add/price";
import ImageEdit from "@/app/components/products/product-edit/images-edit";

const Info = ({
  product,
  categories,
  brands,
}: {
  product: any;
  categories: Category[];
  brands: any[];
}) => {
  const [message, formAction, isPending] = useActionState(
    updateProductAction,
    null
  );
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (message?.error) {
      toast.error("Ürün güncellenirken bir hata oluştu.");
    }
    if (message?.success) {
      toast.success("Ürün başarıyla güncellendi.");
      redirect("/dashboard/products/" + product.id);
    }
  }, [message, product.id]);

  useEffect(() => {
    import("froala-editor/js/plugins.pkgd.min.js");
  }, []);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
    }
  }, [message?.error, message?.message, message?.success]);

  const setImages = () => {
    let array = [];
    product.images?.map((item, index) => {
      array.push(item);
    });
    product.variants?.map((element) => {
      element.images?.map((item, index) => {
        array.push(item);
      });
    });

    return array;
  };

  const [form, setForm] = useState({
    title: product.title,
    name: product.name,
    sub_title: product.sub_title,
    description: product.description,
    sku: product.sku,
    categoryId: product.category.id,
    brandId: product.brand.id,
    is_active: product.is_active,
    is_default: product.is_default || product.variants.length == 1,
    desi: product.desi,
    barkod: product.barkod,
    variants: product.variants,
    salePrice: product.salePrice,
    listPrice: product.listPrice,
    costPrice: product.constProce,
    stock: product.stock,
    vatRate: product.vatRate,
    firstImages: setImages(),
    images: [],
    deletedIds: [],
  });

  const handleModelChange = (event: InputEvent) => {
    setForm((prev) => ({ ...prev, description: event }));
  };

  const [index, setIndex] = useState(0);

  const settings = [
    {
      label: "Desi",
      name: "desi",
      value: form.desi,
      placeholder: "placeholder",
    },
    {
      label: "Barkod",
      name: "barkod",
      value: form.barkod,
      placeholder: "placeholder",
    },
    {
      label: "SKU",
      name: "sku",
      value: form.sku,
      placeholder: "placeholder",
    },
  ];

  const onChange = (value, name) => {
    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
    setForm({ ...form, [name]: value });
  };

  function validateStep1() {
    const errors: Record<string, string> = {};

    if (form.title == "") errors.title = "Başlık zorunludur";
    if (!form.categoryId) errors.categoryId = "Kategori seçilmelidir";
    if (!form.brandId) errors.brandId = "Marka seçilmelidir";
    if (!form.desi) errors.desi = "Desi zorunludur";
    return errors;
  }

  function validateStep5() {
    const errors: Record<string, string> = {};
    if (!form.is_default && form.variants.length == 0) {
      errors.variants = "Variantlari ayarlayiniz.";
    }
    return errors;
  }

  function validateStep2() {
    const errors: Record<string, string> = {};

    return errors;
  }

  function validateStep3() {
    const errors: Record<string, string> = {};
    if (!form.salePrice) {
      errors.salePrice = "Satış fiyatı zorunludur";
    }
    if (!form.listPrice) {
      errors.listPrice = "Piyasa fiyatı zorunludur";
    }

    if (!form.vatRate) {
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

  const forms = [
    <div
      key={0}
      className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative"
    >
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
            value={form.brandId}
            error={errors.brandId}
          />
        </div>
        <MarkaForm />
      </div>
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
            setForm((prev) => {
              return { ...prev, categoryId: value };
            });
          }}
          vertical={true}
          value={form.categoryId}
          error={errors.categoryId}
        />
      </div>
      <div className="flex gap-4">
        <TextInput
          label={"Ürün Adi"}
          name={"name"}
          value={form.name}
          error={errors.name}
          required={true}
          placeholder="Ürün adi.."
          onChange={(value: string) => {
            setErrors((prev) => {
              return { ...prev, name: "" };
            });
            setForm({ ...form, name: value });
          }}
          type="text"
          vertical={true}
        />

        <div className="w-full flex-1">
          {" "}
          <TextInput
            label={"Ürün Basligi"}
            name={"title"}
            value={form.title}
            error={errors.title}
            required={true}
            placeholder="Ürün başlığı"
            onChange={(value: string) => {
              setErrors((prev) => {
                return { ...prev, title: "" };
              });
              setForm({ ...form, title: value });
            }}
            type="text"
            vertical={true}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {settings.map((item, didem) => (
          <TextInput
            key={didem}
            label={item.label}
            name={item.name}
            value={form[item.name]}
            error={errors[item.name]}
            required={true}
            placeholder={item.name}
            onChange={(value: string) => {
              setForm({ ...form, [item.name]: value });
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
              setForm({ ...form, sub_title: value });
            }}
            vertical={true}
            error={errors.sub_title}
            type={"text"}
            placeholder="1"
            value={form.sub_title}
          />
        </div>
      </div>
      <div>
        <label htmlFor="" className="pb-1">
          Aciklama
        </label>
        <FroalaEditorComponent
          tag="textarea"
          config={{
            placeholderText: "Edit Your Content Here!",
            charCounterCount: false,
          }}
          model={form.description}
          onModelChange={handleModelChange}
        />
      </div>
    </div>,
    <ImageEdit key={2} form={form} setForm={setForm} setErrors={setErrors} />,

    <div
      key={3}
      className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative"
    >
      <ProductAddForm1
        form={form}
        setForm={setForm}
        errors={errors}
        setErrors={setErrors}
      />
    </div>,

    // <VariantSettings
    //   key={1}
    //   formData={form}
    //   setForm={setForm}
    //   errors={errors}
    //   setErrors={setErrors}
    // />,

    // <VariantTableEdit key={4} variants={form.variants} />,
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", product.id);
        formData.append("title", form.title);
        formData.append("sub_title", form.sub_title);
        formData.append("sku", form.sku);
        formData.append("name", form.name);
        formData.append("categoryId", form.categoryId);
        formData.append("brandId", form.brandId);
        formData.append("description", form.description);
        formData.append("is_active", form.is_active);
        formData.append("is_default", form.is_default);
        formData.append("desi", form.desi);
        formData.append("barkod", form.barkod);
        formData.append("variants", JSON.stringify(form.variants));
        formData.append("listPrice", form.listPrice);
        formData.append("salePrice", form.salePrice);
        formData.append("costPrice", form.costPrice);
        formData.append("vatRate", form.vatRate);
        formData.append("stock", form.stock);
        formData.append("deletedIds", JSON.stringify(form.deletedIds));

        for (let i = 0; i < form.images.length; i++) {
          formData.append("images", form.images[i]);
        }

        formAction(formData);
      }}
      method="POST"
      className="pb-10"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4">Ürün Düzenle</h2>

      <div className="max-w-[750px] mb-5 text-sm">
        <Steps current={index} small>
          <Steps.Item title="Ürün Bilgileri" />
          <Steps.Item title="Görseller" />
          <Steps.Item title="Ürun Fiyat" />
        </Steps>
      </div>

      {forms[index]}
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
            Ürünü Güncelle
          </Button>
        )}
      </div>
    </form>
  );
};

export default Info;
