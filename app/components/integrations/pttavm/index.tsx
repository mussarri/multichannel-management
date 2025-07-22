"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import React from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import FroalaEditorComponent from "react-froala-wysiwyg";

const Page = ({ data }: { data: any }) => {
  const [form, setForm] = React.useState({
    active: false,
    storeName: "",
    api_password: "",
    api_username: "",
  });
  const [model, setModel] = React.useState("");
  const [model2, setModel2] = React.useState("");
  const handleModelChange = (model: string) => {
    setModel(model);
  };
  const handleModelChange2 = (model: string) => {
    setModel2(model);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">PttAvm Ayarlari</h2>
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-lg box p-4">
        <TextInput
          label="Magaza Adi"
          name="storeName"
          placeholder="Magaza"
          value=""
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, storeName: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="API Kullanici Adi"
          name="api_username"
          placeholder="API Kullanici Adi"
          value=""
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, api_username: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="API Şifresi"
          name="api_password"
          placeholder="API Şifresi"
          value=""
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, api_password: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />

        <div
          className="flex flex-col gap-2 mt-2 max-w-sm cursor-pointer"
          onClick={() => setForm((prev) => ({ ...prev, active: !form.active }))}
        >
          <label htmlFor="" className="text-sm uppercase font-semibold">
            Mağaza Durumu
          </label>
          <div
            className={
              "w-full text-center py-2 text-xs uppercase rounded " +
              (form.active ? "bg-green-600 text-white" : "  bg-secondary")
            }
          >
            {form.active ? "Aktif" : " Pasif"}
          </div>
        </div>
        <div className="box p-4  max-w-[750px] mt-5">
          <div className="">
            <h5 className="uppercase text-[10px] pb-2 font-semibold text-card-foreground">
              PTTavm Sabit Aciklama(Ürün Açıklama Önü)
            </h5>
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
          <div className="mt-4">
            <h5 className="uppercase text-[10px] pb-2 font-semibold text-card-foreground">
              PTTavm Sabit Aciklama(Ürün Açıklama Sonu)
            </h5>
            <FroalaEditorComponent
              tag="textarea"
              config={{
                placeholderText: "Edit Your Content Here!",
                charCounterCount: false,
              }}
              model={model2}
              onModelChange={handleModelChange2}
            />
          </div>
        </div>

        <div className="text-right">
          <Button type="submit">Kaydet</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
