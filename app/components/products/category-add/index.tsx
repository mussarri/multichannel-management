/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import SelectInput from "@/app/components/settings/select-input";
import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";

const Form = ({ categories }: { categories: any[] }) => {
 

  return (
    <form action="">
      <div className="mt-3">
        <div className="box p-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <SelectInput
              label="Ust Kategori"
              name={"parent"}
              options={categories}
              vertical={false}
              required={true}
              onChange={() => {}}
              value=""
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Kategori"
              name={"category"}
              vertical={false}
              required={true}
              value=""
              placeholder=""
              onChange={() => {}}
              error={false}
              type="text"
            />
          </div>
          <div className="text-right">
            <Button>Kaydet</Button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-4">
        <N11 />
        <N11 />
        <N11 />
        <N11 />
      </div>
    </form>
  );
};

export default Form;

function N11() {
  return (
    <div className="flex border rounded flex-col">
      <div className="flex-1 border-b p-3">
        <SelectInput
          label="N11 Kategorisi"
          name={"n11_category"}
          options={[]}
          vertical={true}
          required={true}
          onChange={() => {}}
          value={""}
        />
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h2 className=" text-[13px] text-card-secondary-foreground font-semibold pb-2">
            Kategori Ozellikleri
          </h2>
          <RefreshCcwIcon
            size={16}
            className={"text-secondary-foreground cursor-pointer"}
          />
        </div>
        <SelectInput
          label="Marka"
          name={"brand"}
          options={[]}
          vertical={true}
          required={true}
          onChange={() => {}}
          value={""}
        />
        <SelectInput
          label="Ürün Miktarı"
          name={"product_quantity"}
          options={[]}
          vertical={true}
          required={true}
          onChange={() => {}}
          value={""}
        />
      </div>
    </div>
  );
}
