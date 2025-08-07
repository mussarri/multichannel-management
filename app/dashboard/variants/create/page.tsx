import React from "react";
import CategoryVariant from "@/app/components/products/category-variant";
import prisma from "@/lib/prisma";

const page = async ({ searchParams }) => {
  const { id } = await searchParams;

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      attributes: {
        include: {
          values: true,
        },
      },
    },
  });

  const marketplaces = await prisma.marketplaceAccount.findMany({
    include: {
      marketPlace: true,
    },
  });
  return <CategoryVariant category={category} marketplaces={marketplaces} />;
};

export default page;
