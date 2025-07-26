/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MarkaForm } from "@/app/components/products/marka-form";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect, useState } from "react";
import SelectInput from "@/app/components/settings/select-input";
import TextInput from "@/app/components/settings/text-input";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { Button } from "@/components/ui/button";
import ImageInput from "@/app/components/products/image-input";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";
import Image from "next/image";
import { Trash, Trash2, XIcon } from "lucide-react";
import { createProduct } from "@/app/action";

const New = ({
  categories,
  brands,
}: {
  categories: Category[];
  brands: any[];
}) => {
  const [selected, setSelected] = useState({
    url: "",
  });
  const [message, formAction, isPending] = useActionState(createProduct, null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message?.error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth", // Yumuşak kaydırma animasyonu
        block: "center", // Elementi görünümün ortasına hizala (başlangıç/son da olabilir)
      });
    }
  }, [message?.error, message?.message]);

  const [formValues, setFormValues] = useState({
    title: "",
    sub_title: "",
    category: "",
    stock: "",
    dec_from_inventory: "",
    t_stock_code: "",
    price: "",
    brand: "",
    is_active: false,
    barkod: "",
    desi: "",
    description: "",
    model: "",
    sku: "",
    images: [],
  });

  const handleModelChange = (event: InputEvent) => {
    setFormValues((prev: any) => {
      return { ...prev, model: event };
    });
  };

  const settings = [
    {
      label: "Stok",
      name: "stock",
      value: formValues.stock,
      placeholder: "placeholder",
    },
    {
      label: "Stok Kodu",
      name: "stock_code",
      value: formValues.sku,
      placeholder: "placeholder",
    },
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

    {
      label: "T. Stok Kodu",
      name: "t_stock_code",
      value: formValues.t_stock_code,
      placeholder: "placeholder",
    },
  ];

  return (
    <form action={formAction} className="pb-10 overflow-x-auto">
      <div className="justify-between flex max-w-[700px] w-full ">
        <h2 className="text-xl font-semibold mb-4">Ürün Ekle</h2>
      </div>

      <div className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative">
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
              name={"brand"}
              options={brands.map((item) => item.name)}
              required={true}
              onChange={(value: string) => {
                setFormValues({ ...formValues, brand: value });
              }}
              vertical={true}
              value={formValues.brand}
            />
          </div>
          <MarkaForm />
          <div className="flex-1">
            <SelectInput
              label={"Ürün Kategorisi"}
              name={"category"}
              options={categories.map((item) => item.name)}
              required={true}
              onChange={(value: string) => {
                setFormValues((prev) => {
                  return { ...prev, category: value };
                });
              }}
              vertical={true}
              value={formValues.category}
            />
          </div>
        </div>
        <div className="flex gap-4 items-end ">
          <div className="flex-1">
            <TextInput
              label={"Ürün Basligi"}
              name={"title"}
              value={formValues.title}
              error={false}
              required={true}
              placeholder="Ürün başlığı"
              onChange={(value: string) => {
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
              error={false}
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
                setFormValues({ ...formValues, sub_title: value });
              }}
              vertical={true}
              error={false}
              type={"text"}
              placeholder="1"
              value={formValues.sub_title}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label={"Ürün satınca stoktan ne kadar düşecek"}
              name={"dec_from_inventory"}
              required={true}
              onChange={(value: string) => {
                setFormValues({ ...formValues, dec_from_inventory: value });
              }}
              vertical={true}
              error={false}
              type={"text"}
              placeholder="1"
              value={formValues.dec_from_inventory}
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
        <div>
          <ImageInput
            onFileChange={(files) => {
              setFormValues({ ...formValues, images: files });
            }}
          />
          <div className="grid grid-cols-5 gap-2">
            {selected.url && (
              <div className="fixed top-0 left-0 z-50 bg-black flex items-center justify-center w-screen h-screen p-10">
                <Image
                  src={selected?.url}
                  alt=""
                  width={500}
                  height={500}
                  objectFit="contain"
                />
                <button className="absolute top-5 right-5">
                  <XIcon
                    color="white"
                    size={20}
                    onClick={() => setSelected({ url: "" })}
                  />
                </button>
              </div>
            )}
            {formValues.images &&
              formValues.images?.map((item, index) => (
                <div key={index}>
                  <div
                    className="relative bg-card rounded border cursor-pointer"
                    style={{
                      aspectRatio: 1,
                    }}
                    onClick={() => setSelected(item)}
                  >
                    <Image src={item.url} alt="" fill objectFit="contain" />
                    {/* <div className="drop-file-preview__item__info">
                       <p>{item?.name}</p>
                       <p>{item?.size}B</p>
                     </div> */}
                  </div>
                  <span
                    className="text-xs flex items-center justify-center gap-2 py-1 mx-auto cursor-pointer hover:text-red-800"
                    onClick={() =>
                      setFormValues({
                        ...formValues,
                        images: formValues.images.filter(
                          (item) => item !== item
                        ),
                      })
                    }
                  >
                    <Trash2
                      size={16}
                      className="hover:scale-110 duration-200 hover:cursor-pointer"
                      color="var(--error)"
                    />
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="max-w-[750px] w-full text-right mt-4 ">
        <Button type="submit" disabled={isPending}>
          Kaydet
        </Button>
      </div>
      {message?.error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2 max-w-[750px]"
          role="alert"
          ref={errorRef}
        >
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline">{message?.message}.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </form>
  );
};

export default New;
