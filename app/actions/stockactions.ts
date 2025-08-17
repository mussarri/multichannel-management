/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStock(prevState: any, formData: FormData) {
  const quantity = parseInt(formData.get("quantity")?.toString());
  const warehouseId = parseInt(formData.get("warehouseId")?.toString());

  try {
    if (warehouseId === 0) {
      await prisma.product.update({
        where: {
          id: formData.get("productId")?.toString(),
        },
        data: {
          stock: quantity,
        },
      });
    } else {
      await prisma.warehouseStock.upsert({
        where: {
          warehouseId_productId: {
            warehouseId: formData.get("warehouseId")?.toString(),
            productId: formData.get("productId")?.toString(),
          },
        },
        update: {
          quantity: quantity,
        },
        create: {
          productId: formData.get("productId")?.toString(),
          warehouseId: formData.get("warehouseId")?.toString(),
          quantity: quantity,
        },
      });
      await prisma.product.update({
        where: {
          id: formData.get("productId")?.toString(),
        },
        data: {
          stock: quantity,
        },
      });
    }
    revalidatePath("dashboard/warehouses");
    return {
      success: true,
      message: "Depo başarıyla eklendi.",
    };
  } catch (error) {
    console.error("Server Action: Depo eklenirken hata oluştu");
    console.log(error);

    return {
      error: true,
      message: "Depo eklenirken bir hata oluştu",
    };
  }
}

export async function createWarehouse(prevState: any, formData: FormData) {
  const name = formData.get("name").toString();
  const address = formData.get("address").toString();
  try {
    await prisma.warehouse.create({
      data: {
        name: name,
        address: address,
      },
    });
    revalidatePath("dashboard/warehouses");
    return {
      success: true,
      message: "Depo başarıyla eklendi.",
    };
  } catch (error) {
    console.error("Server Action: Depo eklenirken hata oluştu");
    console.log(error);

    return {
      error: true,
      message: "Depo eklenirken bir hata oluştu",
    };
  }
}

export async function deleteWarehouse(prevState: any, formData: FormData) {
  const id = formData.get("warehouseId").toString();

  try {
    await prisma.warehouse.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("dashboard/warehouses");
    return {
      success: true,
      message: "Depo başarıyla silindi.",
    };
  } catch (error) {
    console.error("Server Action: Depo silinirken hata oluştu");
    console.log(error);

    return {
      error: true,
      message: "Depo silinirken bir hata oluştu",
    };
  }
}
