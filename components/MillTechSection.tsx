"use client";

import React from "react";
import { ArrowRight, Cpu, ShieldCheck, Factory, Microscope, Layers, Sparkles } from "lucide-react";

interface MillTechSectionProps {
  onRequestQuote: () => void;
}

export function MillTechSection({ onRequestQuote }: MillTechSectionProps) {
  const capabilities = [
    {
      icon: Cpu,
      title: "Electronic Airjet & Rapier Looms",
      desc: "Our Solapur facility houses high-speed European airjet and rapier jacquard looms capable of complex dobby borders, relief logos, and precision terry loops without yarn knots.",
      stat: "200+ Active Looms",
    },
    {
      icon: Layers,
      title: "Computerized Soft-Flow Dyeing",
      desc: "Equipped with state-of-the-art soft-flow machines for zero pile crushing. We use Indanthrene vat dyes for equatorial UV & chlorine resistance and low-impact eco dyes for Europe.",
      stat: "550 Tons / Month",
    },
    {
      icon: Factory,
      title: "Automated Hemming & Cross-Cutting",
      desc: "High-precision longitudinal hemming with double-needle 5-thread chain stitching ensures towel edges never fray or unpick under high-speed commercial laundry tumblers.",
      stat: "250+ Wash Longevity",
    },
    {
      icon: Microscope,
      title: "In-House Physical & Chemical Testing Lab",
      desc: "Every export lot is tested prior to container dispatch: GSM verification, Martindale pile retention test, AATCC water absorbency under 3 seconds, and shrinkage testing.",
      stat: "ISO 9001 & OEKO-TEX",
    },
  ];

  return (
    <section id="mill-tech" className="scroll-mt-24 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-4 py-1.5 mb-4">
            <Factory className="h-3.5 w-3.5 text-[#c49a45]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
              Solapur Mill Infrastructure
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-[#0d2818]">
            Vertical Manufacturing &amp; <span className="text-gold-gradient font-semibold">Quality Engineering</span>
          </h2>

          <p className="mt-4 font-body text-base text-[#7d776d] leading-relaxed">
            From raw fiber grading to container dispatch: Deepam Textile operates full vertical integration in Solapur, Maharashtra, delivering direct mill export consistency.
          </p>
        </div>

        {/* 2 Big Photography Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Looms */}
          <div className="group relative overflow-hidden rounded-sm border border-[#dfd6c6] bg-[#0d2818] shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/factory/airjet-looms.jpg"
                alt="Electronic Rapier Jacquard Looms in Solapur"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06140b]/90 via-[#06140b]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10.5px] uppercase font-bold tracking-[0.22em] text-[#dfba77] block mb-1">
                  Weaving Floor · Solapur Plant
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  High-Speed Airjet &amp; Rapier Looms
                </h3>
                <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-body">
                  Specialized dobbies for custom resort emblems, waffle headers, and anti-snag terry loops.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Facility */}
          <div className="group relative overflow-hidden rounded-sm border border-[#dfd6c6] bg-[#0d2818] shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/factory/mill-facility.jpg"
                alt="Deepam Textile Vertical Manufacturing Complex"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06140b]/90 via-[#06140b]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10.5px] uppercase font-bold tracking-[0.22em] text-[#dfba77] block mb-1">
                  Integrated Dyehouse &amp; Stitching Units
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  550 Tons Monthly Terry Export Capacity
                </h3>
                <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-body">
                  Zero Liquid Discharge (ZLD) effluent treatment facility with computerized spectrophotometer color matching.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-sm border border-[#dfd6c6] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#c49a45] hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#f4efe6] text-[#c49a45] mb-5 border border-[#c49a45]/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#0d2818] mb-2 leading-tight">
                    {c.title}
                  </h4>
                  <p className="text-xs text-[#7d776d] leading-relaxed font-body">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#dfd6c6]">
                  <span className="text-xs font-bold text-[#c49a45] uppercase tracking-wider font-mono">
                    {c.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Compliance Certifications Ribbon */}
        <div className="rounded-sm border border-[#c49a45]/30 bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10.5px] uppercase font-bold tracking-[0.24em] text-[#c49a45] block">
                Audited &amp; Compliant
              </span>
              <h4 className="font-display text-xl font-bold text-[#0d2818] mt-0.5">
                International Certifications &amp; Ethical Standards
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold font-body text-[#0d2818]">
              <span className="px-3 py-1.5 rounded-sm bg-[#f4efe6] border border-[#dfd6c6]">
                ✓ ISO 9001:2015
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#f4efe6] border border-[#dfd6c6]">
                ✓ OEKO-TEX Standard 100
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#f4efe6] border border-[#dfd6c6]">
                ✓ GOTS Organic Cotton
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#f4efe6] border border-[#dfd6c6]">
                ✓ Sedex SMETA Audited
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#f4efe6] border border-[#dfd6c6]">
                ✓ BCI Aligned
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
