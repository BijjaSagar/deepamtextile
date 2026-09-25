"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Ship, ShieldCheck, Download, Palmtree, Landmark } from "lucide-react";

interface RegionalMatrixSectionProps {
  onRequestQuote: (region?: string) => void;
}

export function RegionalMatrixSection({ onRequestQuote }: RegionalMatrixSectionProps) {
  const regions = [
    {
      name: "South East Asia",
      Icon: Palmtree,
      tagline: "Tropical Quick-Dry & Anti-Mildew",
      countries: "Singapore · Malaysia · Indonesia (Bali) · Thailand · Vietnam · Philippines",
      gsm: "450 - 520 GSM",
      yarn: "20/2 Combed Cotton (Zero-Twist Soft Pile)",
      drying: "Rapid Capillary Drying (under 45 min in 80% humidity)",
      climateTrait: "Anti-Mildew bio-finish preventing lingering damp odor",
      dyeing: "Indanthrene Vat Dyes (Grade 4.5 against Equatorial UV & Pool Salt)",
      shrinkage: "< 3.0% after 50 industrial wash cycles",
      transit: "7 - 9 Days (JNPT to Singapore / Port Klang)",
      moq: "500 Pcs per SKU / 1x20ft FCL container",
      packaging: "Moisture-sealed polybag with silica pack per carton",
      badge: "ASEAN Resort Standard",
      popularItem: "Cabana Striped Pool Towel 90x180cm",
    },
    {
      name: "Middle East",
      Icon: Landmark,
      tagline: "Ultra-Plush 750+ GSM Royal Suites",
      countries: "UAE (Dubai, Abu Dhabi) · Saudi Arabia (NEOM, Riyadh) · Qatar · Oman · Kuwait",
      gsm: "700 - 800 GSM Heavyweight",
      yarn: "Extra-Long Staple (ELS) Combed Ring-Spun 2-Ply",
      drying: "Heavy loft, high liquid absorbency (holds 6.5x dry weight)",
      climateTrait: "Engineered for desert heat, hard water & high-temp laundry",
      dyeing: "High-temperature reactive dye, chlorine & sun bleached-proof",
      shrinkage: "< 2.5% with pre-shrunk longitudinal borders",
      transit: "4 - 5 Days (JNPT to Jebel Ali Dubai / Dammam)",
      moq: "500 Pcs per SKU / 1x20ft FCL container",
      packaging: "Gold foil hot-stamped bellyband in luxury cartons",
      badge: "GCC Palace Standard",
      popularItem: "Presidential Bath Sheet 100x180cm (800 GSM)",
    },
    {
      name: "Europe",
      Icon: ShieldCheck,
      tagline: "GOTS Organic & Circular Eco-Linen",
      countries: "Germany · United Kingdom · France · Italy · Spain · Netherlands · Nordics",
      gsm: "500 - 600 GSM Balanced",
      yarn: "100% GOTS Certified Organic Long-Staple Cotton",
      drying: "Fast energy-efficient tumble drying (low carbon footprint)",
      climateTrait: "REACH Compliant, Zero chemical AZO dyes, OEKO-TEX Class 1",
      dyeing: "Bio-enzyme soft wash, low-temperature water-based dyeing",
      shrinkage: "< 2.0% with reinforced double-needle stitched hems",
      transit: "18 - 22 Days (JNPT to Hamburg / Rotterdam / Felixstowe)",
      moq: "500 Pcs per SKU / 1x20ft FCL container",
      packaging: "100% Plastic-Free FSC Certified Paper Wrap",
      badge: "European ESG Compliant",
      popularItem: "Honeycomb Waffle Spa Wrap & Towel Set",
    },
  ];

  return (
    <section id="specs-matrix" className="scroll-mt-24 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#c49a45]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
              Comparative Technical Matrix
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-[#0d2818]">
            How We Engineer For <span className="text-gold-gradient font-semibold">Each Target Region</span>
          </h2>

          <p className="mt-4 font-body text-base text-[#7d776d] leading-relaxed">
            A single towel specification cannot perform equally in tropical Bali humidity, the arid luxury of Dubai palaces, and eco-certified European boutique hotels. Here is how our Solapur mill custom-weaves for each market:
          </p>
        </div>

        {/* 3-Way Comparative Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {regions.map((reg, idx) => (
            <div
              key={idx}
              className={`rounded-sm border flex flex-col justify-between transition-all duration-300 ${
                idx === 1
                  ? "bg-[#0d2818] text-white border-[#c49a45] shadow-xl md:-translate-y-2"
                  : "bg-white text-[#0d2818] border-[#dfd6c6] shadow-sm hover:border-[#c49a45]"
              }`}
            >
              {/* Card Top */}
              <div className="p-7 md:p-8">
                <div className="flex items-center justify-between gap-2 border-b pb-4 mb-6 border-current/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${idx === 1 ? "bg-[#dfba77]/20 text-[#dfba77]" : "bg-[#c49a45]/15 text-[#c49a45]"}`}>
                      <reg.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight">
                        {reg.name}
                      </h3>
                      <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#c49a45]">
                        {reg.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className={`text-xs mb-6 font-body leading-relaxed ${idx === 1 ? "text-white/70" : "text-[#7d776d]"}`}>
                  <strong className="block text-current font-semibold mb-1">Target Buyers:</strong>
                  {reg.countries}
                </p>

                {/* Specs List */}
                <div className="space-y-4 text-xs font-body">
                  <div className="border-t border-current/10 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c49a45] block">
                      Target Weight (GSM)
                    </span>
                    <span className="text-base font-display font-bold mt-0.5 block">
                      {reg.gsm}
                    </span>
                  </div>

                  <div className="border-t border-current/10 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c49a45] block">
                      Yarn &amp; Pile Structure
                    </span>
                    <span className="font-medium mt-0.5 block">
                      {reg.yarn}
                    </span>
                  </div>

                  <div className="border-t border-current/10 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c49a45] block">
                      Climate Adaptation
                    </span>
                    <span className="font-medium mt-0.5 block">
                      {reg.climateTrait}
                    </span>
                  </div>

                  <div className="border-t border-current/10 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c49a45] block">
                      Dyeing &amp; Fastness
                    </span>
                    <span className="font-medium mt-0.5 block">
                      {reg.dyeing}
                    </span>
                  </div>

                  <div className="border-t border-current/10 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c49a45] block">
                      Direct Sea Transit Time
                    </span>
                    <span className="font-semibold text-[#c49a45] mt-0.5 block font-mono">
                      {reg.transit}
                    </span>
                  </div>

                  <div className="border-t border-current/10 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c49a45] block">
                      Regional Packaging Standard
                    </span>
                    <span className="font-medium mt-0.5 block">
                      {reg.packaging}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="p-7 md:p-8 pt-0">
                <button
                  onClick={() => onRequestQuote(reg.name)}
                  className={`w-full py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    idx === 1
                      ? "btn-gold"
                      : "bg-[#0d2818] text-white hover:bg-[#c49a45]"
                  }`}
                >
                  <span>Request {reg.name} Swatches</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Corridors Hub */}
        <div className="mt-12 text-center">
          <Link
            href="/corridors"
            className="inline-flex items-center gap-2.5 rounded-sm border border-[#0d2818] bg-[#0d2818] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#dfba77] shadow-md transition-all hover:bg-[#06140b] hover:shadow-lg"
          >
            <span>Explore Comprehensive Corridor Analysis &amp; Climatic Formulations</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
