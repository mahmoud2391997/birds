"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Eye,
  Star,
  StarHalf,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Articles",
    href: "/dashboard/articles",
    icon: FileText,
  },
  {
    title: "Reviews",
    href: "/dashboard/reviews",
    icon: StarHalf,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/"); // Redirect to the homepage after logout
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (!storedToken) {
      router.push("/auth/signin");
    }
  }, []);
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40  backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50 text-gray-200 hover:bg-prime md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-gray-600  text-amber-900 transition-all duration-300 md:static",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-500">
          <Link
            href="/dashboard"
            className={cn("flex items-center", collapsed && "justify-center")}
          >
            {collapsed ? (
              <span className="text-2xl font-bold text-prime">HL</span>
            ) : (
              <span className="text-2xl font-bold text-prime">
                The Hires Lab
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-black hover:bg-prime md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-prime text-gray-900"
                      : "text-gray-800 hover:bg-prime hover:text-gray-100",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      collapsed ? "mr-0" : "mr-2",
                      pathname === item.href ? "text-gray-900" : "text-gray-400"
                    )}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-800 p-4">
          <Button
            onClick={() => {
              dispatch(logout());
              router.push("/auth/signin");
            }}
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-700 hover:bg-red-700 cursor-pointer hover:text-gray-100",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut
              className={cn(
                "h-5 w-5",
                collapsed ? "mr-0" : "mr-2",
                "text-gray-500 hover:bg-red-700"
              )}
            />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
