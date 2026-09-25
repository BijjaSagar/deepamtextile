import React from "react";
import Link from "next/link";
import { Globe, MapPin, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { DeepamLogo } from "@/components/DeepamLogo";

interface FooterProps {
  onRequestQuote: (region?: string) => void;
}

export function Footer({ onRequestQuote }: FooterProps) {
  return (
    <footer className="relative bg-[#0d2818] text-[#f4efe6] border-t border-[#c49a45]/30">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Column 1: Brand Info */}
          <div>
            <Link href="/" className="inline-block group">
              <DeepamLogo size={42} />
            </Link>

            <p className="mt-4 max-w-xs font-body text-[13.5px] leading-relaxed text-[#f4efe6]/70">
              Vertical textile manufacturer based in Solapur, Maharashtra, delivering high-end terry towels and hospitality linens to luxury buyers across South East Asia, the Middle East, and Europe.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-white/10 px-2.5 py-1 text-[#dfba77]">Solapur MIDC Cluster</span>
              <span className="rounded bg-white/10 px-2.5 py-1 text-[#dfba77]">550 Tons / Month</span>
              <span className="rounded bg-white/10 px-2.5 py-1 text-[#dfba77]">EST. 1998</span>
            </div>
          </div>

          {/* Column 2: Target Markets (Explicitly Highlighting the 3 Regions!) */}
          <div>
            <p className="mb-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba77]">
              Target Export Corridors
            </p>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onRequestQuote("South East Asia")}
                  className="font-body text-[13.5px] text-[#f4efe6]/80 hover:text-white transition-colors text-left group"
                >
                  <span className="text-[#dfba77] mr-1.5 font-bold">1.</span>
                  <span>South East Asia</span>
                  <span className="block text-[11px] text-[#f4efe6]/50">Singapore, Bali, Bangkok, KL</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Middle East")}
                  className="font-body text-[13.5px] text-[#f4efe6]/80 hover:text-white transition-colors text-left group"
                >
                  <span className="text-[#dfba77] mr-1.5 font-bold">2.</span>
                  <span>Middle East</span>
                  <span className="block text-[11px] text-[#f4efe6]/50">Dubai, Saudi Arabia, Qatar, Oman</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onRequestQuote("Europe")}
                  className="font-body text-[13.5px] text-[#f4efe6]/80 hover:text-white transition-colors text-left group"
                >
                  <span className="text-[#dfba77] mr-1.5 font-bold">3.</span>
                  <span>Europe</span>
                  <span className="block text-[11px] text-[#f4efe6]/50">UK, Germany, France, Nordics</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Programs */}
          <div>
            <p className="mb-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba77]">
              Export Collections
            </p>
            <ul className="space-y-2 text-[13px] text-[#f4efe6]/75">
              <li><a href="#products" className="hover:text-white transition-colors">Bath Towels (500 - 700 GSM)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Resort Pool &amp; Cabana Sheets</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Hotel Bedding (300 - 600 TC)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Shawl Collar &amp; Waffle Robes</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Heavy Bath Mats (900 GSM)</a></li>
              <li><a href="#private-label" className="hover:text-white transition-colors">Bespoke Private Label OEM</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Factory Liaison */}
          <div>
            <p className="mb-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba77]">
              Export Liaison Desk
            </p>
            <address className="not-italic text-[13px] text-[#f4efe6]/80 space-y-2">
              <p>
                <a href="mailto:export@deepamtextile.com" className="hover:text-white transition-colors block font-medium">
                  export@deepamtextile.com
                </a>
              </p>
              <p>
                <a href="tel:917066148936" className="hover:text-white transition-colors block font-medium">
                  +91 70661 48936
                </a>
              </p>
              <p className="text-[12px] text-[#f4efe6]/60 leading-relaxed pt-1">
                Industrial Area, MIDC, Solapur 413006, Maharashtra, India
              </p>
            </address>

            <div className="mt-6">
              <button
                onClick={() => onRequestQuote()}
                className="btn-gold w-full justify-center text-xs py-2.5"
              >
                <span>Request B2B Proforma Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between text-xs text-[#f4efe6]/50">
          <p>© 2026 Deepam Textile Mills. Direct Mill Manufacturing for Global Markets.</p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <span>ISO 9001:2015</span>
            <span>OEKO-TEX® Standard 100</span>
            <span>BCI Partner</span>
            <span>Sedex / SMETA Audited</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
