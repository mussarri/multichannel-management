/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { Suspense } from "react";

import prisma from "@/lib/prisma";
import OrdersTable from "@/app/views/orders/orders-table";
import Loading from "@/app/components/general/Loading";
import { OrderStatus, Status } from "@prisma/client";

const RenderOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      marketplace: true,
      address: true,

      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  return <OrdersTable orders={orders} />;
};

const New = ({ params }) => {
  console.log(params.id);
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Siparişler</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <RenderOrders />
      </Suspense>
    </div>
  );
};

export default New;
