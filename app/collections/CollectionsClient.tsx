"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CorridorCollectionsSection } from "@/components/CorridorCollectionsSection";
import { RfqModal } from "@/components/RfqModal";
import { ProductItem } from "@/lib/types";
import { Sparkles, ArrowRight, ShieldCheck, Layers, Palmtree, Landmark, Globe } from "lucide-react";

interface CollectionsClientProps {
  initialProducts: ProductItem[];
}

export function CollectionsClient({ initialProducts }: CollectionsClientProps) {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("South East Asia");
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  const handleOpenRfq = (region?: string, product?: string) => {
    if (region) setSelectedRegion(region);
    if (product) setSelectedProduct(product);
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
              <span>Manufacturing Lines</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#06140b] px-4 py-1.5 text-xs text-[#dfba77] mb-4">
                <Layers className="h-3.5 w-3.5" />
                <span className="font-bold tracking-wider uppercase text-[11px]">12 Export Product Lines</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                Curated Luxury <span className="text-gold-gradient font-semibold">Hospitality Collections</span>
              </h1>

              <p className="mt-5 font-body text-base md:text-lg text-white/75 leading-relaxed">
                Direct mill manufacturing from Solapur, India. Every category is custom-loomed with your bespoke GSM, Pantone colorways, woven dobby borders, and private-label packaging.
              </p>
            </div>
          </div>
        </section>

        {/* Collections Catalog Grid Section */}
        <CorridorCollectionsSection
          initialProducts={initialProducts}
          onRequestQuote={handleOpenRfq}
        />

        {/* Custom Merchandising & Private Labeling Banner */}
        <section className="bg-white border-t border-[#dfd6c6] py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="rounded-sm border border-[#c49a45]/30 bg-[#0d2818] p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#dfba77] block mb-2">
                  Bespoke OEM / Private Labeling
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">
                  Need Custom GSM, Border Weave, or Brand Packaging?
                </h3>
                <p className="text-white/70 text-sm mt-3 leading-relaxed font-body">
                  Our in-house design studio produces custom jacquard crests, custom Pantone vat dyeing, FSC-certified kraft belly bands, and woven damask labels matching your brand tech pack.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleOpenRfq(undefined, "Private Label Custom Program")}
                  className="btn-gold"
                >
                  <span>Request Custom Private Label RFQ</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link href="/infrastructure" className="btn-outline-gold text-center">
                  Inspect Loom Tech
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onRequestQuote={handleOpenRfq} />

      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultRegion={selectedRegion}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
