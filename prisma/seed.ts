import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Deepam Textile database...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@deepamtextile.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "DeepamAdmin2026!";
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  });
  console.log(`✓ Admin user created/updated (${adminEmail})`);

  // 2. Seed Site Content
  await prisma.siteContent.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      brandName: "Deepam Textile",
      tagline: "Luxury in Every Thread — Crafted for Global Hospitality",
      heroTitle: "Premium Towels & Home Textiles, Made for Your Brand",
      heroSubtitle:
        "We manufacture premium bath towels, hotel linen and custom home textiles for hospitality, retail and private label buyers across South East Asia, the Middle East, and Europe.",
      experienceYears: 40,
      monthlyCapacityTons: 550,
      loomsCount: 200,
      countriesServed: 35,
      primaryEmail: "export@deepamtextile.com",
      salesEmail: "sales@deepamtextile.com",
      phone: "+91 70661 48936",
      whatsappNumber: "+917066148936",
      addressCity: "Solapur, Maharashtra",
      addressCountry: "India",
    },
  });
  console.log("✓ Site content initialized");

  // 3. Seed Products
  const products = [
    {
      slug: "bath-towels",
      title: "Bath Towels",
      category: "bath-towels",
      gsmRange: "500 - 700 GSM",
      material: "100% Combed Ring-Spun Cotton",
      dimensions: "70 x 140 cm / 80 x 160 cm",
      weaveType: "Plush Terry, Zero-Twist, Dobby Border",
      minOrderQty: "1,000 pcs per color/size",
      description:
        "Engineered for five-star hotels and luxury retail brands, our bath towels offer supreme absorbency, ultra-soft hand feel, and industrial wash resilience.",
      features: JSON.stringify([
        "100% long-staple Indian combed cotton",
        "Reinforced double-needle side hems to prevent fraying",
        "Zero-twist yarn for cloud-like softness and rapid drying",
        "OEKO-TEX® Standard 100 certified non-toxic dyes",
      ]),
      image: "/images/products/bath-towels.jpg",
      sortOrder: 1,
    },
    {
      slug: "hand-towels",
      title: "Hand Towels",
      category: "hand-towels",
      gsmRange: "500 - 600 GSM",
      material: "100% Ring-Spun Combed Cotton",
      dimensions: "50 x 90 cm / 50 x 100 cm",
      weaveType: "Terry with elegant ribbed or plain cam border",
      minOrderQty: "1,500 pcs per color",
      description:
        "Refined, durable hand towels crafted for executive washrooms, boutique guest rooms, and upscale department store collections.",
      features: JSON.stringify([
        "High absorbency with fast-drying capillary action",
        "Vat dyed for exceptional colorfastness against frequent laundering",
        "Custom dobby border and logo embroidery available",
      ]),
      image: "/images/products/hand-towels.jpg",
      sortOrder: 2,
    },
    {
      slug: "face-towels",
      title: "Face Towels & Wash Cloths",
      category: "face-towels",
      gsmRange: "450 - 550 GSM",
      material: "100% Natural Combed Cotton",
      dimensions: "30 x 30 cm / 33 x 33 cm",
      weaveType: "Fine Terry with lock-stitched edges",
      minOrderQty: "3,000 pcs",
      description:
        "Ultra-gentle face cloths designed for luxury spa treatments and daily hospitality comfort.",
      features: JSON.stringify([
        "Hypoallergenic and delicate on sensitive skin",
        "Dense pile structure minimizes lint shedding",
        "Withstands 100+ commercial wash cycles at 60°C",
      ]),
      image: "/images/products/face-towels.jpg",
      sortOrder: 3,
    },
    {
      slug: "bath-mats",
      title: "Bath Mats & Tub Mats",
      category: "bath-mats",
      gsmRange: "800 - 1000 GSM",
      material: "Heavyweight 100% Cotton",
      dimensions: "50 x 80 cm / 60 x 90 cm",
      weaveType: "Heavy ribbed terry with Greek key or solid border",
      minOrderQty: "1,000 pcs",
      description:
        "Substantial, non-slip hotel tub mats with high pile density that instantly absorb excess water and step into sheer luxury.",
      features: JSON.stringify([
        "Ultra-heavyweight 900 GSM construction for firm floor adherence",
        "Quick drying without rubberized backing for commercial laundry ease",
        "Embossed border and custom hotel jacquard crest available",
      ]),
      image: "/images/products/bath-mats.jpg",
      sortOrder: 4,
    },
    {
      slug: "hotel-linen",
      title: "Hotel Linen Programs",
      category: "hotel-linen",
      gsmRange: "300 - 600 Thread Count",
      material: "100% Combed Cotton Percale & Sateen",
      dimensions: "Single, Double, Queen, King, Super King",
      weaveType: "Silky Sateen Stripe (1cm/2cm) & Crisp Percale",
      minOrderQty: "500 sets / 2,000 meters",
      description:
        "Comprehensive bedroom and bathroom linen turnkey programs for multinational hotel chains, serviced apartments, and cruise lines.",
      features: JSON.stringify([
        "Breathable high-thread-count Egyptian-grade yarns",
        "Color-coded size identification hem threads for fast housekeeping",
        "Sanforized anti-shrinkage pre-treatment",
      ]),
      image: "/images/products/hotel-linen.jpg",
      sortOrder: 5,
    },
    {
      slug: "bath-robes",
      title: "Luxury Bath Robes",
      category: "bath-robes",
      gsmRange: "380 - 450 GSM",
      material: "100% Cotton Terry / Waffle / Velour",
      dimensions: "S, M, L, XL, XXL (Unisex Kimono & Shawl Collar)",
      weaveType: "Plush Shawl Collar or Lightweight Honeycomb Waffle",
      minOrderQty: "500 pcs",
      description:
        "Opulent bathrobes tailored with generous patch pockets, double belt loops, and luxurious drape for resorts and spas.",
      features: JSON.stringify([
        "Dual-texture: soft sheared velour outer with absorbent terry inside",
        "Generous wrap-around cut with sturdy hanger loop",
        "Bespoke embroidery on chest and back",
      ]),
      image: "/images/products/bath-robes.jpg",
      sortOrder: 6,
    },
    {
      slug: "kitchen-towels",
      title: "Kitchen & Dining Towels",
      category: "kitchen-towels",
      gsmRange: "250 - 350 GSM",
      material: "100% Combed Cotton or Cotton-Linen Blend",
      dimensions: "45 x 70 cm / 50 x 70 cm",
      weaveType: "Herringbone, Jacquard, and Glass Cloth Weave",
      minOrderQty: "2,000 pcs",
      description:
        "Lint-free, streak-free drying towels for professional culinary environments, luxury restaurants, and homeware brands.",
      features: JSON.stringify([
        "Zero-lint finish ideal for wine glass and crystal polishing",
        "Reinforced hanging loop with woven brand label",
        "High grease and water absorption capacity",
      ]),
      image: "/images/products/kitchen-towels.jpg",
      sortOrder: 7,
    },
    {
      slug: "beach-towels",
      title: "Cabana & Beach Towels",
      category: "beach-towels",
      gsmRange: "450 - 600 GSM",
      material: "100% Cotton Velour / Terry",
      dimensions: "90 x 180 cm / 100 x 200 cm",
      weaveType: "Yarn-dyed Cabana Stripe & Jacquard Woven",
      minOrderQty: "1,000 pcs",
      description:
        "Oversized resort towels engineered to resist direct sunlight, saltwater, and frequent beach club rotation.",
      features: JSON.stringify([
        "Vat-dyed fibers maintain vibrant coloration under intense UV",
        "Velour front for sand resistance, loop terry back for drying",
        "Classic European cabana stripe & custom resort jacquard weaving",
      ]),
      image: "/images/products/beach-towels.jpg",
      sortOrder: 8,
    },
    {
      slug: "pool-towels",
      title: "Pool & Lounger Towels",
      category: "pool-towels",
      gsmRange: "500 - 650 GSM",
      material: "100% Chlorine-Resistant Cotton",
      dimensions: "85 x 165 cm / 90 x 180 cm",
      weaveType: "Double Loop Terry with woven center identifier stripe",
      minOrderQty: "1,000 pcs",
      description:
        "Heavy-duty pool towels treated for chlorine resistance, making them ideal for high-traffic hotel pool decks and waterparks.",
      features: JSON.stringify([
        "Indanthrene / Vat dyed to resist chemical fading from chlorine",
        "Heavy double-looped pile cushions against teak loungers",
        "Quick-dry yarn structure prevents musty damp odors",
      ]),
      image: "/images/products/pool-towels.jpg",
      sortOrder: 9,
    },
    {
      slug: "spa-towels",
      title: "Spa & Wellness Towels",
      category: "spa-towels",
      gsmRange: "550 - 650 GSM",
      material: "100% Super-Fine Micro-Cotton",
      dimensions: "70 x 140 cm / 100 x 150 cm",
      weaveType: "Velvet touch terry with oil-release finish",
      minOrderQty: "1,000 pcs",
      description:
        "Calming earth-toned wellness towels infused with stain-resistant release chemistry to withstand massage oils and mud wraps.",
      features: JSON.stringify([
        "Special oil-release chemical treatment aids oil removal during wash",
        "Sophisticated natural palette: Sage, Oat, Taupe, Slate, Pearl",
        "Luxuriously deep pile for indulgent treatment bed draping",
      ]),
      image: "/images/products/spa-towels.jpg",
      sortOrder: 10,
    },
    {
      slug: "private-labeling",
      title: "Private Label Manufacturing",
      category: "private-labeling",
      gsmRange: "Custom (350 - 900 GSM)",
      material: "Organic GOTS, BCI, Egyptian or Indian Cotton",
      dimensions: "Custom Specifications as per Buyer Tech Pack",
      weaveType: "Bespoke Dobby, Jacquard, Terry, Waffle, Velour",
      minOrderQty: "2,000 pcs per specification",
      description:
        "End-to-end private labeling services: custom GSM, Pantone yarn dyeing, woven damask labels, custom barcode tags, and sustainable export packaging.",
      features: JSON.stringify([
        "Full brand customization: woven jacquard borders & crests",
        "Retail ready packaging: FSC certified cartons, hangtags, polybags",
        "Comprehensive lab testing reports provided with every shipment",
      ]),
      image: "/images/products/private-label.jpg",
      sortOrder: 11,
    },
    {
      slug: "promotional-towels",
      title: "Promotional & Corporate Towels",
      category: "promotional-towels",
      gsmRange: "380 - 500 GSM",
      material: "100% Cotton",
      dimensions: "40 x 80 cm / 70 x 140 cm",
      weaveType: "Border Jacquard or Precision Embroidery",
      minOrderQty: "1,500 pcs",
      description:
        "High-impact branded textiles for corporate gifting, golf tournaments, brand activations, and promotional merchandise campaigns.",
      features: JSON.stringify([
        "High-definition border weaving reproduces complex company logos",
        "Fast turnaround times for scheduled brand marketing events",
        "Competitive bulk price points with uncompromising terry quality",
      ]),
      image: "/images/products/promotional-towels.jpg",
      sortOrder: 12,
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`✓ Seeded ${products.length} products`);

  // 4. Seed Inquiries across target regions
  const inquiries = [
    {
      refNumber: "DT-RFQ-SEA-2026-001",
      fullName: "Tan Wei Ming",
      email: "weiming.tan@singaporeresorts.com.sg",
      phone: "+65 6789 1234",
      companyName: "Sentosa Heritage Luxury Resorts",
      targetRegion: "South East Asia",
      destinationCountry: "Singapore",
      productCategory: "Pool & Lounger Towels",
      estimatedQuantity: "15,000 pcs",
      gsmSpecification: "600 GSM Vat-Dyed Cabana Stripe",
      isSampleRequested: true,
      privateLabelInterest: true,
      message:
        "Seeking supply for our flagship 5-star island resort. Need chlorine-resistant pool towels and quick-dry cabana towels with custom woven logo.",
      status: "QUOTED",
      notes: "Quotation sent via CIF Singapore. Awaiting sample approval.",
    },
    {
      refNumber: "DT-RFQ-ME-2026-002",
      fullName: "Rashid Al-Maktoum",
      email: "procurement@alfuttaim-hospitality.ae",
      phone: "+971 4 388 9000",
      companyName: "Al-Futtaim Hospitality Group",
      targetRegion: "Middle East",
      destinationCountry: "United Arab Emirates (Dubai)",
      productCategory: "Bath Towels & Hotel Linen",
      estimatedQuantity: "30,000 pcs (2 x 40ft HQ Containers)",
      gsmSpecification: "700 GSM Combed Zero-Twist + 400 TC Bedding",
      isSampleRequested: true,
      privateLabelInterest: true,
      message:
        "We are opening a new luxury property in Downtown Dubai. Need high-end bath towels (700 GSM) and matching bath sheets with gold dobby borders.",
      status: "CONTACTED",
      notes: "Spoke with procurement team over WhatsApp. Arranging courier of physical samples to Dubai office.",
    },
    {
      refNumber: "DT-RFQ-EUR-2026-003",
      fullName: "Sophie Laurent",
      email: "s.laurent@nordic-textil.de",
      phone: "+49 30 8923 4410",
      companyName: "Nordic Organic Living GmbH",
      targetRegion: "Europe",
      destinationCountry: "Germany (Hamburg)",
      productCategory: "Bath Robes & Spa Towels",
      estimatedQuantity: "8,000 pcs",
      gsmSpecification: "450 GSM Organic Cotton OEKO-TEX Standard 100",
      isSampleRequested: true,
      privateLabelInterest: true,
      message:
        "We require OEKO-TEX Standard 100 and GOTS compliant bathrobes and wellness spa towels in natural earth tones (Sage, Taupe, Oat). Please send certification dossiers.",
      status: "NEW",
      notes: "Lead received from website RFQ. High-potential European retail buyer.",
    },
  ];

  for (const inq of inquiries) {
    await prisma.inquiry.upsert({
      where: { refNumber: inq.refNumber },
      update: inq,
      create: inq,
    });
  }
  console.log(`✓ Seeded ${inquiries.length} initial inquiries across target regions`);

  console.log("Deepam Textile seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
