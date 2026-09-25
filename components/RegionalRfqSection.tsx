"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, Box, Clock, Palmtree, Landmark } from "lucide-react";

export function RegionalRfqSection() {
  const [selectedRegion, setSelectedRegion] = useState<string>("South East Asia");
  const [productType, setProductType] = useState<string>("Bath Towels & Pool Towels");
  const [gsmRange, setGsmRange] = useState<string>("450 - 550 GSM");
  const [containerVol, setContainerVol] = useState<string>("20ft FCL (~14,000 units)");
  const [freeSwatches, setFreeSwatches] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    port: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        targetRegion: selectedRegion,
        productCategory: productType,
        gsmRequirement: gsmRange,
        volume: containerVol,
        message: `Port of Discharge: ${formData.country} / ${formData.port || "TBD"}. Swatches requested: ${
          freeSwatches ? "YES" : "NO"
        }. Client Notes: ${formData.notes}`,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedRef(data.referenceCode || "DT-RFQ-2026-SUCCESS");
      } else {
        setErrorMsg(data.error || "Failed to submit quote request. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error. Please contact export@deepamtextile.com or WhatsApp directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Deepam Textile Export Desk!\nI would like an export quotation.\nReference: ${
        submittedRef || "New Inquiry"
      }\nTarget Corridor: ${selectedRegion}\nProduct: ${productType}\nGSM: ${gsmRange}\nVolume: ${containerVol}\nBuyer: ${
        formData.name
      } (${formData.company})\nCountry/Port: ${formData.country} / ${formData.port}`
    );
    return `https://wa.me/917066148936?text=${text}`;
  };

  return (
    <section id="rfq-section" className="scroll-mt-24 py-20 md:py-28 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          {/* Left Column: Value Proposition & Regional Guarantees */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c49a45]/40 bg-[#f4efe6] px-4 py-1.5 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#c49a45]" />
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.24em] text-[#0d2818]">
                Direct Mill Quotation &amp; Samples
              </span>
            </div>

            <h2 className="font-display text-[2.25rem] md:text-[3rem] font-medium leading-tight text-[#0d2818]">
              Request Container FOB/CIF Pricing &amp; <span className="text-gold-gradient font-semibold">Free Swatch Box</span>
            </h2>

            <p className="mt-4 font-body text-base text-[#7d776d] leading-relaxed">
              We dispatch custom physical swatch boxes via DHL Express within 48 hours for verified hospitality buyers and distributors across South East Asia, the Middle East, and Europe.
            </p>

            <div className="mt-8 space-y-4 font-body text-xs text-[#0d2818]">
              <div className="flex items-start gap-3 p-4 rounded-sm bg-white border border-[#dfd6c6] shadow-sm">
                <Box className="h-5 w-5 text-[#c49a45] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[11px]">Free Swatch Box Program</h4>
                  <p className="text-[#7d776d] mt-1 leading-relaxed">
                    Includes physical fabric headers for terry pile, waffle, combed ring-spun cotton, and laboratory wash test reports.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-sm bg-white border border-[#dfd6c6] shadow-sm">
                <Clock className="h-5 w-5 text-[#c49a45] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[11px]">4-Hour Quotation Turnaround</h4>
                  <p className="text-[#7d776d] mt-1 leading-relaxed">
                    Dedicated export desk accounts for Singapore, Dubai, and European time zones with direct mill CIF pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-sm bg-white border border-[#dfd6c6] shadow-sm">
                <ShieldCheck className="h-5 w-5 text-[#c49a45] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[11px]">Direct Mill Guarantee</h4>
                  <p className="text-[#7d776d] mt-1 leading-relaxed">
                    Zero intermediary agents or trading markups. Invoiced directly from Deepam Textile Mills, Solapur, India.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#dfd6c6] flex items-center gap-6 text-xs text-[#7d776d]">
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#0d2818]">Direct Export Phone / WhatsApp:</span>
                <a href="tel:+917066148936" className="font-mono font-semibold text-[#c49a45] text-sm">+91 70661 48936</a>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#0d2818]">Export Documentation Email:</span>
                <a href="mailto:export@deepamtextile.com" className="font-semibold text-[#0d2818] text-sm">export@deepamtextile.com</a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting RFQ Form */}
          <div className="rounded-sm border border-[#c49a45]/40 bg-white p-8 md:p-10 shadow-xl">
            {submittedRef ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4efe6] text-[#c49a45] mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#c49a45]">
                  Quotation Docket Created
                </span>
                <h3 className="font-display text-2xl font-bold text-[#0d2818] mt-1">
                  RFQ Reference: {submittedRef}
                </h3>
                <p className="text-sm text-[#7d776d] mt-3 max-w-md mx-auto font-body leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our export desk has logged your requirement for the <strong>{selectedRegion}</strong> corridor. We will email the itemized CIF proforma within 4 business hours.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-sm shadow-md hover:bg-[#20ba59] transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Instant WhatsApp Connect ({submittedRef})</span>
                  </a>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="py-3 px-6 rounded-sm border border-[#dfd6c6] text-xs font-semibold text-[#0d2818] hover:bg-[#f4efe6]"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Target Export Corridor Selector */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-2">
                    1. Select Destination Export Corridor <span className="text-[#c49a45]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "South East Asia", Icon: Palmtree },
                      { name: "Middle East", Icon: Landmark },
                      { name: "Europe", Icon: ShieldCheck },
                    ].map((corridor) => (
                      <button
                        key={corridor.name}
                        type="button"
                        onClick={() => setSelectedRegion(corridor.name)}
                        className={`py-2.5 px-2 rounded-sm border text-[11.5px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          selectedRegion === corridor.name
                            ? "bg-[#0d2818] text-white border-[#0d2818] shadow-sm ring-2 ring-[#c49a45]/40"
                            : "bg-[#faf8f5] text-[#0d2818] border-[#dfd6c6] hover:border-[#c49a45]"
                        }`}
                      >
                        <corridor.Icon className={`h-4 w-4 shrink-0 ${selectedRegion === corridor.name ? "text-[#dfba77]" : "text-[#c49a45]"}`} />
                        <span className="truncate">{corridor.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Product Line & GSM Weight */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1.5">
                      Product Program
                    </label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    >
                      <option>Bath Towels &amp; Pool Towels</option>
                      <option>Cabana Resort Pool Sheets (90x180cm)</option>
                      <option>Presidential Suite Royal Bath Sheets (800 GSM)</option>
                      <option>GOTS Organic Eco Waffle Towels</option>
                      <option>Hotel Bath Robes (Kimono / Shawl Collar)</option>
                      <option>Hospitality Bed Linen &amp; Sheeting</option>
                      <option>Private Label OEM Custom Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1.5">
                      Required GSM Range
                    </label>
                    <select
                      value={gsmRange}
                      onChange={(e) => setGsmRange(e.target.value)}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    >
                      <option>450 - 520 GSM (Quick-Dry Tropical)</option>
                      <option>550 - 650 GSM (Standard 5-Star Hotel)</option>
                      <option>700 - 800 GSM (Ultra-Plush Palace Suite)</option>
                      <option>Custom GSM (To be specified)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Estimated Container Volume */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1.5">
                    Estimated Shipment Volume
                  </label>
                  <select
                    value={containerVol}
                    onChange={(e) => setContainerVol(e.target.value)}
                    className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                  >
                    <option>20ft FCL (~14,000 units / ~4.5 Tons)</option>
                    <option>40ft High Cube FCL (~32,000 units / ~11 Tons)</option>
                    <option>Trial LCL Order (1,000 - 3,000 units)</option>
                    <option>Annual Supply Contract (Multiple FCLs)</option>
                  </select>
                </div>

                {/* 4. Contact Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1">
                      Your Full Name <span className="text-[#c49a45]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Tan / Al-Rashid"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1">
                      Company / Resort Name <span className="text-[#c49a45]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marina Bay Hospitality / Ritz"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1">
                      Official Business Email <span className="text-[#c49a45]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1">
                      WhatsApp / Mobile Phone <span className="text-[#c49a45]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+65 / +971 / +44 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1">
                      Country of Import <span className="text-[#c49a45]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Singapore / UAE / Germany / UK"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[#0d2818] mb-1">
                      Target Discharge Port
                    </label>
                    <input
                      type="text"
                      placeholder="Port of Singapore / Jebel Ali / Hamburg"
                      value={formData.port}
                      onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                      className="w-full rounded-sm border border-[#dfd6c6] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#0d2818] focus:border-[#c49a45] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Free Swatches Checkbox */}
                <div className="flex items-center gap-3 p-3.5 rounded-sm bg-[#f4efe6] border border-[#dfd6c6]">
                  <input
                    type="checkbox"
                    id="freeSwatches"
                    checked={freeSwatches}
                    onChange={(e) => setFreeSwatches(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#c49a45] cursor-pointer"
                  />
                  <label htmlFor="freeSwatches" className="text-xs text-[#0d2818] font-medium cursor-pointer">
                    <strong>Dispatch Free Swatch Box:</strong> Send physical terry fabric swatch book to our office via DHL Express.
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-sm border border-red-200">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-lg cursor-pointer"
                >
                  {submitting ? "Transmitting RFQ Docket..." : `Generate ${selectedRegion} Mill Quotation`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
