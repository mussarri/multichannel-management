/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchProductsAction } from "@/app/action";
import { ProductTable } from "@/app/components/products/product-table";
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

  return <ProductTable products={data} />;
}
