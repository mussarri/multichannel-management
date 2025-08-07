/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "@/lib/prisma";
import { getTrendyolProducts } from "@/lib/services/trendyolApiService";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import { mkdir, writeFile } from "fs/promises";
import path, { parse } from "path";
import fs from "fs/promises";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function register(prevState: any, formData: FormData) {
  console.log(formData);
  const name = formData.get("name").toString();
  const email = formData.get("email").toString();
  const password = formData.get("password").toString();
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
      },
    });
    if (user) {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
    } else {
      throw new Error("Kullanıcı oluşturulamadı.");
    }

    return {
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu.",
      data: user,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Kullanıcı oluşturulamadı.",
      error: error.message,
    };
  }
}
export async function setHepsiburadaStore(prevState: any, formData: FormData) {
  console.log(formData);
  return { success: true, message: "Ürün başarıyla eklendi." };
}

const deleteImages = async (deletedIds: string[], productId: string) => {
  const deletedImages = await prisma.productImage.findMany({
    where: {
      productId: productId,
      id: {
        in: deletedIds,
      },
    },
  });

  const deletedImagePaths = deletedImages.map((image) => image.url);

  for (const imagePath of deletedImagePaths) {
    const filePath = path.join(process.cwd(), "public", imagePath); // örn: public/uploads/image1.jpg
    await prisma.productImage.deleteMany({
      where: { id: { in: deletedIds } },
    });

    try {
      await fs.unlink(filePath);
      console.log("Silindi:", filePath);
    } catch (err) {
      console.error("Dosya silinemedi:", filePath, err);
    }

    // opsiyonel: veritabanından da sil
  }
};

export async function setTrendyolStore(prevState: any, formData: FormData) {
  console.log(formData);
  return { success: true, message: "Ürün başarıyla eklendi." };
}

