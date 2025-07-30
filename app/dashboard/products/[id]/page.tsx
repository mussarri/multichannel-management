import React, { Suspense } from "react";

import ProductForm from "@/app/components/products/product-info";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const ProductEdit = async ({ params }) => {
  const { id } = await params;

  if (!id) {
    return redirect("/dashboard/products");
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderProductInfo id={id} />
      </Suspense>
    </>
  );
};

const RenderProductInfo = async ({ id }: { id: string }) => {
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: {
      images: true,
      category: true,
      brand: true,
      variants: {
        include: {
          attributes: {
            include: {
              attribute: {
                include: {
                  values: true,
                },
              },
            },
          },
          variantPrices: true,
        },
      },
    },
  });

  if (!product) {
    return redirect("/dashboard/products");
  }

  return <ProductForm product={product} />;
};

export default ProductEdit;
