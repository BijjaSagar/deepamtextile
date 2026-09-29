import {
  deepMergeSections,
  mergeStringField,
} from "@/lib/branding";
import { prisma, isDbConfigured } from "@/lib/db";
import type { FaqItem, HeroSlide, PageContentData } from "@/lib/types/cms";
import { faqItems as defaultFaqItems } from "@/data/products";
import { siteConfig } from "@/lib/utils";

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    imageUrl: "/images/hero/hero-towels.jpg",
    caption: "Signature Combed Cotton Bath Towels",
  },
  {
    imageUrl: "/images/products/hotel-linen.jpg",
    caption: "Luxury Hotel & Spa Linen Collections",
  },
  {
    imageUrl: "/images/products/private-label.jpg",
    caption: "Bespoke Private-Label Manufacturing",
  },
];

export const DEFAULT_HOME_SECTIONS = {
  hero: {
    eyebrow: "Deepam Textile · Solapur, Maharashtra, India",
    title: "Luxury in Every Thread.",
    subtitle:
      "Premier Indian manufacturer and global exporter of luxury terry towels, hotel linen, and private label programs — crafting excellence in Solapur since 1982.",
    slides: DEFAULT_HERO_SLIDES,
  },
  heritage: {
    eyebrow: "Our Heritage",
    title: "Crafted in Solapur, India Since 1982",
    description:
      "For over four decades, Deepam Textile has been at the forefront of India's celebrated terry towel manufacturing region—combining institutional-grade durability with ultra-luxurious finishing for global hospitality, department store, and private label buyers.",
    imageUrl: "/images/factory/mill-facility.jpg",
  },
  manufacturing: {
    imageUrl: "/images/factory/airjet-looms.jpg",
  },
};

export const DEFAULT_ABOUT_SECTIONS = {
  hero: {
    eyebrow: "Our Story",
    title: "Where heritage meets export excellence",
    imageUrl: "/images/factory/mill-facility.jpg",
  },
  intro: {
    title: "Four decades of textile excellence",
    body: "Founded in 1982 in Solapur, Maharashtra—the renowned towel weaving capital of India—Deepam Textile has grown from a master weaver into an integrated export enterprise. Delivering 550+ MT monthly capacity, 200+ looms, and export-grade reliability across North America, Europe, the Middle East, and beyond.",
    imageUrl: "/images/factory/airjet-looms.jpg",
  },
};

export const DEFAULT_MANUFACTURING_SECTIONS = {
  hero: {
    eyebrow: "Our Facility",
    title: "From yarn to export-ready carton",
    description:
      "Vertically integrated manufacturing facility in Solapur, Maharashtra—with in-house warping, high-speed airjet weaving, continuous bleaching & dyeing, automated cut-and-sew, and rigorous quality laboratories.",
    imageUrl: "/images/factory/airjet-looms.jpg",
  },
  facility: {
    imageUrl: "/images/factory/mill-facility.jpg",
  },
};

export const DEFAULT_PRIVATE_LABEL_SECTIONS = {
  hero: {
    eyebrow: "Private Label · High Priority",
    title: "Your brand. Our manufacturing excellence.",
    description:
      "Partner with Deepam Textile to launch, scale, or refresh your towel and linen collections. End-to-end private label execution—from initial yarn selection and dobby border design to barcode packaging and international container shipments.",
    imageUrl: "/images/products/private-label.jpg",
  },
  packaging: {
    imageUrl: "/images/products/hotel-linen.jpg",
  },
  specs: {
    title: "Private label specifications",
    description:
      "Download our private label capability sheet with GSM ranges, customization options, MOQs, lead times, and packaging formats for global export buyers.",
    pdfUrl: "",
    pdfLabel: "Download specification sheet (PDF)",
  },
};

export const DEFAULT_FAQ_SECTIONS = {
  hero: {
    eyebrow: "FAQ",
    title: "Export buyer questions, answered",
    description:
      "MOQs, sampling, lead times, shipping (FOB Nhava Sheva / CIF destination ports), payment terms, customization, and certifications—everything procurement teams ask before their first order.",
    imageUrl: "/images/hero/hero-towels.jpg",
  },
  faqItems: defaultFaqItems as FaqItem[],
};

export const DEFAULT_CONTACT_SECTIONS = {
  hero: {
    eyebrow: "Get In Touch",
    title: "Speak with our export team",
    description:
      "Share your product requirements, volume estimates, and timeline. Our dedicated export desk responds to all B2B inquiries within one business day.",
    imageUrl: "/images/factory/mill-facility.jpg",
  },
  catalog: {
    pdfUrl: "",
    pdfLabel: "Download Product Catalog",
  },
};

