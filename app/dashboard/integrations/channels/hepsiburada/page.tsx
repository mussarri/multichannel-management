import React, { Suspense } from "react";
import Form from "@/app/views/integrations/hepsiburada";
import prisma from "@/lib/prisma";
import Logs from "@/app/components/Logs";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderPage />
      </Suspense>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Logs marketname="hepsiburada" />
      </Suspense>
    </>
  );
};

const RenderPage = async () => {
  const marketplace = await prisma.marketplace.findFirst({
    where: {
      slug: "hepsiburada",
    },
  });

  const data = {};
  if (marketplace) {
    const data = await prisma.marketplaceAccount.findFirst({
      where: {
        marketplaceId: marketplace?.id,
      },
    });
    return <Form data={data} />;
  }

  return <Form data={data} />;
};

export default page;
