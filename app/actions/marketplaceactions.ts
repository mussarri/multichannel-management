/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/lib/prisma";

function getHeaders() {
  const authString = btoa(`${11}:${11}`);
  return {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/json",
    "User-Agent": "YOUR_APP_NAME (YOUR_EMAIL)",
  };
}

export async function createMarketPlace(prev, formData) {
  const response = await fetch("", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(formData),
  });
  return response.json();
}

export async function setTrendyolStore(prev, formData) {
  const name = formData.get("name").toString();
  const code = formData.get("code").toString();
  try {
    const marketplace = await prisma.marketplace.create({
      data: {
        name: name,
        code: code,
      },
    });
    return {
      success: true,
      message: "Marketplace başarıyla eklendi.",
      data: marketplace,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Marketplace eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}
export async function setHepsiburadaStore(prev, formData) {
  const name = formData.get("name").toString();
  const code = formData.get("code").toString();
  try {
    const marketplace = await prisma.marketplace.create({
      data: {
        name: name,
        code: code,
      },
    });
    return {
      success: true,
      message: "Marketplace başarıyla eklendi.",
      data: marketplace,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Marketplace eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}
export async function n11Store(prev, formData) {
  const name = formData.get("name").toString();
  const code = formData.get("code").toString();
  try {
    const marketplace = await prisma.marketplace.create({
      data: {
        name: name,
        code: code,
      },
    });
    return {
      success: true,
      message: "Marketplace başarıyla eklendi.",
      data: marketplace,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Marketplace eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}
export async function gittigidiyorStore(prev, formData) {
  const name = formData.get("name").toString();
  const code = formData.get("code").toString();
  try {
    const marketplace = await prisma.marketplace.create({
      data: {
        name: name,
        code: code,
      },
    });
    return {
      success: true,
      message: "Marketplace başarıyla eklendi.",
      data: marketplace,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Marketplace eklenirken bir hata oluştu.",
      error: error.message,
    };
  }
}
