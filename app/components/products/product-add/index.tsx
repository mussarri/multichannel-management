/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MarkaForm } from "@/app/components/products/marka-form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
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
import Link from "next/link";
import { Blocks } from "lucide-react";

const New = () => {
  const [model, setModel] = useState<object>();
  const [form, setForm] = useState({
    label: "",
    name: "",
    value: "",
    placeholder: "",
    lstmodeplaseholder: "",
    brand: "",
  });

  const { id } = useParams();

  const handleModelChange = (event: InputEvent) => {
    setModel(event);
  };

  const settings = [
    {
      label: "Barkod",
      name: "mode",
      value: "adsasd",
      placeholder: "placeholder",
    },
    {
      label: "Desi",
      name: "mode",
      value: "adsasd",
      placeholder: "placeholder",
    },
    {
      label: "Stok",
      name: "mode",
      value: "adsasd",
      placeholder: "placeholder",
    },
    {
      label: "Stok Kodu",
      name: "mode",
      value: "adsasd",
      placeholder: "placeholder",
    },
    {
      label: "T. Stok Kodu",
      name: "mode",
      value: "adsasd",
      placeholder: "placeholder",
    },
  ];

  return (
    <div className="pb-10">
      <div className="justify-between flex max-w-[700px] w-full ">
        <h2 className="text-xl font-semibold mb-4">Ürün Ekle</h2>
      </div>
      <div className="box max-w-[700px] w-full flex flex-col gap-5 relative">
        <div className="flex gap-4 items-end ">
          <div className=" flex-1">
            <SelectInput
              label={"Ürün Markasi"}
              name={"brand"}
              options={[]}
              required={true}
              onChange={() => {}}
              vertical={true}
            />
          </div>
          <MarkaForm />
          <div className="flex-1">
            <SelectInput
              label={"Ürün Kategorisi"}
              name={"category"}
              options={[]}
              required={true}
              onChange={() => {}}
              vertical={true}
            />
          </div>
        </div>
        <div className="flex gap-4 items-end ">
          <div className="flex-1">
            <TextInput
              label={"Ürün Basligi"}
              name={"title"}
              value=""
              error={false}
              required={true}
              placeholder="Ürün başlığı"
              onChange={() => {}}
              type="text"
              vertical={true}
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <label className="text-sm font-semibold" htmlFor="">
              Ürün Satış Durumu
            </label>
            <select name="" id="" className="p-2 rounded-lg h-[40px] w-full">
              <option value="">Acık</option>
              <option value="">Kapalı</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {settings.map((item, didem) => (
            <TextInput
              key={didem}
              label={item.label}
              name={"title"}
              value=""
              error={false}
              required={true}
              placeholder="Ürün başlığı"
              onChange={() => {}}
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
              onChange={() => {}}
              vertical={true}
              error={false}
              type={"text"}
              placeholder="1"
              value=""
            />
          </div>
          <div className="flex-1">
            <TextInput
              label={"Ürün satınca stoktan ne kardar düşecek"}
              name={"dec_from_inventory"}
              required={true}
              onChange={() => {}}
              vertical={true}
              error={false}
              type={"text"}
              placeholder="1"
              value=""
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
            model={model}
            onModelChange={handleModelChange}
          />
        </div>
        <div>
          <ImageInput
            onFileChange={(files) => {
              console.log(files);
            }}
          />
        </div>
      </div>
      <div className="w-[70%] text-right mt-4 ">
        <Button>Kaydet</Button>
      </div>
    </div>
  );
};

export default New;
