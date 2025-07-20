"use client";
import { Sidebar } from "@/app/components/layout/sidebar";
import { Topbar } from "@/app/components/layout/topbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const array = pathname.split("/").slice(1);
  const mobile = useMediaQuery("(max-width: 840px)");

  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar />

      <div className={"flex flex-col flex-1 overflow-hidden "}>
        <Suspense fallback={<span>Loading...</span>}>
          <Topbar />
        </Suspense>

        <main
          className={
            "flex-1 overflow-y-auto overflow-x-hidden p-4 " +
            (mobile ? " px-4" : "px-8")
          }
        >
          <ol className="flex items-center whitespace-nowrap mb-4">
            {array.map((item, idx) => (
              <li key={idx} className="inline-flex items-center">
                <Link
                  className={
                    "flex items-center text-xs text-foreground " +
                    (array.length - 1 == idx ? " text-background" : "")
                  }
                  href={"/" + array.slice(0, idx + 1).join("/")}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </Link>
                {array.length - 1 > idx && (
                  <svg
                    className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                )}
              </li>
            ))}
          </ol>

          {children}
        </main>
      </div>
    </div>
  );
}
