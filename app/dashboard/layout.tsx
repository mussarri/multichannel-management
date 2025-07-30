import { Sidebar } from "@/app/components/layout/sidebar";
import { Topbar } from "@/app/components/layout/topbar";

import Breadcrumb from "@/app/components/bradcrumb";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar />
      <div className={"flex flex-col flex-1 overflow-hidden"}>
        <Topbar />

        <main
          className={
            "flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4 bg-background"
          }
        >
          <Breadcrumb />
          {children}
          <ToastContainer />
        </main>
      </div>
    </div>
  );
}
