"use client";

import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  const mailSettings = [
    {
      label: "Servis Saglayici",
      placeholder: "SariWeb",
      name: "service_provider",
      type: "text",
      onChange: () => {},
      value: "",
      required: false,
    },
    {
      label: "Gönderim Yapılacak E-Posta Adresi",
      placeholder: "satici@saribilisim.com",
      name: "sender_email",
      type: "text",
      onChange: () => {},
      value: "",
      required: false,
    },
    {
      label: "Göderen Adı",
      placeholder: "Ali",
      name: "sender_name",
      type: "text",
      onChange: () => {},
      value: "",
      required: false,
    },
    {
      label: "Şifre",
      placeholder: "",
      name: "email_password",
      type: "text",
      onChange: () => {},
      value: "",
      required: false,
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-semibold">Mail Bilgileri</h2>
      <div className="flex flex-col max-w-lg gap-3 mt-2">
        {mailSettings.map((setting, index) => (
          <TextInput key={index} {...setting} error={false} vertical={false} />
        ))}
        <div className="mt-2 text-end">
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
