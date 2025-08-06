/* eslint-disable @typescript-eslint/no-unused-vars */
import { slugify } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

async function main() {
  // 1. Kategori oluştur

  const kitap = await prisma.category.create({
    data: {
      name: "Kitap",
      slug: "kitap",
    },
  });

  const trendyol = await prisma.marketplace.create({
    data: {
      name: "Trendyol",
      slug: slugify("trendyol"),
    },
  });

  const kitapCategory = await prisma.category.upsert({
    where: { slug: "kitap" },
    update: {},
    create: {
      name: "Kitap",
      slug: "kitap",
    },
  });
  const renkAttr = await prisma.attribute.create({
    data: {
      name: "Renk",
      slug: "renk",
    },
  });

  const bedenAttr = await prisma.attribute.create({
    data: {
      name: "Beden",
      slug: "beden",
    },
  });

  /*
  const giyim = await prisma.category.upsert({
    where: { slug: "giyim" },
    update: {},
    create: {
      name: "Giyim",
      slug: "giyim",
      children: {
        create: [
          {
            name: "Erkek Tişört",
            slug: "erkek-tisort",
            attributes: {
              connect: [
                {
                  id: bedenAttr.id,
                },
                {
                  id: renkAttr.id,
                },
              ],
            },
          },
          {
            name: "Kadın Elbise",
            slug: "kadin-elbise",
            attributes: {
              connect: [
                {
                  id: bedenAttr.id,
                },
                {
                  id: renkAttr.id,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const nike = await prisma.brand.create({
    data: {
      name: "Nike",
      slug: "nike",
    },
  });

  // 3. Ürün oluştur
  const product = await prisma.product.create({
    data: {
      title: "Basic Tişört",
      name: "Basic Tişört",
      slug: "basic-tshirt",
      description: "Pamuklu kumaştan üretilmiş basic tişört.",
      brand: {
        connect: { id: nike.id },
      },
      salePrice: 199.99,
      stock: 100,
      barkod: "1234567890",
      desi: "0.5",
      is_active: false,
      category: {
        connect: { id: giyim.id },
      },
    },
  });

  const [kirmizi, mavi, m, l] = await Promise.all([
    prisma.attributeValue.create({
      data: {
        value: "kirmizi",
        name: "Kırmızı",
        attributeId: renkAttr.id,
      },
    }),
    prisma.attributeValue.create({
      data: {
        value: "mavi",
        name: "Mavi",
        attributeId: renkAttr.id,
      },
    }),
    prisma.attributeValue.create({
      data: {
        value: "medium",
        name: "M",
        attributeId: bedenAttr.id,
      },
    }),
    prisma.attributeValue.create({
      data: {
        value: "large",
        name: "L",
        attributeId: bedenAttr.id,
      },
    }),
  ]);

  await prisma.productVariant.createMany({
    data: [
      {
        title: "Basic Tişört Kirmizi",
        productId: product.id,
        salePrice: 199.99,
        listPrice: 149.99,
        stock: 25,
        barkod: "VARIANT-KIRMIZI-M",
        sku: "sku-12msk-KIRMIZI-M",
        is_default: false,
        variant_code: "KIRMIZI-M",

        combination: {
          renk: {
            connect: {
              id: kirmizi.id,
            },
          },
          beden: {
            connect: {
              id: l.id,
            },
          },
        },
      },
      {
        title: "Basic Tişört Mavi",
        productId: product.id,
        salePrice: 199.99,
        listPrice: 149.99,
        stock: 25,
        barkod: "VARIANT-MAVI-L",
        sku: "sku-12msk-MAVI-L",
        is_default: false,
        variant_code: "MAVI-L",
        combination: {
          renk: {
            connect: {
              id: mavi.id,
            },
          },
          beden: {
            connect: {
              id: m.id,
            },
          },
        },
      },
    ],
  });

  const variants = await prisma.productVariant.findMany({
    where: { productId: product.id },
  });

  

  2. Ürün oluştur
  const product22 = await prisma.product.create({
    data: {
      title: "Oversize Tişört",
      brand: "XYZ Marka",
      categoryId: giyim.id,
      description: "Geniş kesim rahat tişört",
      barkod: "1234567890123",
      desi: "1.5",
      price: 130.0,
      stock: 100,
      is_active: true,
      variants: {
        create: [
          {
            variant_code: "RED-M",
            stock: 30,
            price: 120.0,
            barkod: "1234567890124",
            sku: "SKU-REDOVERTEE-001",
            title: "Oversize Tişört Kirmizi",
            desi: "1.5",
            is_active: true,
            combination: [
              { attribute: "renk", values: "Kirmizi" },
              { attribute: "beden", values: "M" },
            ],
            sources: {
              create: [
                {
                  source: "trendyol",
                  externalId: "trendyol-1001",
                  price: 119.0,
                  stock: 25,
                  is_active: true,
                },
                {
                  source: "n11",
                  externalId: "n11-5001",
                  price: 118.5,
                  stock: 20,
                  is_active: true,
                },
              ],
            },
            images: {
              create: [
                {
                  url: "https://i.imgur.com/QkIa5tT.jpeg",
                  alt: "Kırmızı Tişört M Beden - Ön",
                  order: 0,
                },
              ],
            },
            attributes: {
              create: [
                {
                  value: "mavi",
                  attribute: {
                    create: {
                      name: "renk",
                    },
                  },
                },
                {
                  value: "kirmizi",
                },
                {
                  value: "beyaz",
                },
              ],
            },
          },
          {
            variant_code: "BLUE-L",
            stock: 40,
            price: 130.0,
            title: "Oversize Tişört Mavi",
            sku: "SKU-BLUEOVERTEE-001",
            barkod: "1234567890125",
            desi: "1.5",
            is_active: true,
            combination: [
              { attribute: "renk", values: "Mavi" },
              { attribute: "beden", values: "L" },
            ],
            sources: {
              create: [
                {
                  source: "trendyol",
                  externalId: "trendyol-1002",
                  price: 129.0,
                  stock: 35,
                  is_active: true,
                },
              ],
            },
            images: {
              create: [
                {
                  url: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
                  alt: "Mavi Tişört L Beden - Ön",
                  order: 0,
                },
              ],
            },
          },
        ],
      },
      images: {
        create: [
          {
            url: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
            alt: "Oversize Tişört Genel Görsel 1",
            order: 0,
          },
        ],
      },
    },
  });

  const ttk = await prisma.brand.create({
    data: {
      name: "Alfa Yayinlari",
      slug: "alfa-yayinlari",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: "Nutuk",
      name: "Nutuk",
      slug: "nutuk",
      sub_title: "Mustafa Kemal Atatürk",
      description:
        "Atatürk’ün 1919-1927 yılları arasındaki olayları anlattığı eseri.",
      category: {
        connect: { id: kitapCategory.id },
      },
      brand: {
        connect: { id: ttk.id },
      },
      barkod: "9789751604037",
      desi: "1.2",
      stock: 11,
      salePrice: 100.0,
      listPrice: 50,
      is_active: false,
      sku: "NUTUK-V11",
    },
  });

  */
  console.log("Seed işlemi tamamlandı!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
