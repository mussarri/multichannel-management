"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateOrder(prev, formData) {
  const orderId = formData.get("orderId")?.toString() || "";
  const status = formData.get("status")?.toString() || "";

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus[status] },
    });
    revalidatePath("/dashboard/orders/" + orderId);
    return {
      success: true,
      message: "Sipariş durumu güncellendi.",
      data: order,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Sipariş durumu güncellenirken hata olustu.",
      error: true,
    };
  }
}

export async function addNoteToOrder(prev, formData) {
  const orderId = formData.get("orderId")?.toString() || "";
  const note = formData.get("note")?.toString() || "";

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { note },
    });
    revalidatePath("/dashboard/orders/" + orderId);
    return {
      success: true,
      message: "Sipariş notu güncellendi.",
      data: order,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Sipariş notu güncellenirken hata olustu.",
      error: true,
    };
  }
}

