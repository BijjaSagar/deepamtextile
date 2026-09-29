import { prisma, isDbConfigured } from "@/lib/db";
import type { Inquiry } from "@prisma/client";

export type InquiryRecord = Inquiry;

export async function createInquiry(data: {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  buyerType: string;
  estimatedVolume?: string | null;
  targetMarket?: string | null;
  source?: string;
}): Promise<InquiryRecord> {
  if (!isDbConfigured()) {
    return {
      id: `inquiry-${Date.now()}`,
      name: data.name,
      company: data.company,
      country: data.country,
      email: data.email,
      phone: data.phone,
      productInterest: data.productInterest,
      message: data.message,
      buyerType: data.buyerType,
      estimatedVolume: data.estimatedVolume ?? null,
      targetMarket: data.targetMarket ?? null,
      source: data.source ?? "web",
      emailSent: false,
      emailError: null,
      readAt: null,
      createdAt: new Date(),
    };
  }
  try {
    return await prisma.inquiry.create({
      data: {
        name: data.name,
        company: data.company,
        country: data.country,
        email: data.email,
        phone: data.phone,
        productInterest: data.productInterest,
        message: data.message,
        buyerType: data.buyerType,
        estimatedVolume: data.estimatedVolume ?? null,
        targetMarket: data.targetMarket ?? null,
        source: data.source ?? "web",
      },
    });
  } catch (err) {
    console.error("[createInquiry] DB error:", err);
    return {
      id: `inquiry-${Date.now()}`,
      name: data.name,
      company: data.company,
      country: data.country,
      email: data.email,
      phone: data.phone,
      productInterest: data.productInterest,
      message: data.message,
      buyerType: data.buyerType,
      estimatedVolume: data.estimatedVolume ?? null,
      targetMarket: data.targetMarket ?? null,
      source: data.source ?? "web",
      emailSent: false,
      emailError: null,
      readAt: null,
      createdAt: new Date(),
    };
  }
}

export async function markInquiryEmailResult(
  id: string,
  emailSent: boolean,
  emailError?: string | null,
): Promise<void> {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: {
        emailSent,
        emailError: emailError ?? null,
      },
    });
  } catch (err) {
    console.error("[markInquiryEmailResult] DB error:", err);
  }
}

export async function getAllInquiriesAdmin(): Promise<InquiryRecord[]> {
  if (!isDbConfigured()) return [];
  try {
    return await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[getAllInquiriesAdmin] DB error, returning empty array:", err);
    return [];
  }
}

export async function getInquiryById(id: string): Promise<InquiryRecord | null> {
  if (!isDbConfigured()) return null;
  try {
    return await prisma.inquiry.findUnique({ where: { id } });
  } catch (err) {
    console.error("[getInquiryById] DB error:", err);
    return null;
  }
}

export async function markInquiryRead(id: string): Promise<InquiryRecord | null> {
  try {
    return await prisma.inquiry.update({
      where: { id },
      data: { readAt: new Date() },
    });
  } catch (err) {
    console.error("[markInquiryRead] DB error:", err);
    return null;
  }
}

export async function markInquiryUnread(id: string): Promise<InquiryRecord | null> {
  try {
    return await prisma.inquiry.update({
      where: { id },
      data: { readAt: null },
    });
  } catch (err) {
    console.error("[markInquiryUnread] DB error:", err);
    return null;
  }
}

