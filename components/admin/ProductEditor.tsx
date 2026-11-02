"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProductCategoryData } from "@/lib/types/cms";
import {
  AdminCard,
  AdminMessage,
  AdminSaveButton,
} from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ProductGalleryField } from "@/components/admin/ProductGalleryField";
import { DescriptionEditor } from "@/components/admin/DescriptionEditor";
import { getApiErrorMessage, getApiData } from "@/lib/api-response";
import { resolveProductCardImage } from "@/lib/image-props";

const productUploadFolder = (slug: string) => `products/${slug}`;

function arrayFieldLabel(
  field: "features" | "variants" | "materials" | "customization" | "packaging" | "idealFor",
): string {
  if (field === "variants") return "Product Variants";
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

export function ProductsList({ products }: { products: ProductCategoryData[] }) {
  if (products.length === 0) {
    return (
      <AdminCard>
        <p className="font-body text-sm text-muted">
          No product categories yet. Seed data or add categories via the database.
        </p>
      </AdminCard>
    );
  }

  return (
    <AdminCard className="p-0">
      <ul className="divide-y divide-hairline">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/admin/products/${product.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-oat/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base text-taupe">
                  {product.name}
                </p>
                <p className="truncate font-body text-xs text-muted">
                  {product.slug}
                </p>
              </div>
              <span className="shrink-0 font-body text-sm text-sage-deep">
                Edit →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </AdminCard>
  );
}

export function ProductEditor({ product }: { product: ProductCategoryData }) {
  const router = useRouter();
  const [data, setData] = useState({
    ...product,
    galleryImages: product.galleryImages ?? [],
  });
  const [sizesJson, setSizesJson] = useState(() =>
    JSON.stringify(product.sizes ?? [], null, 2),
  );
  const [sizesError, setSizesError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const folder = productUploadFolder(product.slug);
  const listingCardPreview = resolveProductCardImage({
    cardImage: data.cardImage,
    heroImage: data.heroImage,
    galleryImages: data.galleryImages,
  });

  console.log("[ProductEditor] listing card preview", {
    slug: product.slug,
    listingCardPreview,
    cardImage: data.cardImage,
    galleryCount: data.galleryImages.length,
  });

  async function handleSave(overrideData?: unknown) {
    setSaving(true);
    setMessage(null);

    // Defense against React MouseEvent being passed when used as onClick handler
    const cleanOverride: Partial<ProductCategoryData> | undefined =
      overrideData &&
      typeof overrideData === "object" &&
      !("nativeEvent" in overrideData) &&
      !("target" in overrideData) &&
      !("bubbles" in overrideData)
        ? (overrideData as Partial<ProductCategoryData>)
        : undefined;

    try {
      const payload: ProductCategoryData = {
        ...data,
        ...cleanOverride,
      };

      console.log("[ProductEditor] persisting product", {
        slug: product.slug,
        name: payload.name,
        shortDescription: payload.shortDescription,
        descriptionLength: payload.description?.length,
      });

      const res = await fetch(`/api/admin/products/${product.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);

      if (res.ok) {
        const saved = getApiData<ProductCategoryData>(body);
        if (saved) {
          console.log("[ProductEditor] saved product successfully", {
            slug: saved.slug,
            cardImage: saved.cardImage,
            updatedAt: saved.updatedAt,
          });
          setData({
            ...saved,
            galleryImages: saved.galleryImages ?? [],
          });
          setSizesJson(JSON.stringify(saved.sizes ?? [], null, 2));
        }
        setMessage({
          text: "✅ Product updated and saved to live site successfully!",
          type: "success",
        });
        router.refresh();
      } else {
        const errText = getApiErrorMessage(body) || "Failed to save product";
        console.error("[ProductEditor] save failed", errText);
        setMessage({
          text: errText,
          type: "error",
        });
      }
    } catch (err) {
      console.error("[ProductEditor] save unexpected error", err);
      setMessage({
        text:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while saving",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  function setArrayField(
    field: keyof Pick<
      ProductCategoryData,
      | "features"
      | "variants"
      | "materials"
      | "customization"
      | "packaging"
      | "idealFor"
    >,
    value: string,
  ) {
    setData({
      ...data,
      [field]: value.split("\n").filter((l) => l.trim()),
    });
  }

  return (
    <div className="space-y-6">
      <AdminMessage
        message={message?.text ?? null}
        type={message?.type ?? "success"}
      />

      <AdminCard>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
          <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => setData({ ...data, eyebrow: v })} />
          <Field label="GSM Range" value={data.gsmRange} onChange={(v) => setData({ ...data, gsmRange: v })} />
          <Field label="MOQ" value={data.moq} onChange={(v) => setData({ ...data, moq: v })} />
          <Field label="Lead Time" value={data.leadTime} onChange={(v) => setData({ ...data, leadTime: v })} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ImageUploadField
            label="Hero image"
            value={data.heroImage}
            onChange={(heroImage) => setData({ ...data, heroImage })}
            onAutoSave={(heroImage) => handleSave({ heroImage })}
            uploadFolder={folder}
            hint="Product detail hero. Auto-saved to live site immediately on upload."
          />
          <ImageUploadField
            label="Card image (listing thumbnail)"
            value={data.cardImage}
            onChange={(cardImage) => setData({ ...data, cardImage })}
            onAutoSave={(cardImage) => handleSave({ cardImage })}
            uploadFolder={folder}
            hint="Shown on /products and homepage Product Portfolio. Auto-saved to live site immediately on upload."
          />
        </div>
        <p className="mt-3 font-body text-xs text-muted">
          Listing preview uses:{" "}
          <span className="font-mono text-taupe">{listingCardPreview}</span>
          {listingCardPreview !== data.cardImage ? (
            <span className="ml-1 text-sage-deep">
              (from hero/gallery until you upload a dedicated card image)
            </span>
          ) : null}
        </p>
        <div className="mt-4">
          <ProductGalleryField
            images={data.galleryImages}
            onChange={(galleryImages) => setData({ ...data, galleryImages })}
            productSlug={product.slug}
            productName={data.name}
            onSaveQuick={handleSave}
            saving={saving}
          />
        </div>
        <div className="mt-4">
          <label className="font-body text-sm text-taupe">Short description</label>
          <textarea
            className="mt-1 w-full rounded-md border border-hairline px-3 py-2 font-body text-sm"
            rows={2}
            value={data.shortDescription}
            onChange={(e) => setData({ ...data, shortDescription: e.target.value })}
          />
        </div>
        <DescriptionEditor
          value={data.description}
          onChange={(description) => setData({ ...data, description })}
        />
      </AdminCard>

      {(
        [
          "features",
          "variants",
          "materials",
          "customization",
          "packaging",
          "idealFor",
        ] as const
      ).map((field) => (
          <AdminCard key={field}>
            <label className="font-display text-lg text-taupe">
              {arrayFieldLabel(field)}
            </label>
            <textarea
              className="mt-2 w-full rounded-md border border-hairline px-3 py-2 font-body text-sm"
              rows={4}
              value={data[field].join("\n")}
              onChange={(e) => setArrayField(field, e.target.value)}
              placeholder="One item per line"
            />
          </AdminCard>
        ),
      )}

      <AdminCard>
        <h2 className="mb-4 font-display text-xl text-taupe">SEO</h2>
        <div className="space-y-4">
          <Field
            label="Meta title"
            value={data.metaTitle ?? ""}
            onChange={(v) => setData({ ...data, metaTitle: v || null })}
            placeholder={data.name}
          />
          <div>
            <label className="font-body text-sm text-taupe">Meta description</label>
            <textarea
              className="mt-1 w-full rounded-md border border-hairline px-3 py-2 font-body text-sm"
              rows={2}
              value={data.metaDescription ?? ""}
              onChange={(e) =>
                setData({ ...data, metaDescription: e.target.value || null })
              }
              placeholder={data.shortDescription}
            />
            <p className="mt-1 font-body text-xs text-muted">
              Focus phrases for your reference (not shown to Google as keywords
              tag). Leave blank to use short description.
            </p>
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex items-center justify-between">
          <label className="font-display text-lg text-taupe">Sizes (JSON)</label>
          {sizesError && (
            <span className="font-body text-xs font-semibold text-red-600">
              {sizesError}
            </span>
          )}
        </div>
        <textarea
          className="mt-2 w-full rounded-md border border-hairline px-3 py-2 font-mono text-sm"
          rows={6}
          value={sizesJson}
          onChange={(e) => {
            const val = e.target.value;
            setSizesJson(val);
            try {
              const parsed = JSON.parse(val);
              setData((prev) => ({ ...prev, sizes: parsed }));
              setSizesError(null);
            } catch {
              setSizesError("Invalid JSON syntax in Sizes");
            }
          }}
        />
      </AdminCard>

      {message && (
        <AdminMessage
          message={message.text}
          type={message.type}
        />
      )}

      <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-xl border border-hairline bg-white/95 p-4 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs text-muted">
          Editing <span className="font-semibold text-taupe">{data.name}</span> (<code className="text-xs text-taupe">/products/{product.slug}</code>)
        </p>
        <AdminSaveButton saving={saving} onClick={() => handleSave()} label="Save product" />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-body text-sm text-taupe">{label}</label>
      <input
        className="mt-1 w-full rounded-md border border-hairline px-3 py-2 font-body text-sm"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
