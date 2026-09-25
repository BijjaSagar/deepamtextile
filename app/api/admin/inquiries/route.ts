import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const status = searchParams.get("status");

    const where: any = {};
    if (region && region !== "all") {
      where.targetRegion = region;
    }
    if (status && status !== "all") {
      where.status = status;
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error("Admin get inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await prisma.inquiry.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("Admin update inquiry error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("Admin delete inquiry error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
