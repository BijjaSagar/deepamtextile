"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Ship,
  ChevronDown,
  Layers,
  Factory,
  Palmtree,
  Landmark,
  Phone,
  Mail,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { DeepamLogo } from "@/components/DeepamLogo";

interface NavbarProps {
  onRequestQuote?: (region?: string) => void;
}

export function Navbar({ onRequestQuote }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);
  const [mobileMarketsExpanded, setMobileMarketsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollectionsOpen(false);
    setMarketsOpen(false);
  }, [pathname]);

  const exportMarkets = [
    {
      id: "sea",
      name: "South East Asia",
      Icon: Palmtree,
      destinations: "Singapore · Bali · Phuket · Langkawi · Da Nang",
      spec: "Tropical Fast-Dry 450-520 GSM Terry",
      transit: "7-9 Days Sea Transit",
      href: "/corridors#sea",
    },
    {
      id: "me",
      name: "Middle East & GCC",
      Icon: Landmark,
      destinations: "UAE · Saudi Arabia · Qatar · Oman · Kuwait",
      spec: "Ultra-Plush Royal 700-800 GSM Terry",
      transit: "4-5 Days Direct Sea Transit",
      href: "/corridors#me",
    },
    {
      id: "eur",
      name: "Europe & UK",
      Icon: ShieldCheck,
      destinations: "Germany · UK · France · Italy · Scandinavia",
      spec: "OEKO-TEX & GOTS Organic 500-600 GSM",
      transit: "18-22 Days to Hamburg / Rotterdam",
      href: "/corridors#europe",
    },
  ];

  const collectionCategories = [
    {
      title: "Luxury Hotel & Resort Linen",
      desc: "Ultra-plush 700-800 GSM combed cotton bath sheets & towels",
      spec: "Ring-Spun combed yarn · Double-needle hem",
      href: "/collections",
    },
    {
      title: "Resort & Poolside Towels",
      desc: "Vat-dyed chlorine-resistant & quick-dry 450-520 GSM",
      spec: "Zero-twist loops · High tensile strength",
      href: "/collections",
    },
    {
      title: "Certified Organic & OEKO-TEX",
      desc: "GOTS certified ethical organic terry & dobby weaves",
      spec: "Standard 100 certified · Zero toxic chemistry",
      href: "/collections",
    },
    {
      title: "Bespoke Private Label Weaving",
      desc: "Custom Jacquard logos, dobby borders, Pantone color dyeing",
      spec: "Low MOQ: 1,000 pcs per custom design",
      href: "/rfq",
    },
  ];

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (onRequestQuote) {
      e.preventDefault();
      onRequestQuote();
    }
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Top Global Utility Bar */}
      <div className="bg-[#06140b] text-[#dfba77] border-b border-[#c49a45]/20 px-4 py-2 text-[11px] font-body tracking-wider">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left: Origin & Capacity Badge */}
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#c49a45] animate-pulse" />
            <span className="font-semibold text-white uppercase tracking-[0.18em]">
              Solapur Direct Mill Export
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/80">
              550 Tons Monthly Weaving Capacity · JNPT Port Loading
            </span>
          </div>

          {/* Right: Quick Direct Contact */}
          <div className="flex items-center gap-5 text-white/80 text-[11px]">
            <a
              href="tel:+917066148936"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#dfba77] transition-colors"
            >
              <Phone className="h-3 w-3 text-[#dfba77]" />
              <span>+91 70661 48936</span>
            </a>
            <span className="hidden sm:inline text-white/30">·</span>
            <a
              href="mailto:export@deepamtextile.com"
              className="inline-flex items-center gap-1.5 hover:text-[#dfba77] transition-colors"
            >
              <Mail className="h-3 w-3 text-[#dfba77]" />
              <span className="text-[#dfba77] font-medium">export@deepamtextile.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#0d2818]/95 backdrop-blur-md shadow-xl border-b border-[#c49a45]/25 py-3"
            : "bg-[#0d2818]/90 backdrop-blur-sm border-b border-white/10 py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center shrink-0">
            <DeepamLogo size={42} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home */}
            <Link
              href="/"
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors py-2 ${
                isActive("/")
                  ? "text-[#dfba77]"
                  : "text-white/90 hover:text-[#dfba77]"
              }`}
            >
              Home
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <Link
                href="/collections"
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors py-2 ${
                  isActive("/collections")
                    ? "text-[#dfba77]"
                    : "text-white/90 hover:text-[#dfba77]"
                }`}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-[#dfba77] transition-transform duration-200 ${
                    collectionsOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {collectionsOpen && (
                <div className="absolute left-0 top-full pt-2 w-[420px] z-50">
                  <div className="rounded-sm border border-[#c49a45]/30 bg-[#06140b]/98 p-5 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-[#dfba77]">
                        Export Terry Collections
                      </p>
                      <Link
                        href="/collections"
                        className="text-[10px] text-white/70 hover:text-[#dfba77] underline"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="space-y-2.5">
                      {collectionCategories.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setCollectionsOpen(false)}
                          className="block p-2.5 rounded-sm hover:bg-white/5 border border-transparent hover:border-[#c49a45]/30 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display text-[13px] font-semibold text-white group-hover:text-[#dfba77]">
                              {item.title}
                            </span>
                            <ArrowRight className="h-3 w-3 text-white/40 group-hover:text-[#dfba77] group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <p className="text-[11px] text-white/70 mt-0.5">
                            {item.desc}
                          </p>
                          <span className="inline-block mt-1 text-[10px] text-[#dfba77] font-mono">
                            {item.spec}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 text-center">
                      <Link
                        href="/collections"
                        onClick={() => setCollectionsOpen(false)}
                        className="text-[11px] font-semibold text-[#dfba77] hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5"
                      >
                        <span>Browse Full Catalog with GSM Specs</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Global Markets Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMarketsOpen(true)}
              onMouseLeave={() => setMarketsOpen(false)}
            >
              <Link
                href="/corridors"
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors py-2 ${
                  isActive("/corridors")
                    ? "text-[#dfba77]"
                    : "text-white/90 hover:text-[#dfba77]"
                }`}
              >
                <span>Global Markets</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-[#dfba77] transition-transform duration-200 ${
                    marketsOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {marketsOpen && (
                <div className="absolute left-0 top-full pt-2 w-[390px] z-50">
                  <div className="rounded-sm border border-[#c49a45]/30 bg-[#06140b]/98 p-5 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-[#dfba77]">
                        Direct Export Corridors
                      </p>
                      <Link
                        href="/corridors"
                        className="text-[10px] text-white/70 hover:text-[#dfba77] underline"
                      >
                        All Corridors
                      </Link>
                    </div>

                    <div className="space-y-2.5">
                      {exportMarkets.map((reg) => (
                        <Link
                          key={reg.id}
                          href={reg.href}
                          onClick={() => setMarketsOpen(false)}
                          className="block p-2.5 rounded-sm hover:bg-white/5 border border-transparent hover:border-[#c49a45]/30 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display text-[13px] font-semibold text-white group-hover:text-[#dfba77] flex items-center gap-2">
                              <reg.Icon className="h-3.5 w-3.5 text-[#dfba77] shrink-0" />
                              <span>{reg.name}</span>
                            </span>
                            <span className="text-[10px] text-[#dfba77] font-mono">
                              {reg.transit}
                            </span>
                          </div>
                          <p className="text-[11px] text-white/60 mt-0.5">
                            {reg.destinations}
                          </p>
                          <p className="text-[10.5px] text-[#dfba77] mt-1 font-medium">
                            {reg.spec}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10.5px] text-white/60">
                      <span>Port JNPT Direct Container Dispatch</span>
                      <Link
                        href="/logistics"
                        className="text-[#dfba77] hover:underline font-semibold"
                      >
                        Shipping Specs →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Manufacturing */}
            <Link
              href="/infrastructure"
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors py-2 ${
                isActive("/infrastructure")
                  ? "text-[#dfba77]"
                  : "text-white/90 hover:text-[#dfba77]"
              }`}
            >
              Manufacturing
            </Link>

            {/* Logistics */}
            <Link
              href="/logistics"
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors py-2 ${
                isActive("/logistics")
                  ? "text-[#dfba77]"
                  : "text-white/90 hover:text-[#dfba77]"
              }`}
            >
              Logistics
            </Link>

            {/* Contact */}
            <Link
              href="/rfq"
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors py-2 ${
                isActive("/rfq")
                  ? "text-[#dfba77]"
                  : "text-white/90 hover:text-[#dfba77]"
              }`}
            >
              Contact &amp; RFQ
            </Link>
          </nav>

          {/* Right Action Button: Request a Quote */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/rfq"
              onClick={handleQuoteClick}
              className="btn-gold text-[11px] py-2.5 px-5 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center text-white lg:hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#dfba77]" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#c49a45]/30 bg-[#06140b]/98 px-6 py-6 backdrop-blur-xl shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-4">
            {/* Primary Nav Links */}
            <div className="space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-semibold uppercase tracking-wider ${
                  isActive("/") ? "text-[#dfba77]" : "text-white/90 hover:text-[#dfba77]"
                }`}
              >
                Home
              </Link>

              {/* Mobile Collections Collapsible */}
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-center justify-between py-2">
                  <Link
                    href="/collections"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-[#dfba77]"
                  >
                    Collections
                  </Link>
                  <button
                    onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                    className="p-1 text-[#dfba77] cursor-pointer"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileCollectionsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {mobileCollectionsExpanded && (
                  <div className="pl-3 py-2 space-y-2 border-l border-[#c49a45]/30 ml-2">
                    {collectionCategories.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-white/70 hover:text-[#dfba77] py-1"
                      >
                        {item.title}
                      </Link>
                    ))}
                    <Link
                      href="/collections"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-[#dfba77] pt-1"
                    >
                      View All Collections →
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Global Markets Collapsible */}
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-center justify-between py-2">
                  <Link
                    href="/corridors"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-[#dfba77]"
                  >
                    Global Markets
                  </Link>
                  <button
                    onClick={() => setMobileMarketsExpanded(!mobileMarketsExpanded)}
                    className="p-1 text-[#dfba77] cursor-pointer"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileMarketsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {mobileMarketsExpanded && (
                  <div className="pl-3 py-2 space-y-2 border-l border-[#c49a45]/30 ml-2">
                    {exportMarkets.map((reg) => (
                      <Link
                        key={reg.id}
                        href={reg.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-white/70 hover:text-[#dfba77] py-1"
                      >
                        <span className="font-semibold text-white">{reg.name}</span>
                        <span className="text-[10px] text-[#dfba77] ml-2">({reg.transit})</span>
                      </Link>
                    ))}
                    <Link
                      href="/corridors"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-[#dfba77] pt-1"
                    >
                      View All Trade Corridors →
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-2">
                <Link
                  href="/infrastructure"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-semibold uppercase tracking-wider ${
                    isActive("/infrastructure") ? "text-[#dfba77]" : "text-white/90 hover:text-[#dfba77]"
                  }`}
                >
                  Manufacturing
                </Link>
              </div>

              <div className="border-t border-white/10 pt-2">
                <Link
                  href="/logistics"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-semibold uppercase tracking-wider ${
                    isActive("/logistics") ? "text-[#dfba77]" : "text-white/90 hover:text-[#dfba77]"
                  }`}
                >
                  Logistics &amp; Shipping
                </Link>
              </div>

              <div className="border-t border-white/10 pt-2">
                <Link
                  href="/rfq"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-semibold uppercase tracking-wider ${
                    isActive("/rfq") ? "text-[#dfba77]" : "text-white/90 hover:text-[#dfba77]"
                  }`}
                >
                  Contact &amp; RFQ Desk
                </Link>
              </div>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/70 py-1">
                <span>Direct Mill Line:</span>
                <a href="tel:+917066148936" className="text-[#dfba77] font-medium">
                  +91 70661 48936
                </a>
              </div>

              <Link
                href="/rfq"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleQuoteClick(e);
                }}
                className="btn-gold w-full text-center block py-3 text-xs"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
