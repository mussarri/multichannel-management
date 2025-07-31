/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import TextInput from "@/app/components/settings/text-input";
import { setHepsiburadaStore, setTrendyolStore } from "@/app/action";
import { toast } from "react-toastify";

export function TrendyolIntegration() {
  const [message, formAction, isPending] = useActionState(
    setTrendyolStore,
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
    api_key: "",
    api_secret: "",
    store_supplier_id: "",
  });

  const submit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("storeName", form.storeName);
    formData.append("api_key", form.api_key);
    formData.append("api_secret", form.api_secret);
    formData.append("store_supplier_id", form.store_supplier_id);
    formData.append("active", form.active === false ? "no" : "yes");
    formAction(formData);
  };

  return (
    <form action={formAction} className="space-y-4 p-4 border rounded bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input type="text" hidden name="marketname" value="trendyol" />
        <TextInput
          placeholder="Store Supplier ID"
          label="Secret"
          name="store_supplier_id"
          vertical={false}
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
          vertical={false}
          error={false}
          required={true}
          readOnly={false}
          type="text"
          value={form.api_secret}
          onChange={(e) => setForm((prev) => ({ ...prev, api_secret: e }))}
        />
        <TextInput
          placeholder="Secret"
          label="Secret"
          name="api_secret"
          vertical={false}
          error={false}
          required={true}
          readOnly={false}
          type="text"
          value={form.api_secret}
          onChange={(e) => setForm((prev) => ({ ...prev, api_secret: e }))}
        />
      </div>

      <div>
        <Button type="submit" disabled={isPending}>
          Kaydet
        </Button>
      </div>
    </form>
  );
}
