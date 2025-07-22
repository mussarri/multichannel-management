/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Check, CircleX, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="pb-10 overflow-x-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Müşteriler</h2>
        <Link href={"/dashboard/customers/new"}>
          {" "}
          <Button size={"sm"}>Yeni Müşteri Ekle</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderCategories />
      </Suspense>
    </div>
  );
}

async function RenderCategories() {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  const data = await response.json();

  const check = (value: boolean) => {
    return value ? (
      <Check color="green" size={16} />
    ) : (
      <CircleX color="red" size={16} />
    );
  };
  const filtered = [
    {
      id: 1,
      name: "Elektronik",
      markets: ["n11", "gittigidiyor", "trendyol"],
      products: 10,
    },
    {
      id: 2,
      name: "Giyim",
      markets: ["n11", "gittigidiyor", "trendyol"],
      products: 1,
    },
    {
      id: 3,
      name: "Mobilya",
      markets: ["n11", "gittigidiyor"],
      products: 5,
    },
  ];

  return (
    <div className="overflow-x-auto   rounded-lg">
      <table className="min-w-full shadow-sm text-sm">
        <thead className="bg-inherit">
          <tr className="">
            <th className="text-left p-2 ">Adı</th>
            <th className="text-left p-2 ">N11</th>
            <th className="text-left p-2 ">Gittigidiyor</th>
            <th className="text-left p-2 ">Trendyol</th>
            <th className="text-center p-2 ">Urun Sayisi</th>
            <th className="text-right p-2 ">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((category) => (
            <tr
              key={category.id}
              className="border-4 rounded border-background bg-card hover:bg-muted/40"
            >
              <td className="p-2">{category.name}</td>
              <td className="p-2">
                {check(category.markets?.includes("n11"))}
              </td>
              <td className="p-2">
                {check(category.markets?.includes("gittigidiyor"))}
              </td>
              <td className="p-2">
                {check(category.markets?.includes("trendyol"))}
              </td>
              <td className="p-2 text-center">{category.products}</td>
              <td className="p-2 text-right space-x-2">
                <button>
                  <Pencil
                    size={16}
                    className="hover:scale-110 duration-200 hover:cursor-pointer"
                    color="var(--warning)"
                  />
                </button>
                <button>
                  <Trash2
                    size={16}
                    className="hover:scale-110 duration-200 hover:cursor-pointer"
                    color="var(--error)"
                  />
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-muted-foreground">
                Aramanıza uygun ürün bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
