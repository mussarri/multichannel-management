/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import ProductVariant from "@/app/views/product/product-info/variant-table-edit";
import VariantCreate from "@/app/views/product/product-info/variant-settings-edit";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Loading from "@/app/components/general/Loading";

const New = ({ params }: { params: any }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RenderVariant params={params} />
      </Suspense>
    </>
  );
};

export default New;

async function RenderVariant({ params }: { params: any }) {
  const product = await prisma.product.findFirst({
    where: {
      id: await params.id,
    },
    include: {
      images: true,
      category: {
        include: {
          attributes: {
            include: {
              values: true,
            },
          },
        },
      },
      AttributeValues: {
        include: {
          attribute: true,
        },
      },
      variants: {
        include: {
          images: true,
          attributeValues: {
            include: {
              attribute: true,
            },
          },
        },
      },
    },
  });
  const marketplaces = await prisma.marketplaceAccount.findMany({
    include: {
      marketPlace: true,
    },
  });

  if (!product) return redirect("/dashboard/products");

  return (
    <ProductVariant
      variants={product.variants}
      product={product}
      marketplaces={marketplaces}
    />
  );
}
