import Loading from "@/app/components/general/Loading";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import WarehouseId from "@/app/views/warehouses/WarehouseId";
const Page = ({ params }) => {
  return (
    <div className="overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <RenderWarehousesTable id={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;

const RenderWarehousesTable = async ({ id }) => {
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
  const stocks = await prisma.warehouseStock.findMany({
    where: {
      warehouseId: id,
    },
    include: {
      product: true,
      warehouse: true,
    },
  });

  return <WarehouseId stocks={stocks} products={data} warehouseId={id} />;
};
