/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryList from "@/app/views/CategoryList";
import prisma from "@/lib/prisma";
 
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="pb-10 overflow-x-auto">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderCategories />
      </Suspense>
    </div>
  );
}

async function RenderCategories() {
  const data = await prisma.category.findMany({
    include: {
      products: true,
      MarketplaceCategoryMapping: true,
    },
  });

  const marketplaces = await prisma.marketplaceAccount.findMany({
    include: {
      marketPlace: true,
    },
  });

  return <CategoryList categories={data} marketplaces={marketplaces} />;
}
