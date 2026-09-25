"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LogisticsShippingSection } from "@/components/LogisticsShippingSection";
import { RfqModal } from "@/components/RfqModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Ship,
  Anchor,
  Clock,
  PackageCheck,
  FileText,
  Boxes,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Truck,
  Building2,
  Compass,
} from "lucide-react";

export function LogisticsClient() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);

  const handleOpenRfq = (region?: string) => {
    setSelectedRegion(region);
    setRfqModalOpen(true);
  };

  const containerSpecs = [
    {
      type: "20ft FCL Dry Standard",
      volume: "33.2 CBM Capacity",
      payload: "Net Towel Weight: ~4,200 - 4,800 kg",
      towelCount: "Approx. 7,500 – 9,000 Heavy Bath Towels",
      palletOption: "10 Standard Euro Pallets / 11 Industrial Pallets",
      bestFor: "Trial shipments, boutique hotel groups, and urgent seasonal restocking.",
    },
    {
      type: "40ft High Cube (HQ)",
      volume: "76.4 CBM Capacity",
      payload: "Net Towel Weight: ~9,800 - 11,500 kg",
      towelCount: "Approx. 18,000 – 22,000 Heavy Bath Towels",
      palletOption: "22 Standard Euro Pallets / 24 Industrial Pallets",
      bestFor: "Contract hotel chains, wholesale linen distributors, and annual institutional procurement.",
    },
  ];

  const exportDocs = [
    {
      name: "Commercial Invoice & Detailed Packing List",
      desc: "Itemized with exact net/gross weights, CBM volume, yarn lot numbers, and HS Codes (6302.60).",
    },
    {
      name: "Clean On-Board Ocean Bill of Lading (B/L)",
      desc: "Direct shipping lines (Maersk, MSC, Hapag-Lloyd, CMA-CGM) with express telex release support.",
    },
    {
      name: "Preferential Certificate of Origin",
      desc: "Chamber of Commerce verified documentation enabling duty concessions under AIFTA, CEPA & GSP+.",
    },
    {
      name: "Pre-Shipment Mill Quality Certificate",
      desc: "Independent batch test reports for GSM verification, color fastness, and dimensional stability.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] text-[#19211c]">
      <Navbar onRequestQuote={handleOpenRfq} />

      <main className="flex-1 pt-24 md:pt-28">
        {/* Dedicated Logistics Hero */}
        <section className="relative bg-[#0d2818] text-white py-16 md:py-24 border-b border-[#c49a45]/30 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c49a45_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#dfba77] mb-3">
              <Link href="/" className="hover:underline opacity-80">Home</Link>
              <span>/</span>
              <span>Global Freight &amp; Port Logistics</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#06140b] px-4 py-1.5 text-xs text-[#dfba77] mb-4">
                <Ship className="h-3.5 w-3.5" />
                <span className="font-bold tracking-wider uppercase text-[11px]">Direct Seaport Pipeline: JNPT Mumbai</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                Fast Ocean Transit From <span className="text-gold-gradient font-semibold">JNPT Mumbai Port</span>
              </h1>

              <p className="mt-5 font-body text-base md:text-lg text-white/75 leading-relaxed">
                Located just 380 km from Jawaharlal Nehru Port (JNPT Mumbai) — India&apos;s largest container terminal — our Solapur factory provides express multimodal road-to-sea freight with zero transshipment delays.
              </p>

              {/* Transit highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-sm">
                    <Clock className="h-4 w-4" />
                    <span>4 - 5 Days</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 font-body">Direct to Jebel Ali, Dubai &amp; Dammam</p>
                </div>
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-sm">
                    <Clock className="h-4 w-4" />
                    <span>7 - 9 Days</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 font-body">To Singapore &amp; Port Klang Malaysia</p>
                </div>
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-sm">
                    <Clock className="h-4 w-4" />
                    <span>18 - 22 Days</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 font-body">To Hamburg, Rotterdam &amp; Felixstowe</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Interactive Logistics & Freight Calculator Section */}
        <LogisticsShippingSection onRequestQuote={handleOpenRfq} />

        {/* Container Volume & Packing Specifications */}
        <section className="py-20 bg-white border-t border-[#e2dcd2]">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Stuffing &amp; Loadability Guide
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-[#0d2818]">
                Container Packing &amp; Volume Metrics
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#19211c]/70 font-body">
                We pack utilizing both high-density hydraulic compressed bales (maximizing towel count per CBM) and export-grade 7-ply master cartons on fumigated ISPM-15 wooden pallets.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {containerSpecs.map((c, i) => (
                <div
                  key={i}
                  className="rounded-sm border border-[#e2dcd2] bg-[#faf8f5] p-7 transition-all hover:shadow-lg hover:border-[#c49a45]/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#0d2818]">
                        {c.type}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-[#c49a45]">
                        {c.volume}
                      </span>
                    </div>
                    <Boxes className="h-6 w-6 text-[#0d2818]" />
                  </div>

                  <div className="mt-5 space-y-2.5 text-xs text-[#19211c]/80">
                    <div className="p-2.5 bg-white rounded-sm border border-[#e2dcd2]">
                      <span className="font-semibold text-[#0d2818] block">Estimated Towel Capacity:</span>
                      <span className="text-sm font-bold text-[#c49a45]">{c.towelCount}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-sm border border-[#e2dcd2]">
                      <span className="font-semibold text-[#0d2818] block">Weight Specification:</span>
                      <span>{c.payload}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-sm border border-[#e2dcd2]">
                      <span className="font-semibold text-[#0d2818] block">Pallet Stacking Layout:</span>
                      <span>{c.palletOption}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#19211c]/70 font-body italic">
                    Best utilized for: {c.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Export Documentation & Compliance Dossier */}
        <section className="py-20 bg-[#06140b] text-white border-t border-[#c49a45]/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#dfba77]">
                Customs &amp; Compliance
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-white">
                Export Documentation Dossier
              </h2>
              <p className="mt-3 text-sm text-white/70 font-body">
                Our export liaison department coordinates all documentation with your forwarder to ensure frictionless customs clearance at destination ports.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {exportDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#dfba77]" />
                    <h4 className="font-display text-base font-semibold text-white">
                      {doc.name}
                    </h4>
                  </div>
                  <p className="mt-3 text-xs text-white/70 font-body leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Port Rate & Booking CTA */}
        <section className="bg-[#0d2818] text-white py-14 border-t border-[#c49a45]/30">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">
              Request a Formal CIF or FOB Quotation for Your Port
            </h3>
            <p className="mt-2 text-white/70 font-body text-sm max-w-lg mx-auto">
              Tell us your target destination port and estimated container quantity. We provide transparent ocean freight and container stuffing breakdowns.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleOpenRfq()} className="btn-gold">
                <span>Request Port Freight Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/collections" className="btn-outline-gold">
                <span>View Towel Collections</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer onRequestQuote={handleOpenRfq} />
      <WhatsAppButton />
      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultRegion={selectedRegion}
      />
    </div>
  );
}
