import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminEmailFromCookies } from "@/lib/auth";
import { sanitizeString } from "@/lib/security";
import { getAllProducts, parseProductImages } from "@/lib/products-data";

export async function GET(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
      const dbProducts = await prisma.product.findMany({
        orderBy: { sortOrder: "asc" },
      });

      if (dbProducts.length > 0) {
        const formatted = dbProducts.map((p) => {
          let features: string[] = [];
          try {
            features = JSON.parse(p.features || "[]");
          } catch {
            features = [];
          }

          const images = parseProductImages(p);

          return {
            ...p,
            features,
            images,
          };
        });

        return NextResponse.json({ success: true, products: formatted });
      }
    } catch (e) {
      console.warn("Admin products DB fetch error, falling back to default list:", e);
    }

    const defaultCatalog = await getAllProducts();
    return NextResponse.json({ success: true, products: defaultCatalog });
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const title = sanitizeString(body?.title, 150);
    const category = sanitizeString(body?.category, 100);
    const gsmRange = sanitizeString(body?.gsmRange, 80);
    const material = sanitizeString(body?.material, 120);
    const dimensions = sanitizeString(body?.dimensions, 100);
    const weaveType = sanitizeString(body?.weaveType, 100);
    const minOrderQty = sanitizeString(body?.minOrderQty, 80);
    const description = sanitizeString(body?.description, 3000);
    const image = sanitizeString(body?.image, 500);

    // Sanitize images array
    const rawImages = Array.isArray(body?.images) ? body.images : [];
    const sanitizedImages = rawImages
      .filter((img: unknown) => typeof img === "string" && img.trim().length > 0)
      .map((img: string) => sanitizeString(img, 500));

    // Ensure image is set to first image if not provided
    const primaryImage = image || sanitizedImages[0] || "/images/products/bath-towels.jpg";
    if (sanitizedImages.length === 0) {
      sanitizedImages.push(primaryImage);
    }

    const features = Array.isArray(body?.features)
      ? JSON.stringify(body.features.map((f: unknown) => sanitizeString(f, 250)))
      : "[]";

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Title, category, and description are required." },
        { status: 400 }
      );
    }

    const slug =
      sanitizeString(body?.slug, 120) ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        category,
        gsmRange: gsmRange || "500 - 700 GSM",
        material: material || "100% Combed Ring-Spun Cotton",
        dimensions: dimensions || "70 x 140 cm",
        weaveType: weaveType || "Terry / Dobby Border",
        minOrderQty: minOrderQty || "1,000 pcs",
        description,
        features,
        image: primaryImage,
        images: JSON.stringify(sanitizedImages),
        published: body?.published !== undefined ? Boolean(body.published) : true,
        sortOrder: typeof body?.sortOrder === "number" ? body.sortOrder : 0,
      },
    });

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        images: sanitizedImages,
        features: JSON.parse(features),
      },
    });
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const id = sanitizeString(body?.id, 100);

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const data: any = {};
    if (body.title) data.title = sanitizeString(body.title, 150);
    if (body.slug) data.slug = sanitizeString(body.slug, 120);
    if (body.category) data.category = sanitizeString(body.category, 100);
    if (body.gsmRange) data.gsmRange = sanitizeString(body.gsmRange, 80);
    if (body.material) data.material = sanitizeString(body.material, 120);
    if (body.dimensions) data.dimensions = sanitizeString(body.dimensions, 100);
    if (body.weaveType) data.weaveType = sanitizeString(body.weaveType, 100);
    if (body.minOrderQty) data.minOrderQty = sanitizeString(body.minOrderQty, 80);
    if (body.description) data.description = sanitizeString(body.description, 3000);
    if (body.image) data.image = sanitizeString(body.image, 500);

    if (Array.isArray(body.images)) {
      const sanitizedImages = body.images
        .filter((img: unknown) => typeof img === "string" && img.trim().length > 0)
        .map((img: string) => sanitizeString(img, 500));
      data.images = JSON.stringify(sanitizedImages);
      if (!data.image && sanitizedImages.length > 0) {
        data.image = sanitizedImages[0];
      }
    }

    if (Array.isArray(body.features)) {
      data.features = JSON.stringify(body.features.map((f: unknown) => sanitizeString(f, 250)));
    }

    if (body.published !== undefined) {
      data.published = Boolean(body.published);
    }

    if (typeof body.sortOrder === "number") {
      data.sortOrder = body.sortOrder;
    }

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      product: {
        ...updated,
        images: parseProductImages(updated),
        features: JSON.parse(updated.features || "[]"),
      },
    });
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = sanitizeString(searchParams.get("id"), 100);

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
