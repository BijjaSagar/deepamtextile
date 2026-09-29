import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "Deepam Textile",
  legalName: "Deepam Textiles",
  tagline: "Luxury in Every Thread. Crafting Excellence Since 1982.",
  description:
    "Premier Indian manufacturer and global exporter of luxury terry towels, hotel bath linen, and private label collections from Solapur, Maharashtra.",
  url: "https://deepamtextile.com",
  email: "export@deepamtextile.com",
  emailSecondary: "sales@deepamtextile.com",
  leadsEmail: "export@deepamtextile.com",
  phone: "+91 70661 48936",
  address: {
    street: "MIDC Industrial Area, Akkalkot Road",
    city: "Solapur",
    region: "Maharashtra",
    country: "India",
    postalCode: "413006",
  },
  exportMarkets: [
    "United States",
    "Canada",
    "Europe",
    "Middle East",
    "Australia",
    "Southeast Asia",
  ],
} as const;
