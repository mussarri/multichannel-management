"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import React from "react";

export const Toggle = ({
  label,
  name,
  onChange,
  value,
}: {
  label: string;
  name: string;
  onChange: () => void;
  value: boolean;
}) => {
  return (
    <label className="flex gap-2 items-center cursor-pointer min-h-[33px]">
      <span className="text-xs font-semibold text-gray-900 dark:text-gray-300 min-w-[200px]">
        {label}
      </span>
      :
      <div
        className={
          "relative w-11 h-6 rounded-full border shadow" +
          (value ? " bg-blue-200" : " bg-white ")
        }
      >
        <div
          className={
            "w-5 h-5 m-[1px] rounded-full  " +
            (value ? " translate-x-5 bg-blue-400" : " bg-blue-100 ")
          }
        ></div>
      </div>
      <input
        type="checkbox"
        value=""
        name={name}
        className="sr-only peer"
        onClick={() => {
          onChange();
        }}
      />
    </label>
  );
};

const Page = () => {
  const paymentSettings = [
    {
      label: "Kredi Karti Ödeme",
      name: "credit_card",
      type: "boolean",
    },
    {
      label: "Tek Seçim Seçeneği",
      name: "one_time_payment",
      type: "select",
      options: "",
    },
    {
      label: "Garanti Pay Ödeme",
      name: "garanti_pay",
      type: "boolean",
    },
    {
      label: "Havale Ödeme",
      name: "bank_transfer",
      type: "boolean",
    },
    {
      label: "Kapıda Ödeme",
      name: "on_site_payment",
      type: "boolean",
    },
    {
      label: "Kapıda Ödeme Alt Limiti",
      name: "on_site_payment_limit_lower",
      type: "text",
    },
    {
      label: "Kapıda Ödeme Üst Limiti",
      name: "on_site_payment_limit_upper",
      type: "text",
    },
    {
      label: "Varsayılan Parabirimi Kullan",
      name: "default_currency_use",
      type: "boolean",
    },
    {
      label: "Paypal Ödeme",
      name: "paypal_payment",
      type: "boolean",
    },
    {
      label: "Mail Order Ödeme",
      name: "mail_order_payment",
      type: "boolean",
    },
    {
      label: "Paypal E-posta",
      name: "paypal_email",
      type: "text",
    },
    {
      label: "Havale İndirim Yüzdesi",
      name: "bank_transfer_discount_percentage",
      type: "text",
    },
    {
      label: "Havale Parabirimi Koşul Aktif",
      name: "bank_transfer_currency_condition_active",
      type: "boolean",
    },
  ];

  return (
    <div className="px-4 max-w">
      <h2 className="text-xl font-semibold">Ödeme Ayarları</h2>
      <div className="flex flex-col max-w-md gap-2 gap-x-5 mt-2">
        {paymentSettings.map((setting, index) =>
          setting.type === "boolean" ? (
            <Toggle
              key={index}
              label={setting.label}
              name={setting.name}
              onChange={() => {}}
              value={true}
            />
          ) : (
            <TextInput
              label={setting.label}
              name={setting.name}
              type={setting.type}
              onChange={() => {}}
              value={""}
              placeholder=""
              required={false}
              key={index}
              error={false}
              vertical={false}
            ></TextInput>
          )
        )}
        <div className="mt-2 text-end">
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
