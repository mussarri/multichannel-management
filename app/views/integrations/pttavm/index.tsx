"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import React, { useActionState, useEffect } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>, // İsteğe bağlı
});

import { createMarketPlace } from "@/app/actions/marketplaceactions";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const Page = ({ data }: { data: any }) => {
  const [message, formAction, isPending] = useActionState(
    createMarketPlace,
    null
  );

  useEffect(() => {
    if (message.error) {
      toast.error(message.message);
    }
    if (message.success) {
      toast.success(message.message);
    }
  }, [message.error, message.message, message.success]);

  const [form, setForm] = React.useState({
    active: false,
    storeName: "",
    api_password: "",
    api_username: "",
    model: "",
    model2: "",
  });

  const handleModelChange = (model: string) => {
    setForm((prev) => ({ ...prev, model }));
  };
  const handleModelChange2 = (model: string) => {
    setForm((prev) => ({ ...prev, model2: model }));
  };

  const submit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("storeName", form.storeName);
    formData.append("api_username", form.api_username);
    formData.append("api_password", form.api_password);
    formData.append("active", form.active == false ? "no" : "yes");
    formData.append("model", form.model);
    formData.append("model2", form.model2);
    formData.append("marketname", "pttavm");
    formAction(formData);
  };
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">PttAvm Ayarlari</h2>
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-lg box p-4">
        <input type="text" hidden name="marketname" value="pttavm" />

        <TextInput
          label="Magaza Adi"
          name="storeName"
          placeholder="Magaza"
          value={form.storeName}
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
          value={form.api_username}
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
          value={form.api_password}
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
              model={form.model}
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
              model={form.model2}
              onModelChange={handleModelChange2}
            />
          </div>
        </div>

        <div className="text-right">
          <Button type="button" onClick={submit} disabled={isPending}>
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
