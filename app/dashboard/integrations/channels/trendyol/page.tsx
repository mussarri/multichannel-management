/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import Loading from "@/app/components/general/Loading";
import Logs from "@/app/components/Logs";
import TrendyolIntegration from "@/app/views/integrations/trendyol-integration";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RenderPage />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Logs marketname="trendyol" />
      </Suspense>
    </>
  );
};

const RenderPage = async () => {
  const marketplace = await prisma.marketplace.findFirst({
    where: {
      slug: "trendyol",
    },
  });

  const data = {};
  if (marketplace) {
    const data = await prisma.marketplaceAccount.findFirst({
      where: {
        marketplaceId: marketplace?.id,
      },
    });
    return <TrendyolIntegration data={data} />;
  }

  return <TrendyolIntegration data={data} />;
};

export default page;
