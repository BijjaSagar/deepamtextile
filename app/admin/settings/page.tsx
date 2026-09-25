"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, RefreshCw } from "lucide-react";
import { SiteContentData } from "@/lib/types";

export default function AdminSettingsPage() {
  const [content, setContent] = useState<SiteContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Settings and production metrics updated successfully.");
      } else {
        setMessage("Failed to update settings.");
      }
    } catch (e) {
      console.error(e);
      setMessage("Error updating settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <p className="text-center py-12 text-xs text-[#857b6c]">Loading mill configuration...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium text-[#19211c]">
          Mill Configuration &amp; Contact Desk
        </h1>
        <p className="font-body text-xs text-[#857b6c] mt-1">
          Update primary export contact numbers, WhatsApp live response targets, and public capacity stats.
        </p>
      </div>

      {message && (
        <div className="rounded bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Liaison Settings */}
        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-6 rounded-sm shadow-sm">
          <h3 className="font-display text-lg font-medium text-[#19211c] mb-4">
            Export Contact Liaison
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Brand Name</label>
              <input
                type="text"
                value={content.brandName}
                onChange={(e) => setContent({ ...content, brandName: e.target.value })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">WhatsApp Export Number</label>
              <input
                type="text"
                value={content.whatsappNumber}
                onChange={(e) => setContent({ ...content, whatsappNumber: e.target.value })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Primary Export Email</label>
              <input
                type="email"
                value={content.primaryEmail}
                onChange={(e) => setContent({ ...content, primaryEmail: e.target.value })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Direct Calling Phone</label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Output Metrics */}
        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-6 rounded-sm shadow-sm">
          <h3 className="font-display text-lg font-medium text-[#19211c] mb-4">
            Factory Output Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Years Manufacturing</label>
              <input
                type="number"
                value={content.experienceYears}
                onChange={(e) => setContent({ ...content, experienceYears: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Monthly Output (Tons)</label>
              <input
                type="number"
                value={content.monthlyCapacityTons}
                onChange={(e) => setContent({ ...content, monthlyCapacityTons: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Active Looms Count</label>
              <input
                type="number"
                value={content.loomsCount}
                onChange={(e) => setContent({ ...content, loomsCount: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Export Countries</label>
              <input
                type="number"
                value={content.countriesServed}
                onChange={(e) => setContent({ ...content, countriesServed: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Hero Narrative */}
        <div className="border border-[#dfd6c6] bg-[#f9f6f0] p-6 rounded-sm shadow-sm">
          <h3 className="font-display text-lg font-medium text-[#19211c] mb-4">
            Hero Headline &amp; Tagline
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Hero Title</label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm font-display text-base"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#19211c] mb-1">Hero Subtitle</label>
              <textarea
                rows={3}
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                className="w-full border border-[#dfd6c6] bg-white p-2.5 rounded-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-solid"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
