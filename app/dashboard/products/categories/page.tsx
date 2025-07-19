import { Button } from "@/components/ui/button";
import { Check, CircleX, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
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
  const check = (value: boolean) => {
    return value ? (
      <Check color="green" size={16} />
    ) : (
      <CircleX color="red" size={16} />
    );
  };
  return (
    <div className="pb-10 overflow-x-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
        <Link href={"/dashboard/products/categories/new"}>
          {" "}
          <Button size={"sm"}>Yeni Kategory Ekle</Button>
        </Link>
      </div>
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
                  <button className="text-blue-600 hover:underline">
                    <Pencil size={16} />
                  </button>
                  <button className="text-red-600 hover:underline">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 text-muted-foreground"
                >
                  Aramanıza uygun ürün bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
