import React from "react";
import { ArrowRight, Factory, History, Sparkles, Award } from "lucide-react";

interface HeritageSectionProps {
  onRequestQuote: () => void;
}

export function HeritageSection({ onRequestQuote }: HeritageSectionProps) {
  return (
    <section id="heritage" className="scroll-mt-28 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Visual Stack */}
          <div className="relative aspect-[4/3] overflow-hidden border border-[#dfd6c6] bg-[#0d2818] shadow-xl rounded-sm">
            <img
              src="/images/products/private-label.jpg"
              alt="Deepam Textile Solapur Manufacturing Excellence"
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2818]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-body text-[10px] uppercase tracking-[0.24em] text-[#dfba77] font-bold">
                Solapur Textile Legacy Since 1984
              </span>
              <p className="font-display text-xl text-white mt-1">
                Precision Rapier &amp; Electronic Airjet Looms
              </p>
            </div>
          </div>

          {/* Right Editorial Story */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-3.5 py-1 mb-3">
              <Award className="h-3.5 w-3.5 text-[#c49a45]" />
              <span className="font-body text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Four Decades of Weaving Heritage
              </span>
            </div>

            <h2 className="font-display text-[2.25rem] md:text-[2.75rem] font-medium leading-tight text-[#0d2818]">
              Maharashtra&apos;s Premier Terry Towel &amp; Linen Mill
            </h2>

            <div className="mt-6 space-y-4 font-body text-[15px] leading-relaxed text-[#7d776d]">
              <p>
                Based in Solapur—the historic epicentre of India&apos;s cotton jacquard and terry towel industry—<strong className="text-[#0d2818] font-semibold">Deepam Textile</strong> merges generational weaving mastery with high-speed automated weaving looms.
              </p>
              <p>
                Unlike generic traders, we own and operate fully integrated production: from long-staple cotton grading and ring spinning to computerized soft-flow dyeing, dobby border weaving, and automated longitudinal hem stitching.
              </p>
              <p>
                Our specialized export divisions in <strong className="text-[#0d2818] font-semibold">South East Asia</strong>, the <strong className="text-[#0d2818] font-semibold">Middle East</strong>, and <strong className="text-[#0d2818] font-semibold">Europe</strong> ensure each container meets exact local climatic weights, dimensional standards, and chemical safety norms.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onRequestQuote}
                className="btn-gold cursor-pointer"
              >
                <span>Partner With Our Mill</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#manufacturing"
                className="btn-outline-dark"
              >
                Tour Manufacturing Facility
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
