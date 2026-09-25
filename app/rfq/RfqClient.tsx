"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegionalRfqSection } from "@/components/RegionalRfqSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RfqModal } from "@/components/RfqModal";
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  Package,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Send,
  HelpCircle,
} from "lucide-react";

export function RfqClient() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  const faqs = [
    {
      q: "What is your Minimum Order Quantity (MOQ)?",
      a: "Our standard export MOQ is 1,200 pcs for plain dyed towels and 2,500 pcs for custom woven jacquard crests/logos. For trial initial orders and hotel pilot projects, lower MOQ batches can be accommodated.",
    },
    {
      q: "How fast can physical swatches be dispatched to our international office?",
      a: "Physical swatch boxes (including yarn shade cards and fabric feelers) are dispatched via DHL Express or FedEx International Priority within 48 hours of verification.",
    },
    {
      q: "What payment terms are supported for export orders?",
      a: "We accept Irrevocable Letter of Credit (LC at Sight) from prime international banks, or Telegraphic Transfer (T/T: 30% advance deposit with balance against scanned Bill of Lading).",
    },
    {
      q: "Can you weave our resort or hotel chain logo into the towel border?",
      a: "Yes. Our electronic jacquard looms can weave custom embossed logos, sculptured high-low terry reliefs, or contrasting dyed border bands with custom woven brand labels and barcoding.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5] text-[#19211c]">
      <Navbar onRequestQuote={() => setRfqModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-28">
        {/* Dedicated RFQ Hero */}
        <section className="relative bg-[#0d2818] text-white py-16 md:py-24 border-b border-[#c49a45]/30 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c49a45_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#dfba77] mb-3">
              <Link href="/" className="hover:underline opacity-80">Home</Link>
              <span>/</span>
              <span>Direct Mill Merchandising Desk</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#06140b] px-4 py-1.5 text-xs text-[#dfba77] mb-4">
                <FileText className="h-3.5 w-3.5" />
                <span className="font-bold tracking-wider uppercase text-[11px]">Factory-Direct Export Inquiries</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                Request Factory RFQ &amp; <span className="text-gold-gradient font-semibold">Courier Swatch Box</span>
              </h1>

              <p className="mt-5 font-body text-base md:text-lg text-white/75 leading-relaxed">
                Connect directly with our senior textile merchandising team in Solapur. Receive customized FOB JNPT Mumbai or CIF destination quotations, technical specification sheets, and physical swatch feelers within 24 business hours.
              </p>

              {/* Direct Contact Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-xs uppercase tracking-wider">
                    <Mail className="h-4 w-4" />
                    <span>Email Merchandiser</span>
                  </div>
                  <a href="mailto:export@deepamtextile.com" className="text-sm text-white font-medium hover:text-[#dfba77] transition-colors mt-2 block">
                    export@deepamtextile.com
                  </a>
                  <p className="text-[11px] text-white/60 mt-1">24h turnaround for international RFQs</p>
                </div>

                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-xs uppercase tracking-wider">
                    <Phone className="h-4 w-4" />
                    <span>Phone &amp; WhatsApp</span>
                  </div>
                  <a href="tel:+917066148936" className="text-sm text-white font-medium hover:text-[#dfba77] transition-colors mt-2 block">
                    +91 70661 48936
                  </a>
                  <p className="text-[11px] text-white/60 mt-1">Instant voice &amp; video sample previews</p>
                </div>

                <div className="p-4 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#dfba77] font-semibold text-xs uppercase tracking-wider">
                    <MapPin className="h-4 w-4" />
                    <span>Manufacturing Plant</span>
                  </div>
                  <p className="text-sm text-white font-medium mt-2">
                    Solapur MIDC Textile Cluster
                  </p>
                  <p className="text-[11px] text-white/60 mt-1">Maharashtra 413006, India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Interactive Regional RFQ Section with Secure API Submission */}
        <RegionalRfqSection />

        {/* Frequently Asked Questions */}
        <section className="py-20 bg-white border-t border-[#e2dcd2]">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Buyer Guidance
              </span>
              <h2 className="mt-1 font-display text-3xl font-semibold text-[#0d2818]">
                Export Order &amp; Sampling FAQ
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-sm border border-[#e2dcd2] bg-[#faf8f5] p-6 hover:border-[#c49a45]/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-[#c49a45] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-semibold text-base text-[#0d2818]">
                        {faq.q}
                      </h4>
                      <p className="mt-2 text-xs text-[#19211c]/75 font-body leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onRequestQuote={() => setRfqModalOpen(true)} />
      <WhatsAppButton />
      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
      />
    </div>
  );
}
