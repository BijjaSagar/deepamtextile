import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateRfqNumber } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      companyName,
      targetRegion,
      destinationCountry,
      productCategory,
      estimatedQuantity,
      gsmSpecification,
      isSampleRequested,
      privateLabelInterest,
      message,
    } = body;

    if (!fullName || !email || !phone || !targetRegion || !productCategory) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Target Region, Product Category)." },
        { status: 400 }
      );
    }

    const refNumber = generateRfqNumber();

    const inquiry = await prisma.inquiry.create({
      data: {
        refNumber,
        fullName,
        email,
        phone,
        companyName: companyName || "Independent Buyer",
        targetRegion,
        destinationCountry: destinationCountry || targetRegion,
        productCategory,
        estimatedQuantity: estimatedQuantity || "1,000 - 5,000 pcs",
        gsmSpecification: gsmSpecification || null,
        isSampleRequested: Boolean(isSampleRequested),
        privateLabelInterest: Boolean(privateLabelInterest),
        message: message || "Requesting quotation and catalog specifications.",
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry and RFQ have been registered successfully.",
      inquiry: {
        id: inquiry.id,
        refNumber: inquiry.refNumber,
        targetRegion: inquiry.targetRegion,
        productCategory: inquiry.productCategory,
      },
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again or contact us directly on WhatsApp." },
      { status: 500 }
    );
  }
}
