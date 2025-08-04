import React, { Suspense } from "react";
import GittigidiyorIntegrationForm from "@/app/views/integrations/gittigidiyor";
import prisma from "@/lib/prisma";
import Logs from "@/app/components/Logs";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderPage />
      </Suspense>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Logs marketname="gittigidiyor" />
      </Suspense>
    </>
  );
};

const RenderPage = async () => {
  const marketplace = await prisma.marketplace.findFirst({
    where: {
      slug: "gittigidiyor",
    },
  });
  const data = {};
  if (marketplace) {
    const data = await prisma.marketplaceAccount.findFirst({
      where: {
        marketplaceId: marketplace?.id,
      },
    });
    return <GittigidiyorIntegrationForm data={data} />;
  }

  return <GittigidiyorIntegrationForm data={data} />;
};

export default page;
