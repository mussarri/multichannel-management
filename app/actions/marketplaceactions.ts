/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { MarketplaceAccount, SyncAction } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidate() {
  revalidatePath("/dashboard/inregrations");
}

function getHeaders() {
  const authString = btoa(`${11}:${11}`);
  return {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/json",
    "User-Agent": "YOUR_APP_NAME (YOUR_EMAIL)",
  };
}
async function connect(prev, formData) {
  const response = await fetch("", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(formData),
  });
  return response.json();
}

// category

export async function categoryMap(prev, formData) {
  const localCategoryId = parseInt(
    formData.get("localCategoryId")?.toString() || ""
  );
  const marketplaceId = parseInt(
    formData.get("marketplaceId")?.toString() || ""
  );
  const remoteCategoryId = formData.get("remoteCategoryId")?.toString() || "";

  const remoteCategoryName =
    formData.get("remoteCategoryName")?.toString() || "";

  // const marketplaceStatus = await checkMarketplace(marketplaceId);

  // if (marketplaceStatus === false) {
  //   return {
  //     success: false,
  //     message: "Marketplace baglanti bilgilerinizi konrtol ediniz.",
  //     error: "MarketplaceConnError.",
  //   };
  // }

  try {
    const categoryMap = await prisma.marketplaceCategoryMapping.upsert({
      where: {
        marketplaceId_localCategoryId: {
          marketplaceId: marketplaceId,
          localCategoryId: localCategoryId,
        },
      },
      update: {
        remoteCategoryId,
        remoteCategoryName,
      },
      create: {
        localCategoryId,
        marketplaceId,
        remoteCategoryId,
        remoteCategoryName,
      },
    });

    console.log(categoryMap);

    await prisma.syncLog.create({
      data: {
        marketplaceId,
        productId: null,
        variantId: null,
        action: "CATEGORY_MAPPING", // ya da özel bir action tanımladıysan örn: "CATEGORY_MAPPING"
        status: "SUCCESS",
        payload: {
          localCategoryId,
          remoteCategoryId,
          remoteCategoryName,
        },
        response: { mapped: true },
        syncedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/categories" + localCategoryId);

    return {
      success: true,
      message: "Marketplace kategori ile başarıyla eslestirildi.",
      data: {},
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Marketplace kategori eslestirirken bir hata oluştu.",
      error: error.message,
    };
  }
}
//unused
export async function saveCategoryAttributeMappings(
  marketplaceId: number,
  mappings: Array<{
    localCategoryId: number;
    remoteCategoryId: string;
    localAttributeId: number;
    remoteAttributeId: string;
    remoteAttributeName: string;
  }>
) {
  await prisma.$transaction(async (tx) => {
    for (const m of mappings) {
      await tx.categoryAttributeMapping.upsert({
        where: {
          marketplaceId_localAttributeId_remoteAttributeId_localCategoryId_remoteCategoryId:
            {
              marketplaceId,
              localAttributeId: m.localAttributeId,
              localCategoryId: m.localCategoryId,
              remoteAttributeId: m.remoteAttributeId,
              remoteCategoryId: m.remoteCategoryId,
            },
        },
        update: {
          remoteAttributeName: m.remoteAttributeName,
        },
        create: {
          marketplaceId,
          localCategoryId: m.localCategoryId,
          remoteCategoryId: m.remoteCategoryId,
          localAttributeId: m.localAttributeId,
          remoteAttributeId: m.remoteAttributeId,
          remoteAttributeName: m.remoteAttributeName,
        },
      });
    }
  });
}

// attribute value

export async function saveAttributeValueMappings(
  localAttributeValueId: number,
  mappings: Array<{
    marketplaceId: number;
    remoteValueId: string;
    remoteValueName: string;
  }>
) {
  await Promise.all(
    mappings.map(async (m) => {
      const existing = await prisma.attributeValueMapping.findFirst({
        where: {
          marketplaceId: m.marketplaceId,
          localAttributeValueId: localAttributeValueId,
          remoteValueId: m.remoteValueId,
        },
      });

      if (existing) {
        await prisma.attributeValueMapping.update({
          where: { id: existing.id },
          data: {
            remoteValueId: m.remoteValueId,
            remoteValueName: m.remoteValueName,
          },
        });
        await prisma.syncLog.create({
          data: {
            marketplaceId: m.marketplaceId,
            action: SyncAction.ATTRIBUTE_VALUE_MAPPING,
            status: "SUCCESS",
            payload: { mappings },
            syncedAt: new Date(),
          },
        });
      } else {
        await prisma.attributeValueMapping.create({
          data: {
            marketplaceId: m.marketplaceId,
            localAttributeValueId: localAttributeValueId,
            remoteValueId: m.remoteValueId,
            remoteValueName: m.remoteValueName,
          },
        });
        await prisma.syncLog.create({
          data: {
            marketplaceId: m.marketplaceId,
            action: SyncAction.ATTRIBUTE_VALUE_MAPPING,
            status: "SUCCESS",
            payload: { mappings },
            syncedAt: new Date(),
          },
        });
      }
    })
  );
}

export async function saveAttributeValueMappingAction(prev, formData) {
  const localAttributeValueId = parseInt(
    formData.get("localAttributeValueId")?.toString() || ""
  );
  const mappings = [];
  let index = 0;

  while (formData.get(`mappings[${index}][marketplaceId]`)) {
    mappings.push({
      marketplaceId: parseInt(
        formData.get(`mappings[${index}][marketplaceId]`)
      ),
      remoteValueId: formData
        .get(`mappings[${index}][remoteValueId]`)
        ?.toString(),
      remoteValueName: formData
        .get(`mappings[${index}][remoteValueName]`)
        ?.toString(),
    });
    index++;
  }
  console.log(formData);

  console.log(mappings);
  console.log(localAttributeValueId);

  try {
    const maps = await saveAttributeValueMappings(
      localAttributeValueId,
      mappings
    );
    console.log(maps);

    revalidatePath("/dashboard/categories/");
    return {
      success: true,
      message: "Degerler basariyla kaydedildi.",
    };
  } catch (error) {
    return {
      error: true,
      message: "Degerler kaydedilirken hata oluştu",
    };
  }
}

// export async function saveCategoryMapping(data: {
//   marketplaceId: number;
//   localCategoryId: number;
//   remoteCategoryId: string;
// }) {
//   await prisma.marketplaceCategoryMapping.upsert({
//     where: {
//       // unique constraint'a göre uyarlaman gerek, burada örnek composite yoksa custom find+create
//       id: `${data.marketplaceId}-${data.localCategoryId}-${data.remoteCategoryId}`,
//     },
//     update: {},
//     create: {
//       localCategoryId: data.localCategoryId,
//       marketplaceId: data.marketplaceId,
//       remoteCategoryId: data.remoteCategoryId,
//       remoteCategoryName: "", // istenirse UI'dan geçilebilir
//     },
//   });

//   await prisma.syncLog.create({
//     data: {
//       marketplaceId: data.marketplaceId,
//       action: "CATEGORY_MAPPING",
//       status: "SUCCESS",
//       payload: {
//         localCategoryId: data.localCategoryId,
//         remoteCategoryId: data.remoteCategoryId,
//       },
//       syncedAt: new Date(),
//     },
//   });
// }

export async function saveAttributeMappings(data: {
  localCategoryId: number;
  localAttributeId: number;
  mappings: Array<{
    marketplaceId: string;
    remoteAttributeId: string;
    remoteAttributeName?: string;
    remoteCategoryId: string;
  }>;
}) {
  await Promise.all(
    data.mappings.map(async (m) => {
      const existing = await prisma.categoryAttributeMapping.findFirst({
        where: {
          marketplaceId: parseInt(m.marketplaceId),
          localAttributeId: data.localAttributeId,
          remoteAttributeId: m.remoteAttributeId,
          localCategoryId: data.localCategoryId,
          remoteCategoryId: m.remoteCategoryId,
        },
      });

      if (existing) {
        await prisma.categoryAttributeMapping.update({
          where: { id: existing.id },
          data: {
            remoteAttributeId: m.remoteAttributeId,
            remoteAttributeName: m.remoteAttributeName,
          },
        });
        await prisma.syncLog.create({
          data: {
            marketplaceId: parseInt(m.marketplaceId),
            action: SyncAction.CATEGORY_ATTRIBUTE_MAPPING,
            status: "SUCCESS",
            payload: { m },
            syncedAt: new Date(),
          },
        });
      } else {
        await prisma.categoryAttributeMapping.create({
          data: {
            marketplaceId: parseInt(m.marketplaceId),
            localCategoryId: data.localCategoryId,
            localAttributeId: data.localAttributeId,
            remoteCategoryId: m.remoteCategoryId,
            remoteAttributeId: m.remoteAttributeId,
            remoteAttributeName: m.remoteAttributeName,
          },
        });
        await prisma.syncLog.create({
          data: {
            marketplaceId: parseInt(m.marketplaceId),
            action: SyncAction.CATEGORY_ATTRIBUTE_MAPPING,
            status: "SUCCESS",
            payload: { m },
            syncedAt: new Date(),
          },
        });
      }
    })
  );
}

export async function saveAttributeMappingAction(prev, formData) {
  const mappings = [];
  let index = 0;

  while (formData.get(`mappings[${index}][marketplaceId]`)) {
    mappings.push({
      marketplaceId: formData.get(`mappings[${index}][marketplaceId]`),
      remoteAttributeId: formData
        .get(`mappings[${index}][remoteAttributeId]`)
        ?.toString(),
      remoteAttributeName: formData
        .get(`mappings[${index}][remoteAttributeName]`)
        ?.toString(),
      remoteCategoryId: formData
        .get(`mappings[${index}][remoteCategoryId]`)
        ?.toString(),
    });
    index++;
  }

  try {
    await saveAttributeMappings({
      localCategoryId: parseInt(formData.get("localCategoryId") || ""),
      localAttributeId: parseInt(formData.get("localAttributeId") || ""),
      mappings,
    });

    return {
      success: true,
      message: "Secenekler basariyla kaydedildi.",
    };
  } catch (error) {
    return {
      error: true,
      message: "Secenek kaydedilirken hata oluştu",
    };
  }
}

export async function createMarketPlace(prev, formData) {
  const name = formData.get("marketname")?.toString() || "";
  const apiKey = formData.get("api_key")?.toString() || "";
  const secretKey = formData.get("secret_key")?.toString() || "";
  const storeName = formData.get("storeName")?.toString() || "";
  const accessToken = formData.get("accessToken")?.toString() || "";
  const refreshToken = formData.get("refreshToken")?.toString() || "";
  const supplierId = formData.get("store_supplier_id")?.toString() || "";

  try {
    const marketplace = await prisma.marketplace.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name: name,
        slug: slugify(name),
      },
    });

    const account = await prisma.marketplaceAccount.upsert({
      where: {
        marketplaceId: marketplace.id,
      },
      update: {
        apiKey: apiKey,
        storeName: storeName,
        secretKey: secretKey ?? "",
        accessToken: accessToken,
        refreshToken: refreshToken,
        supplierId: supplierId,
      },
      create: {
        marketplaceId: marketplace.id,
        storeName: storeName,
        apiKey: apiKey,
        secretKey: secretKey ?? "",
        accessToken: accessToken,
        refreshToken: refreshToken,
        supplierId: supplierId,
      },
    });

    // 2. Bağlantı testi
    const testResult = await pingMarketplace(account);

    await prisma.syncLog.create({
      data: {
        marketplaceId: marketplace.id,
        productId: null,
        variantId: null,
        action: "CONNECT",
        status: 1 ? "SUCCESS" : "FAILED",
        payload: {
          storeName: storeName,
          marketplaceId: marketplace.id,
        },
        response: testResult.details,
        syncedAt: new Date(),
      },
    });

    // if (!testResult.ok) {
    //   throw new Error(
    //     `Marketplace bağlantı testi başarısız: ${JSON.stringify(
    //       testResult.details
    //     )}`
    //   );
    // }
    revalidatePath("/dashboard/integrations/marketplace/" + name);
    return {
      success: true,
      message: "Marketplace başarıyla eklendi.",
      data: {},
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

async function pingMarketplace(account: MarketplaceAccount) {
  // Örnek: Trendyol gibi bir yerde token ile profil çekme
  try {
    // Bu kısmı ilgili pazaryerinin gerçek endpoint ve auth formatına göre uyarlayacaksın
    const res = await fetch(account.apiKey ? account.apiKey : "", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${account.accessToken ?? ""}`,
        "Content-Type": "application/json",
      },
      // örnek URL; gerçek entegrasyon için değiştir
      // url bazen account içinde saklanan marketplace bilgisine göre değişir
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, details: { status: res.status, body: text } };
    }

    const json = await res.json();
    return { ok: true, details: json };
  } catch (err) {
    return { ok: false, details: { error: (err as Error).message } };
  }
}

async function checkMarketplace(marketplaceId: number) {
  const account = await prisma.marketplaceAccount.findUnique({
    where: {
      marketplaceId: marketplaceId,
    },
  });
  if (!account) {
    return false;
  }
  const testResult = await pingMarketplace(account);
  if (!testResult.ok) {
    await prisma.syncLog.create({
      data: {
        marketplaceId: marketplaceId,
        productId: null,
        variantId: null,
        action: "CONNECT",
        status: "FAILED",
        payload: {
          storeName: account?.storeName || "",

          marketplaceId: marketplaceId,
        },
        response: testResult.details,
        syncedAt: new Date(),
      },
    });
    return false;
  }
  return true;
}
