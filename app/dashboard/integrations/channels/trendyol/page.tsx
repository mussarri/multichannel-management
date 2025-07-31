/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useActionState, useEffect } from "react";
import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";
import { setTrendyolStore } from "@/app/action";
import { toast } from "react-toastify";

const page = () => {
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
  }, []);

  const [form, setForm] = React.useState({
    active: false,
    storeName: "",
    api_key: "",
    api_secret: "",
    store_supplier_id: "",
  });

  return (
    <form action={formAction}>
      <h2 className="text-xl font-semibold mb-2">Trendyol Ayarlari</h2>
      <div className="box p-4 max-w-[750px] mt-5 flex flex-col gap-2">
        <TextInput
          label="Magaza Adi"
          name="storeName"
          placeholder="Magaza"
          value={form.storeName}
          onChange={(s) => {
            setForm((prev) => ({ ...prev, storeName: s }));
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
          onChange={(s) => {
            setForm((prev) => ({ ...prev, api_key: s }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Api Secret"
          name="api_secret"
          placeholder="Api Secret"
          value={form.api_secret}
          onChange={(s) => {
            setForm((prev) => ({ ...prev, api_secret: s }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Magaza Tedarikcisi"
          name="store_supplier_id"
          placeholder="Magaza Tedarikcisi"
          value={form.store_supplier_id}
          onChange={(s) => {
            setForm((prev) => ({ ...prev, store_supplier_id: s }));
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

      <div className="text-right max-w-[750px] mt-4 pb-5">
        <Button type="submit" disabled={isPending}>
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default page;
