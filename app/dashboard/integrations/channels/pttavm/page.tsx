import React, { Suspense } from "react";
import Form from "@/app/views/integrations/pttavm";
import prisma from "@/lib/prisma";
import Logs from "@/app/components/Logs";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderPage />
      </Suspense>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Logs marketname="pttavm" />
      </Suspense>
    </>
  );
};

const RenderPage = async () => {
  const marketplace = await prisma.marketplace.findUnique({
    where: {
      slug: "pttavm",
    },
  });

  const data = {};
  if (marketplace) {
    const data = await prisma.marketplaceAccount.findUnique({
      where: {
        marketplaceId: marketplace?.id,
      },
    });
    return <Form data={data} />;
  }

  return <Form data={data} />;
};

export default page;
