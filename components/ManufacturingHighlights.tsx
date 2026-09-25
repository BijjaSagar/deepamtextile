import React from "react";
import { CheckCircle2, Cog, Droplets, Layers, ShieldCheck, Truck } from "lucide-react";

export function ManufacturingHighlights() {
  const steps = [
    {
      step: "01",
      icon: Layers,
      title: "Fiber Selection & Ring Spinning",
      desc: "We source certified high-staple length Indian cotton with consistent micronaire values for zero-twist, low-twist, and comb-yarn strength.",
    },
    {
      step: "02",
      icon: Cog,
      title: "High-Speed Airjet & Rapier Weaving",
      desc: "Our automated loom sheds run European electronic jacquard & dobby headers capable of micro-terry loops, deep pile terry, and velvet velour.",
    },
    {
      step: "03",
      icon: Droplets,
      title: "Eco-Conscious Computerized Dyeing",
      desc: "Utilizing zero-effluent discharge (ZLD) closed-loop soft flow dye vessels, with vat dyes and reactive dyes tested OEKO-TEX Standard 100 safe.",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Automated Hemming & 4-Point QC",
      desc: "Automated longitudinal and cross-hemming machines with reinforced double lock-stitching, followed by 100% manual needle detection.",
    },
    {
      step: "05",
      icon: Truck,
      title: "Export Container Packing & Loading",
      desc: "Palletized or vacuum-compressed carton loading optimized for 20ft and 40ft High Cube containers direct from Solapur to JNPT / Mumbai port.",
    },
  ];

  return (
    <section id="manufacturing" className="scroll-mt-28 py-20 md:py-28 bg-[#f2ece1]/60 border-y border-[#dfd6c6]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#c49a45] mb-3">
            Manufacturing Precision
          </p>
          <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-[#19211c]">
            Vertical Integration From Bale to Box
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3.5" aria-hidden="true">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c49a45]" />
            <div className="h-1.5 w-1.5 rotate-45 border border-[#c49a45] bg-[#dfba77]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c49a45]" />
          </div>
          <p className="mt-4 font-body text-[16px] text-[#857b6c]">
            State-of-the-art textile machinery, rigorous chemical compliance, and in-house testing laboratories assure identical GSM, absorbency, and tensile metrics across recurring container orders.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative border border-[#dfd6c6] bg-[#f9f6f0] p-8 shadow-sm hover:shadow-md transition-shadow rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ece1] text-[#19211c]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-3xl font-medium text-[#c8c7ac]">
                    {st.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-medium text-[#19211c] mb-2">
                  {st.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-[#857b6c]">
                  {st.desc}
                </p>
              </div>
            );
          })}

          {/* Plant Fact Card */}
          <div className="relative border border-[#c49a45] bg-[#19211c] p-8 text-[#f9f6f0] shadow-sm rounded-sm flex flex-col justify-between">
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.24em] text-[#c8c7ac] font-semibold">
                Factory Audit &amp; Compliance
              </span>
              <h3 className="font-display text-2xl font-medium text-[#f9f6f0] mt-2">
                Audited for Global Buyers
              </h3>
              <p className="font-body text-xs leading-relaxed text-[#f9f6f0]/70 mt-3">
                Our facilities comply with strict international labor standards, environmental health and safety laws, zero child labor protocols, and periodic social compliance reviews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-[#c8c7ac]">
              <span>Solapur MIDC Industrial Estate</span>
              <span className="font-semibold">550 Tons / Mo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
