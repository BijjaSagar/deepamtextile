"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Filter, Check, Eye, Palmtree, Landmark, ShieldCheck, Globe, X } from "lucide-react";
import { ProductItem } from "@/lib/types";

interface CorridorCollectionsSectionProps {
  initialProducts: ProductItem[];
  onRequestQuote: (region?: string, product?: string) => void;
}

export function CorridorCollectionsSection({
  initialProducts,
  onRequestQuote,
}: CorridorCollectionsSectionProps) {
  const [selectedCorridor, setSelectedCorridor] = useState<string>("sea");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  // Group products specifically calibrated by the 3 target areas
  const corridorTabs = [
    { id: "sea", name: "South East Asia", Icon: Palmtree, desc: "Tropical Quick-Dry, 450-520 GSM, Anti-Mildew Weaves" },
    { id: "me", name: "Middle East", Icon: Landmark, desc: "Ultra-Plush 700-800 GSM, Long-Staple, Woven Gold Dobby" },
    { id: "eur", name: "Europe", Icon: ShieldCheck, desc: "GOTS Organic, OEKO-TEX Standard 100, Plastic-Free FSC" },
    { id: "all", name: "All 3 Corridors", Icon: Globe, desc: "Complete 12-Category Export Manufacturing Line" },
  ];

  // Specific products mapped to the 3 corridors
  const productsByCorridor: Record<string, string[]> = {
    sea: ["beach-towels", "pool-towels", "bath-robes", "hand-towels"],
    me: ["bath-towels", "hotel-linen", "spa-towels", "promotional-towels"],
    eur: ["face-towels", "bath-mats", "kitchen-towels", "private-labeling"],
  };

  const filteredProducts = initialProducts.filter((p) => {
    if (selectedCorridor === "all") return true;
    const allowed = productsByCorridor[selectedCorridor] || [];
    return allowed.includes(p.slug);
  });

  return (
    <section id="collections" className="scroll-mt-24 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#c49a45]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
              Regional Product Catalog
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-[#0d2818]">
            Collections Calibrated for <span className="text-gold-gradient font-semibold">Your Market</span>
          </h2>

          <p className="mt-4 font-body text-base text-[#7d776d] leading-relaxed">
            Filter our manufacturing lines by target trade corridor to inspect recommended GSM, dimensional cuts, and regional packaging.
          </p>

          {/* Corridor Filter Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {corridorTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCorridor(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCorridor === tab.id
                    ? "bg-[#0d2818] text-white border-[#0d2818] shadow-md ring-2 ring-[#c49a45]/40"
                    : "bg-white text-[#0d2818] border-[#dfd6c6] hover:border-[#c49a45]"
                }`}
              >
                <tab.Icon className="h-4 w-4 shrink-0 text-[#c49a45]" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-[#c49a45] font-medium font-body">
            {corridorTabs.find((t) => t.id === selectedCorridor)?.desc}
          </p>
        </div>

        {/* Product Cards Grid with Real Photography */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-[#dfd6c6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c49a45] hover:shadow-xl"
            >
              {/* Product Image */}
              <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-[#0d2818] block group/img">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06140b]/70 via-transparent to-transparent opacity-80" />

                {/* Region Badge */}
                <div className="absolute top-3 left-3 bg-[#0d2818]/90 backdrop-blur-sm border border-[#c49a45]/30 px-2.5 py-1 rounded-sm text-[10px] font-bold text-[#dfba77] uppercase tracking-wider flex items-center gap-1.5">
                  {selectedCorridor === "sea" ? (
                    <>
                      <Palmtree className="h-3 w-3 text-[#dfba77]" />
                      <span>South East Asia</span>
                    </>
                  ) : selectedCorridor === "me" ? (
                    <>
                      <Landmark className="h-3 w-3 text-[#dfba77]" />
                      <span>Middle East</span>
                    </>
                  ) : selectedCorridor === "eur" ? (
                    <>
                      <ShieldCheck className="h-3 w-3 text-[#dfba77]" />
                      <span>Europe</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-3 w-3 text-[#dfba77]" />
                      <span>Global Export</span>
                    </>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#dfba77]">
                    {product.gsmRange}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-tight text-white mt-0.5 group-hover/img:text-[#dfba77] transition-colors">
                    {product.title}
                  </h3>
                </div>
              </Link>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#7d776d] leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-[#0d2818] font-medium border-t border-[#dfd6c6] pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#7d776d]">Material:</span>
                      <span>{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7d776d]">Dimensions:</span>
                      <span>{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7d776d]">Export MOQ:</span>
                      <span className="text-[#c49a45] font-semibold">{product.minOrderQty}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#dfd6c6] flex gap-2">
                  <button
                    onClick={() =>
                      onRequestQuote(
                        selectedCorridor === "sea"
                          ? "South East Asia"
                          : selectedCorridor === "me"
                          ? "Middle East"
                          : selectedCorridor === "eur"
                          ? "Europe"
                          : undefined,
                        product.title
                      )
                    }
                    className="flex-1 btn-gold py-2 px-3 text-[10.5px] cursor-pointer"
                  >
                    <span>Request RFQ</span>
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="px-3 py-2 border border-[#dfd6c6] hover:border-[#c49a45] rounded-sm text-[#0d2818] hover:text-[#c49a45] transition-colors inline-flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                    title="View Technical Specs & Photos"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Specs</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 rounded-sm border border-[#0d2818] bg-[#0d2818] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#dfba77] shadow-md transition-all hover:bg-[#06140b] hover:shadow-lg"
          >
            <span>Browse Complete 12-Category Collections Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom Fast Quote Banner */}
        <div className="mt-14 rounded-sm border border-[#c49a45]/40 bg-[#0d2818] p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#dfba77]">
              Custom Looms &amp; Jacquard Weaving
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mt-1">
              Need custom GSM, yarn count, or jacquard woven logos?
            </h3>
            <p className="text-sm text-white/70 mt-2 max-w-xl">
              Our Solapur mill weaves custom hotel crests, dobby borders, and bespoke institutional colorways with lab-dip matching in 5 days.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote()}
            className="btn-gold whitespace-nowrap py-3.5 px-6 cursor-pointer"
          >
            <span>Request Custom Mill Quote</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Technical Spec Modal */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="w-full max-w-lg rounded-sm border border-[#c49a45]/50 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b pb-4 mb-4">
              <div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#c49a45]">
                  Mill Technical Specification
                </span>
                <h3 className="font-display text-xl font-bold text-[#0d2818]">
                  {activeModalProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="text-gray-400 hover:text-black p-1 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-body text-[#0d2818] mb-6">
              <div className="grid grid-cols-2 gap-2 bg-[#f4efe6] p-3 rounded-sm">
                <div>
                  <span className="text-[#7d776d] block text-[10px] uppercase font-bold">GSM Weight:</span>
                  <span className="font-semibold text-sm">{activeModalProduct.gsmRange}</span>
                </div>
                <div>
                  <span className="text-[#7d776d] block text-[10px] uppercase font-bold">Material:</span>
                  <span className="font-semibold text-sm">{activeModalProduct.material}</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#7d776d] block text-[10px] uppercase font-bold">Standard Size:</span>
                  <span className="font-semibold">{activeModalProduct.dimensions}</span>
                </div>
                <div className="mt-2">
                  <span className="text-[#7d776d] block text-[10px] uppercase font-bold">Export MOQ:</span>
                  <span className="font-semibold text-[#c49a45]">{activeModalProduct.minOrderQty}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#7d776d] block mb-1">
                  Key Construction Features:
                </span>
                <ul className="space-y-1">
                  {activeModalProduct.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <Check className="h-3.5 w-3.5 text-[#c49a45]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const title = activeModalProduct.title;
                  setActiveModalProduct(null);
                  onRequestQuote(undefined, title);
                }}
                className="w-full btn-gold py-2.5 text-xs"
              >
                Request Container Pricing &amp; Swatches
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
