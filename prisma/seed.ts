/* eslint-disable @typescript-eslint/no-unused-vars */
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
              create: [
                {
                  name: "Renk",
                  slug: "renk",
                },
                {
                  name: "Beden",
                  slug: "beden",
                },
              ],
            },
          },
          {
            name: "Kadın Elbise",
            slug: "kadin-elbise",
            attributes: {
              create: [
                {
                  name: "Renk",
                  slug: "renk",
                },
                {
                  name: "Beden",
                  slug: "beden",
                },
              ],
            },
          },
        ],
      },
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

  const nike = await prisma.brand.create({
    data: {
      name: "Nike",
      slug: "nike",
    },
  });

  const renkAttr = await prisma.attribute.create({
    data: {
      name: "Renk",
      slug: "renk",
      categoryId: giyim.id,
    },
  });

  const bedenAttr = await prisma.attribute.create({
    data: {
      name: "Beden",
      slug: "beden",
      categoryId: giyim.id,
    },
  });

  // 3. Ürün oluştur
  const product = await prisma.product.create({
    data: {
      title: "Basic Tişört",
      description: "Pamuklu kumaştan üretilmiş basic tişört.",
      brand: {
        connect: { id: nike.id },
      },
      price: 199.99,
      stock: 100,
      barkod: "1234567890",
      desi: "0.5",
      category: {
        connect: { id: giyim.id },
      },
    },
  });

  const [kirmizi, mavi, m, l] = await Promise.all([
    prisma.attributeValue.create({
      data: {
        value: "Kırmızı",
        attributeId: renkAttr.id,
        productId: product.id,
      },
    }),
    prisma.attributeValue.create({
      data: {
        value: "Mavi",
        attributeId: renkAttr.id,
        productId: product.id,
      },
    }),
    prisma.attributeValue.create({
      data: {
        value: "M",
        attributeId: bedenAttr.id,
        productId: product.id,
      },
    }),
    prisma.attributeValue.create({
      data: {
        value: "L",
        attributeId: bedenAttr.id,
        productId: product.id,
      },
    }),
  ]);

  await prisma.productVariant.createMany({
    data: [
      {
        title: "Basic Tişört Kirmizi",
        productId: product.id,
        price: 199.99,
        stock: 25,
        barkod: "VARIANT-KIRMIZI-M",
        sku: "sku-12mskujm",
        is_default: false,
        variant_code: "KIRMIZI-M",
        combination: {
          renk: "Kırmızı",
          beden: "M",
        },
      },
      {
        title: "Basic Tişört Mavi",
        productId: product.id,
        price: 199.99,
        stock: 25,
        barkod: "VARIANT-MAVI-L",
        sku: "sku-12msko3l",
        is_default: false,
        variant_code: "MAVI-L",
        combination: {
          renk: "Mavi",
          beden: "L",
        },
      },
    ],
  });

  const variants = await prisma.productVariant.findMany({
    where: { productId: product.id },
  });

  for (const variant of variants) {
    const comb = variant.combination;

    const relatedValues = await prisma.attributeValue.findMany({
      where: {
        productId: product.id,
        value: {
          in: Object.values(comb),
        },
      },
    });

    await prisma.productVariant.update({
      where: { id: variant.id },
      data: {
        attributes: {
          connect: relatedValues.map((val) => ({ id: val.id })),
        },
      },
    });
  }

  // 2. Ürün oluştur
  // const product22 = await prisma.product.create({
  //   data: {
  //     title: "Oversize Tişört",
  //     brand: "XYZ Marka",
  //     categoryId: giyim.id,
  //     description: "Geniş kesim rahat tişört",
  //     barkod: "1234567890123",
  //     desi: "1.5",
  //     price: 130.0,
  //     stock: 100,
  //     is_active: true,
  //     variants: {
  //       create: [
  //         {
  //           variant_code: "RED-M",
  //           stock: 30,
  //           price: 120.0,
  //           barkod: "1234567890124",
  //           sku: "SKU-REDOVERTEE-001",
  //           title: "Oversize Tişört Kirmizi",
  //           desi: "1.5",
  //           is_active: true,
  //           combination: [
  //             { attribute: "renk", values: "Kirmizi" },
  //             { attribute: "beden", values: "M" },
  //           ],
  //           sources: {
  //             create: [
  //               {
  //                 source: "trendyol",
  //                 externalId: "trendyol-1001",
  //                 price: 119.0,
  //                 stock: 25,
  //                 is_active: true,
  //               },
  //               {
  //                 source: "n11",
  //                 externalId: "n11-5001",
  //                 price: 118.5,
  //                 stock: 20,
  //                 is_active: true,
  //               },
  //             ],
  //           },
  //           images: {
  //             create: [
  //               {
  //                 url: "https://i.imgur.com/QkIa5tT.jpeg",
  //                 alt: "Kırmızı Tişört M Beden - Ön",
  //                 order: 0,
  //               },
  //             ],
  //           },
  //           attributes: {
  //             create: [
  //               {
  //                 value: "mavi",
  //                 attribute: {
  //                   create: {
  //                     name: "renk",
  //                   },
  //                 },
  //               },
  //               {
  //                 value: "kirmizi",
  //               },
  //               {
  //                 value: "beyaz",
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           variant_code: "BLUE-L",
  //           stock: 40,
  //           price: 130.0,
  //           title: "Oversize Tişört Mavi",
  //           sku: "SKU-BLUEOVERTEE-001",
  //           barkod: "1234567890125",
  //           desi: "1.5",
  //           is_active: true,
  //           combination: [
  //             { attribute: "renk", values: "Mavi" },
  //             { attribute: "beden", values: "L" },
  //           ],
  //           sources: {
  //             create: [
  //               {
  //                 source: "trendyol",
  //                 externalId: "trendyol-1002",
  //                 price: 129.0,
  //                 stock: 35,
  //                 is_active: true,
  //               },
  //             ],
  //           },
  //           images: {
  //             create: [
  //               {
  //                 url: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //                 alt: "Mavi Tişört L Beden - Ön",
  //                 order: 0,
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //     images: {
  //       create: [
  //         {
  //           url: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //           alt: "Oversize Tişört Genel Görsel 1",
  //           order: 0,
  //         },
  //       ],
  //     },
  //   },
  // });

  const ttk = await prisma.brand.create({
    data: {
      name: "Alfa Yayinlari",
      slug: "alfa-yayinlari",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: "Nutuk",
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
      price: 100.0,
      is_active: true,
      variants: {
        create: [
          {
            title: "Standart",
            price: 99.9,
            stock: 120,
            sku: "NUTUK-V11",
            barkod: "9789751604037",
            is_default: true,
            sources: {
              create: [
                {
                  source: "trendyol",
                  externalId: "trendyol-1001",
                  price: 119.0,
                  stock: 25,
                  is_active: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

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
