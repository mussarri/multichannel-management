"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import React, { useActionState, useEffect } from "react";
import { createMarketPlace } from "@/app/actions/marketplaceactions";
import { toast } from "react-toastify";

const Page = ({ data }: { data: any }) => {
  const [message, formAction, isPending] = useActionState(
    createMarketPlace,
    null
  );

  useEffect(() => {
    if (message?.error) {
      toast.error(message.message);
    }
    if (message?.success) {
      toast.success(message.message);
    }
  }, [message?.error, message?.message, message?.success]);

  const [form, setForm] = React.useState({
    active: false,
    storeName: data.storeName,
    api_key: data.apiKey,
    secret_key: data.secretKey,
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("storeName", form.storeName);
    formData.append("api_key", form.api_key);
    formData.append("secret_key", form.secret_key);
    formData.append("active", form.active === false ? "no" : "yes");
    //setHepsiburadaStore(formData);
  };

  return (
    <form action={formAction}>
      <h2 className="text-xl font-semibold mb-4">Hepsiburada Ayarlari</h2>
      <div className="flex flex-col gap-2 max-w-lg box p-4">
        <input type="hidden" name="marketname" value="hepsiburada" />
        <input
          type="hidden"
          name="actives"
          value={form.active === false ? "no" : "yes"}
        />

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

        <div className="text-right">
          <Button type="submit" disabled={isPending}>
            Kaydet
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Page;
