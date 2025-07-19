/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";

const page = () => {
  const [form, setForm] = React.useState({
    active: false,
  });

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Trendyol Ayarlari</h2>
      <div className="box max-w-[750px] mt-5 flex flex-col gap-2">
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
        <TextInput
          label="Magaza Tedarikcisi"
          name="store_supplier_id"
          placeholder="Magaza Tedarikcisi"
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
              "w-full text-center bg-secondary py-2 text-xs uppercase rounded " +
              (form.active ? "bg-green-600 text-white" : "")
            }
          >
            {form.active ? "Aktif" : " Pasif"}
          </div>
        </div>
      </div>

      <div className="text-right max-w-[750px] mt-4 pb-5">
        <Button>Kaydet</Button>
      </div>
    </>
  );
};

export default page;
