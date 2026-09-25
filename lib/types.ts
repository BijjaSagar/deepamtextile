export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  gsmRange: string;
  material: string;
  dimensions: string;
  weaveType: string;
  minOrderQty: string;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  sortOrder: number;
  published: boolean;
}

export interface InquiryItem {
  id: string;
  refNumber: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  targetRegion: "South East Asia" | "Middle East" | "Europe" | "Other" | string;
  destinationCountry: string;
  productCategory: string;
  estimatedQuantity: string;
  gsmSpecification?: string | null;
  isSampleRequested: boolean;
  privateLabelInterest: boolean;
  message: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "SAMPLE_SENT" | "WON" | "ARCHIVED" | string;
  notes?: string | null;
  createdAt: string | Date;
}

export interface SiteContentData {
  id: string;
  brandName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  experienceYears: number;
  monthlyCapacityTons: number;
  loomsCount: number;
  countriesServed: number;
  primaryEmail: string;
  salesEmail: string;
  phone: string;
  whatsappNumber: string;
  addressCity: string;
  addressCountry: string;
}
