import { prisma } from "@/lib/prisma";
import { ProductItem } from "@/lib/types";

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prod-bath-towels",
    slug: "bath-towels",
    title: "Luxury Bath Towels",
    category: "bath-towels",
    gsmRange: "500 - 700 GSM",
    material: "100% Combed Ring-Spun Cotton",
    dimensions: "70 x 140 cm / 80 x 160 cm",
    weaveType: "Plush Terry, Zero-Twist, Woven Dobby Border",
    minOrderQty: "1,000 pcs per color/size",
    description:
      "Engineered for five-star hotels and luxury retail brands, our bath towels offer supreme absorbency, ultra-soft hand feel, and industrial wash resilience. Loomed with long-staple Indian cotton and double-needle lock-stitched side hems.",
    features: [
      "100% long-staple Indian combed cotton",
      "Reinforced double-needle side hems to prevent unraveling",
      "Zero-twist yarn for cloud-like softness and rapid drying",
      "OEKO-TEX® Standard 100 certified non-toxic dyes",
      "Vat dyed for 100+ commercial wash cycle resistance",
    ],
    image: "/images/products/bath-towels.jpg",
    images: [
      "/images/products/bath-towels.jpg",
      "/images/products/spa-towels.jpg",
      "/images/products/hand-towels.jpg",
      "/images/products/hotel-linen.jpg",
    ],
    sortOrder: 1,
    published: true,
  },
  {
    id: "prod-hand-towels",
    slug: "hand-towels",
    title: "Executive Hand Towels",
    category: "hand-towels",
    gsmRange: "500 - 600 GSM",
    material: "100% Ring-Spun Combed Cotton",
    dimensions: "50 x 90 cm / 50 x 100 cm",
    weaveType: "Terry with elegant ribbed or plain cam border",
    minOrderQty: "1,500 pcs per color",
    description:
      "Refined, durable hand towels crafted for executive washrooms, boutique guest rooms, and upscale department store collections. High capillary action ensures instant moisture wicking.",
    features: [
      "High absorbency with fast-drying capillary action",
      "Vat dyed for exceptional colorfastness against frequent laundering",
      "Custom dobby border and logo embroidery available",
      "Pre-washed to minimize residual shrinkage below 3%",
    ],
    image: "/images/products/hand-towels.jpg",
    images: [
      "/images/products/hand-towels.jpg",
      "/images/products/face-towels.jpg",
      "/images/products/bath-towels.jpg",
    ],
    sortOrder: 2,
    published: true,
  },
  {
    id: "prod-face-towels",
    slug: "face-towels",
    title: "Face Towels & Wash Cloths",
    category: "face-towels",
    gsmRange: "450 - 550 GSM",
    material: "100% Natural Combed Cotton",
    dimensions: "30 x 30 cm / 33 x 33 cm",
    weaveType: "Fine Terry with lock-stitched edges",
    minOrderQty: "3,000 pcs",
    description:
      "Ultra-gentle face cloths designed for luxury spa treatments, guest turndown service, and daily hospitality comfort. Hypoallergenic, soft on delicate skin, with minimal lint shedding.",
    features: [
      "Hypoallergenic and delicate on sensitive skin",
      "Dense pile structure minimizes lint shedding",
      "Withstands 100+ commercial wash cycles at 60°C",
      "Tear-resistant double hemming on all four borders",
    ],
    image: "/images/products/face-towels.jpg",
    images: [
      "/images/products/face-towels.jpg",
      "/images/products/hand-towels.jpg",
      "/images/products/spa-towels.jpg",
    ],
    sortOrder: 3,
    published: true,
  },
  {
    id: "prod-bath-mats",
    slug: "bath-mats",
    title: "Bath Mats & Heavy Tub Mats",
    category: "bath-mats",
    gsmRange: "800 - 1000 GSM",
    material: "Heavyweight 100% Cotton",
    dimensions: "50 x 80 cm / 60 x 90 cm",
    weaveType: "Heavy ribbed terry with Greek key or solid border",
    minOrderQty: "1,000 pcs",
    description:
      "Substantial, non-slip hotel tub mats with high pile density that instantly absorb excess water and step into sheer luxury. Built without rubber backing for effortless commercial laundry processing.",
    features: [
      "Ultra-heavyweight 900 GSM construction for firm floor adherence",
      "Quick drying without rubberized backing for commercial laundry ease",
      "Embossed border and custom hotel jacquard crest available",
      "Heavy duty twist yarns prevent crushing over extended footfall",
    ],
    image: "/images/products/bath-mats.jpg",
    images: [
      "/images/products/bath-mats.jpg",
      "/images/products/bath-towels.jpg",
      "/images/products/hotel-linen.jpg",
    ],
    sortOrder: 4,
    published: true,
  },
  {
    id: "prod-pool-towels",
    slug: "pool-towels",
    title: "Cabana Pool Towels",
    category: "pool-towels",
    gsmRange: "450 - 550 GSM",
    material: "100% Vat-Dyed Cotton",
    dimensions: "90 x 180 cm / 100 x 200 cm",
    weaveType: "Yarn-dyed 2-inch Cabana Stripe / Woven Jacquard",
    minOrderQty: "1,000 pcs per pattern",
    description:
      "Iconic poolside statement towels for luxury island resorts, beach clubs, and cruise lines. Vat dyed to withstand intense tropical sun, chlorinated pool water, and saltwater without color fading.",
    features: [
      "Chlorine-resistant and UV-stable vat dyes (Grade 4-5 fastness)",
      "Generous oversized length (up to 200cm) covering full loungers",
      "Quick-dry tropical weave calibrated for humid coastal climates",
      "Custom yarn-dyed stripes matching resort Pantone palettes",
    ],
    image: "/images/products/pool-towels.jpg",
    images: [
      "/images/products/pool-towels.jpg",
      "/images/products/beach-towels.jpg",
      "/images/products/bath-towels.jpg",
    ],
    sortOrder: 5,
    published: true,
  },
  {
    id: "prod-beach-towels",
    slug: "beach-towels",
    title: "Velour Jacquard Beach Towels",
    category: "beach-towels",
    gsmRange: "450 - 600 GSM",
    material: "Sheared Cotton Velour / Loop Terry Back",
    dimensions: "100 x 180 cm / 100 x 200 cm",
    weaveType: "Sheared Velour Front / Loop Terry Reverse",
    minOrderQty: "1,000 pcs",
    description:
      "Ultra-luxurious sheared velour front provides a silky, velvet-like surface for vibrant custom jacquard graphics, while the looped terry reverse ensures rapid water absorption.",
    features: [
      "Silky sheared velour finish for high-definition branding",
      "Loop terry reverse for maximum water absorption",
      "High tensile strength to resist sand abrasion and sea salt",
      "Custom woven jacquard branding across the entire surface",
    ],
    image: "/images/products/beach-towels.jpg",
    images: [
      "/images/products/beach-towels.jpg",
      "/images/products/pool-towels.jpg",
      "/images/products/bath-robes.jpg",
    ],
    sortOrder: 6,
    published: true,
  },
  {
    id: "prod-bath-robes",
    slug: "bath-robes",
    title: "Luxury Terry & Waffle Bathrobes",
    category: "bath-robes",
    gsmRange: "380 - 450 GSM",
    material: "100% Combed Cotton / Dual-Face Velour",
    dimensions: "Unisex S, M, L, XL, XXL",
    weaveType: "Shawl Collar / Kimono Cut / Diamond Waffle",
    minOrderQty: "500 pcs",
    description:
      "Plush hospitality bathrobes designed for five-star presidential suites and spa sanctuaries. Features a tailored shawl collar, deep pockets, double belt loops, and custom embroidered breast crests.",
    features: [
      "Soft shawl collar with matching tie belt and dual loop positions",
      "Generous cut for comfortable European & American guest sizing",
      "Tailored internal hanging loop and deep patch pockets",
      "High-density embroidery for hotel or resort logo cresting",
    ],
    image: "/images/products/bath-robes.jpg",
    images: [
      "/images/products/bath-robes.jpg",
      "/images/products/spa-towels.jpg",
      "/images/products/bath-towels.jpg",
    ],
    sortOrder: 7,
    published: true,
  },
  {
    id: "prod-spa-towels",
    slug: "spa-towels",
    title: "Spa & Wellness Therapy Linens",
    category: "spa-towels",
    gsmRange: "450 - 550 GSM",
    material: "100% Organic Ring-Spun Cotton",
    dimensions: "100 x 200 cm / 70 x 140 cm",
    weaveType: "Snag-free Zero-Twist / Ribbed Border",
    minOrderQty: "1,000 pcs",
    description:
      "Calibrated for thermal spas, Ayurveda clinics, and wellness resorts. Specially finished to resist essential oil staining and retain its cloud-like softness through sanitizing hot cycles.",
    features: [
      "Oil and lotion barrier finish for longer commercial lifespan",
      "Extra wide 100cm cut ideal for massage table draping",
      "Zero snag loop technology resists ring and watch catches",
      "Warm neutral color palettes: Warm Stone, Sage, Ivory, Sand",
    ],
    image: "/images/products/spa-towels.jpg",
    images: [
      "/images/products/spa-towels.jpg",
      "/images/products/bath-towels.jpg",
      "/images/products/bath-robes.jpg",
    ],
    sortOrder: 8,
    published: true,
  },
  {
    id: "prod-hotel-linen",
    slug: "hotel-linen",
    title: "Hotel Bed Linen Programs",
    category: "hotel-linen",
    gsmRange: "300 - 600 Thread Count",
    material: "100% Long-Staple Combed Cotton Percale / Sateen",
    dimensions: "Single, Double, Queen, King, Super King",
    weaveType: "Silky Sateen Stripe (1cm/2cm) & Crisp Percale",
    minOrderQty: "300 sets",
    description:
      "Comprehensive hotel bed linen manufacturing including duvet covers, flat sheets, fitted sheets, and pillow shams. Silky 300-600 TC Egyptian-grade combed cotton with mercerized luster.",
    features: [
      "300 to 600 Thread Count long-staple Indian combed cotton",
      "Mercerized finish provides a radiant silky sheen and smooth hand",
      "Color-coded size identification piping on inside seams for housekeeping",
      "Withstands heavy industrial laundering with anti-pilling guarantee",
    ],
    image: "/images/products/hotel-linen.jpg",
    images: [
      "/images/products/hotel-linen.jpg",
      "/images/products/bath-towels.jpg",
      "/images/products/bath-mats.jpg",
    ],
    sortOrder: 9,
    published: true,
  },
  {
    id: "prod-kitchen-towels",
    slug: "kitchen-towels",
    title: "Commercial Kitchen & Bar Towels",
    category: "kitchen-towels",
    gsmRange: "250 - 350 GSM",
    material: "100% Unbleached or Optical White Cotton",
    dimensions: "45 x 70 cm / 50 x 75 cm",
    weaveType: "Herringbone Weave / Waffle / Glass Polishing Terry",
    minOrderQty: "5,000 pcs",
    description:
      "Lint-free, fast-drying commercial kitchen towels engineered for industrial catering, commercial restaurants, and barware polishing. Superior oil and grease pickup without leaving microfiber residue.",
    features: [
      "Lint-free flat weave for crystal clear wine glass and cutlery drying",
      "High tensile warp and weft yarns for heavy duty kitchen service",
      "Central hanging loop for chef stations",
      "Bleach-safe and boilable up to 95°C",
    ],
    image: "/images/products/kitchen-towels.jpg",
    images: [
      "/images/products/kitchen-towels.jpg",
      "/images/products/hand-towels.jpg",
      "/images/products/face-towels.jpg",
    ],
    sortOrder: 10,
    published: true,
  },
  {
    id: "prod-promotional-towels",
    slug: "promotional-towels",
    title: "Promotional & Corporate Towels",
    category: "promotional-towels",
    gsmRange: "400 - 550 GSM",
    material: "100% Combed Cotton",
    dimensions: "Custom sizing on demand",
    weaveType: "Jacquard woven relief / Dobby border branding",
    minOrderQty: "1,000 pcs",
    description:
      "High-impact branded towels for international luxury brands, sports federations, and airline gift programs. Woven jacquard relief logos or precision embroidery that lasts indefinitely.",
    features: [
      "Full surface high-definition jacquard relief weaving",
      "Custom woven care labels with client brand logo",
      "Individual polybagging or sustainable FSC kraft box packaging",
      "Strict Pantone color matching down to Delta E < 0.8",
    ],
    image: "/images/products/promotional-towels.jpg",
    images: [
      "/images/products/promotional-towels.jpg",
      "/images/products/beach-towels.jpg",
      "/images/products/hand-towels.jpg",
    ],
    sortOrder: 11,
    published: true,
  },
  {
    id: "prod-private-label",
    slug: "private-label",
    title: "Bespoke Private Label Weaving",
    category: "private-labeling",
    gsmRange: "Custom 350 - 900 GSM",
    material: "Cotton / Bamboo / Organic GOTS / Modal",
    dimensions: "Any custom dimension per tech pack",
    weaveType: "Fully custom loom configuration",
    minOrderQty: "1,000 pcs per style",
    description:
      "Complete OEM manufacturing for global retail home textile brands and department store chains. From custom yarn spinning and custom border weaving to branded hang tags and container stuffing.",
    features: [
      "Custom weight, width, length, and border weave specification",
      "Fabrication options: Zero-Twist, Modal blends, Organic GOTS, Pima",
      "Custom branded retail packaging: Kraft belly bands, satin tags, barcode stickers",
      "Direct container stuffing at Solapur mill with JNPT port shipping",
    ],
    image: "/images/products/private-label.jpg",
    images: [
      "/images/products/private-label.jpg",
      "/images/products/bath-towels.jpg",
      "/images/products/hotel-linen.jpg",
      "/images/products/spa-towels.jpg",
    ],
    sortOrder: 12,
    published: true,
  },
];

