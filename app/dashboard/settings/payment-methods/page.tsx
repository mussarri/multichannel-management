"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Toggle from "@/app/components/settings/Toggle";
import TextInput from "@/app/components/settings/text-input";

const Page = () => {
  return (
    <div className="px-4 max-w">
      <h2 className="text-xl font-semibold">Ödeme Yöntemleri</h2>
      <div className="flex flex-col max-w-lg gap-2 gap-x-5 mt-2">
        <div className="py-3 pb-5 border-b flex flex-col gap-2">
          <h2 className="text-md font-semibold pb-2">iyzico Ödeme Sistemi</h2>
          <Toggle
            label="Aktif"
            name="iyzico_active"
            onChange={() => {}}
            value={false}
          />
          <Toggle
            label="PayWithIyzico"
            name="pay_with_iyzico"
            onChange={() => {}}
            value={false}
          />
          <TextInput
            label="Iyzico Api Key"
            placeholder="123123123"
            name="iyzico_api_key"
            type="text"
            onChange={() => {}}
            value=""
            required={false}
            vertical={false}
            error={false}
          />
          <TextInput
            label="Iyzico Secret Key"
            placeholder=""
            name="iyzico_secret_key"
            type="text"
            onChange={() => {}}
            value=""
            required={false}
            vertical={false}
            error={false}
          />
        </div>
        <div className="py-3 pb-5 border-b flex flex-col gap-2">
          <h2 className="text-md font-semibold pb-2">iyzico Ödeme Sistemi</h2>
          <Toggle
            label="Aktif"
            name="iyzico_active"
            onChange={() => {}}
            value={false}
          />
          <Toggle
            label="PayWithIyzico"
            name="pay_with_iyzico"
            onChange={() => {}}
            value={false}
          />
          <TextInput
            label="Iyzico Api Key"
            placeholder="123123123"
            name="iyzico_api_key"
            type="text"
            onChange={() => {}}
            value=""
            required={false}
            error={false}
            vertical={false}
          />
          <TextInput
            label="Iyzico Secret Key"
            placeholder=""
            name="iyzico_secret_key"
            type="text"
            error={false}
            onChange={() => {}}
            value=""
            required={false}
            vertical={false}
          />
        </div>
        <div className="py-3 pb-5 border-b flex flex-col gap-2">
          <h2 className="text-md font-semibold pb-2">iyzico Ödeme Sistemi</h2>
          <Toggle
            label="Aktif"
            name="iyzico_active"
            onChange={() => {}}
            value={false}
          />
          <Toggle
            label="PayWithIyzico"
            name="pay_with_iyzico"
            onChange={() => {}}
            value={false}
          />
          <TextInput
            label="Iyzico Api Key"
            placeholder="123123123"
            name="iyzico_api_key"
            type="text"
            onChange={() => {}}
            value=""
            required={false}
            error={false}
            vertical={false}
          />
          <TextInput
            label="Iyzico Secret Key"
            placeholder=""
            name="iyzico_secret_key"
            type="text"
            onChange={() => {}}
            value=""
            required={false}
            vertical={false}
            error={false}
          />
        </div>
        <div className="mt-2 text-end">
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
