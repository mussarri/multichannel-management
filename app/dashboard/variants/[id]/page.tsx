/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import ProductVariant from "@/app/components/products/product-variant";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const New = ({ params }: { params: any }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderVariant params={params} />
    </Suspense>
  );
};

export default New;

async function RenderVariant({ params }: { params: any }) {
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      category: true,
      AttributeValues: {
        include: {
          attribute: true,
        },
      },
      variants: {
        include: {
          images: true,
          attributes: {
            include: {
              attribute: true,
            },
          },
        },
      },
    },
  });

  if (!product) return redirect("/dashboard/products");

  return <ProductVariant product={product} />;
}
