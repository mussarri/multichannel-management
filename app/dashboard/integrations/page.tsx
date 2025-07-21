import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function IntegrationsPage() {
  return (
    <div className="">
      <h2 className="font-semibold text-xl mb-4">Entegrasyon Ayarlari</h2>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 2fr))",
        }}
      >
        <Link
          href={"/dashboard/integrations/trendyol"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/trendyol.com.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Trendyol Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/hepsiburada"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/hepsiburada.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Hepsiburada Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/gittigidiyor"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div className="w-full relative h-auto" style={{ aspectRatio: 1.2 }}>
            <Image src="/logo/gittigidiyor.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Gittigidiyor Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/n11"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/n11.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            N11 Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/amazon"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/amazon.webp" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Amazon Ayarlari
          </div>
        </Link>
      </div>
    </div>
  );
}
