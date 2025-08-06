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
  if (!id) {
    return notFound();
  }

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      MarketplaceCategoryMapping: true,
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
        />
      ) : (
        <div className="box mt-4 p-4">
          <Link
            href={"/dashboard/variants/" + id}
            target={"_blank"}
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
