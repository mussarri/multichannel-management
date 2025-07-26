/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

const BASE_URL = "https://api.trendyol.com/sapigw";
const API_KEY = process.env.TRENDYOL_API_KEY;
const API_SECRET = process.env.TRENDYOL_API_SECRET;

const url = `${BASE_URL}/suppliers/YOUR_SUPPLIER_ID/products`;

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

export async function createTrendyolProduct(params) {
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(params),
  });
  return response.json();
}
