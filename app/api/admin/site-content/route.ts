import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminEmailFromCookies } from "@/lib/auth";
import { sanitizeString, isValidEmail, isValidPhone } from "@/lib/security";

export async function GET() {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const content = await prisma.siteContent.findUnique({
      where: { id: "site" },
    });
    return NextResponse.json({ success: true, content });
  } catch {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminEmail = await getAdminEmailFromCookies();
    if (!adminEmail) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const sanitizedData: any = {};

    if (body.brandName) sanitizedData.brandName = sanitizeString(body.brandName, 100);
    if (body.tagline) sanitizedData.tagline = sanitizeString(body.tagline, 255);
    if (body.heroTitle) sanitizedData.heroTitle = sanitizeString(body.heroTitle, 255);
    if (body.heroSubtitle) sanitizedData.heroSubtitle = sanitizeString(body.heroSubtitle, 1000);
    if (body.experienceYears !== undefined) sanitizedData.experienceYears = Number(body.experienceYears) || 28;
    if (body.monthlyCapacityTons !== undefined) sanitizedData.monthlyCapacityTons = Number(body.monthlyCapacityTons) || 550;
    if (body.loomsCount !== undefined) sanitizedData.loomsCount = Number(body.loomsCount) || 200;
    if (body.countriesServed !== undefined) sanitizedData.countriesServed = Number(body.countriesServed) || 35;
    if (body.primaryEmail && isValidEmail(body.primaryEmail)) sanitizedData.primaryEmail = sanitizeString(body.primaryEmail, 150);
    if (body.salesEmail && isValidEmail(body.salesEmail)) sanitizedData.salesEmail = sanitizeString(body.salesEmail, 150);
    if (body.phone && isValidPhone(body.phone)) sanitizedData.phone = sanitizeString(body.phone, 30);
    if (body.whatsappNumber) sanitizedData.whatsappNumber = sanitizeString(body.whatsappNumber, 30);
    if (body.addressCity) sanitizedData.addressCity = sanitizeString(body.addressCity, 100);
    if (body.addressCountry) sanitizedData.addressCountry = sanitizeString(body.addressCountry, 100);

    const updated = await prisma.siteContent.upsert({
      where: { id: "site" },
      update: sanitizedData,
      create: {
        id: "site",
        ...sanitizedData,
      },
    });

    return NextResponse.json({ success: true, content: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
