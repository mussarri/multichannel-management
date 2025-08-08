/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useActionState, useEffect, useTransition } from "react";
import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>, // İsteğe bağlı
});

import { toast } from "react-toastify";
import { createMarketPlace } from "@/app/actions/marketplaceactions";
import dynamic from "next/dynamic";

const Page = ({ data }: { data: any }) => {
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
    model: "",
    model2: "",
    storeName: "",
    api_key: "",
    api_secret: "",
  });

  const handleModelChange = (model: any) => {
    setForm((prev) => ({ ...prev, model }));
  };
  const handleModelChange2 = (model: any) => {
    setForm((prev) => ({ ...prev, model1: model }));
  };

  const submit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("active", form.active === false ? "no" : "yes");
    formData.append("storeName", form.storeName);
    formData.append("api_key", form.api_key);
    formData.append("api_secret", form.api_secret);
    formData.append("model", form.model);
    formData.append("model2", form.model2);
    formData.append("marketname", "n11");
    formAction(formData);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">N11 Ayarlari</h2>
      <div className="box p-4 max-w-[750px] mt-5 flex flex-col gap-2">
        <TextInput
          label="Magaza Adi"
          name="storeName"
          placeholder="Magaza"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Api Key"
          name="api_key"
          placeholder="API Key"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Api Secret"
          name="api_secret"
          placeholder="Api Secret"
          value=""
          onChange={() => {}}
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
              "w-full text-center  py-2 text-xs uppercase rounded " +
              (form.active ? "bg-green-600 text-white" : " bg-secondary")
            }
          >
            {form.active ? "Aktif" : " Pasif"}
          </div>
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
        <Button disabled={isPending} type="button" onClick={submit}>
          Kaydet
        </Button>
      </div>
    </>
  );
};

export default Page;
