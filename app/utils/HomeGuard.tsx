/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import React from "react";

const HomeGuard = ({ children }) => {
  const router = useRouter();
  router.push("/dashboard");
  return <div>{}</div>;
};

export default HomeGuard;
