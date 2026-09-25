"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  Phone,
  MessageCircle,
  FileText,
  ChevronRight,
  Building2,
  Ship,
  Scale,
  Maximize2,
  Globe,
} from "lucide-react";
import { ProductItem } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RfqModal } from "@/components/RfqModal";

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  // Gallery images list (ensures fallback to cover image if empty)
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image || "/images/products/bath-towels.jpg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = images[activeImageIndex] || images[0];

  const handleOpenRfq = () => {
    setRfqModalOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Deepam Textile, I am interested in inquiring about export manufacturing for: ${product.title} (${product.gsmRange}, MOQ: ${product.minOrderQty}). Please share price list and tech pack specs.`
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#19211c]">
      <Navbar onRequestQuote={handleOpenRfq} />

      <main className="pt-28 md:pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#857b6c] mb-8">
            <Link href="/" className="hover:text-[#0d2818] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#c49a45]" />
            <Link href="/collections" className="hover:text-[#0d2818] transition-colors">
              Collections
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#c49a45]" />
            <span className="text-[#0d2818] font-bold truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          {/* Product Overview 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Multi-Image Interactive Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Featured Image Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[#dfd6c6] bg-[#0d2818] shadow-md group">
                <img
                  src={activeImage}
                  alt={`${product.title} - Angle ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#06140b]/90 border border-[#c49a45]/40 px-3 py-1 text-[11px] font-bold text-[#dfba77] uppercase tracking-wider backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5 text-[#c49a45]" />
                    <span>{product.gsmRange}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-2 rounded-sm bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                    title="Enlarge Image"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Gallery Strip */}
              {images.length > 1 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#857b6c]">
                      Product Gallery ({images.length} Photos)
                    </span>
                    <span className="text-[11px] text-[#857b6c]">
                      Photo {activeImageIndex + 1} of {images.length}
                    </span>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-[4/3] w-24 sm:w-28 shrink-0 overflow-hidden rounded-sm border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-[#c49a45] shadow-md ring-2 ring-[#c49a45]/30 scale-102"
                            : "border-[#dfd6c6] opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mill Quality Assurance Callout */}
              <div className="p-4 rounded-sm border border-[#c49a45]/30 bg-[#f4efe6] flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#c49a45] shrink-0" />
                  <div>
                    <span className="font-bold text-[#0d2818] uppercase tracking-wider block">
                      Direct Mill Manufacturing
                    </span>
                    <span className="text-[#7d776d]">
                      Loomed on Airjet &amp; Rapier machines in Solapur, India. Dispatched via JNPT Mumbai.
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block text-right shrink-0">
                  <span className="text-[10px] font-mono font-bold text-[#c49a45] block">
                    100% EXPORT GRADE
                  </span>
                  <span className="text-[10.5px] text-[#0d2818]">OEKO-TEX Standard</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Details & Specs Table (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#0d2818] px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-[#dfba77] mb-3">
                  <Layers className="h-3 w-3" />
                  <span>Export Manufacturing Line</span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0d2818] leading-tight">
                  {product.title}
                </h1>

                <p className="mt-3 font-body text-sm md:text-base text-[#7d776d] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="rounded-sm border border-[#dfd6c6] bg-white p-5 shadow-sm space-y-3">
                <h3 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#0d2818] border-b border-[#dfd6c6] pb-2">
                  Technical Manufacturing Specs
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#857b6c] font-medium">Weight (GSM):</span>
                    <span className="font-bold text-[#0d2818] font-mono">{product.gsmRange}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#857b6c] font-medium">Fiber / Yarn:</span>
                    <span className="font-semibold text-[#0d2818] text-right">{product.material}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#857b6c] font-medium">Standard Cut Sizes:</span>
                    <span className="font-medium text-[#0d2818] text-right">{product.dimensions}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#857b6c] font-medium">Weave Structure:</span>
                    <span className="font-medium text-[#0d2818] text-right">{product.weaveType}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#857b6c] font-medium">Minimum Order (MOQ):</span>
                    <span className="font-bold text-[#c49a45]">{product.minOrderQty}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-[#857b6c] font-medium">Shipping Terms:</span>
                    <span className="font-medium text-[#0d2818]">FOB JNPT Mumbai / CIF Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Technical Bullet Features */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0d2818]">
                    Key Quality Attributes:
                  </h4>
                  <div className="space-y-1.5">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5a665d]">
                        <CheckCircle2 className="h-4 w-4 text-[#c49a45] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Request RFQ + WhatsApp Direct */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleOpenRfq}
                  className="btn-gold w-full flex items-center justify-center gap-2.5 py-3.5 px-6 text-xs uppercase tracking-widest font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  <FileText className="h-4 w-4" />
                  <span>Request Export Quote for this Product</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href={`https://wa.me/917066148936?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-sm border border-emerald-700 bg-emerald-800/10 hover:bg-emerald-800 text-emerald-900 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 group-hover:text-white" />
                  <span>Inquire on WhatsApp (+91 70661 48936)</span>
                </a>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS SECTION */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-[#dfd6c6]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c49a45]">
                    Complementary Lines
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0d2818]">
                    Related Export Collections
                  </h3>
                </div>
                <Link
                  href="/collections"
                  className="text-xs font-semibold uppercase tracking-wider text-[#0d2818] hover:text-[#c49a45] inline-flex items-center gap-1.5"
                >
                  <span>Browse All 12 Lines</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.slug}`}
                    className="group block rounded-sm border border-[#dfd6c6] bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-[#c49a45] transition-all"
                  >
                    <div className="relative aspect-[16/10] bg-[#0d2818] overflow-hidden">
                      <img
                        src={rel.image || "/images/products/bath-towels.jpg"}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#06140b]/80 px-2 py-0.5 rounded-sm text-[10px] font-mono text-[#dfba77] font-semibold uppercase">
                        {rel.gsmRange}
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-display text-base font-bold text-[#0d2818] group-hover:text-[#c49a45] transition-colors truncate">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#7d776d] mt-1 line-clamp-2">
                        {rel.description}
                      </p>
                      <div className="mt-3 pt-2 border-t border-[#dfd6c6] flex items-center justify-between text-[11px]">
                        <span className="text-[#857b6c]">MOQ: {rel.minOrderQty}</span>
                        <span className="text-[#c49a45] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          <span>View Specs</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-[85vh] max-w-full object-contain mx-auto"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:text-[#dfba77]"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* RFQ Quote Modal */}
      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultProduct={product.title}
      />

      <Footer onRequestQuote={handleOpenRfq} />
    </div>
  );
}
