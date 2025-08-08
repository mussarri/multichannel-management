import React from "react";
import OrderDetails from "@/app/views/orders/OrderDetails";
import prisma from "@/lib/prisma";

const page = ({ params }) => {
  const { id } = params;
  return <RenderOrderDetails id={id} />;
};

export default page;

const RenderOrderDetails = async ({ id }) => {
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });
  return <OrderDetails order={order} />;
};
