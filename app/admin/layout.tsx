"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Inbox,
  Package,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Plus,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { DeepamLogoEmblem } from "@/components/DeepamLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    {
      label: "Buyer Inquiries & RFQs",
      href: "/admin",
      icon: Inbox,
      description: "Manage global buyer quote leads",
    },
    {
      label: "Products & Multi-Images",
      href: "/admin/products",
      icon: Package,
      description: "Manage collections, GSM, multi-image gallery",
    },
    {
      label: "Mill Content & ERP Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "Company stats, contact numbers & emails",
    },
  ];

  const getPageTitle = () => {
    if (pathname === "/admin") return "Export Buyer Inquiries & Leads";
    if (pathname === "/admin/products") return "Product Catalog & Multi-Image Gallery";
    if (pathname === "/admin/settings") return "Mill & Site Content Settings";
    return "Admin Portal";
  };

  return (
    <div className="min-h-screen bg-[#f4efe6] text-[#19211c] flex">
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-[#dfd6c6] bg-[#0d2818] text-white shadow-xl shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3 group">
              <DeepamLogoEmblem size={36} />
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-[#dfba77] transition-colors">
                  DEEPAM
                </span>
                <p className="font-body text-[9px] uppercase tracking-[0.24em] text-[#dfba77] font-semibold -mt-0.5">
                  Mill ERP &amp; CMS Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="px-4 py-6">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#dfba77]/70 mb-3">
              Management Modules
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-start gap-3 px-3.5 py-3 rounded-sm text-xs font-semibold tracking-wide transition-all group ${
                      active
                        ? "bg-[#c49a45] text-[#06140b] shadow-md"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${active ? "text-[#06140b]" : "text-[#dfba77]"}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {active && <ChevronRight className="h-3.5 w-3.5" />}
                      </div>
                      <p className={`text-[10px] font-normal mt-0.5 ${active ? "text-[#06140b]/80" : "text-white/50"}`}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Quick Mill Facts Card */}
            <div className="mt-8 mx-1 p-3.5 rounded-sm bg-white/5 border border-white/10 text-[11px] text-white/70 space-y-1.5">
              <div className="flex items-center gap-2 text-[#dfba77] font-semibold uppercase text-[10px] tracking-wider">
                <Building2 className="h-3.5 w-3.5" />
                <span>Solapur Mill Status</span>
              </div>
              <p>Capacity: 550 Tons / Month</p>
              <p>Active Looms: 200 Airjet &amp; Rapier</p>
              <p>Despatch Port: FOB JNPT Mumbai</p>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-[#06140b]/60 space-y-2">
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-white/70">
            <UserCheck className="h-3.5 w-3.5 text-[#dfba77]" />
            <span className="truncate text-[11px] font-mono">admin@deepamtextile.com</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="h-3 w-3 text-[#dfba77]" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-sm bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-200 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <LogOut className="h-3 w-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] flex flex-col justify-between bg-[#0d2818] text-white p-6 shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-2.5">
                  <DeepamLogoEmblem size={30} />
                  <span className="font-display text-lg font-bold text-white">DEEPAM ERP</span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-sm text-xs font-semibold ${
                        active ? "bg-[#c49a45] text-[#06140b]" : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-sm bg-white/10 text-white text-xs font-medium"
              >
                <span>View Public Website</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#dfba77]" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-sm bg-red-950/60 border border-red-800/40 text-red-200 text-xs font-medium"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Admin Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="border-b border-[#dfd6c6] bg-white px-6 py-4 shadow-sm sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-[#0d2818] border border-[#dfd6c6] rounded-sm cursor-pointer"
              aria-label="Open Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="font-display text-lg md:text-xl font-bold text-[#0d2818]">
                {getPageTitle()}
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-[#857b6c]">
                <span>Admin</span>
                <span>/</span>
                <span className="font-medium text-[#c49a45] capitalize">
                  {pathname.replace("/admin", "").replace("/", "") || "Inquiries"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pathname !== "/admin/products" && (
              <Link
                href="/admin/products"
                className="hidden sm:inline-flex items-center gap-1.5 btn-gold py-2 px-3 text-[11px]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Manage Products</span>
              </Link>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#0d2818] hover:text-[#c49a45] border border-[#dfd6c6] bg-[#f9f6f0] px-3 py-2 rounded-sm transition-colors font-medium"
            >
              <span>Live Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#c49a45]" />
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
