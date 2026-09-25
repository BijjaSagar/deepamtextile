"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TargetRegionsSection } from "@/components/TargetRegionsSection";
import { RegionalMatrixSection } from "@/components/RegionalMatrixSection";
import { RfqModal } from "@/components/RfqModal";
import { Compass, ArrowRight, ShieldCheck, Ship, Palmtree, Landmark, Clock, CheckCircle2 } from "lucide-react";

export default function CorridorsPage() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("South East Asia");

  const handleOpenRfq = (region?: string) => {
    if (region) setSelectedRegion(region);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#19211c]">
      <Navbar onRequestQuote={handleOpenRfq} />

      <main className="pt-24 md:pt-28">
        {/* Dedicated Page Hero */}
        <section className="relative bg-[#0d2818] text-white py-16 md:py-24 border-b border-[#c49a45]/30 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c49a45_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#dfba77] mb-3">
              <Link href="/" className="hover:underline opacity-80">Home</Link>
              <span>/</span>
              <span>Global Trade Divisions</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#06140b] px-4 py-1.5 text-xs text-[#dfba77] mb-4">
                <Compass className="h-3.5 w-3.5" />
                <span className="font-bold tracking-wider uppercase text-[11px]">3 Specialized Export Corridors</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                Calibrated Textiles For <span className="text-gold-gradient font-semibold">Specific Climates</span>
              </h1>

              <p className="mt-5 font-body text-base md:text-lg text-white/75 leading-relaxed">
                We do not supply generic terry. Every towel program manufactured at our Solapur mill is custom-formulated to the ambient humidity, laundry chemistry, and guest expectations of your trade corridor.
              </p>

              {/* 3 Quick Corridor Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-sm">
                    <Palmtree className="h-4 w-4" />
                    <span>South East Asia</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 font-body">450 - 520 GSM · Rapid-Dry Capillary Weave</p>
                  <span className="text-[10px] text-[#dfba77] font-mono mt-2 block">7-9 Days Sea Transit</span>
                </div>

                <div className="p-4 rounded-sm border border-[#c49a45]/40 bg-[#c49a45]/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-sm">
                    <Landmark className="h-4 w-4" />
                    <span>Middle East</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 font-body">700 - 800 GSM · GCC Royal Palace Sets</p>
                  <span className="text-[10px] text-[#dfba77] font-mono mt-2 block">4-5 Days Direct Transit</span>
                </div>

                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Europe</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 font-body">500 - 600 GSM · OEKO-TEX Standard 100</p>
                  <span className="text-[10px] text-[#dfba77] font-mono mt-2 block">18-22 Days to Hamburg</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Regional Breakdown */}
        <TargetRegionsSection onRequestQuote={handleOpenRfq} />

        {/* Technical Specification Matrix */}
        <RegionalMatrixSection onRequestQuote={handleOpenRfq} />

        {/* Bottom CTA Banner */}
        <section className="bg-[#06140b] text-white py-16 border-t border-[#c49a45]/30">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-display text-2xl md:text-4xl font-semibold text-white">
              Ready to Order Calibrated Mill Swatches for Your Market?
            </h2>
            <p className="mt-3 text-white/70 font-body text-sm max-w-xl mx-auto">
              Our export merchandising desk will dispatch physical swatches, lab test certificates, and CIF port quotations tailored to your exact regional port.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleOpenRfq()} className="btn-gold">
                <span>Request Corridor RFQ &amp; Swatches</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/collections" className="btn-outline-gold">
                Browse Complete Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer onRequestQuote={handleOpenRfq} />

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultRegion={selectedRegion}
      />
    </div>
  );
}
