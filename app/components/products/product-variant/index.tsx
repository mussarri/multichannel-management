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
import Link from "next/link";

function cartesianProduct(arrays: string[][]): string[][] {
  return arrays.reduce<string[][]>(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]]
  );
}

const index = ({
  product,
  marketplaces,
  formData,
  setFormData,
}: {
  product: any;
  marketplaces: any;
  formData: any;
  setFormData: any;
}) => {
  const [attributes, setAttributes] = useState<any>([]);

  useEffect(() => {
    if (product.category.attributes.length > 0)
      setAttributes(
        product.category.attributes.map((item) => [
          item.name,
          item.values.map((value) => value.value),
        ])
      );
  }, []);

  const [selected, setSelected] = useState<{ [key: string]: string[] }>({});

  const handleToggle = (attribute: string, value: string) => {
    setSelected((prev) => {
      const current = prev[attribute] || [];
      const isSelected = current.includes(value);

      return {
        ...prev,
        [attribute]: isSelected
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleGenerate = () => {
    const selectedEntries = Object.entries(selected).filter(
      ([, v]) => v.length > 0
    );

    const selectedValuesOnly = selectedEntries.map(([, v]) => v);

    const combinations = cartesianProduct(selectedValuesOnly);
    return combinations;
  };

  const onClick = () => {
    const variants = handleGenerate();
    setFormData(
      variants.map((item: any) => ({
        variant_code: item.join("-"),
        barkod: product.barkod,
        sku: product.sku,
        stock: product.stock,
        desi: product.desi,
        title: product.title,
        salePrice: product.salePrice,
        listPrice: product.listPrice,
        costPrice: product.costPrice,
      }))
    );
  };

  return (
    <div>
      <div className="w-full my-10 overflow-x-auto border rounded-md">
        <div className="justify-start gap-2 items-center flex w-full p-4 bg-card border min-w-[750px] ">
          <h2 className="font-semibold text-md">
            {"Ürün Kategorisinin Secenekler Değerleri "}
            <Link
              href={"/dashboard/categories/" + product.category.id}
              className={"text-xs font-medium text-primary"}
            >
              (Duzenle)
            </Link>
          </h2>
        </div>
        {attributes?.length > 0 || (
          <p className="text-xs p-3">
            Ürünün kategorisinin seçeneği bulunamadı. Kategorinin secenek
            bilgisini düzenlemek için Kategori Ürün Seçeneği Ekle butonuna
            tıklayınız.
          </p>
        )}
        {attributes?.length > 0 && (
          <>
            <div className="w-full p-4 bg-card text-card-foreground min-w-[750px]">
              <div className="flex gap-3 mt-3">
                {attributes.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        id={item[0]}
                        className="flex flex-col gap-3 p-2 bg-secondary text-card-foreground rounded shadow-sm border min-w-[200px]"
                      >
                        <h3 className="capitalize text-xs">{item[0]}</h3>
                      </div>
                      <div className="max-h-[200px] overflow-y-auto">
                        {item[1].length > 0 && (
                          <table className="text-xs font-light w-full my-2 ">
                            <thead>
                              <tr className="">
                                <th className="text-left py-1">Seçenek</th>
                                <th className=""></th>
                              </tr>
                            </thead>
                            <tbody>
                              {item[1].map((value, index) => {
                                return (
                                  <tr key={index} className="mt-4">
                                    <th className="text-left font-light capitalize py-1">
                                      {value}
                                    </th>
                                    <th>
                                      <input
                                        type="checkbox"
                                        name={item[0]}
                                        checked={
                                          selected[item[0]]?.includes(value) ||
                                          false
                                        }
                                        onChange={() => {
                                          handleToggle(item[0], value);
                                        }}
                                      />
                                    </th>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-4">
                <Button type="button" variant="secondary" onClick={onClick}>
                  Varyantlari Oluştur
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
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
