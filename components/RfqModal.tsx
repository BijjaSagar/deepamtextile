"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, ArrowRight, Send, MessageCircle, Sparkles, Globe, MapPin } from "lucide-react";

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRegion?: string;
  defaultProduct?: string;
}

export function RfqModal({ isOpen, onClose, defaultRegion, defaultProduct }: RfqModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    targetRegion: defaultRegion || "South East Asia",
    destinationCountry: "",
    productCategory: defaultProduct || "Bath Towels",
    estimatedQuantity: "1,000 - 5,000 pcs",
    gsmSpecification: "550 - 700 GSM",
    isSampleRequested: false,
    privateLabelInterest: true,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ refNumber: string; targetRegion: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (defaultRegion) {
      setFormData((prev) => ({ ...prev, targetRegion: defaultRegion }));
    }
    if (defaultProduct) {
      setFormData((prev) => ({ ...prev, productCategory: defaultProduct }));
    }
  }, [defaultRegion, defaultProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSuccessData({
        refNumber: data.inquiry.refNumber,
        targetRegion: data.inquiry.targetRegion,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!successData) return;
    const text = `Hello Deepam Textile Export Desk,\n\nI have submitted an export RFQ on your website.\n\n*Reference Code:* ${successData.refNumber}\n*Target Market:* ${formData.targetRegion}\n*Company:* ${formData.companyName}\n*Product:* ${formData.productCategory}\n*Estimated Volume:* ${formData.estimatedQuantity}\n\nPlease share the formal CIF quotation and swatch kit availability.`;
    const url = `https://wa.me/917066148936?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl border border-[#c49a45]/40 bg-[#faf8f5] p-6 md:p-9 shadow-2xl rounded-sm my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#7d776d] hover:text-[#0d2818] p-1.5 rounded-sm hover:bg-[#e8e0d2]"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {successData ? (
          <div className="text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0d2818] text-[#dfba77] mb-4 shadow-lg border border-[#c49a45]/50">
              <CheckCircle className="h-10 w-10" />
            </div>

            <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-[#c49a45]">
              RFQ Registered With Solapur Mill
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-[#0d2818] font-medium mt-1">
              Quotation Request Received
            </h3>

            <div className="my-6 rounded border border-[#c49a45]/30 bg-white p-5 max-w-md mx-auto text-center shadow-md">
              <p className="text-xs uppercase tracking-wider text-[#7d776d] font-semibold">Your Formal Reference Code</p>
              <p className="font-display text-2xl font-bold text-[#0d2818] mt-1">{successData.refNumber}</p>
              <p className="text-[11px] text-[#c49a45] mt-1 font-bold">Assigned to: {formData.targetRegion} Export Desk</p>
            </div>

            <p className="font-body text-xs md:text-sm text-[#7d776d] max-w-lg mx-auto leading-relaxed">
              Our export merchandising desk has logged your volume and destination requirements. A formal proforma quotation and digital lab swatch dossier will be dispatched within 12 business hours.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Fast-Track on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="btn-outline-dark w-full sm:w-auto"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="font-body text-[10.5px] uppercase tracking-[0.26em] text-[#c49a45] font-bold">
                Direct Mill Quotation &amp; Swatch Dispatch
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-[#0d2818] mt-1">
                B2B Export Inquiry &amp; RFQ
              </h3>
              <p className="font-body text-xs text-[#7d776d] mt-1">
                Serving buyers across <strong>South East Asia</strong>, the <strong>Middle East</strong>, and <strong>Europe</strong>.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. David Lee"
                    className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Company / Hotel Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Marina Bay Sands Hospitality"
                    className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@hotelgroup.com"
                    className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    WhatsApp / Direct Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+65 9123 4567 / +971 50 123 4567"
                    className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>
              </div>

              {/* Target Region Dropdown (Prominently South East Asia, Middle East, Europe) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Target Export Corridor *
                  </label>
                  <select
                    value={formData.targetRegion}
                    onChange={(e) => setFormData({ ...formData, targetRegion: e.target.value })}
                    className="w-full border border-[#c49a45]/60 bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm font-semibold"
                  >
                    <option value="South East Asia">1. 🌏 South East Asia (Singapore, Malaysia, Bali, etc.)</option>
                    <option value="Middle East">2. 🕌 Middle East (Dubai, KSA, Qatar, Oman, etc.)</option>
                    <option value="Europe">3. 🇪🇺 Europe (UK, Germany, France, Nordics, etc.)</option>
                    <option value="Other">🌐 Other International Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Destination Port / City
                  </label>
                  <input
                    type="text"
                    value={formData.destinationCountry}
                    onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                    placeholder="e.g. Port of Singapore / Jebel Ali (Dubai) / Hamburg"
                    className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>
              </div>

              {/* Product Collection and Volume */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Collection *
                  </label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white px-3 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  >
                    <option value="Bath Towels">Bath Towels (500-700 GSM)</option>
                    <option value="Hand Towels">Hand Towels &amp; Wash Cloths</option>
                    <option value="Bath Mats">Bath Mats &amp; Tub Mats</option>
                    <option value="Hotel Linen Programs">Hotel Bed Linen Programs</option>
                    <option value="Luxury Bath Robes">Luxury Bath Robes</option>
                    <option value="Cabana Beach Towels">Cabana Beach Towels</option>
                    <option value="Pool & Lounger Towels">Pool &amp; Lounger Towels</option>
                    <option value="Spa & Wellness Towels">Spa &amp; Wellness Towels</option>
                    <option value="Kitchen Towels">Kitchen Towels</option>
                    <option value="Private Label OEM">Complete Private Label OEM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Target GSM Density
                  </label>
                  <input
                    type="text"
                    value={formData.gsmSpecification}
                    onChange={(e) => setFormData({ ...formData, gsmSpecification: e.target.value })}
                    placeholder="e.g. 550 GSM or 700 GSM"
                    className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                    Estimated Volume
                  </label>
                  <select
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white px-3 py-2.5 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  >
                    <option value="1,000 - 5,000 pcs">1,000 - 5,000 pcs (Trial Run)</option>
                    <option value="5,000 - 20,000 pcs">5,000 - 20,000 pcs (Standard)</option>
                    <option value="20,000+ pcs (20ft Container)">20,000+ pcs (20ft Container Load)</option>
                    <option value="40ft High Cube Container">40ft High Cube Container Load</option>
                  </select>
                </div>
              </div>

              {/* Sample and Branding Checkboxes */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-[#0d2818] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSampleRequested}
                    onChange={(e) => setFormData({ ...formData, isSampleRequested: e.target.checked })}
                    className="rounded border-[#dfd6c6] text-[#c49a45] focus:ring-0"
                  />
                  <span>Dispatch physical fabric swatches &amp; sample towels</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#0d2818] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privateLabelInterest}
                    onChange={(e) => setFormData({ ...formData, privateLabelInterest: e.target.checked })}
                    className="rounded border-[#dfd6c6] text-[#c49a45] focus:ring-0"
                  />
                  <span>Bespoke branding (woven header, custom crest, packaging)</span>
                </label>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0d2818] mb-1">
                  Technical Specifications or Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail yarn twist preference (Zero Twist / Ring Spun), border relief, Pantone shades, or delivery requirements..."
                  className="w-full border border-[#dfd6c6] bg-white px-3.5 py-2 text-xs text-[#0d2818] focus:outline-none focus:border-[#c49a45] rounded-sm"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center text-xs py-3.5"
                >
                  {loading ? (
                    <span>Registering RFQ...</span>
                  ) : (
                    <>
                      <span>Submit Export RFQ &amp; Request Proforma Pricing</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
