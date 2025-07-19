import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <div className="px-4 max-w">
      <h2 className="text-xl font-semibold">Sipariş Ayarları</h2>
      <div className="grid grid-cols-2 gap-2 gap-x-5 mt-2">
        <div className="mt-2 text-end">
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
