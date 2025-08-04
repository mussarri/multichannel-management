/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryList from "@/app/views/CategoryList";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { getTrendyolCategories } from "@/lib/services/trendyolApiService";
import { Check, CircleX, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="pb-10 overflow-x-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
        <Link href={"/dashboard/products/categories/new"}>
          {" "}
          <Button size={"sm"}>Yeni Kategory Ekle</Button>
        </Link>
      </div>
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

  console.log(data);

  return <CategoryList categories={data} marketplaces={marketplaces} />;
}
