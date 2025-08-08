/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useActionState, useEffect } from "react";
import TextInput from "@/app/components/settings/text-input";
import SelectInput from "@/app/components/settings/select-input";
import { Button } from "@/components/ui/button";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import { createMarketPlace } from "@/app/actions/marketplaceactions";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>, // İsteğe bağlı
});

const page = ({ data }: { data: any }) => {
  const [message, formAction, isPending] = useActionState(
    createMarketPlace,
    null
  );

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
    }
  }, [message?.error, message?.message, message?.success]);

  const [form, setForm] = React.useState({
    active: false,
    storeName: data.storeName,
    api_key: "",
    secret_key: "",
    role_name: "",
    role_password: "",
    sale_time: "",
    shipping_cost_payer: "",
    shipping_company: "",
    shipping_from: "",
    shipping_date: "",
    shipping_date_time: "",
    sub_title: false,
    sub_title2: false,
    model: "",
    model2: "",
  });

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  const handleModelChange = (model: any) => {
    setForm((prev) => ({ ...prev, model }));
  };
  const handleModelChange2 = (model: any) => {
    setForm((prev) => ({ ...prev, model2: model }));
  };

  return (
    <form action={formAction}>
      <h2 className="text-xl font-semibold mb-2">Çiçeksepeti Ayarlari</h2>
      <input type="hidden" name="marketname" value="ciceksepeti" />
      <div className="box p-4 max-w-[750px] mt-5 flex flex-col gap-2">
        <TextInput
          label="Api Key"
          name="api_key"
          placeholder="API Key"
          value=""
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, api_key: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />

        <div
          className="flex flex-col gap-2 mt-2 max-w-[354px] cursor-pointer"
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
        <div className="flex gap-2 mt-3">
          <SelectInput
            options={[]}
            label="Ön Tanımlı Teslimat aralığı?"
            name="shipping_date"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, shipping_date: e }));
            }}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Ön Tanımlı Teslimat Tipi?"
            name="shipping_date_time"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, shipping_date_time: e }));
            }}
            required={false}
            vertical={true}
          />
        </div>
      </div>

      <div className="box p-4  max-w-[750px] mt-5">
        <div className="">
          <h5 className="uppercase text-[10px] pb-2 font-semibold text-card-foreground">
            Sabit Aciklama
          </h5>
          <FroalaEditorComponent
            tag="textarea"
            config={{
              placeholderText: "Edit Your Content Here!",
              charCounterCount: false,
            }}
            model={form.model}
            onModelChange={handleModelChange}
          />
        </div>
        <div className="mt-4">
          <h5 className="uppercase text-[10px] pb-2 font-semibold text-card-foreground">
            Sabit Aciklama
          </h5>
          <FroalaEditorComponent
            tag="textarea"
            config={{
              placeholderText: "Edit Your Content Here!",
              charCounterCount: false,
            }}
            model={form.model2}
            onModelChange={handleModelChange2}
          />
        </div>
      </div>

      <div className="text-right max-w-[750px] mt-4 pb-5">
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
};

export default page;
