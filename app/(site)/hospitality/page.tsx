import Link from "next/link";
import {
  BedDouble,
  Bath,
  Armchair,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Container,
  Sparkles,
  Layers,
  Scale,
  Hotel,
  FileCheck2,
} from "lucide-react";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { FadeUp } from "@/components/motion/FadeUp";
import { CmsImage } from "@/components/CmsImage";
import { Button } from "@/components/ui/button";

export const revalidate = 86400;

export async function generateMetadata() {
  return createMetadata({
    title: "Hospitality Solutions | Hotel Bath & Bed Linen & Turnkey Supplies",
    description:
      "Deepam Textiles positions global hospitality groups for success: direct bath linen manufacturing in Solapur, curated hotel bed linen, and turnkey hotel supplies & FF&E procurement.",
    path: "/hospitality",
  });
}

const dualPillars = [
  {
    icon: Bath,
    badge: "Direct Mill Manufacturing",
    title: "Hotel Bath & Bed Linen",
    description:
      "Engineered in our Solapur terry mills for superior absorbency, commercial laundry endurance, and plush guest comfort. Complemented by high-thread-count bed linen sourced through our vetted mill network.",
    href: "/hospitality/hotel-bath-and-bed-linen",
    image: "/images/products/hotel-linen.jpg",
    items: [
      "Hotel Bath Towels & Luxury Bath Sheets (500–700 GSM)",
      "Hand Towels, Face Towels & Guest Washcloths",
      "High-Density Tufted Bath Mats & Foot Towels",
      "Plush Terry & Diamond Waffle Bathrobes",
      "Vat-Dyed Pool & Beach Towels (UV & Chlorine Resistant)",
      "Curated Hotel Bed Linen (250–600 TC Sateen & Percale)",
    ],
    ctaText: "Explore Linen Capabilities",
  },
  {
    icon: Armchair,
    badge: "Turnkey Sourcing & Consolidation",
    title: "Hotel Supplies & Procurement",
    description:
      "Your single-source Indian procurement partner for complete hospitality fit-outs. We source, inspect, and consolidate guest room furniture, bathroom hardware, amenities, and outdoor fixtures into unified container shipments.",
    href: "/hospitality/hotel-supplies-and-procurement",
    image: "/images/products/private-label.jpg",
    items: [
      "Guest Room Furniture (Headboards, Desks, Luggage Benches)",
      "Grade 304 Stainless Steel & Brass Bathroom Accessories",
      "Eco-Friendly Guest Room Amenities & Luxury OS&E",
      "Heavy-Duty Pool Loungers, Umbrellas & Daybeds",
      "Lobby, Banquet & Restaurant Seating",
      "Single-Invoice Container Consolidation at JNPT (Nhava Sheva)",
    ],
    ctaText: "Explore Procurement Solutions",
  },
];

const keyAdvantages = [
  {
    icon: ShieldCheck,
    title: "Dual Positioning Advantage",
    description:
      "We combine direct manufacturing control for terry bath textiles with comprehensive sourcing agility for hotel supplies and furniture.",
  },
  {
    icon: Container,
    title: "Single Container Consolidation",
    description:
      "Consolidate linen, furniture, bathroom hardware, and guest amenities into 20ft/40ft HQ containers under a single Commercial Invoice and Bill of Lading.",
  },
  {
    icon: Scale,
    title: "Par-Level & Inventory Planning",
    description:
      "Structured 3-par and 4-par replenishment schedules aligned to your hotel occupancy cycles and seasonal guest influxes.",
  },
  {
    icon: FileCheck2,
    title: "Export & Compliance Ready",
    description:
      "Complete export documentation for North America, Europe, and GCC markets with full batch-level quality inspection reports.",
  },
];

export default function HospitalityPage() {
  const jsonLd = serviceJsonLd(
    "Hospitality Solutions & Hotel Procurement",
    "Direct bath linen manufacturing and complete turnkey hotel procurement solutions for hotels, resorts, and hospitality chains.",
    "/hospitality",
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-oat/40 pt-32 pb-section-mobile md:pb-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Hospitality Solutions" }]}
            className="mb-6"
          />

          <FadeUp className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sage-deep">
              <Hotel className="h-3.5 w-3.5" />
              Comprehensive Hospitality Solutions
            </div>
            <h1 className="mt-4 font-display text-4xl text-taupe md:text-5xl lg:text-6xl">
              World-Class Hotel Linen &amp; Turnkey Procurement
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-muted">
              Deepam Textiles serves premier hospitality groups, boutique resort developers, and
              procurement directors with a powerful dual capability:{" "}
              <strong className="text-taupe">direct terry bath linen manufacturing</strong> at our
              Solapur mill, complemented by{" "}
              <strong className="text-taupe">complete hotel supplies and turnkey FF&amp;E procurement</strong>{" "}
              consolidated for seamless global export.
            </p>
          </FadeUp>

          {/* Dual Solution Cards */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {dualPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <FadeUp key={pillar.title} delay={idx * 0.1}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-64 w-full overflow-hidden bg-oat">
                      <CmsImage
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-taupe/85 via-taupe/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-body text-xs font-semibold text-sage-deep shadow-xs backdrop-blur-sm">
                          <Icon className="h-3.5 w-3.5" />
                          {pillar.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="font-display text-2xl text-white md:text-3xl">
                          {pillar.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
                        {pillar.description}
                      </p>

                      <div className="mt-6 border-t border-hairline pt-6">
                        <p className="font-body text-xs font-semibold uppercase tracking-wider text-taupe">
                          Core Capabilities:
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {pillar.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 font-body text-xs text-muted sm:text-sm">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4">
                        <Button asChild className="w-full bg-sage-deep text-white hover:bg-sage-deep/90">
                          <Link href={pillar.href} className="inline-flex items-center justify-center gap-2">
                            <span>{pillar.ctaText}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Positioning Section */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="The Deepam Advantage"
              title="Positioned for Institutional Hospitality Demands"
              description="Why international hotel owners and procurement teams choose Deepam Textiles as their single-point partner in India."
              className="mb-14 text-center max-w-3xl mx-auto"
            />
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyAdvantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <FadeUp key={adv.title} delay={idx * 0.05}>
                  <div className="flex h-full flex-col rounded-xl border border-hairline bg-pearl p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage/15 text-sage-deep">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg text-taupe">
                      {adv.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                      {adv.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Manufacturing vs Turnkey Sourcing Clarity Box */}
          <FadeUp className="mt-14">
            <div className="rounded-2xl border border-sage/30 bg-sage/5 p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                    In-House Mill Manufacturing
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-taupe">
                    Solapur Terry Towel Capital
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    We directly spin, weave, dye, and hem all bath towels, sheets, washcloths, bath mats, robes, and pool towels on high-speed airjet looms with ±5% GSM precision.
                  </p>
                  <Link
                    href="/hospitality/hotel-bath-and-bed-linen"
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-sage-deep hover:underline"
                  >
                    View Bath &amp; Bed Linen Program →
                  </Link>
                </div>

                <div className="hidden h-24 w-px bg-hairline lg:block" />

                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                    Turnkey Procurement &amp; Consolidation
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-taupe">
                    Single-Invoice Export Partner
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    We act as your on-ground procurement arm in India—auditing factories, managing quality control, and packing guest furniture, hardware, and amenities into unified ocean containers at JNPT.
                  </p>
                  <Link
                    href="/hospitality/hotel-supplies-and-procurement"
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-sage-deep hover:underline"
                  >
                    View Turnkey Supplies &amp; FF&amp;E →
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand prefilledProduct="hotel-linen" />
    </>
  );
}
