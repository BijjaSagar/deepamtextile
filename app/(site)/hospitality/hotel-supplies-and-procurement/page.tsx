import Link from "next/link";
import {
  Armchair,
  Bath,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  Container,
  FileCheck2,
  ArrowRight,
  Boxes,
  Compass,
  Building,
  Coffee,
  Sun,
  ShieldAlert,
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
    title: "Hotel Supplies & Procurement Solutions | Deepam Textiles",
    description:
      "Your complete hotel procurement partner in India. Turnkey sourcing for guest room furniture (FF&E), bathroom accessories, OS&E amenities, pool loungers, and single-invoice container exports.",
    path: "/hospitality/hotel-supplies-and-procurement",
    image: "/images/products/private-label.jpg",
  });
}

const supplyCategories = [
  {
    id: "furniture-ffe",
    icon: Armchair,
    title: "Hotel Furniture (Guest Room FF&E)",
    subtitle: "Custom Fabricated to Interior Design Drawings",
    description:
      "Full guest room furniture packages manufactured in solid hardwood (Teak, Sheesham, Oak), commercial veneers, and powder-coated steel. Built to withstand continuous guest turnover while embodying upscale hospitality aesthetics.",
    items: [
      "Bespoke Headboards & Floating Nightstands with Integrated USB Ports",
      "Ergonomic Study Desks, Task Chairs & Vanity Consoles",
      "Heavy-Duty Solid Wood Luggage Benches & Wall Protectors",
      "Wardrobe Storage Systems, Mini-Bar Enclosures & Safe Housings",
      "Upholstered Suite Armchairs & Chaise Lounges with Stain-Resistant Fabrics",
      "Contract-Grade Mattresses (Pocket Spring & High-Resilience Foam)",
    ],
  },
  {
    id: "bathroom-accessories",
    icon: Bath,
    title: "Bathroom Accessories & Hardware",
    subtitle: "Grade 304 Stainless Steel & Solid Brass Fixtures",
    description:
      "Commercial bathroom fittings engineered for high-humidity environments. Rust-proof, anti-corrosion Grade 304 stainless steel and electroplated brass accessories available in brushed gold, matte black, chrome, and gunmetal finishes.",
    items: [
      "Heavy-Duty SS304 Multi-Tier Towel Racks & Heated Towel Warmers",
      "ADA-Compliant Safety Grab Bars & Corner Shower Baskets",
      "Refillable Tamper-Proof Wall-Mounted Soap & Shampoo Dispensers",
      "Anti-Fog LED Backlit Vanity Mirrors & 3x Magnifying Makeup Mirrors",
      "Resin, Ceramic, and Natural Marble Vanity Amenity Trays & Dispensers",
      "Step Cans, Tissue Box Holders & Hairdryer Holsters",
    ],
  },
  {
    id: "guest-room-amenities",
    icon: Sparkles,
    title: "Guest Room Amenities & OS&E",
    subtitle: "Eco-Friendly & Bespoke Branded Formulations",
    description:
      "Custom guest amenity collections designed to reinforce your brand narrative. From biodegradable wheat straw and bamboo items to custom-fragranced liquid formulations in recyclable packaging.",
    items: [
      "Biodegradable Bamboo Dental Kits, Wooden Combs & Shaving Kits",
      "Custom-Formulated Shampoos, Conditioners & Body Lotions (Paraben-Free)",
      "Luxury PU Leatherette Room Folders, Desk Blotters & Coaster Sets",
      "Solid Wood Coat Hangers (Anti-Theft Ring & Locking Bar System)",
      "Double-Walled 0.8L–1.2L Stainless Steel Hotel Electric Kettles",
      "Digital Motorized In-Room Safes (Laptop Compatible with Audit Trail)",
    ],
  },
  {
    id: "pool-accessories",
    icon: Sun,
    title: "Pool & Outdoor Beach Accessories",
    subtitle: "Weatherproof Commercial Grade Lounging",
    description:
      "Built to endure intense sunlight, salt spray, and chlorine moisture. Heavy-gauge aluminum and plantation-grown teak loungers paired with quick-drying foam cushions upholstered in UV-rated Sunbrella-grade textiles.",
    items: [
      "Stackable Commercial Sun Loungers with 5-Position Adjustable Backrests",
      "Heavy-Duty Cantilever Patio Umbrellas with Weighted Granite Bases",
      "Poolside Daybeds & Cabana Furniture with Water-Repellent Canopies",
      "Teak Service Carts, Beverage Stations & Towel Return Collection Hampers",
      "Commercial Poolside Lifeguard Chairs & Outdoor Showers",
      "Weather-Resistant Outdoor Storage Boxes for Pool Linen",
    ],
  },
  {
    id: "lobby-restaurant",
    icon: Coffee,
    title: "Lobby, Restaurant & Outdoor Furniture",
    subtitle: "High-Traffic Commercial Public Areas",
    description:
      "Contract furniture built for continuous foot traffic in hotel lobbies, all-day dining restaurants, banquet halls, and open-air rooftop bars. High-density foam, reinforced joints, and commercial abrasion-tested fabrics.",
    items: [
      "Bespoke Lobby Sectional Sofas, Cluster Seating & Accent Cocktail Tables",
      "Contract Dining Chairs with BIFMA-Certified Structural Frames",
      "Solid Wood, Quartz, and Terrazzo Restaurant Dining Tables",
      "Banquet Stacking Chairs & Foldable Heavy-Duty Buffet Tables",
      "Synthetic All-Weather Wicker & Rattan Patio Dining Sets",
      "Decorative Planters, Entryway Stanchions & Brass Velvet Ropes",
    ],
  },
  {
    id: "operational-supplies",
    icon: Boxes,
    title: "Other Hotel-Related Products & OS&E",
    subtitle: "Back-of-House & Front-of-House Operational Hardware",
    description:
      "Comprehensive procurement support for operational hotel requirements. Sourced from certified Indian industrial specialists and consolidated seamlessly alongside your front-of-house furniture and linen.",
    items: [
      "Heavy-Duty Housekeeping Linen Carts & Janitorial Service Trolleys",
      "Stainless Steel Birdcage Luggage Carts with Pneumatic Wheels",
      "Buffet Warmers, Chafing Dishes & Food Display Risers",
      "Custom Uniforms for Front Desk, Housekeeping, F&B, and Spa Staff",
      "Wayfinding Signage, Brass Room Number Plates & LED Directory Boards",
      "Institutional Laundry Hampers & Heavy Linen Sorting Bins",
    ],
  },
];

