"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ShieldCheck, Ship, ChevronDown, Sparkles, Palmtree, Landmark } from "lucide-react";
import { DeepamLogo } from "@/components/DeepamLogo";

interface NavbarProps {
  onRequestQuote: (region?: string) => void;
}

export function Navbar({ onRequestQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [corridorsDropdown, setCorridorsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const regions = [
    {
      id: "sea",
      name: "South East Asia",
      Icon: Palmtree,
      sub: "Singapore · Bali · Phuket · Langkawi · Da Nang",
      highlight: "Tropical Quick-Dry 450-520 GSM",
      transit: "7-9 Days Sea Transit",
    },
    {
      id: "me",
      name: "Middle East",
      Icon: Landmark,
      sub: "UAE · Saudi Arabia · Qatar · Oman · Kuwait",
      highlight: "Ultra-Plush Royal 700-800 GSM",
      transit: "4-5 Days Direct Sea Transit",
    },
    {
      id: "eur",
      name: "Europe",
      Icon: ShieldCheck,
      sub: "Germany · UK · France · Italy · Nordics",
      highlight: "OEKO-TEX & GOTS Organic 500-600 GSM",
      transit: "18-22 Days to Hamburg / Rotterdam",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Top Global Trade Ticker */}
      <div className="bg-[#06140b] text-[#dfba77] border-b border-[#c49a45]/20 px-4 py-2 text-[11px] font-body tracking-wider">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#dfba77] animate-pulse" />
            <span className="font-semibold text-white uppercase tracking-[0.2em]">Target Export Corridors:</span>
            <span className="hidden md:inline-flex items-center gap-3 text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Palmtree className="h-3 w-3 text-[#dfba77]" /> South East Asia (7-9d)
              </span>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Landmark className="h-3 w-3 text-[#dfba77]" /> Middle East (4-5d)
              </span>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-[#dfba77]" /> Europe (18-22d)
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-white/70 text-[10.5px]">
            <span className="hidden sm:inline">Direct Mill Loading: FOB JNPT Mumbai / CIF Worldwide</span>
            <span className="text-[#dfba77] font-medium">+91 70661 48936</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#0d2818]/95 backdrop-blur-md shadow-lg border-b border-[#c49a45]/25 py-3.5"
            : "bg-[#0d2818]/90 backdrop-blur-sm border-b border-white/10 py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          {/* Brand Logo & Solapur Origin */}
          <Link href="/" className="group flex items-center">
            <DeepamLogo size={44} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Target Corridors Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCorridorsDropdown(true)}
              onMouseLeave={() => setCorridorsDropdown(false)}
            >
              <Link
                href="/corridors"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:text-[#dfba77] transition-colors py-2"
              >
                <span>3 Target Corridors</span>
                <ChevronDown className={`h-3.5 w-3.5 text-[#dfba77] transition-transform ${corridorsDropdown ? "rotate-180" : ""}`} />
              </Link>

              {corridorsDropdown && (
                <div className="absolute left-0 top-full pt-2 w-[340px] z-50">
                  <div className="rounded-sm border border-[#c49a45]/30 bg-[#06140b] p-4 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-[#dfba77]">
                        Specialized Export Divisions
                      </p>
                      <Link
                        href="/corridors"
                        className="text-[10px] text-white/60 hover:text-[#dfba77] underline"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="space-y-2">
                      {regions.map((reg) => (
                        <Link
                          key={reg.id}
                          href="/corridors"
                          onClick={() => setCorridorsDropdown(false)}
                          className="w-full block text-left p-2.5 rounded-sm hover:bg-white/5 border border-transparent hover:border-[#c49a45]/30 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display text-sm font-semibold text-white group-hover:text-[#dfba77] flex items-center gap-2">
                              <reg.Icon className="h-4 w-4 text-[#dfba77] shrink-0" />
                              <span>{reg.name}</span>
                            </span>
                            <span className="text-[10px] text-[#dfba77] font-mono">{reg.transit}</span>
                          </div>
                          <p className="text-[11px] text-white/60 mt-0.5">{reg.sub}</p>
                          <p className="text-[10.5px] text-[#dfba77] mt-1 font-medium">{reg.highlight}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/collections"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-[#dfba77] transition-colors"
            >
              Collections
            </Link>

            <Link
              href="/infrastructure"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-[#dfba77] transition-colors"
            >
              Mill Tech
            </Link>

            <Link
              href="/logistics"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-[#dfba77] transition-colors"
            >
              Shipping &amp; Ports
            </Link>

            <Link
              href="/rfq"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90 hover:text-[#dfba77] transition-colors"
            >
              RFQ Desk
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/rfq"
              className="btn-gold text-[11px] py-2.5 px-5 cursor-pointer"
            >
              <span>Request Export Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center text-white lg:hidden"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#dfba77]" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#c49a45]/30 bg-[#06140b]/98 p-6 backdrop-blur-xl shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-[#dfba77]">
                Export Corridors
              </p>
              <Link
                href="/corridors"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[10px] text-white/60 hover:text-[#dfba77] underline"
              >
                View Details
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {regions.map((reg) => (
                <Link
                  key={reg.id}
                  href="/corridors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-sm bg-white/5 border border-white/10 text-left text-xs font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <reg.Icon className="h-4 w-4 text-[#dfba77] shrink-0" />
                    <span>{reg.name}</span>
                  </span>
                  <span className="text-[10px] text-[#dfba77]">{reg.transit}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-[#dfba77]"
              >
                Export Collections &amp; Products
              </Link>
              <Link
                href="/infrastructure"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-[#dfba77]"
              >
                Solapur Mill Infrastructure &amp; Tech
              </Link>
              <Link
                href="/logistics"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-[#dfba77]"
              >
                JNPT Mumbai Port Logistics &amp; Shipping
              </Link>
              <Link
                href="/rfq"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-[#dfba77]"
              >
                Factory RFQ Desk &amp; Sample Swatches
              </Link>
            </div>

            <div className="pt-4">
              <Link
                href="/rfq"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center block"
              >
                Request Export Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
