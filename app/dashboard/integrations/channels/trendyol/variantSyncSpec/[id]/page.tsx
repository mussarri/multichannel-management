import ProductCard from "@/app/components/products/product-card";
import { Suspense } from "react";
import Form from "@/app/views/integrations/trendyol-integration/variantSynSpec";
import prisma from "@/lib/prisma";

export default function ProductsPage() {
  return (
    <div className="space-y-4 pb-10">
      <div className="justify-between flex max-w-[700px] w-full ">
        <h2 className="text-xl font-semibold mb-4">
          Trendyol Ürün Seçenek Değerleri Eşitleme
        </h2>
      </div>
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderProduct />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderForm />
        </Suspense>
      </>
    </div>
  );
}

async function RenderProduct() {
  const res = await fetch("https://api.escuelajs.co/api/v1/prod2ucts");
  const data = await res.json();
  const marketplaces = await prisma.marketplaceAccount.findMany({});

  return !data.error ? (
    <ProductCard marketplaces={marketplaces} data={data} />
  ) : (
    "no data"
  );
}

async function RenderForm() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await res.json();
  return <Form data={data} />;
}
