"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import SelectInput from "@/app/components/settings/select-input";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";

export default function ProductsPage() {
  const { id: categoryOptionId } = useParams();
  const productId = useSearchParams().get("id");

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

  const mobile = useMediaQuery("(max-width: 500px)");

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
    <div className="space-y-4 pb-10">
      <div className="justify-between flex max-w-[700px] w-full ">
        <h2 className="text-xl font-semibold mb-4">
          Trendyol Ürün Seçenek Değerleri Eşitleme
        </h2>
      </div>
      <div
        className={
          "flex frelative overflow-x-auto" +
          (mobile
            ? " bg-card rounded border flex-col items-start"
            : " box items-center gap-5  p-3")
        }
      >
        <div
          className={
            "flex flex-1   h-full items-start  " +
            (mobile ? " border-b flex-col w-full" : " ")
          }
        >
          <div
            className={
              "min-w-[150px] " + (mobile ? " w-full p-2 border-b" : " ")
            }
          >
            <div className="bg-slate-500 rounded w-[50px] h-[50px]"></div>
          </div>
          <div
            className={
              "flex items-start text-sm " +
              (mobile ? " p-2 border-b flex-col gap-2" : "gap-5")
            }
          >
            <div className="w-max py-1">
              <p className="text-foreground font-semibold text-[13px]">
                Urun Adi
              </p>
              <span className="text-xs text-secondary-foreground">
                Apple Macbook Pro M4 Pro 24GB RAM 512GB SSD
              </span>
            </div>
            <div className="w-max">
              <p className="text-foreground font-semibold text-[13px]">
                Urun Kodu
              </p>
              <span className="text-xs text-secondary-foreground">
                hl-29jdm1
              </span>
            </div>
          </div>
        </div>
        <div className={"flex gap-2 " + (mobile ? " p-2 border-b " : "")}>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}
