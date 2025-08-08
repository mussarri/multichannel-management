"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export default async function updateOrder(prev, formData) {
  const orderId = formData.get("orderId")?.toString() || "";
  const status = formData.get("status")?.toString() || "";
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
    });
    return {
      success: true,
      message: "Sipariş durumu güncellendi.",
      data: order,
    };
  } catch (error) {
    return {
      message: error?.message,
      error: true,
    };
  }
}
