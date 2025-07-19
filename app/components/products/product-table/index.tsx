/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductForm } from "../product-add";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
};

export function ProductTable({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 box">
      <div className="flex items-center justify-between border-b pb-4 px-4">
        <Input
          placeholder="Ürün adıyla ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Link href="/dashboard/products/new" className="">
          <Button variant={"secondary"}>Yeni Ürün Oluştur</Button>
        </Link>
      </div>
      <div className="px-4">
        <div className="overflow-x-auto  border rounded-lg">
          <table className="min-w-full shadow-sm text-sm">
            <thead className="bg-inherit">
              <tr className="">
                <th className="text-left p-2 border-b"></th>
                <th className="text-left p-2 border-b">Adı</th>
                <th className="text-left p-2 border-b">SKU</th>
                <th className="text-left p-2 border-b">Fiyat</th>
                <th className="text-left p-2 border-b">Stok</th>
                <th className="text-right p-2 border-b">Platform Durumu</th>
                <th className="text-right p-2 border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/40">
                  <td className="p-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-md" />
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-2">{product.sku}</td>
                  <td className="p-2">{product.price.toLocaleString()} ₺</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2">{}</td>
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
    </div>
  );
}
