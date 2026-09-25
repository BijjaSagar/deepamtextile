"use client";

import React, { useState } from "react";
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
