/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PageCard from "@/app/components/general/PageCard";
import OrderActions from "./OrderActions";
import OrderCard from "@/app/components/orders/OrderCard";

const OrderDetails = ({ order }) => {
  return (
    <PageCard title={"Siparis Detaylari"}>
      <OrderCard order={order} />
      <OrderActions order={order} />
    </PageCard>
  );
};

export default OrderDetails;
