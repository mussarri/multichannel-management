"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import React from "react";

const Page = ({ data }: { data: any }) => {
  const [form, setForm] = React.useState({
    active: false,
    storeName: "",
    api_key: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Hepsiburada Ayarlari</h2>
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
          <Button type="submit">Kaydet</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
