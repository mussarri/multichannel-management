/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense } from "react";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductCard from "@/app/components/products/product-card";

import ProductStatus from "@/app/views/product/product-info/product-status";
import ProductPreview from "@/app/views/product/product-info/product-preview";
import ProductImages from "@/app/views/product/product-info/product-images";
import ProductDescription from "@/app/views/product/product-info/product-description";
import Loading from "@/app/components/general/Loading";
import AddVariantSection from "@/app/components/products/AddVariantSection";
import VariantList from "@/app/components/products/VariantList";

export default function ProductEdit({ params }) {
  const { id } = params;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ürün Bilgileri</h2>
      <div className="max-w-[800px]">
        <Suspense fallback={<Loading />}>
          <ProductDetailsSection id={id} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <RenderVariants id={id} />
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <ProductPreview id={id} />
      </Suspense>
    </div>
  );
}

async function ProductDetailsSection({ id }: { id: string }) {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      is_active: true,
      description: true,
      category: true,
      title: true,
      sub_title: true,
      images: true,
      // ProductCard ihtiyaç duyuyorsa daha fazlasını ekle veya include kullan
    },
  });

  if (!product) {
    return redirect("/dashboard/products");
  }

  return (
    <>
      <ProductStatus id={product.id} isActive={product.is_active} />
      <ProductCard data={product} />
      <ProductDescription id={product.id} description={product.description} />
      <ProductImages id={product.id} images={product.images} />
    </>
  );
}

async function RenderVariants({ id }: { id: string }) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      variants: true,
    },
  });

  if (!data) {
    // İstersen redirect ya da fallback gösterebilirsin
    return <div className="p-4 text-red-600">Ürün bulunamadı.</div>;
  }

  const variants = data?.variants;

  return (
    <>
      {(!variants || (variants && variants.length < 1)) && (
        <AddVariantSection id={data.id} />
      )}

      {variants && variants.length > 0 && (
        <VariantList id={data.id} variants={variants} />
      )}
    </>
  );
}
