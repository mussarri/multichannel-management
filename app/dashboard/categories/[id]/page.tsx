/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Form from "./form";
import Form2 from "./form2";
import prisma from "@/lib/prisma";
import { connect } from "http2";
import Link from "next/link";
import { Combine, FolderSync, PlusCircleIcon } from "lucide-react";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      MarketplaceCategoryMapping: true,
      children: true,
      parent: true,
      attributes: {
        include: {
          values: {
            include: {
              AttributeValueMapping: true,
            },
          },
          CategoryAttributeMapping: true,
        },
      },
    },
  });

  const marketplaces = await prisma.marketplaceAccount.findMany({
    include: {
      marketPlace: true,
    },
  });

  const syncLogs = await prisma.syncLog.findMany({
    where: {
      action: "CATEGORY_ATTRIBUTE_MAPPING",
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Form
        category={category}
        marketplaces={marketplaces}
        attributes={category.attributes}
      />
      {marketplaces.length > 0 || (
        <div className="box mt-4 p-4">
          <Link
            href={"/dashboard/integrations/channels"}
            className="text-sm flex items-center gap-2"
          >
            {" "}
            <Combine size={17} />
            <span className=" font-[600] text-[13px]">
              Kategori eşleştirmek için önce pazaryerlerini ekleyin.
            </span>
          </Link>
        </div>
      )}
      {category.attributes && category.attributes.length > 0 ? (
        <Form2
          category={category}
          marketplaces={marketplaces}
          attributes={category.attributes}
          syncLogs={syncLogs}
        />
      ) : (
        <div className="box mt-4 p-4">
          <Link
            href={"/dashboard/variants/create/?id=" + category.id}
            className="text-sm flex items-center gap-2"
          >
            {" "}
            <PlusCircleIcon size={17} />
            <span className=" font-[600] text-[13px]">
              Boyut , Renk gibi seçenekler ekleyin
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default page;
