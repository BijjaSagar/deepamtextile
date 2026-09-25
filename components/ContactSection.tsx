"use client";

import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, ShieldCheck, ArrowRight, Globe } from "lucide-react";

interface ContactSectionProps {
  onRequestQuote: (region?: string) => void;
}

export function ContactSection({ onRequestQuote }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-28 py-20 md:py-28 bg-[#faf8f5] border-t border-[#dfd6c6]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-3.5 py-1 mb-3">
            <Globe className="h-3.5 w-3.5 text-[#c49a45]" />
            <span className="font-body text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
              Direct Mill Liaison
            </span>
          </div>

          <h2 className="font-display text-[2.25rem] md:text-[3.25rem] font-medium leading-tight text-[#0d2818]">
            Connect With Our Global Export Team
          </h2>
          <p className="mt-4 font-body text-base text-[#7d776d]">
            Direct contact with our senior export directors for inquiries across South East Asia, the Middle East, and Europe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Email */}
          <div className="border border-[#dfd6c6] bg-white p-8 text-center rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4efe6] text-[#c49a45] mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#0d2818]">Direct Export Desk</h4>
            <p className="font-body text-xs text-[#7d776d] mt-1 mb-4">Send specifications &amp; tender docs</p>
            <div className="space-y-1 text-sm font-semibold text-[#0d2818]">
              <a href="mailto:export@deepamtextile.com" className="block hover:text-[#c49a45] transition-colors">
                export@deepamtextile.com
              </a>
              <a href="mailto:sales@deepamtextile.com" className="block hover:text-[#c49a45] transition-colors">
                sales@deepamtextile.com
              </a>
            </div>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="border border-[#dfd6c6] bg-white p-8 text-center rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4efe6] text-[#c49a45] mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#0d2818]">Telephone &amp; WhatsApp</h4>
            <p className="font-body text-xs text-[#7d776d] mt-1 mb-4">Immediate merchandising response</p>
            <div className="space-y-2 text-sm font-semibold text-[#0d2818]">
              <a href="tel:917066148936" className="block hover:text-[#c49a45] transition-colors">
                +91 70661 48936
              </a>
              <a
                href="https://wa.me/917066148936?text=Hello%20Deepam%20Textile%2C%20I%20am%20inquiring%20about%20export%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#c49a45] hover:text-[#0d2818] underline underline-offset-4"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Mill Location */}
          <div className="border border-[#dfd6c6] bg-white p-8 text-center rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4efe6] text-[#c49a45] mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#0d2818]">Mill &amp; Export HQ</h4>
            <p className="font-body text-xs text-[#7d776d] mt-1 mb-4">Visits welcome by prior appointment</p>
            <address className="not-italic text-sm text-[#0d2818] leading-relaxed font-medium">
              Industrial Area, MIDC<br />
              Solapur, Maharashtra 413006<br />
              India
            </address>
          </div>
        </div>

        {/* Action Button Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onRequestQuote()}
            className="btn-gold cursor-pointer"
          >
            <span>Open Interactive Export RFQ Form</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
