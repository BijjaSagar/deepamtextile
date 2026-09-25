import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, category, gsmRange, material, dimensions, weaveType, minOrderQty, description, features, image } = body;

    const product = await prisma.product.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category,
        gsmRange: gsmRange || "500 - 650 GSM",
        material: material || "100% Cotton",
        dimensions: dimensions || "70 x 140 cm",
        weaveType: weaveType || "Terry",
        minOrderQty: minOrderQty || "1,000 pcs",
        description,
        features: Array.isArray(features) ? JSON.stringify(features) : "[]",
        image: image || "/images/products/bath-towels.jpg",
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Admin create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category, gsmRange, material, dimensions, weaveType, minOrderQty, description, features, image, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title,
        category,
        gsmRange,
        material,
        dimensions,
        weaveType,
        minOrderQty,
        description,
        features: Array.isArray(features) ? JSON.stringify(features) : undefined,
        image,
        published: published !== undefined ? Boolean(published) : undefined,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Admin update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Admin delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
