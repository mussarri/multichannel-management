/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useActionState, useEffect } from "react";
import TextInput from "@/app/components/settings/text-input";
import SelectInput from "@/app/components/settings/select-input";
import CheckBox from "@/app/components/settings/checkbox";
import { Button } from "@/components/ui/button";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { createMarketPlace } from "@/app/actions/marketplaceactions";
import { toast } from "react-toastify";

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
  }, [message?.message]);

  const [form, setForm] = React.useState({
    active: false,
    storeName: data?.storeName || "",
    api_key: data?.apiKey || "",
    secret_key: data?.secretKey || "",
    role_name: data?.roleName || "",
    role_password: data?.rolePassword || "",
    sale_time: data?.saleTime || "",
    shipping_cost_payer: data?.shipping_cost_payer || "",
    shipping_company: data?.shipping_company || "",
    shipping_from: data?.shipping_from || "",
    shipping_date: data?.shipping_date || "",
    shipping_date_time: data?.shipping_date_time || "",
    sub_title: data?.sub_title || "",
    sub_title2: data?.sub_title2 || "",
    model: data?.model || "",
    model2: data?.model2 || "",
  });

  const handleModelChange = (model: any) => {
    setForm((prev) => ({ ...prev, model }));
  };
  const handleModelChange2 = (model: any) => {
    setForm((prev) => ({ ...prev, model2: model }));
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form action={formAction} typeof="submit">
      <h2 className="text-xl font-semibold mb-2">Gittigidiyor Ayarlari</h2>
      <div className="box p-4 max-w-[750px] mt-5 flex flex-col gap-2">
        <input type="hidden" name="marketname" value="gittigidiyor" />
        <input type="hidden" name="marketname" value="gittigidiyor" />
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
          label="Api Key"
          name="api_key"
          placeholder="API Key"
          value={form.api_key}
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, api_key: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Secret Key"
          name="secret_key"
          placeholder="Secret Key"
          value={form.secret_key}
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, secret_key: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Role Name"
          name="role_name"
          placeholder="Role Name"
          value={form.role_name}
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, role_name: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Role Password"
          name="role_password"
          placeholder="Role Password"
          value={form.role_password}
          onChange={(e: string) => {
            setForm((prev) => ({ ...prev, role_password: e }));
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
      </div>
      <div className="box p-4  max-w-[750px] mt-5">
        <h2 className="font-semibold">Listeleme Özellikleri</h2>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <SelectInput
            options={[]}
            label="Ürün Kaç Gün Satışta Kalsın?"
            name="sale_time"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, sale_time: e }));
            }}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={["Alıcı", "Satıcı"]}
            label="Kargo Ücretini Kim Ödeyecek?"
            name="shipping_cost_payer"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, shipping_cost_payer: e }));
            }}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Kargo Firması?"
            name="shipping_company"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, shipping_company: e }));
            }}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Nereden Kargolayacaksınız?"
            name="shipping_from"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, shipping_from: e }));
            }}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Kargoya Teslim Tarihi?"
            name="shipping_date"
            onChange={(e: string) => {
              setForm((prev) => ({ ...prev, shipping_date: e }));
            }}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Kargoya Teslim Saati?"
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
        <h2 className="font-semibold">Ekstra Özellikleri</h2>
        <div className="flex gap-5 mt-3">
          <CheckBox
            label="Alt Baslik"
            name="sub_title"
            onChange={() => {
              setForm((prev) => ({ ...prev, sub_title: !form.sub_title }));
            }}
            value={form.sub_title}
            required={false}
            checked={form.sub_title}
          />

          <CheckBox
            label="Alt Baslik"
            name="sub_title2"
            onChange={() => {
              setForm((prev) => ({ ...prev, sub_title2: !form.sub_title2 }));
            }}
            value={form.sub_title2}
            required={false}
            checked={form.sub_title2}
          />

          <CheckBox
            label="Alt Baslik"
            name="sub_title"
            onChange={() => {
              setForm((prev) => ({ ...prev, sub_title: !form.sub_title }));
            }}
            value={form.sub_title}
            required={false}
            checked={form.sub_title}
          />

          <CheckBox
            label="Alt Baslik"
            name="sub_title"
            onChange={() => {
              setForm((prev) => ({ ...prev, sub_title: !form.sub_title }));
            }}
            value={form.sub_title}
            required={false}
            checked={form.sub_title}
          />

          <CheckBox
            label="Alt Baslik"
            name="sub_title"
            onChange={() => {
              setForm((prev) => ({ ...prev, sub_title: !form.sub_title }));
            }}
            value={form.sub_title}
            required={false}
            checked={form.sub_title}
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
        <Button type="submit" disabled={isPending}>
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default page;