export async function createTrendyolProductAction(formData) {
  const newProduct = {
    productName: formData.get("productName"),
    price: parseFloat(formData.get("price")),
    // Diğer form alanları...
  };

  try {
    // const result = await createTrendyolProduct(newProduct); // Trendyol API'ye fetch ile ürün ekle
    revalidatePath("/dashboard/products"); // Ürün listesi sayfasını yeniden doğrula
    return { success: true, message: "Ürün başarıyla eklendi." };
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

//product
export async function createProduct(prevState: any, formData: FormData) {
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
    salePrice: salePrice,
    listPrice: listPrice,
    costPrice: costPrice,
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
        variants: true,
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

export async function updateProductStatus(id: string, currentState: boolean) {
  try {
    const result = await prisma.product.update({
      where: { id },
      data: {
        is_active: !currentState,
      },
    });
    revalidatePath("/dashboard/products/" + id);
    return {
      success: true,
      message: "Ürün başarıyla güncellendi.",
      data: result.is_active,
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

export async function updateProductAction(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) throw new Error("Ürün ID belirtilmedi.");

  const is_default = formData.get("is_default").toString() === "true";
  const variants = JSON.parse(formData.get("variants").toString());

  const stock = parseInt(formData.get("stock") as string);
  const brandId = parseInt(formData.get("brandId") as string);
  const categoryId = parseInt(formData.get("categoryId") as string);
  const newImages = formData.getAll("images") as File[];

  const title = formData.get("title").toString();
  const name = formData.get("name").toString();
  const sub_title = formData.get("sub_title").toString();
  const description = formData.get("description").toString();
  const is_active = formData.get("is_active").toString() === "true";
  const barkod = formData.get("barkod").toString();
  const desi = parseFloat(formData.get("desi") as string);
  const salePrice = parseFloat(formData.get("salePrice").toString());
  const listPrice = parseFloat(formData.get("listPrice").toString());
  const costPrice = parseFloat(formData.get("costPrice").toString());
  const deletedIds = JSON.parse(formData.get("deletedIds").toString());

  try {
    const result = await prisma.product.update({
      where: { id },
      data: {
        name: name,
        title: title,
        sub_title: sub_title,
        barkod: barkod,
        desi: desi.toString(),
        description: description,
        salePrice: salePrice,
        listPrice: listPrice,
        costPrice: costPrice,
        stock: stock,
        is_active: is_active,
        slug: slugify(name),
        brand: {
          connect: {
            id: brandId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    if (deletedIds.length > 0) {
      await deleteImages(deletedIds, id);
    }

    for (const image of newImages) {
      console.log(image);

      if (image.size === 0) continue;
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${id}-${image.name}`;
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);

      const news = await prisma.productImage.create({
        data: {
          productId: id,
          url: fileName,
        },
      });
      console.log(news);
    }

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

//category
export async function createCategory(prevState: any, formData: FormData) {
  const name = formData.get("name").toString();
  const parentId = parseInt((formData.get("parentId") || "").toString());

  const newCategory = {
    name: name,
    slug: slugify(name),
    parentId: parentId || null,
  };

  try {
    const result = await prisma.category.create({
      data: newCategory,
    });
    revalidatePath("/dashboard/categories");
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
        MarketplaceProductMapping: true,
        variants: {
          include: {
            MarketplaceProductVariantMapping: true,
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

//attribute
export const saveAttributesForCategory = async (
  attributesData: [string, string[]],
  categoryId: number
) => {
  for (const [attributeName, values] of attributesData) {
    // 1. Attribute'u bul veya oluştur
    const attribute = await prisma.attribute.upsert({
      where: { slug: slugify(attributeName) },
      update: {},
      create: { name: attributeName, slug: slugify(attributeName) },
    });

    // 2. Attribute ile Category arasında bağlantıyı kur (çoktan çoğa)
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        attributes: {
          connect: [{ id: attribute.id }],
        },
      },
    });

    // 3. AttributeValue'ları tek tek oluştur (aynı value daha önce eklenmişse atla)
    for (const value of values) {
      await prisma.attributeValue.upsert({
        where: {
          attributeId_value: {
            attributeId: attribute.id,
            value: value,
          },
        },
        update: {},
        create: {
          attributeId: attribute.id,
          name: value,
          value: slugify(value),
        },
      });
    }
  }
};

export async function createOrUpdateAttributeWithValues(data) {
  const { attributeName, values, categoryId } = data;

  const slug = slugify(attributeName);

  return await prisma.$transaction(async (tx) => {
    // Attribute'ü upsert et
    const attribute = await tx.attribute.upsert({
      where: { slug },
      update: { name: attributeName },
      create: {
        name: attributeName,
        slug,
      },
    });

    // AttributeValue'ları upsert et
    const valueOps = values.map((val) =>
      tx.attributeValue.upsert({
        where: {
          attributeId_value: {
            value: val,
            attributeId: attribute.id,
          },
        },
        update: {},
        create: {
          name: val,
          value: val,
          attributeId: attribute.id,
        },
      })
    );
    await Promise.all(valueOps);

    // Attribute ile kategori arasındaki ilişkiyi kur
    await tx.attribute.update({
      where: { id: attribute.id },
      data: {
        category: {
          connect: { id: categoryId }, // mevcut kategoriyle ilişkilendir
        },
      },
    });

    return {
      success: true,
      attributeId: attribute.id,
    };
  });
}

export async function createAttributeAction(
  prevState: any,
  formData: FormData
) {
  const categoryId = parseInt(formData.get("categoryId").toString());
  const attributeName = formData.get("attributeName").toString();
  const values = JSON.parse(formData.get("values").toString());

  try {
    await createOrUpdateAttributeWithValues({
      attributeName,
      categoryId,
      values,
    });

    return { success: true, message: "Özellikler başarıyla eklendi." };
  } catch (error) {
    console.error("Server Action: Özellik eklenirken hata oluştu:", error);
    return {
      success: false,
      message: "Özellik eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}

export async function addValueToAttribute(prevState: any, formData: FormData) {
  const attributeId = parseInt(formData.get("attributeId").toString());
  const value = formData.get("attributeName").toString();

  try {
    const attribute = await prisma.attribute.findUnique({
      where: { id: attributeId },
    });

    if (!attribute) {
      return {
        error: true,
        message: "Özellik bulunamadı.",
      };
    }

    const newValue = await prisma.attributeValue.create({
      data: {
        attributeId: attributeId,
        name: value,
        value: slugify(value),
      },
    });

    revalidatePath("dashboard/categories");
    return {
      success: true,
      message: "Değer başarıyla eklendi.",
      data: newValue,
    };
  } catch (error) {
    console.error("Server Action: Özellik eklenirken hata oluştu");
    return {
      error: true,
      message: "Özellik eklenirken bir hata oluştu",
    };
  }
}

export async function deleteAttributeAction(
  prevState: any,
  formData: FormData
) {
  const id = formData.get("attributeId").toString();
  try {
    await prisma.attribute.delete({
      where: { id: parseInt(id) },
      include: {
        values: true,
        CategoryAttributeMapping: true,
      },
    });
    revalidatePath("dashboard/categories");
    return {
      success: true,
      message: "Özellik başarıyla silindi.",
    };
  } catch (error) {
    console.error("Server Action: Özellik silinirken hata oluştu");
    console.log(error);

    return {
      error: true,
      message: "Özellik silinirken bir hata oluştu",
    };
  }
}
