import React, { Suspense } from "react";
import CicekSepetiIntegrationForm from "@/app/views/integrations/ciceksepeti";
import prisma from "@/lib/prisma";
import Logs from "@/app/components/Logs";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RenderPage />
      </Suspense>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Logs marketname="ciceksepeti" />
      </Suspense>
    </>
  );
};

const RenderPage = async () => {
  const marketplace = await prisma.marketplace.findFirst({
    where: {
      slug: "ciceksepeti",
    },
  });

  const data = {};
  if (marketplace) {
    const data = await prisma.marketplaceAccount.findFirst({
      where: {
        marketplaceId: marketplace?.id,
      },
    });
    return <CicekSepetiIntegrationForm data={data} />;
  }

  return <CicekSepetiIntegrationForm data={data} />;
};

export default page;
