"use client";

import { useRef, useState, useCallback, type DragEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiData, getApiErrorMessage } from "@/lib/api-response";
import { adminCmsImageSrc } from "@/lib/image-props";
import {
  UploadCloud,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Star,
  ExternalLink,
  Plus,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  AlertCircle,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProductGalleryFieldProps = {
  images: string[];
  onChange: (images: string[]) => void;
  productSlug: string;
  productName?: string;
  onSaveQuick?: () => void;
  saving?: boolean;
};

export function ProductGalleryField({
  images,
  onChange,
  productSlug,
  productName,
  onSaveQuick,
  saving = false,
}: ProductGalleryFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const uploadFolder = `products/${productSlug}`;

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter((f) =>
        f.type.startsWith("image/") || /\.(jpe?g|png|webp|svg)$/i.test(f.name),
      );

      if (files.length === 0) {
        setError("Please select valid image files (JPG, PNG, WebP, SVG).");
        return;
      }

      setUploading(true);
      setError(null);
      setSuccessMsg(null);
      setUploadProgress({ current: 0, total: files.length });

      const addedUrls: string[] = [];

      try {
        // Upload concurrently in batches of 2 to balance speed and connection stability
        const BATCH_SIZE = 2;
        for (let i = 0; i < files.length; i += BATCH_SIZE) {
          const batch = files.slice(i, i + BATCH_SIZE);
          const batchPromises = batch.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", uploadFolder);

            const res = await fetch("/api/admin/upload", {
              method: "POST",
              body: formData,
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
              throw new Error(
                getApiErrorMessage(body) || `Failed to upload ${file.name}`,
              );
            }

            const data = getApiData<{ url?: string; urls?: string[] }>(body);
            const fileUrl = data?.url || data?.urls?.[0];
            if (!fileUrl) {
              throw new Error(`Upload returned empty URL for ${file.name}`);
            }
            return fileUrl;
          });

          const results = await Promise.all(batchPromises);
          addedUrls.push(...results);
          setUploadProgress({
            current: Math.min(i + BATCH_SIZE, files.length),
            total: files.length,
          });
        }

        if (addedUrls.length > 0) {
          const updated = [...images, ...addedUrls];
          onChange(updated);
          setHasUnsavedChanges(true);
          setSuccessMsg(
            `Successfully added ${addedUrls.length} image${addedUrls.length > 1 ? "s" : ""} to ${productName || productSlug} gallery!`,
          );
        }
      } catch (err) {
        console.error("[ProductGalleryField] upload error", err);
        setError(
          err instanceof Error
            ? err.message
            : "Upload failed. Please try again or check file sizes.",
        );
      } finally {
        setUploading(false);
        setUploadProgress(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [images, onChange, productName, productSlug, uploadFolder],
  );

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      void handleFiles(files);
    }
  }

  function removeAt(index: number) {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
    setHasUnsavedChanges(true);
    setSuccessMsg("Image removed from gallery.");
  }

  function move(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= images.length) return;
    const copy = [...images];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onChange(copy);
    setHasUnsavedChanges(true);
  }

  function makeCover(index: number) {
    if (index === 0) return;
    const copy = [...images];
    const [selected] = copy.splice(index, 1);
    copy.unshift(selected);
    onChange(copy);
    setHasUnsavedChanges(true);
    setSuccessMsg("Set as cover / first gallery image.");
  }

  function handleAddUrl() {
    const trimmed = customUrl.trim();
    if (!trimmed) return;
    if (!images.includes(trimmed)) {
      onChange([...images, trimmed]);
      setHasUnsavedChanges(true);
      setSuccessMsg("Image URL added to gallery.");
    }
    setCustomUrl("");
  }

  return (
    <div className="rounded-xl border border-hairline bg-white p-5 shadow-sm">
      {/* Header with Title, Count & Action links */}
      <div className="flex flex-col justify-between gap-3 border-b border-hairline pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-sage-deep" />
            <Label className="font-display text-lg text-taupe">
              Category Image Gallery
            </Label>
            <span className="rounded-full bg-oat px-2.5 py-0.5 font-body text-xs font-medium text-sage-deep">
              {images.length} {images.length === 1 ? "image" : "images"}
            </span>
          </div>
          <p className="mt-1 font-body text-xs text-muted">
            Uploaded gallery images appear on the public product page (e.g.{" "}
            <code className="text-taupe">/products/{productSlug}</code>).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`/products/${productSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-oat/60 px-3 py-1.5 font-body text-xs font-medium text-taupe transition-colors hover:bg-oat hover:text-sage-deep"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Live Page
          </a>

          {onSaveQuick ? (
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onSaveQuick();
                setHasUnsavedChanges(false);
              }}
              disabled={saving || uploading}
              className="bg-sage-deep text-white hover:bg-sage-deep/90"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Save Gallery
                </>
              )}
            </Button>
          ) : null}
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {hasUnsavedChanges ? (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>
              You have unsaved gallery changes! Click <strong>Save Gallery</strong> or{" "}
              <strong>Save Product</strong> below to publish to the live site.
            </span>
          </div>
          {onSaveQuick ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100"
              onClick={() => {
                onSaveQuick();
                setHasUnsavedChanges(false);
              }}
              disabled={saving}
            >
              Save Now
            </Button>
          ) : null}
        </div>
      ) : null}

      {/* Error & Success Messages */}
      {error ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      ) : null}

      {successMsg ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      ) : null}

      {/* Multi-Image Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "mt-4 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all",
          isDragging
            ? "border-sage-deep bg-sky-50/80 shadow-md"
            : "border-hairline bg-oat/30 hover:border-sage-deep hover:bg-oat/60",
          uploading && "pointer-events-none opacity-60",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          multiple
          className="sr-only"
          id={`gallery-upload-${productSlug}`}
          onChange={(e) => {
            const files = e.target.files;
            if (files?.length) void handleFiles(files);
          }}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-hairline">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-sage-deep" />
            ) : (
              <UploadCloud className="h-6 w-6 text-sage-deep" />
            )}
          </div>

          <h4 className="mt-3 font-display text-base text-taupe">
            {uploading
              ? uploadProgress
                ? `Uploading ${uploadProgress.current} of ${uploadProgress.total} images...`
                : "Uploading images to gallery..."
              : "Drag & drop multiple product images here, or click to browse"}
          </h4>

          <p className="mt-1 font-body text-xs text-muted">
            Select 1 or multiple images (JPG, PNG, WebP up to 15MB each). Stored automatically under{" "}
            <code className="text-taupe font-mono">/uploads/products/{productSlug}/</code>
          </p>

          {/* Progress bar during multi-upload */}
          {uploading && uploadProgress ? (
            <div className="mt-3 w-full max-w-xs">
              <div className="h-2 w-full overflow-hidden rounded-full bg-hairline">
                <div
                  className="h-full bg-sage-deep transition-all duration-300"
                  style={{
                    width: `${Math.round((uploadProgress.current / uploadProgress.total) * 100)}%`,
                  }}
                />
              </div>
              <p className="mt-1 text-center font-body text-[11px] text-muted">
                {Math.round((uploadProgress.current / uploadProgress.total) * 100)}% completed
              </p>
            </div>
          ) : null}

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            className="mt-3 border-sage-deep/40 text-sage-deep hover:bg-sky-50"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Select Multiple Photos
          </Button>
        </div>
      </div>

      {/* Gallery Image Grid with Controls */}
      {images.length > 0 ? (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-body text-xs uppercase tracking-wider text-muted">
              Current Gallery Images ({images.length})
            </p>
            <p className="font-body text-xs text-muted">
              Use arrows to reorder • Image #1 is the primary cover
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((url, index) => {
              const previewSrc = adminCmsImageSrc(url);
              const isCover = index === 0;

              return (
                <li
                  key={`${url}-${index}`}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all",
                    isCover
                      ? "border-sage-deep ring-2 ring-sage-deep/20"
                      : "border-hairline hover:border-taupe/30 hover:shadow",
                  )}
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-oat">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewSrc}
                      alt={`Gallery item ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error("[ProductGalleryField] preview failed", {
                          url,
                          src: previewSrc,
                        });
                        const target = e.currentTarget;
                        if (!target.src.includes("placeholder.jpg")) {
                          target.src = "/images/placeholder.jpg";
                        }
                      }}
                    />

                    {/* Badge: Order Number & Primary status */}
                    <div className="absolute left-2 top-2 flex items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 font-body text-[11px] font-semibold text-white shadow-sm",
                          isCover ? "bg-sage-deep" : "bg-taupe/80",
                        )}
                      >
                        {isCover ? "★ Cover / #1" : `#${index + 1}`}
                      </span>
                    </div>

                    {/* View full size link */}
                    <a
                      href={previewSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-taupe opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                      title="Open full image in new tab"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  {/* URL Snippet */}
                  <div className="truncate px-3 py-1.5 font-mono text-[10px] text-muted border-b border-hairline/60 bg-oat/20">
                    {url.split("/").pop() || url}
                  </div>

                  {/* Toolbar Actions */}
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                        title="Move left"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        disabled={index === images.length - 1}
                        onClick={() => move(index, 1)}
                        title="Move right"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                      {!isCover && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-amber-600 hover:bg-amber-50"
                          onClick={() => makeCover(index)}
                          title="Make cover / first image"
                        >
                          <Star className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => removeAt(index)}
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Remove
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-hairline bg-oat/20 p-6 text-center text-xs text-muted">
          No custom gallery photos uploaded yet. When empty, the public website displays default curated collection photos. Upload your custom category photos above to customize this gallery!
        </div>
      )}

      {/* Manual URL Input Accordion/Section */}
      <div className="mt-6 border-t border-hairline pt-4">
        <label className="font-body text-xs text-muted">
          Or add image by existing URL / path:
        </label>
        <div className="mt-1.5 flex gap-2">
          <Input
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="e.g. /images/products/beach-towels.jpg or https://..."
            className="font-mono text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddUrl}
            disabled={!customUrl.trim()}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add URL
          </Button>
        </div>
      </div>
    </div>
  );
}
