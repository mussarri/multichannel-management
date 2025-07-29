/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { mkdir, writeFile } from "fs/promises";
import path, { parse } from "path";
import { randomUUID } from "crypto";
import { log } from "console";
import { redirect } from "next/navigation";

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
  console.log(formData);

  const title = formData.get("title").toString();
  const name = formData.get("name").toString();
  const sub_title = formData.get("sub_title").toString();
  const categoryId = parseInt(formData.get("categoryId").toString());
  const brandId = parseInt(formData.get("brandId").toString());
  const description = formData.get("description").toString();
  const is_active = formData.get("is_active").toString() === "true";
  const is_default = formData.get("is_default").toString() === "true";
  const desi = formData.get("desi").toString();
  const sku = formData.get("sku").toString();
  const barkod = formData.get("barkod").toString();
  const variants = JSON.parse(formData.get("variants").toString());
  const salePrice = parseFloat(formData.get("salePrice").toString());
  const listPrice = parseFloat(formData.get("listPrice").toString());
  const costPrice = parseFloat(formData.get("costPrice").toString());
  const stock = parseInt(formData.get("stock").toString());

  const newProduct = {
    title: title,
    sub_title: sub_title,
    description: description,
    is_active: false,
    desi: desi,
    barkod: barkod,
    price: salePrice,
    name: name,
    sku: sku,
    slug: slugify(name),
  };

  try {
    const product = await prisma.product.create({
      data: {
        ...newProduct,
        category: { connect: { id: categoryId } },
        brand: { connect: { id: brandId } },
      },
    });
    const images = formData.getAll("images") as File[];
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${product.id}-${image.name}`;
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);
      await prisma.product.update({
        where: { id: product.id },
        data: { images: { create: { url: fileName } } },
      });
      console.log("Yüklendi:", fileName);
    }

    if (variants.length > 0 || !is_default) {
      console.log(variants);
    } else {
      await prisma.productVariant.create({
        data: {
          sku: sku,
          barkod: barkod,
          productId: product.id,
          title: product.title,
          price: salePrice,
          description: description,
          stock: stock,
          is_default: true,
          is_active: false,
          variantPrices: {
            create: [
              {
                marketplaceId: 1,
                salePrice: salePrice,
                listPrice: listPrice,
                costPrice: costPrice,
              },
            ],
          },
        },
      });
    }

    revalidatePath("/dashboard/products");
    return {
      success: true,
      message: "Ürün başarıyla eklendi.",
      id: product.id,
    };
  } catch (error) {
    console.error("Server Action: Ürün eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Ürün eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function deleteProduct(prevState: any, formData: FormData) {
  const id = formData.get("id").toString();
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return {
      success: false,
      message: "Ürün bulunamadı.",
    };
  }

  try {
    await prisma.product.delete({
      where: { id: id },
      include: {
        images: true,
        variants: {
          include: {
            variantPrices: true,
            attributes: true,
            images: true,
          },
        },
      },
    });

    revalidatePath("/dashboard/products");
    return {
      success: true,
      message: "Ürün başarıyla silindi.",
    };
  } catch (error) {
    console.error("Server Action: Ürün silinirken hata oluştu:", error);
    return {
      success: false,
      message: "Ürün silinirken bir hata oluştu.",
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
        brand: true,
        variants: {
          include: {
            variantPrices: true,
            attributes: true,
            images: true,
          },
        },
      },
    });
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
  const id = formData.get("id") as string;

  if (!id) throw new Error("Ürün ID belirtilmedi.");

  const stock = parseInt(formData.get("stock") as string);
  const brandId = parseInt(formData.get("brand") as string);
  const categoryId = parseInt(formData.get("category") as string);
  const desi = parseFloat(formData.get("desi") as string);
  const files = formData.getAll("images") as File[];
  const title = formData.get("title").toString();
  const name = formData.get("name").toString();
  const sub_title = formData.get("sub_title").toString();
  const description = formData.get("description").toString();
  const is_active = formData.get("is_active").toString() === "true";
  const is_default = formData.get("is_default").toString() === "true";
  const model = formData.get("model").toString();
  const barkod = formData.get("barkod").toString();
  const variants = JSON.parse(formData.get("variants").toString());
  const salePrice = parseFloat(formData.get("salePrice").toString());
  const listPrice = parseFloat(formData.get("listPrice").toString());
  const costPrice = parseFloat(formData.get("costPrice").toString());

  const newProduct = {
    title: title,
    sub_title: sub_title,
    description: model,
    is_active: false,
    desi: desi,
    barkod: barkod,
    price: salePrice,
    name: name,
    slug: slugify(name),
  };

  console.log(newProduct);

  for (const file of files) {
    if (file.size === 0) continue;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    //generate filename for uploaded images
    //const fileName = Date.now() + "-" + file.name;
    //const filePath = path.join(process.cwd(), "public/uploads", fileName);
    //console.log(fileName);

    //await writeFile(filePath, buffer);

    // await prisma.productImage.create({
    //   data: {
    //     productId: id,
    //     url: `/uploads/${fileName}`,
    //   },
    // });
  }

  try {
    // const result = await prisma.product.update({
    //   where: { id },
    //   data: {
    //     title: title,
    //     sub_title: sub_title,
    //     description: model,
    //     is_active: false,
    //     desi: desi.toString(),
    //     barkod: barkod,
    //     price: salePrice,
    //     name: name,
    //     slug: slugify(name),
    //     brand: {
    //       connect: {
    //         id: brandId,
    //       },
    //     },
    //     category: {
    //       connect: {
    //         id: categoryId,
    //       },
    //     },
    //   },
    // });
    revalidatePath("/dashboard/products/" + id);
    return {
      success: true,
      message: "Ürün başarıyla güncellendi.",
      //data: result,
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

export async function createAttributeAction(
  prevState: any,
  formData: FormData
) {
  const name = formData.get("name").toString();
  const categoryId = parseInt(formData.get("categoryId").toString());

  const newAttribute = {
    name: name,
    slug: slugify(name),
    categoryId,
  };
  try {
    const result = await prisma.attribute.create({
      data: newAttribute,
    });
    revalidatePath("/dashboard/producst/attributes");
    return { success: true };
  } catch (error) {
    console.error("Server Action: Özellik eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Özellik eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function deleteVariants(prevState: any, formData: FormData) {
  const id = formData.get("id").toString();

  try {
    const variants = await prisma.productVariant.deleteMany({
      where: {
        is_default: false,
        productId: {
          notIn: [id],
        },
      },
    });
    return { success: true, data: "ok" };
  } catch (error) {
    return {
      success: false,
      message: "Ürünler alınamadı.",
      error: error.message,
    };
  }
}
export async function updateVariant(prevState: any, formData: FormData) {
  const id = formData.get("id").toString();

  try {
    const variants = await prisma.productVariant.deleteMany({
      where: {
        is_default: false,
        productId: {
          notIn: [id],
        },
      },
    });
    return { success: true, data: "ok" };
  } catch (error) {
    return {
      success: false,
      message: "Ürünler alınamadı.",
      error: error.message,
    };
  }
}
