"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Ship, Sparkles, ShieldCheck, CheckCircle2, Clock, Globe2, ChevronRight } from "lucide-react";

interface HeroProps {
  onRequestQuote: (region?: string) => void;
}

export function Hero({ onRequestQuote }: HeroProps) {
  const [activeCorridor, setActiveCorridor] = useState<number>(0);

  const corridors = [
    {
      id: "sea",
      name: "South East Asia",
      tagline: "Tropical Resort & Island Villa Collection",
      icon: "🌏",
      heroImage: "/images/regions/southeast-asia.jpg",
      transitDays: "7 - 9 Days Sea Transit",
      dischargePorts: "Singapore · Port Klang · Bangkok · Manila · Da Nang",
      targetBuyers: "Luxury Beach Resorts, Private Pool Villas, Wellness Eco-Retreats",
      climateChallenge: "85%+ Tropical Humidity & High UV Sunlight",
      millSolution: "Rapid-Capillary Quick-Dry Loop Terry (450-520 GSM) with Anti-Mildew Bio-Wash & Indanthrene Vat Dyes.",
      specs: [
        { label: "Optimal Weight", val: "450 - 520 GSM" },
        { label: "Yarn Construction", val: "100% Combed 20/2 Zero-Twist" },
        { label: "Colorfastness", val: "Grade 4.5 against Salt & Sun" },
        { label: "Drying Rate", val: "2.4x Faster than Heavy Terry" },
      ],
      recommendedProducts: ["Cabana Striped Pool Sheets", "Lightweight Bamboo Kimono", "Anti-Sand Beach Towels"],
    },
    {
      id: "me",
      name: "Middle East",
      tagline: "GCC Royal Palace & 7-Star Suite Collection",
      icon: "🕌",
      heroImage: "/images/regions/middle-east.jpg",
      transitDays: "4 - 5 Days Direct Sea Transit",
      dischargePorts: "Jebel Ali (Dubai) · Dammam · Jeddah · Doha · Shuwaikh",
      targetBuyers: "Presidential Hotel Suites, VIP Palaces, NEOM & Red Sea Projects",
      climateChallenge: "Arid Desert Heat, High-Salinity Water, High-Temperature Laundry",
      millSolution: "Ultra-Plush 700-800 GSM Long-Staple Egyptian & Indian Cotton with Ornate Jacquard Gold Dobby Borders.",
      specs: [
        { label: "Optimal Weight", val: "700 - 800 GSM Heavyweight" },
        { label: "Yarn Construction", val: "Long-Staple 2-Ply Ring Spun" },
        { label: "Border Finish", val: "Custom Woven Dobby / Jacquard" },
        { label: "Wash Longevity", val: "250+ Commercial Hotel Washes" },
      ],
      recommendedProducts: ["Presidential Bath Sheets (100x180cm)", "Gold Dobby Towel Sets", "Velvet Velour Luxury Robes"],
    },
    {
      id: "eur",
      name: "Europe",
      tagline: "Eco-Hospitality & Circular Sustainable Linen",
      icon: "🇪🇺",
      heroImage: "/images/regions/europe.jpg",
      transitDays: "18 - 22 Days Sea Transit",
      dischargePorts: "Hamburg · Rotterdam · Antwerp · Felixstowe · Genoa",
      targetBuyers: "Eco-Boutique Hotels, Alpine Spas, High-Street Retail Chains",
      climateChallenge: "Strict REACH Chemical Bans, ESG Audits, Micro-Plastic Regulations",
      millSolution: "GOTS Organic Certified Cotton & OEKO-TEX Standard 100 Class 1, Zero-Plastic FSC Paper Strapping.",
      specs: [
        { label: "Optimal Weight", val: "500 - 600 GSM Balanced" },
        { label: "Certification", val: "OEKO-TEX Class 1 & GOTS" },
        { label: "Packaging", val: "100% Plastic-Free FSC Kraft Bands" },
        { label: "Audit Standard", val: "Sedex SMETA 4-Pillar Audited" },
      ],
      recommendedProducts: ["Organic Waffle Weave Towels", "Low-Carbon Hotel Terry", "Scandinavian Spa Wraps"],
    },
  ];

  const current = corridors[activeCorridor];

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#06140b] text-white">
      {/* Background glow & subtle textile grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(1000px 600px at 50% -10%, rgba(196, 154, 69, 0.25), transparent 70%),
            radial-gradient(800px 500px at 90% 40%, rgba(13, 40, 24, 0.6), transparent 60%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Top Badges & Mission */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#c49a45]/10 px-4 py-1.5 mb-5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#dfba77]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.26em] text-[#dfba77]">
              Solapur Direct Mill Manufacturing
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-white">
            Engineered For 3 Global <span className="text-gold-gradient font-semibold">Hospitality Corridors</span>.
          </h1>

          <p className="mt-4 font-body text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            We do not manufacture one-size-fits-all towels. Deepam Textile custom-looms terry and linen calibrated specifically to the climate, washing chemistry, and luxury standards of:
          </p>

          {/* 3 Corridor Selector Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {corridors.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCorridor(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCorridor === idx
                    ? "bg-gradient-to-r from-[#c49a45] to-[#9a752a] text-white border-[#dfba77] shadow-[0_0_25px_rgba(196,154,69,0.4)] scale-105"
                    : "bg-[#0d2818] text-white/80 border-white/15 hover:border-[#c49a45] hover:text-white"
                }`}
              >
                <span className="text-base">{c.icon}</span>
                <span className="font-display tracking-normal text-sm font-semibold">{c.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({c.transitDays.split(" ")[0]}d)</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Live Interactive Corridor Command Stage */}
        <div className="rounded-sm border border-[#c49a45]/30 bg-[#0d2818]/90 shadow-2xl backdrop-blur-xl overflow-hidden grid lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          {/* Left: Detailed Regional Specifications & Engineering */}
          <div className="p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              {/* Corridor Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#dfba77]">
                    <span>{current.icon}</span>
                    <span>Corridor #{activeCorridor + 1} Profile</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mt-1">
                    {current.name} — {current.tagline}
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/30 bg-[#06140b] px-3.5 py-1 text-xs text-[#dfba77] font-mono">
                  <Clock className="h-3 w-3" />
                  <span>{current.transitDays}</span>
                </div>
              </div>

              {/* Climate Challenge vs Mill Solution */}
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-sm bg-white/5 border border-white/10">
                  <p className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#dfba77] mb-1">
                    Regional Climate Challenge:
                  </p>
                  <p className="text-sm text-white/90 leading-relaxed font-body">
                    {current.climateChallenge}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#c49a45]/10 border border-[#c49a45]/30">
                  <p className="text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#dfba77] mb-1">
                    Deepam Mill Engineering:
                  </p>
                  <p className="text-sm text-white leading-relaxed font-body font-medium">
                    {current.millSolution}
                  </p>
                </div>
              </div>

              {/* Technical Spec Matrix Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {current.specs.map((s, i) => (
                  <div key={i} className="p-3.5 rounded-sm bg-[#06140b]/70 border border-white/10">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">
                      {s.label}
                    </span>
                    <span className="text-sm font-semibold text-[#dfba77] mt-1 block font-display">
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Destination Sea Ports */}
              <div className="text-xs text-white/70 mb-6">
                <strong className="text-white font-medium">Direct Discharge Ports:</strong> {current.dischargePorts}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onRequestQuote(current.name)}
                className="btn-gold cursor-pointer"
              >
                <span>Request {current.name} Container Quote &amp; Swatches</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#specs-matrix"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#dfba77] hover:text-white transition-colors"
              >
                <span>Compare Specs</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Real Photography Showcase & Recommended Lines */}
          <div className="relative bg-[#06140b] flex flex-col">
            <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
              <img
                src={current.heroImage}
                alt={`${current.name} Luxury Hotel Textile Program`}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818] via-transparent to-transparent" />
              <div className="absolute top-4 right-4 bg-[#06140b]/85 backdrop-blur-md border border-[#c49a45]/40 px-3 py-1.5 rounded-sm text-[11px] font-semibold text-[#dfba77]">
                {current.icon} Tested for {current.name} Standards
              </div>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba77] mb-3">
                  Signature Collections for {current.name}:
                </p>
                <div className="space-y-2.5">
                  {current.recommendedProducts.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-sm bg-white/5 border border-white/10 hover:border-[#c49a45]/40 transition-colors cursor-pointer"
                      onClick={() => onRequestQuote(current.name)}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#dfba77]" />
                        <span className="text-sm font-medium text-white">{p}</span>
                      </div>
                      <span className="text-xs text-[#dfba77] font-semibold">RFQ →</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span>Direct Mill FOB Nhava Sheva</span>
                <span className="text-[#dfba77] font-semibold">MOQ: 500 Pcs per Size</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Compliance & Port Guarantee Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-sm bg-[#0d2818]/70 border border-white/10">
            <span className="font-display text-xl text-[#dfba77] block font-bold">7-9 Days</span>
            <span className="text-[11px] uppercase tracking-wider text-white/60 mt-1 block">To Singapore &amp; ASEAN</span>
          </div>
          <div className="p-4 rounded-sm bg-[#0d2818]/70 border border-white/10">
            <span className="font-display text-xl text-[#dfba77] block font-bold">4-5 Days</span>
            <span className="text-[11px] uppercase tracking-wider text-white/60 mt-1 block">Direct to Jebel Ali (Dubai)</span>
          </div>
          <div className="p-4 rounded-sm bg-[#0d2818]/70 border border-white/10">
            <span className="font-display text-xl text-[#dfba77] block font-bold">18-22 Days</span>
            <span className="text-[11px] uppercase tracking-wider text-white/60 mt-1 block">To Hamburg &amp; Rotterdam</span>
          </div>
          <div className="p-4 rounded-sm bg-[#0d2818]/70 border border-white/10">
            <span className="font-display text-xl text-[#dfba77] block font-bold">100% Cotton</span>
            <span className="text-[11px] uppercase tracking-wider text-white/60 mt-1 block">OEKO-TEX &amp; GOTS Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
