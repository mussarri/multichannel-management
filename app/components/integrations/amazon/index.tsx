/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useActionState, useEffect } from "react";
import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";
import { setTrendyolStore } from "@/app/actions/marketplaceactions";
import { toast } from "react-toastify";

const Page = ({ data }: { data: any }) => {
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
  });
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Amazon Ayarlari</h2>
      <form action={formAction} className="flex flex-col gap-2 max-w-lg">
        <input type="hidden" name="marketname" value="amazon" />
        <TextInput
          label="Magaza Adi"
          name="storeName"
          placeholder="Magaza"
          value={form.storeName}
          onChange={(e) => {
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
          onChange={(e) => {
            setForm((prev) => ({ ...prev, api_key: e }));
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
          onChange={(e) => {
            setForm((prev) => ({ ...prev, api_secret: e }));
          }}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <div className="text-right">
          <Button type="submit" disabled={isPending}>
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
