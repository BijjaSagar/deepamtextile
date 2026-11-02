import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  isUnauthorized,
  requireAdmin,
  revalidateSite,
} from "@/lib/admin/api-helpers";
import { mapProduct } from "@/lib/data/products";
import { coalesceCardImageForSave } from "@/lib/image-props";
import { apiError, apiSuccess } from "@/lib/api-response";
import { withApiHandler, type RouteContext } from "@/lib/api-route";

export const GET = withApiHandler(
  async (_request: NextRequest, context: RouteContext) => {
    const auth = await requireAdmin();
    if (isUnauthorized(auth)) return auth;

    const { slug } = await context.params;
    const product = await prisma.productCategory.findUnique({ where: { slug } });
    if (!product) {
      return apiError("Not found", 404, "NOT_FOUND");
    }
    return apiSuccess(mapProduct(product));
  },
);

export const PUT = withApiHandler(
  async (request: NextRequest, context: RouteContext) => {
    const auth = await requireAdmin();
    if (isUnauthorized(auth)) return auth;

    const { slug } = await context.params;

    try {
      const body = await request.json();
      const galleryImages = Array.isArray(body.galleryImages)
        ? body.galleryImages
        : [];
      const cardImage = coalesceCardImageForSave({
        cardImage: body.cardImage ?? "",
        heroImage: body.heroImage ?? "",
        galleryImages,
      });

      console.log("[admin/products PUT] persisting product", {
        slug,
        name: body.name,
        cardImage,
        heroImage: body.heroImage,
        galleryCount: galleryImages.length,
      });

      const product = await prisma.productCategory.update({
        where: { slug },
        data: {
          name: body.name,
          shortDescription: body.shortDescription,
          description: body.description,
          eyebrow: body.eyebrow,
          heroImage: body.heroImage,
          cardImage,
          galleryImages,
          features: Array.isArray(body.features) ? body.features : [],
          variants: Array.isArray(body.variants) ? body.variants : [],
          materials: Array.isArray(body.materials) ? body.materials : [],
          sizes: body.sizes ?? [],
          gsmRange: body.gsmRange ?? "",
          customization: Array.isArray(body.customization) ? body.customization : [],
          packaging: Array.isArray(body.packaging) ? body.packaging : [],
          idealFor: Array.isArray(body.idealFor) ? body.idealFor : [],
          leadTime: body.leadTime ?? "",
          moq: body.moq ?? "",
          metaTitle: body.metaTitle ?? null,
          metaDescription: body.metaDescription ?? null,
          ...(typeof body.sortOrder === "number" ? { sortOrder: body.sortOrder } : {}),
          ...(typeof body.visible === "boolean" ? { visible: body.visible } : {}),
        },
      });
      await revalidateSite();
      return apiSuccess(mapProduct(product));
    } catch (error) {
      console.error("[admin/products PUT error]", error);
      const message =
        error instanceof Error &&
        /Unknown column|galleryImages/i.test(error.message)
          ? "Database schema is out of date. Run: npx prisma migrate deploy"
          : error instanceof Error
            ? error.message
            : "Failed to update product";
      return apiError(message, 500, "UPDATE_FAILED");
    }
  },
);

export const DELETE = withApiHandler(
  async (_request: NextRequest, context: RouteContext) => {
    const auth = await requireAdmin();
    if (isUnauthorized(auth)) return auth;

    const { slug } = await context.params;

    try {
      await prisma.productCategory.delete({ where: { slug } });
      await revalidateSite();
      return apiSuccess({ deleted: true });
    } catch {
      return apiError("Failed to delete product", 500, "DELETE_FAILED");
    }
  },
);
