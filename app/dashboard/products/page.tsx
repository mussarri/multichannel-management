/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchProductsAction } from "@/app/action";
import { ProductTable } from "@/app/views/product/product-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>

        <Link href="/dashboard/products/new" className="">
          <Button variant={"default"}>{"Yeni Ürün Oluştur"}</Button>
        </Link>
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
