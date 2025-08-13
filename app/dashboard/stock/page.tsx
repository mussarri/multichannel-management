import prisma from "@/lib/prisma";

import React, { Suspense } from "react";
import StocksTable from "@/app/views/stock/StocksTable";

export default function StocksPage() {
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderStocks />
      </Suspense>
    </div>
  );
}

async function RenderStocks() {
  const data = await prisma.product.findMany({
    include: {
      WarehouseStock: {
        include: {
          warehouse: true,
        },
      },
      variants: true,
    },
  });
  const warehouses = await prisma.warehouse.findMany();

  if (!data) {
    return <div>{"Hata!"}</div>;
  }

  return <StocksTable products={data} warehouses={warehouses} />;
}
