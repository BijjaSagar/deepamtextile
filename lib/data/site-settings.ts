import type { SiteSettings } from "@prisma/client";
import { mergeStringField } from "@/lib/branding";
import { prisma, isDbConfigured } from "@/lib/db";
import { siteConfig } from "@/lib/utils";
import type { SiteColors, SiteSettingsData } from "@/lib/types/cms";

const DEFAULT_COLORS: SiteColors = {
  pearl: "#ffffff",
  oat: "#f0f7fc",
  taupe: "#0f2942",
  muted: "#5b6e82",
  sage: "#38bdf8",
  sageDeep: "#0284c7",
  hairline: "#e0e9f1",
};

const STATIC_SETTINGS: SiteSettingsData = {
  siteName: siteConfig.name,
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  logoUrl: "/images/logo-transparent.png",
  logoLightUrl: "/images/logo-dark-mode.png",
  faviconUrl: "/favicon.ico",
  colors: DEFAULT_COLORS,
  contactEmail: siteConfig.email,
  contactEmailSecondary: siteConfig.emailSecondary,
  contactPhone: siteConfig.phone,
  leadsToEmail: process.env.LEADS_TO_EMAIL ?? siteConfig.leadsEmail,
  resendFromEmail: process.env.RESEND_FROM_EMAIL ?? null,
  inquiryEnabled: true,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+917066148936",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? null,
  footerBlurb:
    "Premier Indian manufacturer and global exporter of luxury terry towels, hotel bath linen, and private label collections from Solapur, Maharashtra.",
  copyrightText: null,
  exportMarkets: "USA · Canada · Europe · Middle East · Australia",
  address: { ...siteConfig.address },
};

const LEGACY_HEX_MAP: Record<string, string> = {
  "#fbfaf6": "#ffffff",
  "#f1ece2": "#f0f7fc",
  "#5e5547": "#0f2942",
  "#857b6c": "#5b6e82",
  "#c8c7ac": "#38bdf8",
  "#9a9a7d": "#0284c7",
  "#e7e0d3": "#e0e9f1",
};

function sanitizeColor(val: string | null | undefined, fallback: string): string {
  if (!val) return fallback;
  const normalized = val.trim().toLowerCase();
  return LEGACY_HEX_MAP[normalized] ?? val;
}

function mapSettings(row: SiteSettings): SiteSettingsData {
  return {
    siteName: mergeStringField(STATIC_SETTINGS.siteName, row.siteName) as string,
    legalName: mergeStringField(STATIC_SETTINGS.legalName, row.legalName) as string,
    tagline: mergeStringField(STATIC_SETTINGS.tagline, row.tagline) as string,
    description: mergeStringField(
      STATIC_SETTINGS.description,
      row.description,
    ) as string,
    logoUrl: row.logoUrl,
    logoLightUrl: row.logoLightUrl,
    faviconUrl: row.faviconUrl,
    colors: {
      pearl: sanitizeColor(row.colorPearl, DEFAULT_COLORS.pearl),
      oat: sanitizeColor(row.colorOat, DEFAULT_COLORS.oat),
      taupe: sanitizeColor(row.colorTaupe, DEFAULT_COLORS.taupe),
      muted: sanitizeColor(row.colorMuted, DEFAULT_COLORS.muted),
      sage: sanitizeColor(row.colorSage, DEFAULT_COLORS.sage),
      sageDeep: sanitizeColor(row.colorSageDeep, DEFAULT_COLORS.sageDeep),
      hairline: sanitizeColor(row.colorHairline, DEFAULT_COLORS.hairline),
    },
    contactEmail: row.contactEmail,
    contactEmailSecondary: row.contactEmailSecondary,
    contactPhone: row.contactPhone,
    leadsToEmail: row.leadsToEmail,
    resendFromEmail: row.resendFromEmail,
    inquiryEnabled: row.inquiryEnabled,
    whatsappNumber: row.whatsappNumber,
    calendlyUrl: row.calendlyUrl,
    footerBlurb: mergeStringField(
      STATIC_SETTINGS.footerBlurb,
      row.footerBlurb,
    ) as string,
    copyrightText: row.copyrightText
      ? (mergeStringField(
          STATIC_SETTINGS.copyrightText,
          row.copyrightText,
        ) as string | null)
      : null,
    exportMarkets: mergeStringField(
      STATIC_SETTINGS.exportMarkets,
      row.exportMarkets,
    ) as string,
    address: {
      street: row.addressStreet,
      city: row.addressCity,
      region: row.addressRegion,
      country: row.addressCountry,
      postalCode: row.addressPostalCode,
    },
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!isDbConfigured()) return STATIC_SETTINGS;
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!row) return STATIC_SETTINGS;

    // Auto-migrate legacy earthy colors in DB to White & Sky Blue if found
    const hasLegacy = [
      row.colorPearl,
      row.colorOat,
      row.colorTaupe,
      row.colorMuted,
      row.colorSage,
      row.colorSageDeep,
      row.colorHairline,
    ].some((c) => c && LEGACY_HEX_MAP[c.trim().toLowerCase()]);

    if (hasLegacy) {
      prisma.siteSettings
        .update({
          where: { id: "default" },
          data: {
            colorPearl: sanitizeColor(row.colorPearl, DEFAULT_COLORS.pearl),
            colorOat: sanitizeColor(row.colorOat, DEFAULT_COLORS.oat),
            colorTaupe: sanitizeColor(row.colorTaupe, DEFAULT_COLORS.taupe),
            colorMuted: sanitizeColor(row.colorMuted, DEFAULT_COLORS.muted),
            colorSage: sanitizeColor(row.colorSage, DEFAULT_COLORS.sage),
            colorSageDeep: sanitizeColor(row.colorSageDeep, DEFAULT_COLORS.sageDeep),
            colorHairline: sanitizeColor(row.colorHairline, DEFAULT_COLORS.hairline),
          },
        })
        .catch(() => {});
    }

    return mapSettings(row);
  } catch {
    return STATIC_SETTINGS;
  }
}

export function colorsToCssVars(colors: SiteColors): Record<string, string> {
  return {
    "--pearl": colors.pearl,
    "--oat": colors.oat,
    "--taupe": colors.taupe,
    "--muted": colors.muted,
    "--sage": colors.sage,
    "--sage-deep": colors.sageDeep,
    "--hairline": colors.hairline,
    "--sand": "#e0f0fa",
    "--taupe-dark": "#081a2e",
    "--ink": "#061524",
  };
}

export { DEFAULT_COLORS, STATIC_SETTINGS, mapSettings };
