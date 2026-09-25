"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Inbox, Package, Settings, LogOut, ExternalLink, Globe } from "lucide-react";
import { DeepamLogoEmblem } from "@/components/DeepamLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render children directly without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const navItems = [
    { label: "Export RFQs & Leads", href: "/admin", icon: Inbox },
    { label: "Product Catalog", href: "/admin/products", icon: Package },
    { label: "Mill & Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f9f6f0] text-[#19211c] flex flex-col">
      {/* Top Admin Bar */}
      <header className="border-b border-[#dfd6c6] bg-[#ffffff] px-6 py-3.5 shadow-sm sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <DeepamLogoEmblem size={30} />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-[#0d2818]">Deepam</span>
                <span className="font-body text-[8.5px] uppercase tracking-[0.24em] text-[#c49a45] font-semibold -mt-1">
                  Textile CMS
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 border-l border-[#dfd6c6] pl-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                      active
                        ? "bg-[#0d2818] text-[#ffffff]"
                        : "text-[#19211c] hover:bg-[#f2ece1]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-[#857b6c] hover:text-[#19211c] border border-[#dfd6c6] bg-white px-3 py-1.5 rounded-sm transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-red-700 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-sm transition-colors"
            >
              <LogOut className="h-3 w-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8 md:px-8">
        {children}
      </main>
    </div>
  );
}
