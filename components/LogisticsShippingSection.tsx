"use client";

import React, { useState } from "react";
import { Ship, Clock, Box, FileText, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

interface LogisticsShippingSectionProps {
  onRequestQuote: (region?: string) => void;
}

export function LogisticsShippingSection({ onRequestQuote }: LogisticsShippingSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("sea");
  const [selectedContainer, setSelectedContainer] = useState<string>("40hc");

  const routeData: Record<
    string,
    {
      name: string;
      icon: string;
      originPort: string;
      ports: { port: string; country: string; transit: string; frequency: string }[];
      incoterms: string[];
      notes: string;
    }
  > = {
    sea: {
      name: "South East Asia Corridor",
      icon: "🌏",
      originPort: "JNPT / Nhava Sheva (Mumbai) & Solapur Inland Dry Port",
      ports: [
        { port: "Port of Singapore", country: "Singapore", transit: "7 - 9 Days", frequency: "4 sailings / week" },
        { port: "Port Klang", country: "Malaysia", transit: "8 - 10 Days", frequency: "3 sailings / week" },
        { port: "Tanjung Priok / Bali via JKT", country: "Indonesia", transit: "9 - 12 Days", frequency: "2 sailings / week" },
        { port: "Laem Chabang / Bangkok", country: "Thailand", transit: "10 - 12 Days", frequency: "3 sailings / week" },
        { port: "Da Nang / Cat Lai", country: "Vietnam", transit: "11 - 14 Days", frequency: "2 sailings / week" },
      ],
      incoterms: ["FOB Nhava Sheva", "CIF Singapore", "CIF Port Klang", "CFR Bangkok"],
      notes: "Direct express coastal feed from Solapur Dry Port with dedicated moisture-proof container lining for tropical monsoons.",
    },
    me: {
      name: "Middle East Corridor",
      icon: "🕌",
      originPort: "JNPT / Nhava Sheva (Mumbai) & Mundra",
      ports: [
        { port: "Jebel Ali Port", country: "UAE (Dubai / Abu Dhabi)", transit: "4 - 5 Days", frequency: "Daily sailings" },
        { port: "King Abdulaziz Port (Dammam)", country: "Saudi Arabia (Eastern)", transit: "6 - 7 Days", frequency: "4 sailings / week" },
        { port: "Jeddah Islamic Port", country: "Saudi Arabia (Western/NEOM)", transit: "7 - 9 Days", frequency: "3 sailings / week" },
        { port: "Hamad Port", country: "Qatar (Doha)", transit: "5 - 6 Days", frequency: "3 sailings / week" },
        { port: "Sultan Qaboos / Sohar", country: "Oman", transit: "4 - 5 Days", frequency: "3 sailings / week" },
      ],
      incoterms: ["FOB Nhava Sheva", "CIF Jebel Ali", "CIF Dammam", "CFR Hamad"],
      notes: "Fastest international trade corridor. Cargo loaded at Solapur mill arrives at Dubai distributor warehouses within 8-10 days total.",
    },
    eur: {
      name: "Europe Corridor",
      icon: "🇪🇺",
      originPort: "JNPT / Nhava Sheva (Mumbai)",
      ports: [
        { port: "Port of Hamburg", country: "Germany", transit: "18 - 20 Days", frequency: "Weekly direct liner" },
        { port: "Port of Rotterdam", country: "Netherlands", transit: "19 - 21 Days", frequency: "Weekly direct liner" },
        { port: "Port of Antwerp-Bruges", country: "Belgium", transit: "19 - 21 Days", frequency: "Weekly direct liner" },
        { port: "London Gateway / Felixstowe", country: "United Kingdom", transit: "20 - 22 Days", frequency: "Weekly direct liner" },
        { port: "Port of Genoa / Barcelona", country: "Italy / Spain", transit: "16 - 18 Days", frequency: "Weekly direct liner" },
      ],
      incoterms: ["FOB Nhava Sheva", "CIF Hamburg", "CIF Rotterdam", "DDP European Hub"],
      notes: "Full EU compliant export pack: GSP Certificate of Origin Form A/REX, REACH compliance declaration, and 100% plastic-free pallet wrap.",
    },
  };

  const containerSpecs = {
    "20fcl": {
      name: "20ft FCL (Full Container Load)",
      capacity: "~4,500 - 5,000 kg gross weight",
      towelUnits: "Approx. 12,000 - 15,000 Bath Towels (500 GSM)",
      cartons: "Approx. 280 - 320 Export Master Cartons",
      idealFor: "Boutique hotel chains, regional distributors, seasonal resort stock",
    },
    "40hc": {
      name: "40ft High Cube FCL (Standard Export)",
      capacity: "~10,500 - 11,500 kg gross weight",
      towelUnits: "Approx. 28,000 - 34,000 Bath Towels (500 GSM)",
      cartons: "Approx. 620 - 680 Export Master Cartons",
      idealFor: "Hospitality procurement groups, supermarket retail lines, mega-resorts",
    },
  };

  const activeRoute = routeData[selectedRegion];
  const activeContainerInfo = containerSpecs[selectedContainer as keyof typeof containerSpecs];

  return (
    <section id="logistics" className="scroll-mt-24 py-20 md:py-28 bg-[#06140b] text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#c49a45]/10 px-4 py-1.5 mb-4">
            <Ship className="h-3.5 w-3.5 text-[#dfba77]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.24em] text-[#dfba77]">
              Direct Sea Freight Infrastructure
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-white">
            Export Logistics to <span className="text-gold-gradient font-semibold">Our 3 Corridors</span>
          </h2>

          <p className="mt-4 font-body text-base text-white/70 leading-relaxed">
            From the Solapur Inland Container Depot (ICD) through Nhava Sheva (JNPT Mumbai) to leading international seaports.
          </p>

          {/* Region Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {Object.entries(routeData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedRegion === key
                    ? "bg-[#c49a45] text-[#06140b] border-[#dfba77] shadow-lg font-bold"
                    : "bg-[#0d2818] text-white/80 border-white/15 hover:border-[#c49a45]"
                }`}
              >
                <span>{data.icon}</span>
                <span>{data.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Logistics Stage */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          {/* Left: Port Routing Schedule */}
          <div className="rounded-sm border border-[#c49a45]/30 bg-[#0d2818] p-7 md:p-9 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#dfba77]">
                    Loading Hub: {activeRoute.originPort}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {activeRoute.name} Ports &amp; Transit Times
                  </h3>
                </div>
              </div>

              {/* Port Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-xs font-body">
                  <thead>
                    <tr className="border-b border-white/10 text-[#dfba77] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5">Discharge Port</th>
                      <th className="py-2.5">Country</th>
                      <th className="py-2.5">Port-to-Port Transit</th>
                      <th className="py-2.5">Sailing Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeRoute.ports.map((p, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-semibold text-white">{p.port}</td>
                        <td className="py-3 text-white/70">{p.country}</td>
                        <td className="py-3 font-mono font-bold text-[#dfba77]">{p.transit}</td>
                        <td className="py-3 text-white/60">{p.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-sm bg-white/5 border border-white/10 text-xs text-white/80 leading-relaxed mb-6">
                <strong className="text-[#dfba77] block font-semibold mb-1">Corridor Note:</strong>
                {activeRoute.notes}
              </div>

              {/* Incoterms Supported */}
              <div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-white/50 block mb-2">
                  Supported Commercial Incoterms:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRoute.incoterms.map((term, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-sm bg-[#06140b] border border-[#c49a45]/40 text-xs font-mono text-[#dfba77]"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <button
                onClick={() => onRequestQuote(activeRoute.name.replace(" Corridor", ""))}
                className="btn-gold w-full text-center cursor-pointer"
              >
                <span>Request {activeRoute.name} Shipping Quotation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Container Volume & Documentation Calculator */}
          <div className="rounded-sm border border-white/10 bg-[#0d2818] p-7 md:p-9 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#dfba77] block mb-1">
                FCL Container Load Estimator
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Standard Container Packing
              </h3>

              {/* Container Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  onClick={() => setSelectedContainer("20fcl")}
                  className={`py-2.5 px-3 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedContainer === "20fcl"
                      ? "bg-[#c49a45] text-[#06140b] border-[#dfba77] font-bold"
                      : "bg-[#06140b] text-white/70 border-white/15"
                  }`}
                >
                  20ft FCL (~4.5 Tons)
                </button>
                <button
                  onClick={() => setSelectedContainer("40hc")}
                  className={`py-2.5 px-3 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedContainer === "40hc"
                      ? "bg-[#c49a45] text-[#06140b] border-[#dfba77] font-bold"
                      : "bg-[#06140b] text-white/70 border-white/15"
                  }`}
                >
                  40ft High Cube (~11 Tons)
                </button>
              </div>

              {/* Active Container Specs */}
              <div className="space-y-3 bg-[#06140b] p-5 rounded-sm border border-white/10 text-xs font-body mb-6">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Container Type:</span>
                  <span className="font-semibold text-white">{activeContainerInfo.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Gross Weight Capacity:</span>
                  <span className="font-semibold text-[#dfba77]">{activeContainerInfo.capacity}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Estimated Bath Towel Units:</span>
                  <span className="font-semibold text-white">{activeContainerInfo.towelUnits}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Master Export Cartons:</span>
                  <span className="font-semibold text-white">{activeContainerInfo.cartons}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white/60">Best Suited For:</span>
                  <span className="font-medium text-white/90 text-right">{activeContainerInfo.idealFor}</span>
                </div>
              </div>

              {/* Export Documentation Included */}
              <div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#dfba77] block mb-3">
                  Export Clearance Documents Provided:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#dfba77]" />
                    <span>Bill of Lading (Clean on Board)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#dfba77]" />
                    <span>Certificate of Origin (COO / REX)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#dfba77]" />
                    <span>Commercial Invoice &amp; Packing List</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#dfba77]" />
                    <span>Mill Inspection &amp; GSM Test Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#dfba77]" />
                    <span>Fumigation Certificate (Pallets)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#dfba77]" />
                    <span>SGS / Intertek Inspection (Optional)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Solapur ICD Code: INSOL6</span>
              <span className="text-[#dfba77] font-semibold">JNPT Port Code: INNSA1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