const consolidationBenefits = [
  {
    icon: Container,
    title: "1 Container = 1 Invoice",
    description:
      "Instead of opening 10 separate Letters of Credit and paying 10 sets of port handling fees, we consolidate everything into unified 20ft or 40ft HQ containers under a single Commercial Invoice and Bill of Lading (B/L).",
  },
  {
    icon: ShieldCheck,
    title: "On-Ground Quality Inspection",
    description:
      "Our in-house quality engineers visit vendor facilities across India to verify dimensional tolerance, joinery strength, electrical certifications, and drop-test packaging before goods reach the port.",
  },
  {
    icon: Compass,
    title: "Strategic Port Location (JNPT)",
    description:
      "Situated near Nhava Sheva (JNPT) — India's largest container port — giving us direct ocean liner routes to Dubai, Singapore, Rotterdam, Los Angeles, and New York with competitive freight rates.",
  },
  {
    icon: FileCheck2,
    title: "Seamless Customs Clearance",
    description:
      "We prepare complete export documentation, Certificate of Origin, fumigation certificates for timber products, and HS code classifications to guarantee zero port clearance delays at destination.",
  },
];

const procurementProcess = [
  {
    step: "01",
    title: "BOQ & Drawing Review",
    description:
      "You share your project Bill of Quantities (BOQ), architectural drawings, finishes, and budget targets.",
  },
  {
    step: "02",
    title: "Sampling & Mock-Up Room",
    description:
      "We produce material swatches, timber stain samples, hardware prototypes, and complete mock-up room items for designer sign-off.",
  },
  {
    step: "03",
    title: "Scheduled Batch Manufacturing",
    description:
      "Production commences with milestone photographic updates, progress tracking, and factory quality audits at 30%, 60%, and 100% completion.",
  },
  {
    step: "04",
    title: "Port Consolidation & Stuffing",
    description:
      "All approved goods are gathered at our port warehouse, palletized, shrink-wrapped, and loaded into containers according to optimized volumetric load plans.",
  },
  {
    step: "05",
    title: "Single B/L Export Delivery",
    description:
      "FOB handoff at Nhava Sheva or CIF delivery directly to your port of choice with all clearance documents dispatched via courier and digital EDI.",
  },
];

