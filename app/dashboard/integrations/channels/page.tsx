/* eslint-disable @typescript-eslint/no-explicit-any */
import ChannelList from "@/app/views/integrations/channelsList";
import prisma from "@/lib/prisma";

import React, { Suspense } from "react";

export default function IntegrationsPage() {
  return (
    <div className="">
      <h2 className="font-semibold text-xl mb-4">
        Pazaryeri Entegrasyon Ayarlari
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderIntegrations />
      </Suspense>
    </div>
  );
}

async function RenderIntegrations() {
  const data = await prisma.marketplaceAccount.findMany({
    include: {
      marketPlace: true,
    },
  });
  return <ChannelList data={data} />;
}