export const DEFAULT_PRODUCTS_SECTIONS = {
  hero: {
    eyebrow: "Export Catalogue",
    title: "Premium textiles for every channel",
    description:
      "Twelve product collections engineered for luxury hospitality, retail brands, healthcare, spa, and promotional buyers. Each product profile includes GSM ranges, dimensions, yarn specs, and customization options.",
    imageUrl: "/images/hero/hero-towels.jpg",
  },
};

export const ALL_PAGE_SLUGS = [
  "home",
  "about",
  "manufacturing",
  "certifications",
  "private-label",
  "contact",
  "faq",
  "products",
] as const;

const STATIC_PAGES: Record<string, PageContentData> = {
  home: {
    slug: "home",
    metaTitle: siteConfig.name,
    metaDescription: siteConfig.description,
    sections: DEFAULT_HOME_SECTIONS,
  },
  about: {
    slug: "about",
    metaTitle: "About Us",
    metaDescription:
      "Learn about Deepam Textile—four decades of premium textile manufacturing in Solapur, India, exporting to USA, Canada, Europe, and the Middle East.",
    sections: DEFAULT_ABOUT_SECTIONS,
  },
  manufacturing: {
    slug: "manufacturing",
    metaTitle: "Manufacturing",
    metaDescription:
      "Vertical textile manufacturing from yarn selection to export packaging. ISO-certified facility in Solapur, India serving international buyers.",
    sections: DEFAULT_MANUFACTURING_SECTIONS,
  },
  certifications: {
    slug: "certifications",
    metaTitle: "Certifications",
    metaDescription:
      "ISO 9001:2015, OEKO-TEX Standard 100, BCI, GOTS, BSCI, and SEDEX/SMETA compliance for export textile manufacturing from India.",
    sections: {},
  },
  "private-label": {
    slug: "private-label",
    metaTitle: "Private Label",
    metaDescription:
      "Launch or scale your towel and linen brand with full private label manufacturing—from custom weaving to retail-ready packaging. Export worldwide.",
    sections: DEFAULT_PRIVATE_LABEL_SECTIONS,
  },
  contact: {
    slug: "contact",
    metaTitle: "Contact",
    metaDescription:
      "Contact Deepam Textile export team for B2B textile inquiries and RFQs. Global buyers welcome. Response within one business day.",
    sections: DEFAULT_CONTACT_SECTIONS,
  },
  faq: {
    slug: "faq",
    metaTitle: "FAQ",
    metaDescription:
      "Frequently asked questions about MOQs, samples, lead times, shipping, payment terms, customization, and certifications for Deepam Textile export buyers.",
    sections: DEFAULT_FAQ_SECTIONS,
  },
  products: {
    slug: "products",
    metaTitle: "Products",
    metaDescription:
      "Explore our full range of premium B2B textile products—bath towels, hotel linen, spa towels, private label, and more for global export.",
    sections: DEFAULT_PRODUCTS_SECTIONS,
  },
};

function mergePageWithDefaults(row: {
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  sections: unknown;
  updatedAt: Date;
}): PageContentData {
  const fallback = STATIC_PAGES[row.slug];
  return {
    slug: row.slug,
    metaTitle: mergeStringField(
      fallback?.metaTitle ?? null,
      row.metaTitle,
    ) as string | null,
    metaDescription: mergeStringField(
      fallback?.metaDescription ?? null,
      row.metaDescription,
    ) as string | null,
    sections: deepMergeSections(
      fallback?.sections as Record<string, unknown> | undefined,
      row.sections,
    ),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getPageContent(
  slug: string,
): Promise<PageContentData | null> {
  if (!isDbConfigured()) {
    return STATIC_PAGES[slug] ?? null;
  }
  try {
    const row = await prisma.pageContent.findUnique({ where: { slug } });
    if (!row) return STATIC_PAGES[slug] ?? null;
    return mergePageWithDefaults(row);
  } catch {
    return STATIC_PAGES[slug] ?? null;
  }
}

export async function getAllPagesAdmin(): Promise<PageContentData[]> {
  if (!isDbConfigured()) {
    return ALL_PAGE_SLUGS.map((slug) => STATIC_PAGES[slug]).filter(Boolean);
  }
  try {
    const rows = await prisma.pageContent.findMany({ orderBy: { slug: "asc" } });
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    return ALL_PAGE_SLUGS.map((slug) => {
      const row = bySlug.get(slug);
      if (row) return mergePageWithDefaults(row);
      return STATIC_PAGES[slug];
    });
  } catch {
    return ALL_PAGE_SLUGS.map((slug) => STATIC_PAGES[slug]).filter(Boolean);
  }
}

export { STATIC_PAGES };
