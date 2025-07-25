import React, { Suspense } from "react";

import ProductForm from "@/app/components/products/product-info";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const ProductEdit = ({ params }) => {
  const id = params.id;
  if (!id) {
    return redirect("/dashboard/products");
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderProductEdit id={id} />
    </Suspense>
  );
};

const RenderProductEdit = async ({ id }: { id: string }) => {
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: {
      images: true,
      category: true,
      brand: true,
    },
  });

  if (!product) {
    return redirect("/dashboard/products");
  }
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();

  return (
    <ProductForm brands={brands} product={product} categories={categories} />
  );
};

export default ProductEdit;