export default function HotelSuppliesAndProcurementPage() {
  const jsonLd = serviceJsonLd(
    "Hotel Supplies & Turnkey Procurement Solutions",
    "Turnkey hotel supply procurement: guest room FF&E furniture, bathroom accessories, amenities, and pool loungers consolidated into single-invoice containers from India.",
    "/hospitality/hotel-supplies-and-procurement",
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
            items={[
              { label: "Home", href: "/" },
              { label: "Hospitality Solutions", href: "/hospitality" },
              { label: "Hotel Supplies & Procurement" },
            ]}
            className="mb-6"
          />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sage-deep">
                <Armchair className="h-3.5 w-3.5" />
                Turnkey Indian Procurement Partner
              </div>
              <h1 className="mt-4 font-display text-4xl text-taupe md:text-5xl lg:text-6xl">
                Hotel Supplies &amp; Procurement Solutions
              </h1>
              <p className="mt-6 font-body text-lg leading-relaxed text-muted">
                Positioning Deepam Textiles as your trusted, all-in-one hotel supply partner in India.
                We bridge international hospitality standards with India’s finest manufacturing hubs—sourcing,
                inspecting, and consolidating furniture, bathroom fixtures, amenities, and outdoor
                equipment into unified, single-invoice ocean shipments.
              </p>

              {/* Strategic Partner Positioning Callout */}
              <div className="mt-6 rounded-xl border border-hairline bg-white p-5 shadow-xs">
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                  The Dual Strength Model
                </p>
                <p className="mt-1 font-body text-xs leading-relaxed text-muted sm:text-sm">
                  While we manufacture all terry bath linen in-house in Solapur, our dedicated Hospitality Procurement Division manages end-to-end FF&amp;E and OS&amp;E sourcing across India. You gain direct manufacturer pricing with zero multi-vendor coordination headaches.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-sage-deep text-white hover:bg-sage-deep/90">
                  <Link href="/contact#inquiry">Submit Hotel BOQ / Project Brief</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/hospitality/hotel-bath-and-bed-linen">
                    View Hotel Linen Capabilities →
                  </Link>
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl border border-hairline bg-white shadow-xl">
                <div className="relative h-80 w-full sm:h-96">
                  <CmsImage
                    src="/images/products/private-label.jpg"
                    alt="Hotel FF&E and Supplies Procurement"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-taupe/85 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage">
                      Single Container Consolidation
                    </p>
                    <p className="font-display text-xl sm:text-2xl">
                      FF&amp;E · OS&amp;E · Bath &amp; Bed Linen
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* The Consolidation Advantage Strip */}
      <section className="border-y border-hairline bg-pearl py-14">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                Why Consolidate With Us?
              </p>
              <h2 className="mt-1 font-display text-3xl text-taupe md:text-4xl">
                The Single-Invoice Indian Advantage
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                Hotel procurement often involves dozens of fragmented suppliers across India. Deepam Textiles eliminates this friction by unifying your supply chain under one accountable roof.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {consolidationBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <FadeUp key={benefit.title} delay={idx * 0.05}>
                  <div className="flex h-full flex-col rounded-xl border border-hairline bg-white p-6 shadow-xs transition-all hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage/15 text-sage-deep">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg text-taupe">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 font-body text-xs leading-relaxed text-muted sm:text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 Core Supply Categories */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="Turnkey Sourcing Categories"
              title="Full-Scope Hospitality FF&amp;E &amp; OS&amp;E"
              description="From guest room suites and marble bathrooms to poolside terraces and back-of-house operations—we supply every hotel requirement."
              className="mb-14 text-center max-w-3xl mx-auto"
            />
          </FadeUp>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {supplyCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <FadeUp key={cat.id} delay={idx * 0.05}>
                  <div className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15 text-sage-deep">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-taupe">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-1 font-body text-xs font-semibold text-sage-deep">
                      {cat.subtitle}
                    </p>

                    <p className="mt-3 font-body text-xs leading-relaxed text-muted sm:text-sm">
                      {cat.description}
                    </p>

                    <div className="mt-6 flex-1 border-t border-hairline pt-4">
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-taupe">
                        Supplied Products:
                      </p>
                      <ul className="mt-2.5 space-y-2">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 font-body text-xs text-muted">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-deep" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-2">
                      <Link
                        href="/contact#inquiry"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-hairline bg-oat/50 px-3 py-2 font-body text-xs font-semibold text-taupe transition-colors hover:bg-sage-deep hover:text-white"
                      >
                        Inquire for Category →
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5-Step Turnkey Procurement Process */}
      <section className="border-t border-hairline bg-pearl py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="How We Work"
              title="End-to-End Hotel Procurement Process"
              description="A structured, transparent procurement pipeline designed to eliminate cross-border risk, quality discrepancies, and project handover delays."
              className="mb-14 text-center max-w-3xl mx-auto"
            />
          </FadeUp>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {procurementProcess.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.08}>
                <div className="relative flex h-full flex-col rounded-xl border border-hairline bg-white p-6 shadow-xs">
                  <span className="font-display text-3xl font-light text-sage/70">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg text-taupe">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Packaging & Inspection Callout */}
      <section className="border-t border-hairline bg-white py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="rounded-2xl border border-hairline bg-gradient-to-br from-pearl to-oat/40 p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                  Quality Assurance &amp; Risk Mitigation
                </span>
                <h3 className="mt-2 font-display text-3xl text-taupe">
                  Factory Floor Audits &amp; Drop-Test Packaging
                </h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted sm:text-base">
                  International freight can be punishing on fragile hotel items. Our QC protocol ensures every item arrives at your property in pristine condition:
                </p>
                <div className="mt-6 space-y-3 font-body text-xs text-muted sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                    <span><strong>Pre-Shipment Inspection (PSI):</strong> AQL 2.5 standards for finish, color matching, and structural stability.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                    <span><strong>Export-Grade Wooden Crating:</strong> ISPM 15 fumigated timber crating with reinforced corner foam blocks for mirrors and marble.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                    <span><strong>Container Optimization:</strong> 3D container packing software calculates exact cubic meter (CBM) utilization to eliminate dead freight space.</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-hairline bg-white p-6 shadow-sm">
                <h4 className="font-display text-xl text-taupe">
                  Ready to Start Your Project Procurement?
                </h4>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                  Share your FF&amp;E specification sheets or room count estimates. Our hospitality team responds with initial pricing and lead times within 48 hours.
                </p>

                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full bg-sage-deep text-white hover:bg-sage-deep/90">
                    <Link href="/contact#inquiry">Request Turnkey Procurement Proposal</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/hospitality/hotel-bath-and-bed-linen">
                      Explore Hotel Bath &amp; Bed Linen
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link CTA Band */}
      <section className="border-t border-hairline bg-oat/50 py-12 text-center">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
            Direct Mill Terry Manufacturing
          </p>
          <h2 className="mt-2 font-display text-2xl text-taupe md:text-3xl">
            Need Hotel Bath Linen Manufactured Directly?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted">
            Explore our direct Solapur mill capabilities for 500–700 GSM bath towels, sheets, non-slip bath mats, and luxury robes.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild className="bg-sage-deep text-white hover:bg-sage-deep/90">
              <Link href="/hospitality/hotel-bath-and-bed-linen">
                View Hotel Bath &amp; Bed Linen →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABand prefilledProduct="hotel-linen" />
    </>
  );
}
