/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { Suspense, useState } from "react";

import CategoryAdd from "@/app/components/products/category-add";
import prisma from "@/lib/prisma";

const New = () => {
  return (
    <div className="pb-10 overflow-x-auto">
      <div className="justify-between flex max-w-[700px] w-full ">
        <h2 className="text-xl font-semibold mb-4">Kategori Ekle</h2>
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderCategoryAdd />
      </Suspense>
    </div>
  );
};

export default New;

async function RenderCategoryAdd() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  return <CategoryAdd categories={categories} />;
}
