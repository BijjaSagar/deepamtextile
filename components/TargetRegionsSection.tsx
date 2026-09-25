"use client";

import React, { useState } from "react";
import { ArrowRight, Plane, Ship, Check, Award, Compass, ShieldCheck, MapPin, Anchor, Palmtree, Landmark } from "lucide-react";

interface TargetRegionsSectionProps {
  onRequestQuote: (region?: string) => void;
}

export function TargetRegionsSection({ onRequestQuote }: TargetRegionsSectionProps) {
  const [activeTab, setActiveTab] = useState<"sea" | "me" | "eur">("sea");

  const regionData = {
    sea: {
      name: "South East Asia",
      Icon: Palmtree,
      heroImage: "/images/products/pool-towels.jpg",
      subTitle: "Tropical Resort, Beach Club & Hotel Terry Programs",
      ports: "Nhava Sheva (Mumbai) → Singapore (7-9 Days), Port Klang (Malaysia), Bangkok (Thailand), Manila (Philippines)",
      keyMarkets: [
        { country: "Singapore", role: "Luxury 5-Star Urban Hotels & Serviced Apartments" },
        { country: "Indonesia (Bali)", role: "Private Pool Villas & Eco Beach Clubs" },
        { country: "Thailand (Phuket & Koh Samui)", role: "Resort Cabana Towels & Spa Linens" },
        { country: "Malaysia (Kuala Lumpur & Langkawi)", role: "Chain Hospitality Procurement" },
        { country: "Vietnam (Da Nang & Phu Quoc)", role: "Coastal Hotel & Resort Projects" },
        { country: "Philippines (Boracay & Cebu)", role: "High-Traffic Pool & Sun Lounger Towels" },
      ],
      climateSolutions: [
        "Capillary Action Yarn: Rapid moisture evaporation preventing lingering damp odor in 85%+ tropical humidity.",
        "Indanthrene / Vat Dyes: 100% colorfast against equatorial UV rays, saltwater, and frequent sun exposure.",
        "Anti-Microbial Finish: Specialized bio-wash prevents bacterial growth during high-rotation guest laundry.",
        "Lightweight 450 - 550 GSM: Fluffy hand-feel without the heavy drying time of temperate-zone towels.",
      ],
      recommendations: [
        { item: "Cabana Pool Sheets", spec: "90 x 180 cm · 550 GSM · Yarn-Dyed 2-inch Stripes" },
        { item: "Resort Bath Robes", spec: "Honeycomb Waffle or Lightweight Zero-Twist Kimono" },
        { item: "Eco Villa Bath Sets", spec: "100% Long-Staple Indian Combed Cotton · 500 GSM" },
      ],
    },
    me: {
      name: "Middle East",
      Icon: Landmark,
      heroImage: "/images/hero/hero-towel.jpg",
      subTitle: "Ultra-Luxury Palace Suites, Mega-Resorts & Institutional Supply",
      ports: "Direct Express Sea Routes: Mumbai → Jebel Ali / Dubai (4-5 Days), Dammam (6 Days), Jeddah (7 Days), Doha / Hamad (5 Days)",
      keyMarkets: [
        { country: "United Arab Emirates", role: "Dubai & Abu Dhabi 5-Star & 7-Star Properties, Beach Clubs" },
        { country: "Kingdom of Saudi Arabia", role: "Riyadh Corporate Hotels, Red Sea Project, NEOM, AlUla" },
        { country: "State of Qatar", role: "Doha Waterfront Hotels, VIP Private Villas, Luxury Spas" },
        { country: "Sultanate of Oman", role: "Muscat Boutique Heritage Resorts & Dive Sanctuaries" },
        { country: "Kingdom of Bahrain", role: "Hospitality & Corporate Gifting Programs" },
        { country: "State of Kuwait", role: "Luxury Department Stores & Private Label Bed/Bath Lines" },
      ],
      climateSolutions: [
        "Heavyweight 650 - 800 GSM: Opulent deep-pile density engineered for air-conditioned grand master suites.",
        "Gold Dobby & Jacquard Borders: Custom royal crest weaving, embossed borders, and metallic lurex options.",
        "Commercial Laundry Durability: Reinforced lock-stitched double hems withstanding heavy 80°C wash cycles.",
        "Egyptian-Grade Combed Cotton: Supreme softness and high absorbency suited for executive guest expectations.",
      ],
      recommendations: [
        { item: "Presidential Bath Towels", spec: "80 x 160 cm · 750 GSM · Zero Twist Combed Cotton" },
        { item: "Turnkey Bed Linen", spec: "400 - 600 Thread Count Sateen Stripe (1cm/2cm)" },
        { item: "VIP Spa & Tub Mats", spec: "60 x 90 cm · 1000 GSM Heavy Ribbed Border" },
      ],
    },
    eur: {
      name: "Europe",
      Icon: ShieldCheck,
      heroImage: "/images/products/bath-robes.jpg",
      subTitle: "OEKO-TEX® Standard 100, REACH & Sustainable Retail Ready",
      ports: "Direct Container Routes: Mumbai → Rotterdam (18-20 Days), Hamburg (20-22 Days), Felixstowe (19 Days), Genoa (16 Days)",
      keyMarkets: [
        { country: "United Kingdom", role: "Boutique Country House Hotels, High-Street Department Stores" },
        { country: "Federal Republic of Germany", role: "Strict Eco-Certified Hotel Chains & Wellness Sanatoriums" },
        { country: "French Republic", role: "Riviera Resort Beach Towels, Parisian Boutique Lodging" },
        { country: "Italian Republic", role: "Amalfi Coast & Tuscan Villa Spa Programs" },
        { country: "Kingdom of Spain", role: "Mediterranean Holiday Resorts & Private Label Linens" },
        { country: "Nordic Region (Denmark, Sweden)", role: "Minimalist Organic GOTS Earth-Tone Homeware Brands" },
      ],
      climateSolutions: [
        "OEKO-TEX® Standard 100 Class 1: Free of heavy metals, formaldehyde, and toxic azos. Safe for sensitive skin.",
        "GOTS Certified Organic: Traceable supply chain with organic combed cotton grown in verified Indian farms.",
        "Plastic-Free FSC Packaging: Shipped with recyclable cardboard belly bands, cotton ties, and barcode tags.",
        "Low-Impact Neutral Colorways: Pearl, Oat, Warm Sage, Deep Taupe, and Mineral Slate.",
      ],
      recommendations: [
        { item: "Sustainable Bath Towels", spec: "70 x 140 cm · 550 GSM · GOTS Organic Combed Yarn" },
        { item: "Waffle Spa Kimono", spec: "380 GSM Organic Cotton · Pre-Shrunk Sanforized" },
        { item: "Kitchen & Dining Linens", spec: "Herringbone Tea Towels · 300 GSM · Zero-Lint Finish" },
      ],
    },
  };

  const curr = regionData[activeTab];

  return (
    <section id="target-markets" className="scroll-mt-28 py-20 md:py-28 bg-[#f4efe6] border-y border-[#dfd6c6]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-white px-3.5 py-1 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c49a45]" />
            <span className="font-body text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
              Specialized Target Corridors
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3.25rem] font-medium leading-tight text-[#0d2818]">
            Direct Export Corridors: 3 Key Global Markets
          </h2>

          <p className="mt-4 font-body text-base text-[#7d776d] leading-relaxed">
            We operate purpose-engineered production, regional packaging compliance, and direct sea routes for buyers in:
          </p>

          {/* 3 Large Tab Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <button
              onClick={() => setActiveTab("sea")}
              className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                activeTab === "sea"
                  ? "bg-[#0d2818] text-white border-[#0d2818] shadow-lg ring-2 ring-[#c49a45]"
                  : "bg-white text-[#0d2818] border-[#dfd6c6] hover:border-[#c49a45]"
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${activeTab === "sea" ? "bg-[#dfba77]/20 text-[#dfba77]" : "bg-[#c49a45]/10 text-[#c49a45]"}`}>
                <Palmtree className="h-5 w-5" />
              </div>
              <p className="font-display text-lg font-bold mt-1">1. South East Asia</p>
              <p className={`text-[11px] mt-0.5 ${activeTab === "sea" ? "text-[#dfba77]" : "text-[#7d776d]"}`}>
                Singapore, Bali, Bangkok · Quick-Dry
              </p>
            </button>

            <button
              onClick={() => setActiveTab("me")}
              className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                activeTab === "me"
                  ? "bg-[#0d2818] text-white border-[#0d2818] shadow-lg ring-2 ring-[#c49a45]"
                  : "bg-white text-[#0d2818] border-[#dfd6c6] hover:border-[#c49a45]"
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${activeTab === "me" ? "bg-[#dfba77]/20 text-[#dfba77]" : "bg-[#c49a45]/10 text-[#c49a45]"}`}>
                <Landmark className="h-5 w-5" />
              </div>
              <p className="font-display text-lg font-bold mt-1">2. Middle East</p>
              <p className={`text-[11px] mt-0.5 ${activeTab === "me" ? "text-[#dfba77]" : "text-[#7d776d]"}`}>
                Dubai, Saudi Arabia, Qatar · 700+ GSM
              </p>
            </button>

            <button
              onClick={() => setActiveTab("eur")}
              className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                activeTab === "eur"
                  ? "bg-[#0d2818] text-white border-[#0d2818] shadow-lg ring-2 ring-[#c49a45]"
                  : "bg-white text-[#0d2818] border-[#dfd6c6] hover:border-[#c49a45]"
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${activeTab === "eur" ? "bg-[#dfba77]/20 text-[#dfba77]" : "bg-[#c49a45]/10 text-[#c49a45]"}`}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="font-display text-lg font-bold mt-1">3. Europe</p>
              <p className={`text-[11px] mt-0.5 ${activeTab === "eur" ? "text-[#dfba77]" : "text-[#7d776d]"}`}>
                UK, Germany, France · OEKO-TEX 100
              </p>
            </button>
          </div>
        </div>

        {/* Tab Detail Panel */}
        <div className="border border-[#dfd6c6] bg-white p-8 md:p-12 rounded-sm shadow-md">
          {/* Header of Active Region */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#dfd6c6] pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c49a45] mb-1">
                <curr.Icon className="h-4 w-4 text-[#c49a45] shrink-0" />
                <span>Regional Export Brief</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-[#0d2818]">
                {curr.name} — {curr.subTitle}
              </h3>
            </div>

            <button
              onClick={() => onRequestQuote(curr.name)}
              className="btn-gold shrink-0 cursor-pointer"
            >
              <span>Request {curr.name} RFQ &amp; Swatches</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Port Routing Bar */}
          <div className="rounded bg-[#0d2818] text-white p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <Anchor className="h-5 w-5 text-[#dfba77] shrink-0" />
              <div>
                <strong className="text-[#dfba77] block text-[11px] uppercase tracking-wider">
                  Direct Container Freight Schedule:
                </strong>
                <span className="text-white/80">{curr.ports}</span>
              </div>
            </div>
            <span className="rounded bg-white/10 px-3 py-1 text-[11px] text-[#dfba77] font-semibold shrink-0">
              Solapur Dry Port Loading Available
            </span>
          </div>

          {/* 3 Column Deep Dive Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Core Markets & Buyers */}
            <div>
              <p className="font-display text-lg font-bold text-[#0d2818] mb-3 border-b border-[#dfd6c6] pb-2">
                Primary Destinations
              </p>
              <ul className="space-y-3">
                {curr.keyMarkets.map((km, idx) => (
                  <li key={idx} className="border-l-2 border-[#c49a45] pl-3 py-0.5">
                    <strong className="text-xs font-bold text-[#0d2818] block">{km.country}</strong>
                    <span className="text-[11px] text-[#7d776d] block">{km.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Climate & Engineering Solutions */}
            <div>
              <p className="font-display text-lg font-bold text-[#0d2818] mb-3 border-b border-[#dfd6c6] pb-2">
                Engineered for Regional Needs
              </p>
              <ul className="space-y-3">
                {curr.climateSolutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#0d2818] leading-relaxed">
                    <Check className="h-4 w-4 text-[#c49a45] shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Recommended Product Formats */}
            <div className="bg-[#faf8f5] border border-[#dfd6c6] p-5 rounded-sm">
              <p className="font-display text-lg font-bold text-[#0d2818] mb-3 border-b border-[#dfd6c6] pb-2">
                Top Inquired Collections
              </p>
              <div className="space-y-4">
                {curr.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white p-3 border border-[#dfd6c6] rounded-sm">
                    <p className="text-xs font-bold text-[#0d2818]">{rec.item}</p>
                    <p className="text-[11px] text-[#7d776d] mt-1">{rec.spec}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onRequestQuote(curr.name)}
                  className="btn-navy w-full justify-center text-xs py-2.5"
                >
                  Download Regional Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
