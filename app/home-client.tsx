"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RegionalMatrixSection } from "@/components/RegionalMatrixSection";
import { CorridorCollectionsSection } from "@/components/CorridorCollectionsSection";
import { LogisticsShippingSection } from "@/components/LogisticsShippingSection";
import { MillTechSection } from "@/components/MillTechSection";
import { RegionalRfqSection } from "@/components/RegionalRfqSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RfqModal } from "@/components/RfqModal";
import { ProductItem } from "@/lib/types";

interface HomePageClientProps {
  initialProducts: ProductItem[];
}

export function HomePageClient({ initialProducts }: HomePageClientProps) {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  const handleOpenRfq = (region?: string, product?: string) => {
    setSelectedRegion(region);
    setSelectedProduct(product);
    setRfqModalOpen(true);
  };

  const handleCloseRfq = () => {
    setRfqModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5]">
      {/* 1. Header with 3 Corridor Navigation */}
      <Navbar onRequestQuote={handleOpenRfq} />

      <main className="flex-1">
        {/* 2. Hero Command Stage: 3 Export Corridors with Real High-Res Photos */}
        <Hero onRequestQuote={handleOpenRfq} />

        {/* Multipage Hub Navigator Bar */}
        <section className="bg-[#06140b] text-white border-y border-[#c49a45]/30 py-8">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/corridors"
                className="group flex flex-col justify-between p-4 rounded-sm border border-white/10 bg-white/5 hover:border-[#c49a45] hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#dfba77] uppercase tracking-wider font-semibold">Division 01</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#dfba77] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="mt-3">
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-[#dfba77] transition-colors">
                    3 Export Corridors
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">Climatic GSM specs &amp; regional matrix</p>
                </div>
              </Link>

              <Link
                href="/collections"
                className="group flex flex-col justify-between p-4 rounded-sm border border-white/10 bg-white/5 hover:border-[#c49a45] hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#dfba77] uppercase tracking-wider font-semibold">Division 02</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#dfba77] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="mt-3">
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-[#dfba77] transition-colors">
                    12 Export Collections
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">Bath sheets, cabana pool &amp; velour robes</p>
                </div>
              </Link>

              <Link
                href="/infrastructure"
                className="group flex flex-col justify-between p-4 rounded-sm border border-white/10 bg-white/5 hover:border-[#c49a45] hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#dfba77] uppercase tracking-wider font-semibold">Division 03</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#dfba77] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="mt-3">
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-[#dfba77] transition-colors">
                    Solapur Mill &amp; Tech
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">Airjet looms, jacquards &amp; ISO lab</p>
                </div>
              </Link>

              <Link
                href="/logistics"
                className="group flex flex-col justify-between p-4 rounded-sm border border-white/10 bg-white/5 hover:border-[#c49a45] hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#dfba77] uppercase tracking-wider font-semibold">Division 04</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#dfba77] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="mt-3">
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-[#dfba77] transition-colors">
                    Port Shipping &amp; Freight
                  </h4>
                  <p className="text-[11px] text-white/60 mt-0.5">JNPT transit timetables &amp; CBM packing</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Regional Matrix Section: Direct Comparison of SEA vs Middle East vs Europe */}
        <RegionalMatrixSection onRequestQuote={(reg) => handleOpenRfq(reg)} />

        {/* 4. Curated Collections: Grouped by the 3 Corridors */}
        <CorridorCollectionsSection
          initialProducts={initialProducts}
          onRequestQuote={handleOpenRfq}
        />

        {/* 5. Sea Freight Logistics & Shipping Calculator for the 3 Corridors */}
        <LogisticsShippingSection onRequestQuote={handleOpenRfq} />

        {/* 6. Solapur Mill Infrastructure, Electronic Airjet Looms, and Quality Testing Lab */}
        <MillTechSection onRequestQuote={() => handleOpenRfq()} />

        {/* 7. Dedicated On-Page RFQ & Free Swatch Box Dispatcher */}
        <RegionalRfqSection />
      </main>

      {/* 8. Footer with 3 Corridor Desks */}
      <Footer onRequestQuote={handleOpenRfq} />

      {/* Floating Regional WhatsApp Concierge */}
      <WhatsAppButton />

      {/* Pop-up RFQ Modal */}
      <RfqModal
        isOpen={rfqModalOpen}
        onClose={handleCloseRfq}
        defaultRegion={selectedRegion}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
