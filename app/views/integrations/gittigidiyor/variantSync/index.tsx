/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import SelectInput from "@/app/components/settings/select-input";
import { useParams } from "next/navigation";
import { Check, ListCheck, RefreshCcwIcon } from "lucide-react";
import Link from "next/link";

const Form = ({ data }: { data: any }) => {
  const [trendyolCategory, setTrendyolCategory] = useState("");
  const [smarthubProductAttributes, setSmarthubProductAttributes] = useState([
    { name: "materyal", trendyolAttribute: "" },
    { name: "malzeme cesidi", trendyolAttribute: "" },
  ]);
  const categoryResponse = {
    id: 411,
    name: "Casual Ayakkabı",
    displayName: "Casual Ayakkabı",
    categoryAttributes: [
      {
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
      },
      {
        categoryId: 411,
        attribute: {
          id: 207,
          name: "Malzeme Tipi",
        },
        required: false,
        allowCustom: false,
        varianter: false,
        slicer: false,
        attributeValues: [
          {
            id: 2214,
            name: "Hakiki",
          },
          {
            id: 2215,
            name: "Suni",
          },
        ],
      },
    ],
  };

  const { id: productId } = useParams();
  return (
    <>
      {" "}
      <div className="box p-4 w-full flex flex-col gap-2 relative items-start overflow-x-auto">
        <h2 className="font-semibold">Gittigidiyor Kategori Seçin</h2>
        <div className="w-full">
          <SelectInput
            label={""}
            name={"category"}
            options={["Ayakkabi", "Giyim"]}
            required={true}
            onChange={(e: string) => {
              setTrendyolCategory(e);
            }}
            vertical={true}
          />
        </div>
      </div>
      {trendyolCategory && (
        <div className="box p-4 w-full flex flex-col gap-2 relative items-start overflow-x-auto">
          <h2 className="font-semibold">Secenek Gruplarini Esitleyin</h2>
          <div className="w-full">
            <div
              className="text-sm rounded my-2 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              Bu kategoride
              {categoryResponse.categoryAttributes.map((item, index) => (
                <span className="font-semibold" key={index}>
                  {" " +
                    item.attribute.name +
                    (index < categoryResponse.categoryAttributes.length - 1
                      ? ", "
                      : "")}
                </span>
              ))}{" "}
              seçimi yapabilirsiniz.
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-[13px] font-medium text-left">
                  <th>Smarthub Seçenek Adı</th>
                  <th>Gittigidiyor Seçenek Adı</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {smarthubProductAttributes.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="capitalize">{item.name}</td>
                    <td className="p-1">
                      <div className="max-w-[250px]">
                        <SelectInput
                          options={categoryResponse.categoryAttributes.map(
                            (item) => item.attribute.name
                          )}
                          label={""}
                          name={"category"}
                          required={true}
                          onChange={(e: string) => {
                            setSmarthubProductAttributes((prev) =>
                              prev.map((item2) =>
                                item2.name === item.name
                                  ? { ...item2, trendyolAttribute: e }
                                  : item2
                              )
                            );
                          }}
                          vertical={true}
                        />
                      </div>
                    </td>
                    <td className="min-w-[200px] flex gap-2 itesm-center pt-2">
                      <button className="bg-primary text-primary-foreground flex gap-2 items-center p-2 px-3 rounded">
                        <Check size={15} color="white" />
                        Kaydet
                      </button>
                      {smarthubProductAttributes.find(
                        (item3) => item3.name === item.name
                      )?.trendyolAttribute && (
                        <>
                          <Link
                            href={
                              "/dashboard/integrations/trendyol/variantSyncSpec/" +
                              smarthubProductAttributes
                                .find((item3) => item3.name === item.name)
                                ?.trendyolAttribute.toLocaleLowerCase()
                                .split(" ")
                                .join("-") +
                              "/?productId=" +
                              productId
                            }
                            className="bg-primary text-primary-foreground flex gap-2 items-center p-2 px-3 rounded"
                          >
                            <ListCheck size={15} color="white" />
                            Secenekler
                          </Link>
                          <button className=" bg-red-500 text-primary-foreground flex gap-2 items-center p-2 px-3 rounded">
                            <RefreshCcwIcon size={15} color="white" />
                            Temizle
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
