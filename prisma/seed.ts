/* eslint-disable @typescript-eslint/no-unused-vars */
import { slugify } from "@/lib/utils";
import { OrderStatus, PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

async function main() {
  // 1. Kategori oluştur

  const array = [
    "trendyol",
    "amazon",
    "gittigidiyor",
    "n11",
    "hepsiburada",
    "ciceksepeti",
  ];

  await prisma.marketplace.createMany({
    data: array.map((item) => ({
      name: item,
      slug: slugify(item),
    })),
  });

  const customer = await prisma.customer.create({
    data: {
      name: "ahmet",
      email: "ahmet@gmail.com",
    },
  });

  const marketplace = await prisma.marketplace.findFirst({});

  const product = await prisma.product.create({
    data: {
      name: "samsung telefon",
      slug: "samsung-telefon",
      description: "iyi bir telefon",
      salePrice: 1000,
      listPrice: 1000,
      sku: "",
      desi: 1,
      barkod: "",
      category: {
        create: {
          name: "telefon",
          slug: "telefon",
        },
      },
      brand: {
        create: {
          name: "samsung",
          slug: "samsung",
        },
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: "123456",
      status: OrderStatus.PENDING,
      orderDate: new Date(),
      customer: {
        connect: {
          id: customer.id,
        },
      },
      marketplace: {
        connect: {
          id: marketplace.id,
        },
      },
      address: {
        create: {
          name: "siparis adresi",
          addressDetail: " istanbul merkez",
          city: "istanbul",
          town: "merkez",
        },
      },
      totalPrice: 1200.2,
      orderItems: {
        create: [
          {
            name: "telefon",
            quantity: 1,
            productId: product.id,
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
