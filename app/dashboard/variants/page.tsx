import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>
      </div>
      <Suspense fallback={<div>Yükleniyor...</div>}></Suspense>
    </div>
  );
}
