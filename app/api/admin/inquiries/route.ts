import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminEmailFromCookies } from "@/lib/auth";
import { sanitizeString } from "@/lib/security";

export async function GET(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const status = searchParams.get("status");

    const where: any = {};
    if (region && region !== "all") {
      where.targetRegion = sanitizeString(region, 50);
    }
    if (status && status !== "all") {
      where.status = sanitizeString(status, 30);
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const id = sanitizeString(body?.id, 100);
    const status = body?.status ? sanitizeString(body.status, 30) : undefined;
    const notes = body?.notes !== undefined ? sanitizeString(body.notes, 2000) : undefined;

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
  } catch {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
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
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
