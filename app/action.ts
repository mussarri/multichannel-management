/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "@/lib/prisma";
import {
  createTrendyolProduct,
  getTrendyolProducts,
} from "@/lib/services/trendyolApiService";
import { slugify } from "@/lib/utils";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function createUser(formData: FormData) {
  console.log(formData);
}

export async function createTrendyolProductAction(formData) {
  const newProduct = {
    productName: formData.get("productName"),
    price: parseFloat(formData.get("price")),
    // Diğer form alanları...
  };

  try {
    const result = await createTrendyolProduct(newProduct); // Trendyol API'ye fetch ile ürün ekle
    revalidatePath("/dashboard/products"); // Ürün listesi sayfasını yeniden doğrula
    return { success: true, message: "Ürün başarıyla eklendi.", data: result };
  } catch (error) {
    console.error("Server Action: Ürün eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Ürün eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function fetchTrendyolProductsAction(params) {
  try {
    const products = await getTrendyolProducts(params); // Trendyol API'den fetch ile ürünleri çek
    return { success: true, data: products.content };
  } catch (error) {
    console.error("Server Action: Ürünler çekilirken hata:", error);
    return {
      success: false,
      message: "Ürünler alınamadı.",
      error: error.message,
    };
  }
}

export async function createProduct(prevState: any, formData: FormData) {
  const newProduct = formData as unknown as Product;
  try {
    const result = await prisma.product.create({
      data: newProduct,
    });
    revalidatePath("/dashboard/products");
    return { success: true, message: "Ürün başarıyla eklendi.", data: result };
  } catch (error) {
    console.error("Server Action: Ürün eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Ürün eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function createCategory(prevState: any, formData: FormData) {
  const name = formData.get("name").toString();
  const parentId = formData.get("parentId");
  const parent = await prisma.category.findUnique({
    where: { id: parseInt(parentId.toString()) },
  });

  const newCategory = {
    name: name,
    slug: slugify(name),
    parentId: parent.id || null,
  };

  try {
    const result = await prisma.category.create({
      data: newCategory,
    });
    revalidatePath("/dashboard/producst/categories");
    return {
      success: true,
      message: "Kategori başarıyla eklendi.",
      data: result,
    };
  } catch (error) {
    console.error("Server Action: Kategori eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Kategori eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function createBrand(prevState: any, formData: FormData) {
  const name = formData.get("name").toString();
  const newBrand = {
    name: name,
    slug: slugify(name),
  };

  try {
    const result = await prisma.brand.create({
      data: newBrand,
    });
    revalidatePath("/dashboard/producst/brands");
    return { success: true, message: "Marka başarıyla eklendi.", data: result };
  } catch (error) {
    console.error("Server Action: Marka eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Marka eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function fetchProductsAction() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
        variants: true,
      },
    }); // Trendyol API'den fetch ile ürünleri çek
    return { success: true, data: products };
  } catch (error) {
    console.error("Server Action: Ürünler çekilirken hata:", error);
    return {
      success: false,
      message: "Ürünler alınamadı.",
      error: error.message,
    };
  }
}

export async function updateProductAction(prevState: any, formData: FormData) {
  console.log(formData);
  const price = formData.get("price");
  const stock = formData.get("stock");
  console.log(price, stock);

  try {
    const result = await prisma.product.findFirst({
      where: {
        id: formData.get("id").toString(),
      },
      include: {
        variants: true,
      },
    });
    return {
      success: true,
      message: "Ürün başarıyla güncellendi.",
      data: result,
    };
  } catch (error) {
    console.error("Server Action: Ürün güncellenirken hata oluştu:", error);
    return {
      success: false,
      message: "Ürün güncellenirken bir hata oluştu.",
      error: error.message,
    };
  }
}
