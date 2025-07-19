"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({ children }) {
  const pathName = usePathname();
  console.log(pathName);
  const isAuthPage = pathName?.startsWith("/auth"); //true or fales return
  return (
    <div>
      {!isAuthPage && <Navbar />}

      {/* Page content */}
      {children}

      {!isAuthPage && <Footer />}
    </div>
  );
}
