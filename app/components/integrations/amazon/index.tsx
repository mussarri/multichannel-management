/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";

const Page = ({ data }: { data: any }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Amazon Ayarlari</h2>
      <div className="flex flex-col gap-2 max-w-lg">
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
        <div className="text-right">
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
