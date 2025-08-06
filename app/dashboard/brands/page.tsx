/* eslint-disable @typescript-eslint/no-unused-vars */
import { MarkaForm } from "@/app/components/products/marka-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Check, CircleX, Pencil, Trash2 } from "lucide-react";
import { tree } from "next/dist/build/templates/app-page";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="pb-10 overflow-x-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Markalar</h2>
        <MarkaForm />
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderBrands />
      </Suspense>
    </div>
  );
}

async function RenderBrands() {
  const data = await prisma.brand.findMany({
    include: {
      products: true,
    },
  });

  return (
    <div className="overflow-x-auto box   rounded-lg">
      {data.length > 0 && (
        <table className="min-w-full shadow-sm text-sm">
          <thead className="bg-inherit">
            <tr className="">
              <th className="text-left p-2 ">Adı</th>

              <th className="text-right p-2 ">Urun Sayisi</th>
              <th className="text-right p-2 ">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <tr
                key={category.id}
                className="border-4 rounded border-background bg-card hover:bg-muted/40"
              >
                <td className="p-2">{category.name}</td>

                <td className="p-2 text-right">{category.products.length}</td>
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

            {data.length === 0 && (
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
      )}
    </div>
  );
}
