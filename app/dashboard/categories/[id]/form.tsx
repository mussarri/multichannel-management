/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { Pencil, Trash, Trash2 } from "lucide-react";
import MakeCategoryMap from "@/app/components/categories/CategoryMap";
import { check } from "@/app/views/CategoryList";

// server actions
// Not: server actionları çağırmak için form submit veya fetch wrapper gerekebilir, burada örnek fetch ile

export default function CategoryAttributeStepper({
  category,
  marketplaces,
  attributes,
}: {
  category: any;
  marketplaces: any;
  attributes: any;
}) {
  const [step, setStep] = useState(1);
  const [marketplaceId, setMarketplaceId] = useState(1);
  const [selectedLocalCategory, setSelectedLocalCategory] = useState(category);
  const handleNext = () => {};

  const [open, setOpen] = useState({
    category: null,
    marketPlace: null,
  });

  const handleOpen = (category, marketPlace) => {
    setOpen({
      category,
      marketPlace,
    });
  };

  console.log(attributes);

  return (
    <div className="overflow-x-auto box rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-md">
          {category.name + " Kategorisi"}
        </h2>
        <div className="text-right">
          <button className="bg-error rounded px-3 p-1 text-white text-sm flex gap-2 items-center">
            <Trash size={15} /> Kategoriyi Sil
          </button>
        </div>
      </div>

      <div className="p-4">
        {marketplaces.length > 0 ? (
          <table className="attribute-table w-full shadow-sm text-sm mt-2">
            <thead className="bg-inherit">
              {marketplaces.length > 0 && (
                <tr className="text-sm">
                  <th className="text-left p-2">Pazaryeri Adı</th>{" "}
                  <th className="text-left p-2">Kategori Adi</th>{" "}
                  <th className="text-left p-2">İşlemler</th>{" "}
                </tr>
              )}
            </thead>
            <tbody>
              {marketplaces.length > 0 &&
                marketplaces.map((i) => {
                  const mappingThisCategory =
                    category.MarketplaceCategoryMapping.find(
                      (m) => m.marketplaceId === parseInt(i.marketplaceId)
                    );

                  return (
                    <tr
                      key={i.id}
                      className="border-4 rounded border-background bg-card hover:bg-muted/40"
                    >
                      <td className="p-2 capitalize">{i.marketPlace.name}</td>
                      <td className="p-2">
                        <div className="flex gap-2 items-center justify-start">
                          {" "}
                          {check(!!mappingThisCategory)}
                          {mappingThisCategory
                            ? mappingThisCategory.remoteCategoryName
                            : ""}
                        </div>
                      </td>
                      <td>
                        <MakeCategoryMap
                          category={category}
                          marketPlace={i}
                          open={
                            open.category === category.id &&
                            open.marketPlace === i.id
                          }
                          setOpen={(value: boolean) =>
                            handleOpen(
                              value ? category.id : null,
                              value ? i.id : null
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}

// // Validation helpers
// const validateStep1 = () => {
//   if (!selectedLocalCategory) {
//     setCategoryError("Yerel kategori seçilmelidir");
//     return false;
//   }
//   if (!selectedRemoteCategory) {
//     setCategoryError("Uzak kategori seçilmelidir");
//     return false;
//   }
//   setCategoryError(null);
//   return true;
// };

// const validateStep2 = () => {
//   if (localAttributes.length === 0) {
//     setAttributeError("Bu yerel kategoriye ait attribute yok");
//     return false;
//   }
//   for (const attr of localAttributes) {
//     if (!attributeMappings[attr.id]) {
//       setAttributeError(`"${attr.name}" için remote eşleme yapılmalı`);
//       return false;
//     }
//   }
//   setAttributeError(null);
//   return true;
// };

// const validateStep3 = () => {
//   for (const val of localAttributeValues) {
//     if (!valueMappings[val.id]) {
//       setValueError(`"${val.value}" için remote değeri eşlenmeli`);
//       return false;
//     }
//   }
//   setValueError(null);
//   return true;
// };

// // Handlers
// const handleNext = async () => {
//   if (step === 1) {
//     if (!validateStep1()) return;
//     // kaydet category mapping
//     await fetch("/api/placeholder", {
//       method: "POST",
//       body: JSON.stringify({
//         marketplaceId,
//         localCategoryId: selectedLocalCategory,
//         remoteCategoryId: selectedRemoteCategory,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     setStep(2);
//   } else if (step === 2) {
//     if (!validateStep2()) return;
//     // kaydet attribute mapping via server action
//     const attributePayload = Object.entries(attributeMappings).map(
//       ([localAttributeId, m]) => ({
//         localAttributeId: Number(localAttributeId),
//         remoteAttributeId: m.remoteAttributeId,
//         remoteAttributeName: m.remoteAttributeName,
//         localCategoryId: selectedLocalCategory!,
//         remoteCategoryId: selectedRemoteCategory!,
//       })
//     );
//     // çağır server action
//     await fetch("/api/attribute-mapping", {
//       method: "POST",
//       body: JSON.stringify({
//         marketplaceId,
//         mappings: attributePayload,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     setStep(3);
//   } else if (step === 3) {
//     if (!validateStep3()) return;
//     // kaydet attribute value mapping
//     const valuePayload = Object.entries(valueMappings).map(
//       ([localAttributeValueId, m]) => ({
//         localAttributeValueId: Number(localAttributeValueId),
//         remoteValueId: m.remoteValueId,
//         remoteValueName: m.remoteValueName,
//       })
//     );
//     await fetch("/api/attribute-value-mapping", {
//       method: "POST",
//       body: JSON.stringify({
//         marketplaceId,
//         mappings: valuePayload,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     // tamamlandı
//     alert("Eşleme tamamlandı");
//   }
// };
