"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MillTechSection } from "@/components/MillTechSection";
import { RfqModal } from "@/components/RfqModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Factory,
  Cpu,
  Layers,
  FlaskConical,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Droplets,
  FileCheck,
  Zap,
} from "lucide-react";

export function InfrastructureClient() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);

  const handleOpenRfq = (region?: string) => {
    setSelectedRegion(region);
    setRfqModalOpen(true);
  };

  const machinerySpecs = [
    {
      title: "Electronic Airjet Weaving Looms",
      brand: "Picanol OmniPlus-i & Toyota JAT810",
      count: "48 High-Speed Units",
      output: "Up to 1,050 RPM insertion speed",
      desc: "Ultra-consistent tensioning across warp and weft, eliminating uneven pile heights and zero defect rate on long terry loops.",
      points: [
        "Continuous automated pile height electronic sensor",
        "Warp tension compensation for high GSM bath rugs",
        "Zero-twist yarn feeding with micro-pneumatic blowers",
      ],
    },
    {
      title: "Electronic Jacquard Shedding",
      brand: "Bonas & Staubli Electronic Jacquards",
      count: "18 Jacquard Units",
      output: "Up to 5,120 M8 hooks per head",
      desc: "Architectural hotel reliefs, crest heraldry, sculpted high-low borders, and debossed geometric motifs engineered with CAD precision.",
      points: [
        "Direct USB / Ethernet CAD pattern loading",
        "Dual-beam jacquard for contrast color border bands",
        "Sharpest edge definition without needle friction",
      ],
    },
    {
      title: "Continuous Soft-Flow Dyeing & Bleaching",
      brand: "Thies Eco-Soft & Fongs Low Liquor Ratio",
      count: "12 Pressure Dye Vessels",
      output: "1:4.5 Ultra-low liquor ratio",
      desc: "Closed-loop, temperature-calibrated reactive dyeing guaranteeing Grade 4-5 color fastness to commercial 90°C laundering and chlorine.",
      points: [
        "Zero-discharge ETP wastewater recycling facility",
        "Dyetex automated chemical dosing robot",
        "AZO-free European certified dyes only",
      ],
    },
    {
      title: "Automated Longitudinal & Cross Hemming",
      brand: "AKAB & Texpa Continuous Lines",
      count: "6 Fully Robotic Lines",
      output: "14,000 finished pieces per shift",
      desc: "High-tensile lockstitch hemming with bartacked reinforced corners that endure 180+ commercial laundry rotations without fraying.",
      points: [
        "Heavy-duty polyester-core thread reinforcement",
        "Optical fabric alignment and auto-trimming",
        "Integrated electronic care label thermal stitching",
      ],
    },
  ];

  const labTests = [
    {
      test: "Datacolor 800 Spectrophotometer",
      metric: "Delta E < 0.6 Batch-to-Batch",
      desc: "Digital colorimetry ensures precise repeat shade matching across seasonal production batches.",
    },
    {
      test: "Martindale Abrasion & Pilling",
      metric: "Grade 4.5 at 10,000 Cycles",
      desc: "Tests fiber surface retention against heavy guest laundering and institutional friction.",
    },
    {
      test: "Hydrophilic Absorbency Test",
      metric: "< 2.8 Seconds Sink Time",
      desc: "ASTM D4772 standard testing proving immediate capillary moisture uptake without residual softening wax.",
    },
    {
      test: "Tensile & Tear Resistance",
      metric: "ISO 13934-1 Standards Exceeded",
      desc: "Tensile breaking strength checked on computerized universal testing machine for warp & weft safety.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] text-[#19211c]">
      <Navbar onRequestQuote={handleOpenRfq} />

      <main className="flex-1 pt-24 md:pt-28">
        {/* Dedicated Infrastructure Hero */}
        <section className="relative bg-[#0d2818] text-white py-16 md:py-24 border-b border-[#c49a45]/30 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c49a45_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#dfba77] mb-3">
              <Link href="/" className="hover:underline opacity-80">Home</Link>
              <span>/</span>
              <span>Solapur Manufacturing Facility</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#06140b] px-4 py-1.5 text-xs text-[#dfba77] mb-4">
                <Factory className="h-3.5 w-3.5" />
                <span className="font-bold tracking-wider uppercase text-[11px]">550 Tons / Month Industrial Capacity</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                Solapur Precision <span className="text-gold-gradient font-semibold">Weaving Technology</span>
              </h1>

              <p className="mt-5 font-body text-base md:text-lg text-white/75 leading-relaxed">
                Operating inside Solapur’s prestigious textile cluster, our vertically integrated plant houses state-of-the-art European airjet looms, precision jacquards, automated eco-dyeing, and robotic hemming lines engineered for global hospital &amp; hotel institutional standards.
              </p>

              {/* Facility Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-display font-bold text-[#dfba77]">550 T</div>
                  <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-semibold">Monthly Yarn Volume</div>
                </div>
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-display font-bold text-[#dfba77]">48 Looms</div>
                  <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-semibold">Electronic Airjet Fleet</div>
                </div>
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-display font-bold text-[#dfba77]">180+ Wash</div>
                  <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-semibold">Commercial Laundry Life</div>
                </div>
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-display font-bold text-[#dfba77]">Zero</div>
                  <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-semibold">Liquid Discharge (ZLD)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Existing High-Impact Mill Tech Section */}
        <MillTechSection onRequestQuote={handleOpenRfq} />

        {/* Deep Technical Equipment Breakdown */}
        <section className="py-20 bg-white border-t border-[#e2dcd2]">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Plant Machinery Fleet
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-[#0d2818]">
                Industrial Machinery Inventory
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#19211c]/70 font-body">
                We invest exclusively in tier-one European weaving and finishing platforms to guarantee uniform pile density, perfect selvages, and rapid cycle delivery.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {machinerySpecs.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-sm border border-[#e2dcd2] bg-[#faf8f5] p-7 transition-all hover:shadow-lg hover:border-[#c49a45]/50 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#c49a45] font-semibold">
                        {item.brand}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-[#0d2818] mt-1">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded bg-[#0d2818] px-3 py-1 text-xs font-bold text-[#dfba77]">
                      {item.count}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#0d2818]/80 mt-2 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-[#c49a45]" />
                    <span>Operating Velocity: {item.output}</span>
                  </p>

                  <p className="text-sm text-[#19211c]/75 mt-3 font-body leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#e2dcd2] space-y-2">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#19211c]/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0d2818] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In-House Testing Laboratory & Quality Control */}
        <section className="py-20 bg-[#06140b] text-white border-t border-[#c49a45]/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#dfba77]">
                  Internal Quality Verification
                </span>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-white">
                  Mill Testing Laboratory &amp; Pre-Shipment Inspection
                </h2>
                <p className="mt-3 text-sm text-white/70 font-body">
                  Every dye lot and woven batch is tested in our Solapur physical and chemical laboratory prior to bale compression and container stuffing.
                </p>
              </div>

              <button
                onClick={() => handleOpenRfq()}
                className="btn-gold self-start md:self-auto text-xs py-3 px-6"
              >
                <span>Request Lab Test Report</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {labTests.map((lab, i) => (
                <div
                  key={i}
                  className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[#c49a45]/40 transition-colors"
                >
                  <FlaskConical className="h-6 w-6 text-[#dfba77] mb-3" />
                  <h4 className="font-display text-base font-semibold text-white">
                    {lab.test}
                  </h4>
                  <div className="mt-2 inline-block rounded bg-[#dfba77]/15 border border-[#dfba77]/30 px-2 py-0.5 text-[11px] font-mono font-semibold text-[#dfba77]">
                    {lab.metric}
                  </div>
                  <p className="mt-3 text-xs text-white/70 font-body leading-relaxed">
                    {lab.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Compliance & Accreditations */}
        <section className="py-16 bg-[#faf8f5] border-t border-[#e2dcd2]">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Audit Ready
              </span>
              <h2 className="mt-1 font-display text-2xl md:text-3xl font-semibold text-[#0d2818]">
                Mill Certifications &amp; Ethical Standards
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-sm border border-[#e2dcd2] bg-white p-5 text-center">
                <ShieldCheck className="h-8 w-8 text-[#0d2818] mx-auto mb-2" />
                <h5 className="font-display font-semibold text-sm text-[#0d2818]">OEKO-TEX 100</h5>
                <p className="text-[11px] text-[#19211c]/60 mt-1">Class 1 Certified (Safe for skin & infants)</p>
              </div>
              <div className="rounded-sm border border-[#e2dcd2] bg-white p-5 text-center">
                <Award className="h-8 w-8 text-[#0d2818] mx-auto mb-2" />
                <h5 className="font-display font-semibold text-sm text-[#0d2818]">ISO 9001:2015</h5>
                <p className="text-[11px] text-[#19211c]/60 mt-1">TUV SUD certified quality management</p>
              </div>
              <div className="rounded-sm border border-[#e2dcd2] bg-white p-5 text-center">
                <FileCheck className="h-8 w-8 text-[#0d2818] mx-auto mb-2" />
                <h5 className="font-display font-semibold text-sm text-[#0d2818]">SEDEX SMETA 4-Pillar</h5>
                <p className="text-[11px] text-[#19211c]/60 mt-1">Social audit, labor & safety compliant</p>
              </div>
              <div className="rounded-sm border border-[#e2dcd2] bg-white p-5 text-center">
                <Droplets className="h-8 w-8 text-[#0d2818] mx-auto mb-2" />
                <h5 className="font-display font-semibold text-sm text-[#0d2818]">GOTS Organic</h5>
                <p className="text-[11px] text-[#19211c]/60 mt-1">Global Organic Textile Standard certified</p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Audit / Factory Inspection CTA */}
        <section className="bg-[#0d2818] text-white py-14 border-t border-[#c49a45]/30">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">
              Schedule a Factory Audit or Virtual Mill Tour
            </h3>
            <p className="mt-2 text-white/70 font-body text-sm max-w-lg mx-auto">
              We welcome buyer technical auditors and third-party inspectors (SGS, Bureau Veritas, Intertek) to our Solapur facilities.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button onClick={() => handleOpenRfq()} className="btn-gold">
                <span>Book Factory Inspection</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/corridors" className="btn-outline-gold">
                <span>View Export Corridors</span>
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
