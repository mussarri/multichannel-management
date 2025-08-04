import ProductCard from "@/app/components/products/product-card";

import { Suspense } from "react";
import Form from "@/app/views/integrations/gittigidiyor/variantSync";

export default function ProductsPage() {
  return (
    <div className="space-y-4 pb-10">
      <div className="justify-between flex max-w-[700px] w-full ">
        <h2 className="text-xl font-semibold mb-4">
          Gittigidiyor Ürün Seçeneklerı Eşitleme
        </h2>
      </div>{" "}
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderProduct />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderVariants />
        </Suspense>
      </>
    </div>
  );
}

async function RenderVariants() {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await response.json();

  return <Form data={data} />;
}

async function RenderProduct() {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await response.json();
  return <ProductCard data={data} />;
}
