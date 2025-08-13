import React, { Suspense } from "react";
import WarehouseTable from "@/app/views/warehouses/WarehousesTable";
import prisma from "@/lib/prisma";
import Loading from "@/app/components/general/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Depo Listesi</h1>
        <Link href={"/dashboard/warehouses/create"}>
          <Button>Yeni Depo Oluştur</Button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <RenderWarehousesTable />
      </Suspense>
    </div>
  );
};

export default Page;

const RenderWarehousesTable = async () => {
  const warehouses = await prisma.warehouse.findMany({
    include: {
      stocks: true,
    },
  });
  console.log(warehouses);

  if (!warehouses) {
    return <div>{"Hata!"}</div>;
  }

  return <WarehouseTable warehouses={warehouses} />;
};
