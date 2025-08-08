/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function IntegrationList({ data }: { data: any }) {
  const list = [
    { name: "trendyol", url: "/logo/trendyol.com.png" },
    { name: "hepsiburada", url: "/logo/hepsiburada.png" },
    { name: "gittigidiyor", url: "/logo/gittigidiyor.png" },
    { name: "akakce", url: "/logo/akakce.jpeg" },
    { name: "n11", url: "/logo/n11.png" },
    { name: "amazon", url: "/logo/amazon.webp" },
    { name: "ciceksepeti", url: "/logo/ciceksepeti-logo.png" },
  ]
    .map((item) =>
      data.map((item2) => item2.marketPlace.slug).includes(item.name)
        ? { ...item, active: true }
        : { ...item, active: false }
    )
    .sort((a, b) => (a.active ? -1 : 1));

  return (
    <div
      className="grid gap-2 channels"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 2fr))",
      }}
    >
      {list.map((item) => (
        <Link
          key={item.name}
          href={"/dashboard/integrations/channels/" + item.name}
          className="w-full rounded-lg overflow-hidden border  flex flex-col max-w-[160px] shadow-sm hover:shadow-lg transition-all duration-300 relative"
          style={{ aspectRatio: 0.8 }}
        >
          {item.active ? (
            <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex justify-center items-center bg-green-700">
              <Check size={18} color="white" style={{ zIndex: 1 }} />
            </div>
          ) : (
            <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex justify-center items-center bg-error">
              <XIcon size={18} color="white" style={{ zIndex: 1 }} />
            </div>
          )}
          <div
            className={
              "w-full relative h-auto " +
              (!item.active
                ? " opacity-40 hover:opacity-95 transition-all duration-300"
                : "")
            }
            style={{ aspectRatio: 11 / 10 }}
          >
            <Image src={item.url} alt="" fill />
          </div>
          <div className="text-xs capitalize font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            {item.name} Ayarlari
          </div>
        </Link>
      ))}
    </div>
  );
}
