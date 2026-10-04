import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isUnauthorized, requireAdmin } from "@/lib/admin/api-helpers";
import { resolveUploadDir, sanitizeUploadSegment } from "@/lib/uploads";
import { apiError, apiSuccess } from "@/lib/api-response";
import { withApiHandler } from "@/lib/api-route";

const IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
];

const PDF_TYPES = ["application/pdf"];

function safeFilename(original: string, fallbackExt: string): string {
  const ext = original.split(".").pop()?.toLowerCase() ?? fallbackExt;
  const safeExt = ext.replace(/[^a-z0-9]/g, "") || fallbackExt;
  return `${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;
}

export const POST = withApiHandler(async (request: NextRequest) => {
  const auth = await requireAdmin();
  if (isUnauthorized(auth)) return auth;

  const formData = await request.formData();
  
  // Collect all files from "files" or "file" form keys
  const files: File[] = [];
  const fromFiles = formData.getAll("files");
  for (const item of fromFiles) {
    if (item instanceof File && item.size > 0) files.push(item);
  }
  const fromFile = formData.getAll("file");
  for (const item of fromFile) {
    if (item instanceof File && item.size > 0) files.push(item);
  }

  if (files.length === 0) {
    return apiError("No file provided", 400, "VALIDATION_ERROR");
  }

  const kind = (formData.get("kind") as string | null)?.toLowerCase() ?? "image";
  const folder = (formData.get("folder") as string | null)?.trim() || undefined;

  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const isIco = ext === "ico";
    const isPdf = ext === "pdf" || PDF_TYPES.includes(file.type);

    if (kind === "pdf" || isPdf) {
      if (!PDF_TYPES.includes(file.type) && ext !== "pdf") {
        return apiError(`Invalid file type for ${file.name}`, 400, "VALIDATION_ERROR");
      }
      if (file.size > 15 * 1024 * 1024) {
        return apiError(`File too large: ${file.name} (max 15MB)`, 400, "VALIDATION_ERROR");
      }
      const pdfFolder =
        folder ?? `pdfs/${sanitizeUploadSegment((formData.get("label") as string) ?? "documents")}`;
      const { diskPath, publicPrefix } = resolveUploadDir(pdfFolder);
      await mkdir(diskPath, { recursive: true });
      const filename = safeFilename(file.name, "pdf");
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(diskPath, filename), buffer);
      const url = `${publicPrefix}/${filename}`;
      console.log("[admin/upload] wrote PDF", { url, size: file.size });
      urls.push(url);
      continue;
    }

    if (
      !IMAGE_TYPES.includes(file.type) &&
      !(isIco && file.type === "application/octet-stream")
    ) {
      return apiError(`Invalid image type for ${file.name}`, 400, "VALIDATION_ERROR");
    }

    if (file.size > 15 * 1024 * 1024) {
      return apiError(`File too large: ${file.name} (max 15MB)`, 400, "VALIDATION_ERROR");
    }

    const { diskPath, publicPrefix } = resolveUploadDir(folder);
    await mkdir(diskPath, { recursive: true });

    const filename = safeFilename(file.name, "png");
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(diskPath, filename), buffer);

    const url = `${publicPrefix}/${filename}`;
    console.log("[admin/upload] wrote file", {
      url,
      diskPath: path.join(diskPath, filename),
      size: file.size,
    });
    urls.push(url);
  }

  return apiSuccess({ url: urls[0], urls });
});
