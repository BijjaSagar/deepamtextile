"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Mail, Phone, Filter, CheckCircle2, Clock, Globe, Trash2, Edit3, X, ChevronRight } from "lucide-react";
import { InquiryItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeInquiry, setActiveInquiry] = useState<InquiryItem | null>(null);
  const [internalNotes, setInternalNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (e) {
      console.error("Error fetching inquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (activeInquiry?.id === id) {
          setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    try {
      setUpdating(true);
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeInquiry.id, notes: internalNotes }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === activeInquiry.id ? { ...item, notes: internalNotes } : item))
        );
        setActiveInquiry((prev) => (prev ? { ...prev, notes: internalNotes } : null));
      }
    } catch (e) {
      console.error("Error saving notes:", e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (activeInquiry?.id === id) setActiveInquiry(null);
      }
    } catch (e) {
      console.error("Error deleting inquiry:", e);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchRegion = selectedRegion === "all" || inq.targetRegion === selectedRegion;
    const matchStatus = selectedStatus === "all" || inq.status === selectedStatus;
    return matchRegion && matchStatus;
  });

  // Calculate stats
  const totalCount = inquiries.length;
  const seaCount = inquiries.filter((i) => i.targetRegion === "South East Asia").length;
  const meCount = inquiries.filter((i) => i.targetRegion === "Middle East").length;
  const eurCount = inquiries.filter((i) => i.targetRegion === "Europe").length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Stats */}
      <div>
        <h1 className="font-display text-3xl font-medium text-[#19211c]">
          Export RFQ Management
        </h1>
        <p className="font-body text-xs text-[#857b6c] mt-1">
          Review incoming buyer inquiries and quotations across South East Asia, Middle East, and Europe.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-5 rounded-sm shadow-sm">
          <p className="font-body text-[11px] uppercase tracking-wider text-[#857b6c]">Total Inquiries</p>
          <p className="font-display text-3xl font-bold text-[#19211c] mt-1">{totalCount}</p>
        </div>

        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-5 rounded-sm shadow-sm">
          <p className="font-body text-[11px] uppercase tracking-wider text-[#857b6c]">🌏 South East Asia</p>
          <p className="font-display text-3xl font-bold text-[#c49a45] mt-1">{seaCount}</p>
          <p className="text-[10px] text-[#857b6c] mt-1">Resorts &amp; Island Hospitality</p>
        </div>

        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-5 rounded-sm shadow-sm">
          <p className="font-body text-[11px] uppercase tracking-wider text-[#857b6c]">🕌 Middle East</p>
          <p className="font-display text-3xl font-bold text-[#19211c] mt-1">{meCount}</p>
          <p className="text-[10px] text-[#857b6c] mt-1">Palaces &amp; Luxury 700 GSM</p>
        </div>

        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-5 rounded-sm shadow-sm">
          <p className="font-body text-[11px] uppercase tracking-wider text-[#857b6c]">🇪🇺 Europe</p>
          <p className="font-display text-3xl font-bold text-[#c49a45] mt-1">{eurCount}</p>
          <p className="text-[10px] text-[#857b6c] mt-1">OEKO-TEX &amp; Sustainable</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfd6c6] pb-4">
        {/* Region Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#857b6c] uppercase tracking-wider mr-1">Region:</span>
          {["all", "South East Asia", "Middle East", "Europe"].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                selectedRegion === reg
                  ? "bg-[#19211c] text-[#f9f6f0]"
                  : "bg-white border border-[#dfd6c6] text-[#19211c] hover:bg-[#f2ece1]"
              }`}
            >
              {reg === "all" ? "All Regions" : reg}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#857b6c] uppercase tracking-wider mr-1">Status:</span>
          {["all", "NEW", "CONTACTED", "QUOTED", "WON", "ARCHIVED"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-colors ${
                selectedStatus === st
                  ? "bg-[#c49a45] text-white"
                  : "bg-white border border-[#dfd6c6] text-[#19211c] hover:bg-[#f2ece1]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="overflow-x-auto border border-[#dfd6c6] bg-[#f9f6f0] shadow-sm rounded-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f2ece1] text-[10.5px] uppercase tracking-wider text-[#19211c] border-b border-[#dfd6c6]">
            <tr>
              <th className="py-3 px-4">Ref Code &amp; Date</th>
              <th className="py-3 px-4">Target Market</th>
              <th className="py-3 px-4">Company &amp; Contact</th>
              <th className="py-3 px-4">Product &amp; Volume</th>
              <th className="py-3 px-4">Samples / OEM</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfd6c6]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#857b6c]">
                  Loading RFQ entries...
                </td>
              </tr>
            ) : filteredInquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#857b6c]">
                  No inquiries found matching selected filters.
                </td>
              </tr>
            ) : (
              filteredInquiries.map((inq) => {
                const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
                const waText = encodeURIComponent(
                  `Hello ${inq.fullName}, this is Deepam Textile Export Desk regarding your RFQ ${inq.refNumber} for ${inq.productCategory}.`
                );

                return (
                  <tr key={inq.id} className="hover:bg-white/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium">
                      <span className="font-mono text-xs font-semibold text-[#19211c]">{inq.refNumber}</span>
                      <p className="text-[10px] text-[#857b6c] mt-0.5">{formatDate(inq.createdAt)}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded bg-[#f2ece1] px-2 py-0.5 font-medium text-[#19211c]">
                        {inq.targetRegion === "South East Asia" && "🌏 "}
                        {inq.targetRegion === "Middle East" && "🕌 "}
                        {inq.targetRegion === "Europe" && "🇪🇺 "}
                        {inq.targetRegion}
                      </span>
                      <p className="text-[10px] text-[#857b6c] mt-0.5">{inq.destinationCountry}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <strong className="text-[#19211c] block">{inq.companyName}</strong>
                      <span className="text-[#857b6c] block">{inq.fullName}</span>
                      <span className="text-[#857b6c] text-[10px] block">{inq.email}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#19211c]">{inq.productCategory}</span>
                      <p className="text-[10px] text-[#857b6c]">Qty: {inq.estimatedQuantity}</p>
                      {inq.gsmSpecification && (
                        <p className="text-[10px] text-[#c49a45] font-medium">{inq.gsmSpecification}</p>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {inq.isSampleRequested && (
                        <span className="inline-block rounded bg-amber-100 text-amber-800 px-1.5 py-0.5 text-[9.5px] font-semibold mr-1">
                          Swatch Requested
                        </span>
                      )}
                      {inq.privateLabelInterest && (
                        <span className="inline-block rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.5 text-[9.5px] font-semibold">
                          Custom OEM
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`text-[11px] font-semibold rounded px-2 py-1 border focus:outline-none ${
                          inq.status === "NEW"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : inq.status === "CONTACTED"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : inq.status === "QUOTED"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : inq.status === "WON"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="SAMPLE_SENT">SAMPLE SENT</option>
                        <option value="WON">WON</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#25D366] hover:bg-emerald-50 p-1.5 rounded-sm border border-[#25D366]/30"
                        title="Direct WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>

                      <button
                        onClick={() => {
                          setActiveInquiry(inq);
                          setInternalNotes(inq.notes || "");
                        }}
                        className="inline-flex items-center gap-1 text-[#19211c] hover:bg-[#eae3d7] p-1.5 rounded-sm border border-[#dfd6c6]"
                        title="View Full Spec & Notes"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:bg-red-50 p-1.5 rounded-sm border border-red-200"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Inquiry Detail & Internal Notes Drawer */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg h-full bg-[#f9f6f0] border-l border-[#dfd6c6] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#dfd6c6] pb-4 mb-5">
                <div>
                  <span className="font-mono text-xs font-bold text-[#19211c]">
                    {activeInquiry.refNumber}
                  </span>
                  <p className="text-[10px] text-[#857b6c]">{formatDate(activeInquiry.createdAt)}</p>
                </div>
                <button
                  onClick={() => setActiveInquiry(null)}
                  className="p-1 hover:bg-[#eae3d7] rounded-sm text-[#19211c]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 border border-[#dfd6c6] rounded-sm">
                  <p className="text-[10px] uppercase tracking-wider text-[#857b6c] font-semibold">Buyer Profile</p>
                  <p className="text-sm font-bold text-[#19211c] mt-1">{activeInquiry.companyName}</p>
                  <p className="text-xs text-[#19211c]">{activeInquiry.fullName}</p>
                  <p className="text-xs text-[#857b6c] mt-1">{activeInquiry.email}</p>
                  <p className="text-xs text-[#857b6c]">{activeInquiry.phone}</p>
                </div>

                <div className="bg-white p-4 border border-[#dfd6c6] rounded-sm">
                  <p className="text-[10px] uppercase tracking-wider text-[#857b6c] font-semibold">Quotation Specifications</p>
                  <div className="mt-2 space-y-1.5">
                    <p><strong>Target Market:</strong> {activeInquiry.targetRegion} ({activeInquiry.destinationCountry})</p>
                    <p><strong>Category:</strong> {activeInquiry.productCategory}</p>
                    <p><strong>Target GSM:</strong> {activeInquiry.gsmSpecification || "Standard Mill Grade"}</p>
                    <p><strong>Volume:</strong> {activeInquiry.estimatedQuantity}</p>
                    <p><strong>Physical Swatches:</strong> {activeInquiry.isSampleRequested ? "YES" : "No"}</p>
                    <p><strong>Custom OEM Branding:</strong> {activeInquiry.privateLabelInterest ? "YES" : "No"}</p>
                  </div>
                </div>

                <div className="bg-white p-4 border border-[#dfd6c6] rounded-sm">
                  <p className="text-[10px] uppercase tracking-wider text-[#857b6c] font-semibold">Buyer Message</p>
                  <p className="mt-1 text-xs text-[#19211c] leading-relaxed italic whitespace-pre-wrap">
                    &ldquo;{activeInquiry.message}&rdquo;
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#19211c] mb-1">
                    Internal Merchandising Notes
                  </label>
                  <textarea
                    rows={4}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Log pricing sent, shipping agent discussions, CIF quotation rates, sample dispatch numbers..."
                    className="w-full border border-[#dfd6c6] bg-white p-3 text-xs text-[#19211c] focus:outline-none focus:border-[#c49a45] rounded-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#dfd6c6] flex items-center justify-between">
              <button
                onClick={handleSaveNotes}
                disabled={updating}
                className="btn-solid text-xs py-2 px-4"
              >
                {updating ? "Saving..." : "Save Internal Notes"}
              </button>

              <button
                onClick={() => setActiveInquiry(null)}
                className="btn-ghost text-xs py-2 px-4"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