export function parseProductImages(product: { image: string; images?: string | null }): string[] {
  let list: string[] = [];
  if (product.images) {
    try {
      list = JSON.parse(product.images);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list) || list.length === 0) {
    list = product.image ? [product.image] : [];
  }
  return list;
}

export async function getAllProducts(): Promise<ProductItem[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbProducts.length > 0) {
      return dbProducts.map((p) => {
        let features: string[] = [];
        try {
          features = JSON.parse(p.features || "[]");
        } catch {
          features = [];
        }

        const images = parseProductImages(p);

        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          gsmRange: p.gsmRange,
          material: p.material,
          dimensions: p.dimensions,
          weaveType: p.weaveType,
          minOrderQty: p.minOrderQty,
          description: p.description,
          features,
          image: p.image || images[0] || "/images/products/bath-towels.jpg",
          images,
          sortOrder: p.sortOrder,
          published: p.published,
        };
      });
    }
  } catch (e) {
    console.warn("Database product fetch failed or not connected, using fallback catalog:", e);
  }

  return DEFAULT_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
    });

    if (p) {
      let features: string[] = [];
      try {
        features = JSON.parse(p.features || "[]");
      } catch {
        features = [];
      }

      const images = parseProductImages(p);

      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        gsmRange: p.gsmRange,
        material: p.material,
        dimensions: p.dimensions,
        weaveType: p.weaveType,
        minOrderQty: p.minOrderQty,
        description: p.description,
        features,
        image: p.image || images[0] || "/images/products/bath-towels.jpg",
        images,
        sortOrder: p.sortOrder,
        published: p.published,
      };
    }
  } catch (e) {
    console.warn(`Prisma product lookup failed for slug ${slug}, checking fallback catalog:`, e);
  }

  const found = DEFAULT_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}
