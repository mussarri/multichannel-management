/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import TextInput from "@/app/components/settings/text-input";
import SelectInput from "@/app/components/settings/select-input";
import { countries, findCityId, il, ilce } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [form, setForm] = useState({
    city: "",
    district: "",
    country: "",
    company_name: "",
    sector: "",
    contact_person: "",
    phone: "",
    faks: "",
    tax_office: "",
    tax_number: "",
    commercial_register_number: "",
    mersis_no: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const settings = [
    {
      label: "Firma Adi",
      placeholder: "Sari Bilisim AS.",
      name: "company_name",
      value: form.company_name,
      onChange: (e: string) => {
        setForm({ ...form, company_name: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Hizmet Verdiginiz Sektor",
      placeholder: "Teknoloji",
      name: "sector",
      value: form.sector,
      onChange: (e: string) => {
        setForm({ ...form, sector: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Yetkili Kisi",
      placeholder: "Yetkili Kisi Adi",
      name: "contact_person",
      value: form.contact_person,
      onChange: (e: string) => {
        setForm({ ...form, contact_person: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Telefon",
      placeholder: "05555555555",
      name: "phone",
      value: form.phone,
      onChange: (e: string) => {
        setForm({ ...form, phone: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Faks",
      placeholder: "03123333332",
      name: "faks",
      value: form.faks,
      onChange: (e: string) => {
        setForm({ ...form, faks: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Vergi Dairesi",
      placeholder: "Atasehir",
      name: "tax_office",
      value: form.tax_office,
      onChange: (e: string) => {
        setForm({ ...form, tax_office: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Vergi Numarasi",
      placeholder: "2123412341234123",
      name: "tax_number",
      value: form.tax_number,
      onChange: (e: string) => {
        setForm({ ...form, tax_number: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Ticari Sicil No",
      placeholder: "-",
      name: "commercial_register_number",
      value: form.commercial_register_number,
      onChange: (e: string) => {
        setForm({ ...form, commercial_register_number: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Mersis No",
      placeholder: "123456",
      name: "mersis_no",
      value: form.mersis_no,
      onChange: (e: string) => {
        setForm({ ...form, mersis_no: e });
      },
      required: false,
      type: "",
    },
    {
      label: "E-posta",
      placeholder: "info@gmail.com",
      name: "email",
      value: form.email,
      onChange: (e: string) => {
        setForm({ ...form, email: e });
      },
      required: false,
      type: "",
    },
    {
      label: "Adres",
      placeholder: "Adres sok. cad. no:2",
      name: "address",
      value: form.address,
      onChange: (e: string) => {
        setForm({ ...form, address: e });
      },
      required: false,
      type: "textarea",
    },
  ];

  const select = [
    {
      label: "Ulke",
      placeholder: "Ulke",
      name: "country",
      value: form.country,
      onChange: (e: string) => {
        setForm({ ...form, country: e });
      },
      required: false,
      type: "select",
      options: countries(),
    },
    {
      label: "Sehir",
      placeholder: "Sehir",
      name: "city",
      value: form.city,
      options: il(),
      onChange: (e: string) => {
        setForm({ ...form, city: e });
      },
      required: false,
      type: "select",
    },
    {
      label: "Ilce",
      placeholder: "Ilce",
      name: "district",
      value: form.district,
      options: ilce(findCityId(form?.city).toString()),
      onChange: (e: string) => {
        setForm({ ...form, district: e });
      },
      required: false,
      type: "select",
    },
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="">
      <h2 className="text-xl font-semibold">Firma Bilgileri</h2>
      <div className="grid grid-cols-2 gap-2 gap-x-5 mt-2">
        {settings.map((item, idx) => (
          <TextInput
            label={item.label}
            placeholder={item.placeholder}
            name={item.name}
            value={item.value}
            onChange={item.onChange}
            required={item.required}
            type={item?.type || "text"}
            key={idx}
            error={false}
            vertical={false}
          />
        ))}
        {select.map((item, idx) => (
          <SelectInput
            label={item.label}
            name={item.name}
            onChange={item.onChange}
            required={item.required}
            key={idx}
            options={item.options}
          />
        ))}
      </div>
      <div className="mt-2 text-end">
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
}
