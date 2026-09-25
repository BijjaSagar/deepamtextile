import React from "react";
import { ArrowRight, Tag, Palette, Box, Check, Bookmark, Sparkles } from "lucide-react";

interface PrivateLabelSectionProps {
  onRequestQuote: () => void;
}

export function PrivateLabelSection({ onRequestQuote }: PrivateLabelSectionProps) {
  const capabilities = [
    {
      icon: Palette,
      title: "Bespoke Pantone Color Matching",
      desc: "Vat and reactive yarn dyeing calibrated to exact Pantone TCX/TPG color codes with zero batch-to-batch deviation.",
    },
    {
      icon: Tag,
      title: "Custom Jacquard & Damask Labels",
      desc: "High-density satin woven labels, heat-transfer branding, and custom embossed dobby border crests woven into the towel body.",
    },
    {
      icon: Bookmark,
      title: "Tailored GSM & Loop Architecture",
      desc: "Choice between Zero-Twist (cloud soft), Low-Twist, Ring-Spun, or 2-ply long-staple yarns across 350 to 900 GSM.",
    },
    {
      icon: Box,
      title: "FSC Certified Retail Packaging",
      desc: "Ribbon tied bundles, custom printed card wraps, branded polybags, and retail-ready display cartons with universal EAN/UPC barcoding.",
    },
  ];

  return (
    <section id="private-label" className="scroll-mt-28 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-3.5 py-1 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-[#c49a45]" />
              <span className="font-body text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Turnkey OEM &amp; ODM Services
              </span>
            </div>

            <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-[#0d2818]">
              Private Label Manufacturing for Global Brands
            </h2>

            <p className="mt-6 font-body text-base leading-relaxed text-[#7d776d]">
              We operate as the discreet, high-caliber manufacturing partner for leading luxury hotel groups, department stores, and lifestyle homeware labels across South East Asia, the Middle East, and Europe.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <div key={idx} className="border-l-2 border-[#c49a45] pl-4">
                    <h4 className="font-display text-lg font-bold text-[#0d2818]">{cap.title}</h4>
                    <p className="font-body text-xs text-[#7d776d] mt-1 leading-relaxed">{cap.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <button
                onClick={onRequestQuote}
                className="btn-gold cursor-pointer"
              >
                <span>Launch Your Private Label Line</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative border border-[#dfd6c6] bg-[#f4efe6] p-8 md:p-12 shadow-lg rounded-sm">
            <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[#dfd6c6] mb-6">
              <img
                src="/images/products/bath-robes.jpg"
                alt="Private label bath textiles"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs text-[#0d2818]">
              <div className="flex items-center gap-2 font-medium">
                <Check className="h-4 w-4 text-[#c49a45]" />
                <span>NDA &amp; Proprietary Design Exclusivity Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Check className="h-4 w-4 text-[#c49a45]" />
                <span>Pre-Production Physical Counter-Samples Dispatched in 7-10 Days</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Check className="h-4 w-4 text-[#c49a45]" />
                <span>Full Regulatory Compliance with ASEAN, GCC &amp; European Import Codes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
