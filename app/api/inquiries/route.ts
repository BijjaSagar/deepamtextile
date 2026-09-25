import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateRfqNumber } from "@/lib/utils";
import { checkRateLimit, getClientIp, sanitizeString, isValidEmail, isValidPhone } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check: max 5 inquiries per minute per IP
    const clientIp = getClientIp(request.headers);
    const rateCheck = checkRateLimit(`inquiry:${clientIp}`, 5, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many quote requests from your network. Please wait ${rateCheck.resetInSec} seconds before submitting again.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
    }

    const fullName = sanitizeString(body.fullName, 100);
    const email = sanitizeString(body.email, 150).toLowerCase();
    const phone = sanitizeString(body.phone, 30);
    const companyName = sanitizeString(body.companyName, 120);
    const targetRegion = sanitizeString(body.targetRegion, 50);
    const destinationCountry = sanitizeString(body.destinationCountry, 100);
    const productCategory = sanitizeString(body.productCategory, 100);
    const estimatedQuantity = sanitizeString(body.estimatedQuantity, 80);
    const gsmSpecification = body.gsmSpecification ? sanitizeString(body.gsmSpecification, 100) : null;
    const isSampleRequested = Boolean(body.isSampleRequested);
    const privateLabelInterest = Boolean(body.privateLabelInterest);
    const message = sanitizeString(body.message, 2500);

    // 3. Strict Input Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Full Name is required (minimum 2 characters)." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "A valid corporate or business email address is required." }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "A valid contact telephone number with country code is required." }, { status: 400 });
    }

    const validRegions = ["South East Asia", "Middle East", "Europe", "Other"];
    if (!targetRegion || !validRegions.includes(targetRegion)) {
      return NextResponse.json({ error: "Please select a valid destination export corridor." }, { status: 400 });
    }

    if (!productCategory) {
      return NextResponse.json({ error: "Please select a primary product category." }, { status: 400 });
    }

    // 4. Create inquiry record in Database
    const refNumber = generateRfqNumber();

    const inquiry = await prisma.inquiry.create({
      data: {
        refNumber,
        fullName,
        email,
        phone,
        companyName: companyName || "Independent Procurement Buyer",
        targetRegion,
        destinationCountry: destinationCountry || targetRegion,
        productCategory,
        estimatedQuantity: estimatedQuantity || "1,000 - 5,000 pcs (FCL)",
        gsmSpecification,
        isSampleRequested,
        privateLabelInterest,
        message: message || "Requesting export catalog, mill specifications, and CIF quotation.",
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your export inquiry and RFQ specification have been registered successfully.",
      inquiry: {
        id: inquiry.id,
        refNumber: inquiry.refNumber,
        targetRegion: inquiry.targetRegion,
        productCategory: inquiry.productCategory,
      },
    });
  } catch (error) {
    // Hide sensitive internal/database error details from client response
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry. Please try again or connect directly via WhatsApp." },
      { status: 500 }
    );
  }
}
