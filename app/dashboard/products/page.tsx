/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchProductsAction } from "@/app/action";
import { ProductTable } from "@/app/components/products/product-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="space-y-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>
        <div className="flex items-center justify-end p-4 gap-3">
          <Link href="/dashboard/products/new" className="">
            <Button variant={"secondary"}>{"Yeni Ürün Oluştur"}</Button>
          </Link>
        </div>
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
