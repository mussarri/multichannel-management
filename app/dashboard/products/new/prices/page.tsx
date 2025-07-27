/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { Suspense } from "react";

import ProductForm from "@/app/components/products/product-add";
import prisma from "@/lib/prisma";

const RenderProductAdd = async () => {
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  return <ProductForm categories={categories || []} brands={brands || []} />;
};

const New = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderProductAdd />
    </Suspense>
  );
};

export default New;
