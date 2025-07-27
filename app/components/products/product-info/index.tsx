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

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
import "rsuite/Steps/styles/index.css";

import { Button } from "@/components/ui/button";
import ImageInput from "@/app/components/products/image-input";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Blocks, Settings, Trash } from "lucide-react";
import { Product, Category } from "@prisma/client";
import Image from "next/image";
import { updateProductAction } from "@/app/action";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { Steps } from "rsuite";

const Lists = dynamic(import("froala-editor/js/plugins.pkgd.min.js"));

const Info = ({
  product,
  categories,
  brands,
}: {
  product: any;
  categories: Category[];
  brands: any[];
}) => {
  const [model, setModel] = useState<object>();
  const [message, formAction, isPending] = useActionState(
    updateProductAction,
    null
  );

  useEffect(() => {
    if (message?.error) {
      toast.error("Ürün güncellenirken bir hata oluştu.");
    }
    if (message?.success) {
      toast.success("Ürün başarıyla güncellendi.");
    }
  }, [message]);

  useEffect(() => {
    import("froala-editor/js/plugins.pkgd.min.js");
  }, []);

  const errorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message?.error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth", // Yumuşak kaydırma animasyonu
        block: "center", // Elementi görünümün ortasına hizala (başlangıç/son da olabilir)
      });
    }
  }, [message?.error, message?.message]);

  const [form, setForm] = useState({
    title: product.title,
    sub_title: product.sub_title,
    category: product.category,
    stock: product.stock,
    t_stock_code: "",
    sku: product.sku,
    dec_from_inventory: "",
    price: product.price,
    brand: product.brand,
    is_active: product.is_active,
    barkod: product.barkod,
    desi: product.desi,
    description: product.description,
    images: product.images.map((item: any) => item.url),
  });

  const { id } = useParams();

  const handleModelChange = (event: InputEvent) => {
    setModel(event);
  };

  const settings = [
    {
      label: "Barkod",
      name: "barkod",
      value: form.barkod,
      placeholder: "placeholder",
    },
    {
      label: "Desi",
      name: "desi",
      value: form.desi,
      placeholder: "placeholder",
    },
  ];

  const [index, setIndex] = useState(0);

  const forms = [
    <div
      key={0}
      className="box p-4 max-w-[750px] min-w-[750px] w-full flex flex-col gap-5 relative"
    >
      <div className="justify-between  flex max-w-[100%] w-full h-[85px]">
        <h2 className="text-lg font-semibold mb-4">
          Ürün Bilgileri{id && <span> - ({product.title})</span>}
          <p className="text-xs font-light">
            Urun bilgilerini formlar ile duzenleyebilirsiniz.
          </p>
        </h2>
        <div className="flex gap-5">
          <div className="relative inline-block group">
            <Link
              className="text-sm flex flex-col items-center"
              href={"/dashboard/sync/" + id}
            >
              <Blocks size={22} />
              Entegrasyon
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-[50%] mt-2 w-48 bg-gray-800 text-white text-sm p-2 rounded hidden group-hover:block z-50">
              Ürünü pazarylerinde satışa çıkarmak için tıklayınız.
            </div>
          </div>
          <div className="relative inline-block group">
            <Link
              className="text-sm flex flex-col items-center"
              href={"/dashboard/variants/" + id}
            >
              <Settings size={22} />
              Seçenekler
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-[50%] mt-2 w-48 bg-gray-800 text-white text-sm p-2 rounded hidden group-hover:block z-50">
              Ürünün varyantlarını ayarlamak için tıklayınız.
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full h-[1px] bg-border left-0 top-[85px]"></div>
      <div className="flex flex-col gap-1 items-start">
        <label className="text-sm font-semibold" htmlFor="">
          Ürün Satış Durumu
        </label>
        <input type="hidden" name="is_active" value={form.is_active} />
        <div
          className={
            " p-2 text-sm text-center  rounded cursor-pointer w-full max-w-[400px] transition-all duration-200 " +
            (form.is_active
              ? "bg-green-500 text-white"
              : " bg-secondary text-secondary-foreground")
          }
          onClick={() => {
            setForm({ ...form, is_active: !form.is_active });
          }}
        >
          {form.is_active ? "Aktif" : "Pasif"}
        </div>
      </div>
      <div className="flex gap-4 items-end">
        <input type="hidden" name="id" value={id} />
        <div className=" flex-1">
          <SelectInput
            label={"Ürün Markasi"}
            name={"brand"}
            options={brands}
            required={true}
            onChange={(value: any) => {
              setForm({ ...form, brand: value });
            }}
            vertical={true}
            value={form.brand}
          />
        </div>
        <MarkaForm />
        <div className="flex-1">
          <SelectInput
            label={"Ürün Kategorisi"}
            name={"category"}
            options={categories}
            required={true}
            onChange={(v: any) => {
              setForm({ ...form, category: v });
            }}
            vertical={true}
            value={form.category}
          />
        </div>
      </div>
      <div className="flex gap-4 items-end ">
        <div className="flex-1">
          <TextInput
            label={"Ürün Basligi"}
            name={"title"}
            value={form.title}
            error={false}
            required={true}
            placeholder="Ürün başlığı"
            onChange={(v: string) => {
              setForm({ ...form, title: v });
            }}
            type="text"
            vertical={true}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        <TextInput
          label={"Stok Kodu"}
          name={"sku"}
          value={form.sku?.toLocaleString()}
          error={false}
          required={false}
          placeholder={"sku"}
          onChange={(v: string) => {
            setForm({ ...form, sku: v });
          }}
          type="text"
          vertical={true}
          readOnly={true}
        />
        {settings.map((item, didem) => (
          <TextInput
            key={didem}
            label={item.label}
            name={item.name}
            value={form[item.name]?.toLocaleString()}
            error={false}
            required={false}
            placeholder={item.name}
            onChange={(v: string) => {
              setForm({ ...form, [item.name]: v });
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
            required={false}
            onChange={(value: string) => {
              setForm({ ...form, sub_title: value });
            }}
            vertical={true}
            error={false}
            type={"text"}
            placeholder="1"
            value={form.sub_title}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label={"Ürün satınca stoktan ne kardar düşecek"}
            name={"dec_from_inventory"}
            required={false}
            onChange={(value: string) => {
              setForm({ ...form, dec_from_inventory: value });
            }}
            vertical={true}
            error={false}
            type={"text"}
            placeholder="1"
            value={form.dec_from_inventory}
          />
        </div>
      </div>
      <div>
        <label htmlFor="" className="text-sm uppercase font-semibold mb-1">
          Ürün Aciklama
        </label>
        <FroalaEditorComponent
          tag="textarea"
          config={{
            placeholderText: "Edit Your Content Here!",
            charCounterCount: false,
          }}
          model={model}
          onModelChange={handleModelChange}
        />
      </div>
    </div>,
    <div key={1} className="box p-4 mt-4 max-w-[750px]">
      <h2 className="text-lg font-semibold mb-4">
        Ürün Varyant Ayarlari{id && <span> - ({product.title})</span>}
      </h2>
    </div>,
    <div key={3} className="box p-4 mt-4 max-w-[750px]">
      <h2 className="text-lg font-semibold mb-4">
        Ürün Görsellerı{id && <span> - ({product.title})</span>}
      </h2>
      <ImageUploader />
    </div>,
    <div key={2} className="box p-4 mt-4 max-w-[750px]">
      <h2 className="text-lg font-semibold mb-4">
        Fiyatlandirma{id && <span> - ({product.title})</span>}
      </h2>
    </div>,
  ];

  return (
    <form
      action={formAction}
      method="POST"
      className="pb-10"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4">Ürün Bilgileri</h2>

      <div className="max-w-[750px] mb-5 text-sm">
        <Steps current={index} small>
          <Steps.Item title="Ürün Bilgileri" />
          <Steps.Item title="Varyant Bilgileri" />
          <Steps.Item title="Görseller" />
          <Steps.Item title="Fiyat Bilgileri" />
        </Steps>
      </div>

      {forms[index]}
      <div className="max-w-[750px] w-full flex justify-between items-center text-right mt-4 ">
        {index > 0 ? (
          <Button
            type="button"
            onClick={() => {
              setIndex(index - 1);
            }}
          >
            Geri
          </Button>
        ) : (
          <div></div>
        )}
        {index < forms.length - 1 && (
          <Button type="button" onClick={() => setIndex(index + 1)}>
            Sonraki
          </Button>
        )}
        {index === forms.length - 1 && (
          <Button type="submit" disabled={isPending}>
            Kaydet
          </Button>
        )}
      </div>
    </form>
  );
};

export default Info;
