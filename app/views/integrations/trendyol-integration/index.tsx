/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import { createMarketPlace } from "@/app/actions/marketplaceactions";
import { toast } from "react-toastify";

export default function TrendyolIntegration({ data }: { data: any }) {
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
  }, [message]);

  const [form, setForm] = React.useState({
    active: false,
    storeName: data?.storeName || "",
    api_key: data?.apiKey || "",
    secret_key: data?.secretKey || "",
    store_supplier_id: data?.supplierId || "",
  });
  
  const submit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("storeName", form.storeName);
    formData.append("api_key", form.api_key);
    formData.append("secret_key", form.secret_key);
    formData.append("store_supplier_id", form.store_supplier_id);
    formData.append("active", form.active === false ? "no" : "yes");

    formAction(formData);
  };

  return (
    <form
      action={formAction}
      className="space-y-4 p-4 border rounded bg-white max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Trendyol Ayarlari</h2>
      <div className="flex flex-col gap-2 max-w-lg">
        <input type="hidden" name="marketname" value="trendyol" />
        <input
          type={"hidden"}
          name="active"
          value={form.active === false ? "no" : "yes"}
        />
        <TextInput
          placeholder="Store Supplier ID"
          label="Store Supplier ID"
          name="store_supplier_id"
          vertical={true}
          error={false}
          required={true}
          readOnly={false}
          type="text"
          value={form.store_supplier_id}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, store_supplier_id: e }))
          }
        />

        <TextInput
          placeholder="API Key"
          label="API Key"
          name="api_key"
          vertical={true}
          error={false}
          required={true}
          readOnly={false}
          type="text"
          value={form.api_key}
          onChange={(e) => setForm((prev) => ({ ...prev, api_key: e }))}
        />
        <TextInput
          placeholder="Secret"
          label="Secret"
          name="secret_key"
          vertical={true}
          error={false}
          required={true}
          readOnly={false}
          type="text"
          value={form.secret_key}
          onChange={(e) => setForm((prev) => ({ ...prev, secret_key: e }))}
        />

        <div className="text-right mt-3">
          <Button type="submit" disabled={isPending}>
            Kaydet
          </Button>
        </div>
      </div>
    </form>
  );
}
