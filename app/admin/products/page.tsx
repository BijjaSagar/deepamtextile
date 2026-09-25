"use client";

import React, { useState, useEffect } from "react";
import { ProductItem } from "@/lib/types";
import { Check, Edit, Eye, EyeOff, Save, X, Plus } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTogglePublish = async (prod: ProductItem) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: prod.id, published: !prod.published }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === prod.id ? { ...p, published: !p.published } : p))
        );
      }
    } catch (e) {
      console.error("Error toggling product status:", e);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      setSaving(true);
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
        );
        setEditingProduct(null);
      }
    } catch (e) {
      console.error("Error saving product:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-[#19211c]">
            Product Catalog &amp; Technical Specs
          </h1>
          <p className="font-body text-xs text-[#857b6c] mt-1">
            Manage live export collections, GSM ranges, weave classifications, and MOQ thresholds.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-3 text-center py-10 text-xs text-[#857b6c]">Loading product specifications...</p>
        ) : (
          products.map((prod) => (
            <div
              key={prod.id}
              className="border border-[#dfd6c6] bg-[#f9f6f0] p-5 rounded-sm shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#f2ece1] mb-3">
                  <img src={prod.image} alt={prod.title} className="h-full w-full object-cover" />
                  <span className="absolute top-2 right-2 rounded bg-[#19211c] px-2 py-0.5 text-[9.5px] font-semibold text-white uppercase">
                    {prod.gsmRange}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#c49a45] font-semibold">
                      {prod.category}
                    </span>
                    <h3 className="font-display text-lg font-medium text-[#19211c] mt-0.5">
                      {prod.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleTogglePublish(prod)}
                    className={`p-1.5 rounded-sm border ${
                      prod.published
                        ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                        : "border-gray-300 text-gray-400 bg-gray-50"
                    }`}
                    title={prod.published ? "Live on site" : "Draft / Hidden"}
                  >
                    {prod.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>

                <p className="font-body text-xs text-[#857b6c] mt-2 line-clamp-2">
                  {prod.description}
                </p>

                <div className="mt-3 pt-3 border-t border-[#dfd6c6] text-xs space-y-1 text-[#19211c]">
                  <p className="flex justify-between">
                    <span className="text-[#857b6c]">Dimensions:</span>
                    <span>{prod.dimensions}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#857b6c]">MOQ:</span>
                    <span>{prod.minOrderQty}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#857b6c]">Weave:</span>
                    <span className="truncate max-w-[160px]">{prod.weaveType}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#dfd6c6]">
                <button
                  onClick={() => setEditingProduct(prod)}
                  className="btn-solid w-full justify-center text-xs py-2"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit Specifications</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl border border-[#dfd6c6] bg-[#f9f6f0] p-6 shadow-2xl rounded-sm">
            <div className="flex items-center justify-between border-b border-[#dfd6c6] pb-3 mb-4">
              <h3 className="font-display text-xl font-medium text-[#19211c]">
                Edit {editingProduct.title}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-[#857b6c] hover:text-[#19211c]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#19211c] mb-1">Title</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full border border-[#dfd6c6] bg-white p-2 rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#19211c] mb-1">GSM Range</label>
                  <input
                    type="text"
                    value={editingProduct.gsmRange}
                    onChange={(e) => setEditingProduct({ ...editingProduct, gsmRange: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#19211c] mb-1">MOQ</label>
                  <input
                    type="text"
                    value={editingProduct.minOrderQty}
                    onChange={(e) => setEditingProduct({ ...editingProduct, minOrderQty: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white p-2 rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#19211c] mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={editingProduct.dimensions}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white p-2 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#19211c] mb-1">Weave Type</label>
                  <input
                    type="text"
                    value={editingProduct.weaveType}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weaveType: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white p-2 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#19211c] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full border border-[#dfd6c6] bg-white p-2 rounded-sm"
                />
              </div>

              <div className="pt-3 border-t border-[#dfd6c6] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn-ghost text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-solid text-xs py-2 px-5"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
