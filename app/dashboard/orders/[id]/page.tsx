import React from "react";
import OrderDetails from "@/app/views/orders/OrderDetails";
import prisma from "@/lib/prisma";

const page = ({ params }) => {
  return <RenderOrderDetails id={params.id} />;
};

export default page;

const RenderOrderDetails = async ({ id }) => {
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      marketplace: true,
      customer: true,
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
      address: true,
    },
  });
  return <OrderDetails order={order} />;
};
