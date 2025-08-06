/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextInput from "@/app/components/settings/text-input";
import CheckBox from "@/app/components/settings/checkbox";
import VariantTable from "@/app/components/products/variant-table";
import React, { useEffect, useState } from "react";
import { Circle, CirclePlusIcon, Trash2 } from "lucide-react";
import ProductCard from "@/app/components/products/product-card";

const index = ({
  product,
  marketplaces,
}: {
  product: any;
  marketplaces: any;
}) => {
  const [open, setOpen] = useState(false);
  const [option, setoption] = useState("");
  const [attInputs, setAttributesInput] = useState({});
  const [optionList, setOptionList] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any>([]);
  const [variants, setVariants] = useState<any[]>();

  useEffect(() => {
    const grouped: { [key: string]: string[] } = {};

    for (const attrVal of product.AttributeValues) {
      const key = attrVal.attribute.name;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      if (!grouped[key].includes(attrVal.value)) {
        grouped[key].push(attrVal.value);
      }
    }
    setAttributes(Object.entries(grouped));
    const emptyObj = Object.fromEntries(
      Object.keys(grouped).map((key) => [key, ""])
    );
    setAttributesInput(emptyObj);
  }, [product]);

  useEffect(() => {
    setOptionList(product.category.attributes);
    if (product.category.attributes.length > 0)
      setAttributes(
        product.category.attributes.map((item) => [
          item.name,
          item.values.map((i) => i.value),
        ])
      );
  }, [product]);

  function generateCombinations(variants, index = 0, current = {}) {
    if (index === variants.length) {
      return [
        {
          ...current,
          variant: Object.values(current).join("-"),
        },
      ];
    }

    const [key, values] = variants[index];
    const results = [];

    values.forEach((value) => {
      results.push(
        ...generateCombinations(variants, index + 1, {
          ...current,
          [key]: value,
        })
      );
    });

    return results;
  }

  const result = generateCombinations(attributes);

  return (
    <div>
      <div className="w-full my-10 overflow-x-auto border rounded-md">
        <div className="justify-between flex w-full p-4 bg-card border min-w-[750px] ">
          <h2 className="text-lg font-semibold">
            Ürün Kategorisi Seçenek Gruplari
          </h2>
        </div>
        {optionList?.length > 0 || (
          <p className="text-xs p-3">
            Ürünün kategorisinin seçeneği bulunamadı. Kategorinin secenek
            bilgisini düzenlemek için Kategori Ürün Seçeneği Ekle butonuna
            tıklayınız.
          </p>
        )}
        {optionList?.length > 0 && (
          <div className="w-full p-4 bg-card text-card-foreground min-w-[750px]">
            <h2 className="text-md font-semibold mb-4">
              Seçenek Gruplari Liste
            </h2>

            <div className="flex gap-3">
              <div className="flex gap-3">
                {optionList
                  .filter((i) => i.name !== "")
                  .map((item, index) => (
                    <div key={index} className="">
                      <CheckBox
                        label={item.name}
                        value={false}
                        name="secenek"
                        onChange={() => {
                          setOptionList((prevOptions) =>
                            prevOptions.map((option) =>
                              option.name === item.name
                                ? { ...option, active: !option.active }
                                : option
                            )
                          );
                        }}
                        checked={item.active}
                        required
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              {attributes.map((item, index) => (
                <div key={index}>
                  <form
                    id={item[0]}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAttributes((prev) =>
                        prev.map((att) => {
                          return att[0] === item[0]
                            ? [att[0], [...att[1], attInputs[item[0]]]]
                            : att;
                        })
                      );
                    }}
                    className="flex flex-col gap-3 p-2 bg-secondary text-card-foreground rounded shadow-sm border min-w-[200px]"
                  >
                    <h3 className="capitalize text-xs">{item[0]}</h3>
                  </form>
                  <div className="max-h-[200px] overflow-y-auto">
                    {item[1] && (
                      <table className="text-xs font-light w-full my-2 ">
                        <thead>
                          <tr className="">
                            <th className="text-left py-1">Seçenek</th>
                            <th className="">Sil</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(item[1] as string[]).map((value, index) => (
                            <tr key={index} className="mt-4">
                              <th className="text-left font-light capitalize py-1">
                                {value}
                              </th>
                              <th>
                                <button
                                  className="text-xs rounded text-red-500 hover:scale-110 transition-all duration-300"
                                  onClick={() => {
                                    setAttributes((prev) =>
                                      prev.map((att) => {
                                        return att[0] === item[0]
                                          ? [
                                              att[0],
                                              att[1].filter((v) => v !== value),
                                            ]
                                          : att;
                                      })
                                    );
                                  }}
                                >
                                  <Trash2 size={13} color="red" />
                                </button>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {optionList?.length > 0 && (
          <div className="p-4 text-right bg-card gap-4">
            <Button onClick={() => setVariants(attributes)}>Oluştur</Button>
          </div>
        )}
      </div>

      {variants && variants.length > 0 && (
        <VariantTable
          attributes={variants}
          product={product}
          marketplaces={marketplaces}
        />
      )}
    </div>
  );
};

export default index;
{
  /* <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Yeni Ürün Seçeneği Ekle</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Ürün Seçeneği Ekle</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <input
                  type="hidden"
                  name="categoryId"
                  id=""
                  value={product.category.id}
                />
                <TextInput
                  name="name"
                  label="Ürün Seçeneği"
                  error={false}
                  type="text"
                  vertical={true}
                  required={true}
                  placeholder="Ürün Seçeneği"
                  value={option}
                  onChange={(e) => {
                    setoption(e);
                  }}
                />

                <div className="flex justify-end">
                  <Button type="submit">Kaydet</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog> */
}
