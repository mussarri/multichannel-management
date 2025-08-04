/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import SelectInput from "@/app/components/settings/select-input";
import { Button } from "@/components/ui/button";

export default function VariantPage({ data }: { data: any }) {
  const [smartHubAttributeValues, setSmartHubAttributeValues] = useState([
    {
      id: 82,
      name: "Deri",
      trendyolValue: "",
    },
    {
      id: 85,
      name: "Hakiki Deri",
      trendyolValue: "Hakiki Deri",
    },
    {
      id: 105,
      name: "Suni Deri",
      trendyolValue: "",
    },
    {
      id: 107,
      name: "Süet",
      trendyolValue: "",
    },
  ]);

  const trendyolAttribute = {
    categoryId: 411,
    attribute: {
      id: 14,
      name: "Materyal",
    },
    required: false,
    allowCustom: false,
    varianter: false,
    slicer: false,
    attributeValues: [
      {
        id: 82,
        name: "Deri",
      },
      {
        id: 85,
        name: "Hakiki Deri",
      },
      {
        id: 105,
        name: "Suni Deri",
      },
      {
        id: 107,
        name: "Süet",
      },
      {
        id: 109,
        name: "Tekstil",
      },
      {
        id: 685,
        name: "Rugan",
      },
      {
        id: 715,
        name: "Nubuk",
      },
    ],
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      smartHubAttributeValues
        .map((item) => {
          return item.trendyolValue;
        })
        .some((item) => item === "")
    )
      console.log("Lütfen tüm alanları doldurun.");
    console.log(smartHubAttributeValues);
  };

  return (
    <form
      onSubmit={submitForm}
      className="box w-full flex flex-col relative items-start overflow-x-auto"
    >
      <h2 className="p-4 text-lg font-semibold w-full border-b pb-4">
        Secenek Değerlerini Eşitleyin
      </h2>
      <div className="p-4 pb-0 w-full">
        <table className="min-w-[420px] w-full mt-1">
          <thead>
            <tr className="text-[13px] font-medium text-left">
              <th>Smarthub Seçenek Değeri</th>
              <th>Trendyol Seçenek Değeri</th>
            </tr>
          </thead>
          <tbody>
            {smartHubAttributeValues.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="capitalize min-w-[150px]">{item.name}</td>
                <td className="p-1">
                  <div className="">
                    <SelectInput
                      options={trendyolAttribute.attributeValues.map(
                        (item) => item.name
                      )}
                      label={""}
                      name={"category"}
                      required={true}
                      value={item.trendyolValue}
                      onChange={(e: string) => {
                        setSmartHubAttributeValues((prev) =>
                          prev.map((item2, index) =>
                            item2.name === item.name
                              ? { ...item2, trendyolValue: e }
                              : item2
                          )
                        );
                      }}
                      vertical={true}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right w-full p-4">
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
}
