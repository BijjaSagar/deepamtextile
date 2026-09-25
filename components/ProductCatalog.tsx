"use client";

import React, { useState } from "react";
import { ArrowRight, Check, SlidersHorizontal, Eye, X, Award } from "lucide-react";
import { ProductItem } from "@/lib/types";

interface ProductCatalogProps {
  initialProducts: ProductItem[];
  onRequestQuote: (region?: string, product?: string) => void;
}

export function ProductCatalog({ initialProducts, onRequestQuote }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "bath-towels", label: "Bath Towels" },
    { id: "hand-towels", label: "Hand Towels" },
    { id: "face-towels", label: "Face Towels" },
    { id: "bath-mats", label: "Bath Mats" },
    { id: "hotel-linen", label: "Hotel Linen" },
    { id: "bath-robes", label: "Bath Robes" },
    { id: "beach-towels", label: "Cabana & Beach" },
    { id: "pool-towels", label: "Resort Pool" },
    { id: "spa-towels", label: "Spa & Wellness" },
    { id: "kitchen-towels", label: "Kitchen Linen" },
    { id: "private-labeling", label: "Private Label OEM" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="scroll-mt-28 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-3.5 py-1 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c49a45]" />
            <span className="font-body text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
              B2B Hospitality &amp; Retail Catalog
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3.25rem] font-medium leading-tight text-[#0d2818]">
            Complete Terry &amp; Linen Export Range
          </h2>
          <p className="mt-4 font-body text-base text-[#7d776d]">
            Spun from 100% Indian combed cotton, customized for destination climate weights and laundry specs.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0d2818] text-[#dfba77] border border-[#c49a45] shadow-md"
                  : "bg-white border border-[#dfd6c6] text-[#0d2818] hover:border-[#c49a45] hover:bg-[#f4efe6]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group relative flex flex-col overflow-hidden border border-[#dfd6c6] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#c49a45] rounded-sm"
            >
              {/* Product Visual */}
              <div className="relative aspect-square overflow-hidden bg-[#f4efe6]">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* GSM Badge */}
                <div className="absolute top-3 left-3 bg-[#0d2818] text-[#dfba77] border border-[#c49a45]/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-md">
                  {prod.gsmRange}
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setSelectedProductForModal(prod)}
                  className="absolute bottom-3 right-3 bg-white/95 text-[#0d2818] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-[#c49a45] hover:text-white"
                  title="View Technical Specifications"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-5">
                <span className="font-body text-[10.5px] uppercase tracking-[0.2em] text-[#c49a45] font-bold">
                  {prod.material}
                </span>

                <h3 className="font-display text-xl font-medium text-[#0d2818] mt-1 group-hover:text-[#c49a45] transition-colors">
                  {prod.title}
                </h3>

                <p className="mt-2 font-body text-xs text-[#7d776d] line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Spec Snippets */}
                <div className="mt-4 pt-3 border-t border-[#dfd6c6] flex items-center justify-between text-[11px] text-[#0d2818]">
                  <span className="font-medium">MOQ: {prod.minOrderQty}</span>
                  <span className="text-[#c49a45] font-semibold">{prod.weaveType.split(",")[0]}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-[#dfd6c6] flex items-center gap-2">
                  <button
                    onClick={() => onRequestQuote(undefined, prod.title)}
                    className="btn-navy w-full justify-center text-[10.5px] py-2 px-3 group-hover:bg-[#0d2818] cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="h-3 w-3 text-[#dfba77]" />
                  </button>

                  <button
                    onClick={() => setSelectedProductForModal(prod)}
                    className="border border-[#dfd6c6] p-2 hover:bg-[#f4efe6] text-[#0d2818] rounded-sm transition-colors cursor-pointer"
                    title="Specs"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Label Callout Banner */}
        <div className="mt-16 rounded-sm border border-[#c49a45]/40 bg-[#0d2818] text-white p-8 md:p-10 text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-[10.5px] uppercase tracking-widest text-[#dfba77] font-bold">
            OEM &amp; Bespoke Specification
          </span>
          <p className="font-display text-2xl md:text-3xl text-white font-medium mt-1">
            Need Custom GSM, Pantone Yarn Dyeing, or Jacquard Logos?
          </p>
          <p className="mt-2 font-body text-xs md:text-sm text-white/75 max-w-2xl mx-auto">
            Our technical weaving team customizes warp/weft tension, zero-twist pile density, and woven damask branding tags for hotel chains and retailers across South East Asia, the Middle East, and Europe.
          </p>
          <button
            onClick={() => onRequestQuote(undefined, "Custom OEM Private Label Program")}
            className="btn-gold mt-6"
          >
            <span>Discuss Custom Private Labeling</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Spec Sheet Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl border border-[#dfd6c6] bg-white p-6 md:p-8 shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-5 right-5 text-[#7d776d] hover:text-[#0d2818] p-1"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="aspect-square bg-[#f4efe6] border border-[#dfd6c6] overflow-hidden rounded-sm">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.24em] text-[#c49a45] font-bold">
                  Technical Specification Sheet
                </span>
                <h3 className="font-display text-2xl text-[#0d2818] font-medium mt-1">
                  {selectedProductForModal.title}
                </h3>
                <p className="font-body text-xs text-[#7d776d] mt-2">
                  {selectedProductForModal.description}
                </p>

                <div className="mt-4 space-y-2 text-xs border-y border-[#dfd6c6] py-3">
                  <div className="flex justify-between">
                    <span className="text-[#7d776d]">Density / Weight:</span>
                    <strong className="text-[#0d2818]">{selectedProductForModal.gsmRange}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7d776d]">Fiber Content:</span>
                    <strong className="text-[#0d2818]">{selectedProductForModal.material}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7d776d]">Dimensions:</span>
                    <strong className="text-[#0d2818]">{selectedProductForModal.dimensions}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7d776d]">Weave Structure:</span>
                    <strong className="text-[#0d2818]">{selectedProductForModal.weaveType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7d776d]">Minimum Order (MOQ):</span>
                    <strong className="text-[#0d2818]">{selectedProductForModal.minOrderQty}</strong>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-[#7d776d] mb-2">
                    Key Performance Attributes:
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#0d2818]">
                    {selectedProductForModal.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-[#c49a45] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      const prodTitle = selectedProductForModal.title;
                      setSelectedProductForModal(null);
                      onRequestQuote(undefined, prodTitle);
                    }}
                    className="btn-gold w-full justify-center"
                  >
                    <span>Request Quotation for {selectedProductForModal.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
