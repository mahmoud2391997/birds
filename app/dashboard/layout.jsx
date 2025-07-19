// app/dashboard/layout.jsx
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function DashboardLayout({ children }) {
  const token = cookies().get("token");

  if (!token) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
