/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Logo = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    if (pathname == "/" || pathname == "/login" || pathname == "/register") {
      setTheme("light");
    }
  }, [pathname, setTheme]);

  return (
    <a
      href="#"
      className="text-xl font-bold px-2 mb-2 text-primary logo lowercase"
    >
      smarthub
    </a>
  );
};

export default Logo;
