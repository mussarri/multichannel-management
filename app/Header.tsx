/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import SignOut from "./components/buttons/SignOut";
import Logo from "./components/general/Logo";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(10px)",
        }}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Logo />
          </div>

          <div className="hidden flex-1 lg:flex lg:gap-x-12">
            <a
              href="#"
              className="text-sm/6 font-semibold text-gray-900 hover:text-primary"
            >
              Product
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-gray-900 hover:text-primary"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-gray-900 hover:text-primary"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="text-sm/6 font-semibold text-gray-900 hover:text-primary"
            >
              Company
            </a>
          </div>
          <div className="flex flex-1 justify-end items-center space-x-4">
            <Link
              href="/dashboard"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Dashboard
            </Link>
            {session ? (
              <>
                <div className="flex items-center space-x-4">
                  <SignOut />
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
