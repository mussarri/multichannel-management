import React, { Suspense } from "react";
import GittigidiyorIntegrationForm from "@/app/components/integrations/gittigidiyor";

const page = () => {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <RenderPage />
    </Suspense>
  );
};

const RenderPage = async () => {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  const data = await res.json();
  return <GittigidiyorIntegrationForm data={data} />;
};

export default page;
