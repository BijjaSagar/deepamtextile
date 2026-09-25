"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductItem } from "@/lib/types";
import {
  Check,
  Edit,
  Eye,
  EyeOff,
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newFeatureText, setNewFeatureText] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
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

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 4000);
  };

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
        showNotification(`Product "${prod.title}" is now ${!prod.published ? "Live" : "Hidden"}`);
      }
    } catch (e) {
      console.error("Error toggling product status:", e);
    }
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showNotification(`Product "${title}" deleted`);
      }
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProduct({
      title: "",
      slug: "",
      category: "bath-towels",
      gsmRange: "500 - 700 GSM",
      material: "100% Combed Ring-Spun Cotton",
      dimensions: "70 x 140 cm / 80 x 160 cm",
      weaveType: "Plush Terry, Zero-Twist, Dobby Border",
      minOrderQty: "1,000 pcs per color/size",
      description: "",
      features: [
        "100% long-staple Indian combed cotton",
        "Reinforced double-needle hems",
        "OEKO-TEX Standard 100 non-toxic dyes",
      ],
      image: "/images/products/bath-towels.jpg",
      images: ["/images/products/bath-towels.jpg"],
      published: true,
      sortOrder: products.length + 1,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Add to images array and set as main if first
      if (editingProduct) {
        const currentImages = Array.isArray(editingProduct.images) ? [...editingProduct.images] : [];
        if (!currentImages.includes(data.url)) {
          currentImages.push(data.url);
        }
        setEditingProduct({
          ...editingProduct,
          images: currentImages,
          image: editingProduct.image || data.url,
        });
        showNotification("Image uploaded and added to product gallery!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim() || !editingProduct) return;
    const currentImages = Array.isArray(editingProduct.images) ? [...editingProduct.images] : [];
    if (!currentImages.includes(newImageUrl.trim())) {
      currentImages.push(newImageUrl.trim());
    }
    setEditingProduct({
      ...editingProduct,
      images: currentImages,
      image: editingProduct.image || newImageUrl.trim(),
    });
    setNewImageUrl("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!editingProduct || !Array.isArray(editingProduct.images)) return;
    const updated = editingProduct.images.filter((_, idx) => idx !== indexToRemove);
    const mainImg = updated.length > 0 ? updated[0] : "";
    setEditingProduct({
      ...editingProduct,
      images: updated,
      image: editingProduct.image === editingProduct.images[indexToRemove] ? mainImg : editingProduct.image,
    });
  };

  const handleSetMainImage = (url: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      image: url,
    });
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim() || !editingProduct) return;
    const current = Array.isArray(editingProduct.features) ? [...editingProduct.features] : [];
    current.push(newFeatureText.trim());
    setEditingProduct({
      ...editingProduct,
      features: current,
    });
    setNewFeatureText("");
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingProduct || !Array.isArray(editingProduct.features)) return;
    setEditingProduct({
      ...editingProduct,
      features: editingProduct.features.filter((_, i) => i !== idx),
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setSaving(true);
      const isNew = !editingProduct.id;
      const method = isNew ? "POST" : "PUT";

      // Auto generate slug if empty
      const slug =
        editingProduct.slug?.trim() ||
        (editingProduct.title || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const payload = {
        ...editingProduct,
        slug,
      };

      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      await fetchProducts();
      setEditingProduct(null);
      showNotification(isNew ? "New product created successfully!" : "Product specifications updated!");
    } catch (err: any) {
      alert(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 rounded-sm bg-[#0d2818] border border-[#c49a45] px-4 py-3 text-xs text-white shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="h-4 w-4 text-[#dfba77]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfd6c6] pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0d2818]">
            Product Catalog &amp; Image Management
          </h2>
          <p className="text-xs text-[#7d776d] mt-1 font-body">
            Add multiple images, edit GSM weights, dimensions, and minimum order quantities. Updates reflect immediately on public product pages.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="btn-gold text-xs py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product Line</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-[#7d776d]">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#c49a45] mb-2" />
            <p className="text-xs uppercase tracking-wider font-semibold">Loading Catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#7d776d] bg-white border border-[#dfd6c6] rounded-sm p-8">
            <Layers className="h-10 w-10 mx-auto text-[#c49a45] mb-3 opacity-60" />
            <h3 className="font-display text-lg font-bold text-[#0d2818]">No products configured</h3>
            <p className="text-xs text-[#7d776d] mt-1 mb-4">Click below to initialize your first manufacturing line</p>
            <button onClick={handleOpenCreateModal} className="btn-gold text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Create Product</span>
            </button>
          </div>
        ) : (
          products.map((prod) => {
            const galleryCount = Array.isArray(prod.images) ? prod.images.length : 1;
            return (
              <div
                key={prod.id}
                className="flex flex-col justify-between border border-[#dfd6c6] bg-white rounded-sm shadow-sm hover:shadow-md hover:border-[#c49a45] transition-all overflow-hidden"
              >
                <div>
                  {/* Image with badges */}
                  <div className="relative aspect-[16/10] w-full bg-[#0d2818] overflow-hidden">
                    <img
                      src={prod.image || "/images/products/bath-towels.jpg"}
                      alt={prod.title}
                      className="h-full w-full object-cover"
                    />

                    {/* Gallery Images Count Badge */}
                    <div className="absolute top-2.5 left-2.5 rounded-sm bg-[#06140b]/85 border border-white/20 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1.5 backdrop-blur-xs">
                      <ImageIcon className="h-3 w-3 text-[#dfba77]" />
                      <span>{galleryCount} {galleryCount === 1 ? "Image" : "Images"}</span>
                    </div>

                    {/* Publish Status Toggle */}
                    <button
                      onClick={() => handleTogglePublish(prod)}
                      className={`absolute top-2.5 right-2.5 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                        prod.published
                          ? "bg-emerald-900/90 text-emerald-200 border-emerald-500/40"
                          : "bg-amber-900/90 text-amber-200 border-amber-500/40"
                      }`}
                    >
                      {prod.published ? "Live on Web" : "Hidden"}
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="text-[10px] font-mono text-[#dfba77] font-semibold uppercase">
                        {prod.gsmRange}
                      </span>
                      <h4 className="font-display text-base font-bold leading-tight truncate">
                        {prod.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[#7d776d] line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#dfd6c6]">
                      <div>
                        <span className="text-[#857b6c] block text-[9.5px] uppercase">Export MOQ</span>
                        <span className="font-semibold text-[#0d2818]">{prod.minOrderQty}</span>
                      </div>
                      <div>
                        <span className="text-[#857b6c] block text-[9.5px] uppercase">Dimensions</span>
                        <span className="font-medium text-[#0d2818] truncate block">{prod.dimensions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-3 border-t border-[#dfd6c6] bg-[#f9f6f0] flex items-center justify-between gap-2">
                  <Link
                    href={`/products/${prod.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] text-[#0d2818] hover:text-[#c49a45] font-semibold transition-colors px-2 py-1.5"
                  >
                    <span>View Product Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="btn-solid py-1.5 px-3 text-xs"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit &amp; Photos</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.title)}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded border border-transparent hover:border-red-200 cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit / Create Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8 border border-[#c49a45]/40 bg-white p-6 md:p-8 shadow-2xl rounded-sm">
            <div className="flex items-center justify-between border-b border-[#dfd6c6] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c49a45]">
                  {editingProduct.id ? "Edit Specifications" : "New Manufacturing Line"}
                </span>
                <h3 className="font-display text-xl font-bold text-[#0d2818]">
                  {editingProduct.title || "Configure New Product"}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 text-[#857b6c] hover:text-[#0d2818] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* SECTION: MULTIPLE IMAGES GALLERY */}
              <div className="rounded-sm border border-[#dfd6c6] bg-[#f9f6f0] p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-[#c49a45]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0d2818]">
                      Product Gallery &amp; Photos ({Array.isArray(editingProduct.images) ? editingProduct.images.length : 0})
                    </span>
                  </div>
                  <span className="text-[11px] text-[#857b6c]">First image is primary cover</span>
                </div>

                {/* Image Thumbnails Strip */}
                <div className="flex flex-wrap gap-3">
                  {Array.isArray(editingProduct.images) &&
                    editingProduct.images.map((imgUrl, idx) => {
                      const isCover = editingProduct.image === imgUrl || (!editingProduct.image && idx === 0);
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-square w-24 rounded-sm overflow-hidden border-2 bg-black group ${
                            isCover ? "border-[#c49a45] shadow-md" : "border-[#dfd6c6]"
                          }`}
                        >
                          <img src={imgUrl} alt="Thumbnail" className="h-full w-full object-cover" />

                          {isCover && (
                            <span className="absolute top-1 left-1 bg-[#c49a45] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase">
                              Cover
                            </span>
                          )}

                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity">
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetMainImage(imgUrl)}
                                className="text-[9px] bg-[#c49a45] text-white px-1.5 py-0.5 rounded-xs font-semibold cursor-pointer"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded-xs font-semibold cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {/* Upload Box */}
                  <label className="flex aspect-square w-24 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-[#c49a45] bg-white hover:bg-[#c49a45]/5 text-center p-2 transition-colors">
                    {uploadingImage ? (
                      <Loader2 className="h-5 w-5 animate-spin text-[#c49a45]" />
                    ) : (
                      <>
                        <Upload className="h-5 w-5 text-[#c49a45] mb-1" />
                        <span className="text-[10px] font-semibold text-[#0d2818]">Upload Photo</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Add Photo by URL */}
                <div className="flex gap-2 pt-2 border-t border-[#dfd6c6]/60">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste external image URL (e.g. /images/products/bath-towels.jpg)"
                    className="flex-1 border border-[#dfd6c6] bg-white px-3 py-1.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="btn-solid text-xs py-1.5 px-3 cursor-pointer shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add URL</span>
                  </button>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    placeholder="e.g. Luxury Velvet Bath Towels"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    URL Slug (page address: /products/slug)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.slug || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    placeholder="auto-generated from title"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Category & GSM Range */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category || "bath-towels"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  >
                    <option value="bath-towels">Bath Towels</option>
                    <option value="hand-towels">Hand Towels</option>
                    <option value="face-towels">Face Towels</option>
                    <option value="bath-mats">Bath Mats</option>
                    <option value="pool-towels">Pool Towels</option>
                    <option value="beach-towels">Beach Towels</option>
                    <option value="bath-robes">Bath Robes</option>
                    <option value="spa-towels">Spa Towels</option>
                    <option value="hotel-linen">Hotel Bed Linen</option>
                    <option value="kitchen-towels">Kitchen Towels</option>
                    <option value="promotional-towels">Promotional Towels</option>
                    <option value="private-labeling">Private Label Programs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    GSM Weight Range
                  </label>
                  <input
                    type="text"
                    value={editingProduct.gsmRange || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, gsmRange: e.target.value })}
                    placeholder="e.g. 500 - 700 GSM"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    Export MOQ
                  </label>
                  <input
                    type="text"
                    value={editingProduct.minOrderQty || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, minOrderQty: e.target.value })}
                    placeholder="e.g. 1,000 pcs per color"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                </div>
              </div>

              {/* Material, Dimensions & Weave */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    Cotton Yarn / Material
                  </label>
                  <input
                    type="text"
                    value={editingProduct.material || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    placeholder="e.g. 100% Combed Ring-Spun Cotton"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    Standard Dimensions
                  </label>
                  <input
                    type="text"
                    value={editingProduct.dimensions || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    placeholder="e.g. 70 x 140 cm / 80 x 160 cm"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                    Weave Structure
                  </label>
                  <input
                    type="text"
                    value={editingProduct.weaveType || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weaveType: e.target.value })}
                    placeholder="e.g. Zero-Twist Plush Terry with Dobby Border"
                    className="w-full border border-[#dfd6c6] bg-white p-2.5 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1">
                  Export Merchandising Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Detail the softness, yarn specs, absorbency, and commercial laundry performance..."
                  className="w-full border border-[#dfd6c6] bg-white p-3 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                />
              </div>

              {/* Technical Features List */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#19211c] mb-1.5">
                  Technical Feature Bullet Points
                </label>
                <div className="space-y-2 mb-2">
                  {Array.isArray(editingProduct.features) &&
                    editingProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-[#f9f6f0] px-3 py-1.5 rounded-sm border border-[#dfd6c6] text-xs">
                        <Check className="h-3.5 w-3.5 text-[#c49a45] shrink-0" />
                        <span className="flex-1">{feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-red-600 hover:text-red-800 text-xs px-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    placeholder="Add specification bullet (e.g. Double-needle hems to prevent fraying)"
                    className="flex-1 border border-[#dfd6c6] bg-white p-2 text-xs text-[#19211c] rounded-sm focus:border-[#c49a45] focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="btn-solid text-xs py-2 px-3 shrink-0 cursor-pointer"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={editingProduct.published ?? true}
                  onChange={(e) => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-[#0d2818] focus:ring-[#c49a45]"
                />
                <label htmlFor="publishedCheck" className="text-xs font-semibold text-[#19211c] cursor-pointer">
                  Publish to live website catalog (/collections and /products/{editingProduct.slug || "slug"})
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#dfd6c6]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-[#dfd6c6] text-xs text-[#857b6c] hover:text-[#19211c] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gold text-xs py-2 px-6 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Saving Catalog...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Product Line</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
