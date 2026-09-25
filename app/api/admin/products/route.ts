import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminEmailFromCookies } from "@/lib/auth";
import { sanitizeString } from "@/lib/security";

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
    const description = sanitizeString(body?.description, 2000);
    const image = sanitizeString(body?.image, 255);
    const features = Array.isArray(body?.features) ? JSON.stringify(body.features.map((f: unknown) => sanitizeString(f, 200))) : "[]";

    if (!title || !category || !description) {
      return NextResponse.json({ error: "Title, category, and description are required." }, { status: 400 });
    }

    const slug = sanitizeString(body?.slug, 120) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        category,
        gsmRange: gsmRange || "500 - 650 GSM",
        material: material || "100% Cotton",
        dimensions: dimensions || "70 x 140 cm",
        weaveType: weaveType || "Terry",
        minOrderQty: minOrderQty || "1,000 pcs",
        description,
        features,
        image: image || "/images/products/bath-towels.jpg",
      },
    });

    return NextResponse.json({ success: true, product });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
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
    if (body.category) data.category = sanitizeString(body.category, 100);
    if (body.gsmRange) data.gsmRange = sanitizeString(body.gsmRange, 80);
    if (body.material) data.material = sanitizeString(body.material, 120);
    if (body.dimensions) data.dimensions = sanitizeString(body.dimensions, 100);
    if (body.weaveType) data.weaveType = sanitizeString(body.weaveType, 100);
    if (body.minOrderQty) data.minOrderQty = sanitizeString(body.minOrderQty, 80);
    if (body.description) data.description = sanitizeString(body.description, 2000);
    if (body.image) data.image = sanitizeString(body.image, 255);
    if (Array.isArray(body.features)) {
      data.features = JSON.stringify(body.features.map((f: unknown) => sanitizeString(f, 200)));
    }
    if (body.published !== undefined) {
      data.published = Boolean(body.published);
    }

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
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

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
