/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

const BASE_URL = "https://api.trendyol.com/sapigw";
const API_KEY = process.env.TRENDYOL_API_KEY;
const API_SECRET = process.env.TRENDYOL_API_SECRET;

const url = `${BASE_URL}/suppliers/YOUR_SUPPLIER_ID/products`;

import axios from "axios";
import prisma from "../prisma";

export async function publishProductToTrendyol({
  supplierId,
  username,
  password,
  product,
  variants,
}: {
  supplierId: string;
  username: string;
  password: string;
  product: any; // kendi Product tipinle değiştir
  variants: any[]; // kendi Variant tipinle değiştir
}) {
  const url = `${BASE_URL}/${supplierId}/v2/products`;

  const headers = {
    "Content-Type": "application/json",
    Username: username,
    Password: password,
  };

  const trendyolProductPayload = {
    items: variants.map((variant) => ({
      barcode: variant.barcode,
      title: product.title,
      productMainId: product.sku,
      brandId: 12345, // Trendyol marka ID'si
      categoryId: 123456, // Trendyol kategori ID'si
      quantity: variant.stock,
      stockCode: variant.sku,
      dimensionalWeight: 1,
      description: product.description,
      currencyType: "TRY",
      listPrice: variant.price,
      salePrice: variant.price,
      vatRate: 18,
      images: [{ url: `https://yourdomain.com/uploads/${product.mainImage}` }],
      attributes: [
        // Trendyol kategoriye bağlı özellik eşlemeleri
      ],
    })),
  };

  const res = await axios.post(url, trendyolProductPayload, { headers });

  return res.data;
}

function getHeaders() {
  const authString = btoa(`${API_KEY}:${API_SECRET}`);
  return {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/json",
    "User-Agent": "YOUR_APP_NAME (YOUR_EMAIL)",
  };
}

export async function getTrendyolProducts(params?: any) {
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  return response.json();
}

export async function getTrendyolCategories(params?: any) {
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  return response.json();
}
