import React, { Suspense } from "react";
import CicekSepetiIntegrationForm from "@/app/components/integrations/ciceksepeti";

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
  return <CicekSepetiIntegrationForm data={data} />;
};

export default page;
