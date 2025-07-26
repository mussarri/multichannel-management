/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchProductsAction } from "@/app/action";
import { ProductTable } from "@/app/components/products/product-table";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="space-y-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderProducts />
      </Suspense>
    </div>
  );
}

async function RenderProducts() {
  const response = await fetchProductsAction();
  const data = response.data;
  if (response?.error) {
    return <div>{response?.message}.</div>;
  }

  const initialProducts = [
    {
      id: "",
      categoryId: "Apple Iphone 13 256 GB",
      title: "",
      sub_title: "",
      description: "",
      stock: "",
      stock_code: "PHN-123",
      brand: "42",
      is_active: true,
      barkod: "",
      price: "7999",
      desi: "",
    },
  ];

  return <ProductTable products={data} />;
}
