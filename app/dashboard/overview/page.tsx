/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense } from "react";
import Overview from "@/app/views/dashboard/Overview";
import prisma from "@/lib/prisma";

const Page = () => {
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Ürünler</h1>
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderDashboard />
      </Suspense>
    </div>
  );
};

export default Page;

const RenderDashboard = async () => {
  const orders = await prisma.order.findMany({});

  return <Overview orders={orders} />;
};
