import Link from "next/link";
import {
  Bath,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  Package,
  Waves,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { FadeUp } from "@/components/motion/FadeUp";
import { CmsImage } from "@/components/CmsImage";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/ProductGallery";
import { getCategoryBySlug } from "@/lib/data/products";

export const revalidate = 86400;

export async function generateMetadata() {
  return createMetadata({
    title: "Hotel Bath & Bed Linen Programs | Deepam Textiles",
    description:
      "Direct manufacturer of luxury commercial hotel bath towels, sheets, washcloths, bath mats, and robes in Solapur, plus curated high-thread-count bed linen for global hospitality.",
    path: "/hospitality/hotel-bath-and-bed-linen",
    image: "/images/products/hotel-linen.jpg",
  });
}

const linenCategories = [
  {
    id: "bath-towels",
    title: "Hotel Bath Towels & Bath Sheets",
    subtitle: "500–700 GSM 100% Combed Ring-Spun Cotton",
    tag: "In-House Mill Manufactured",
    tagColor: "bg-sage/15 text-sage-deep",
    description:
      "Crafted with dense, zero-twist or low-twist loops for maximum water absorbency and cloud-soft hand feel. Finished with double-needle lock-stitched hems to eliminate fraying during frequent high-temperature commercial laundering.",
    specs: [
      { label: "Standard Sizes", value: '70 × 140 cm (27" × 55") · 80 × 160 cm (31" × 63") · 90 × 180 cm (35" × 71")' },
      { label: "GSM Range", value: "500–700 GSM" },
      { label: "Yarn Count", value: "20/2, 16/1, or 24/2 Combed Cotton" },
      { label: "Border Styles", value: "Classic Dobby, Cam Border, Single or Double Rib, Plain Terry" },
      { label: "Wash Endurance", value: "150+ commercial wash cycles at 60°C–90°C" },
    ],
    features: [
      "±5% GSM batch-to-batch weight consistency",
      "Indanthrene vat-dyed white and custom hotel brand Pantone shades",
      "Reinforced selvedges and bar-tacked corners",
      "Chlorine and peroxide bleach safe",
    ],
  },
  {
    id: "hand-face-towels",
    title: "Hand Towels, Face Towels & Washcloths",
    subtitle: "400–550 GSM Guest Bathroom Essentials",
    tag: "In-House Mill Manufactured",
    tagColor: "bg-sage/15 text-sage-deep",
    description:
      "Engineered for rapid drying and gentle skin contact. Tightly looped terry face ensures softness against sensitive skin while withstanding heavy everyday laundering in luxury hotel guest rooms and spa locker suites.",
    specs: [
      { label: "Hand Towels", value: '40 × 70 cm (16" × 28") · 50 × 90 cm (20" × 35")' },
      { label: "Face Towels", value: '33 × 33 cm (13" × 13") · 30 × 30 cm (12" × 12")' },
      { label: "GSM Range", value: "400–550 GSM" },
      { label: "Finishing", value: "Silicone-free pre-washed finish for immediate out-of-carton absorbency" },
      { label: "Packaging", value: "Institutional polybag bundles of 10 or 25 units" },
    ],
    features: [
      "Precision square cutting and non-curling edges",
      "Uniform loop alignment prevents snagging on hotel amenities",
      "Matched dobby headers coordinating with bath towels",
      "Option for woven brand label or Jacquard logo hem",
    ],
  },
  {
    id: "bath-mats",
    title: "Hotel Bath Mats & Foot Towels",
    subtitle: "700–900 GSM Heavy-Duty Floor Protection",
    tag: "In-House Mill Manufactured",
    tagColor: "bg-sage/15 text-sage-deep",
    description:
      "Heavyweight, dense-looped terry bath mats built for instant foot drying and floor safety outside showers and bathtubs. Free of rubber backings so they can be laundered alongside regular hotel terry without degradation.",
    specs: [
      { label: "Standard Sizes", value: '50 × 80 cm (20" × 32") · 60 × 90 cm (24" × 36")' },
      { label: "GSM Range", value: "700–900 GSM" },
      { label: "Construction", value: "Dense 2-ply ring-spun ground and pile yarn" },
      { label: "Design", value: "Framed Greek key, piano border, or plain embossed foot design" },
    ],
    features: [
      "Heavy weight keeps mat anchored safely to bathroom tiles",
      "Commercial laundry tumbler safe — no rubber peeling or delamination",
      "Fast drying core despite heavy 800+ GSM density",
      "Double-stitched reinforced perimeter",
    ],
  },
  {
    id: "bathrobes",
    title: "Terry & Waffle Bathrobes",
    subtitle: "380–450 GSM Luxury Hotel Loungewear",
    tag: "In-House Mill Manufactured",
    tagColor: "bg-sage/15 text-sage-deep",
    description:
      "Available in plush full-terry, lightweight honeycomb waffle, and luxurious velour-outside/terry-inside constructions. Sized generously for hotel guests with adjustable dual belt loops and deep patch pockets.",
    specs: [
      { label: "Collars", value: "Classic Shawl Collar, Clean Japanese Kimono, or Spa Hooded" },
      { label: "GSM Range", value: "350–450 GSM" },
      { label: "Sizing", value: "Medium, Large, X-Large, and Custom Oversized" },
      { label: "Embroidery", value: "Up to 12-colour precision hotel crest or monogram embroidery" },
    ],
    features: [
      "Reinforced hanger loops and stress-point bar-tacking",
      "Waffle weave option pre-shrunk for zero post-wash shrinkage",
      "Deep double-stitched pockets and 2-height belt loops",
      "Breathable, lightweight options suited for warm tropical resort suites",
    ],
  },
  {
    id: "pool-towels",
    title: "Pool & Beach Towels",
    subtitle: "450–600 GSM Chlorine & UV Resistant Resort Towels",
    tag: "In-House Mill Manufactured",
    tagColor: "bg-sage/15 text-sage-deep",
    description:
      "Generously proportioned resort pool towels built with yarn-dyed cabana stripes and vibrant solid hues. Treated with specialized indanthrene vat dyes that resist high-chlorine pool water and intense sun exposure without fading.",
    specs: [
      { label: "Sizes", value: '80 × 160 cm (31" × 63") · 90 × 180 cm (35" × 71") · 100 × 200 cm (39" × 79")' },
      { label: "GSM Range", value: "450–600 GSM" },
      { label: "Dyeing", value: "100% Indanthrene vat-dyed yarn before weaving" },
      { label: "Patterns", value: "Classic 2-inch and 4-inch Cabana Stripes, Jacquard Logos, Solids" },
    ],
    features: [
      "Colorfastness rating 4-5 against pool chlorine and sea salt",
      "Dense loop structure resists snagging on lounger frames",
      "Quick-dry yarn technology speeds turnover between guest uses",
      "Distinctive pool palettes to prevent inventory crossover with room bath towels",
    ],
  },
  {
    id: "bed-linen",
    title: "Hotel Bed Linen Program",
    subtitle: "250–600 Thread Count (TC) Percale & Sateen",
    tag: "Curated & Supplied via Vetted Indian Mill Network",
    tagColor: "bg-amber-100 text-amber-900 border border-amber-200",
    description:
      "Deepam Textiles curates and exports premium bed linen sourced through our vetted network of certified spinning and weaving partner mills in India. Every roll and finished sheet undergoes our rigorous Solapur lab inspection before container consolidation.",
    isNetworkSourced: true,
    specs: [
      { label: "Thread Counts", value: "250 TC, 300 TC, 400 TC, 500 TC, 600 TC" },
      { label: "Yarn Origin", value: "100% Long-Staple Indian & Egyptian Combed Cotton" },
      { label: "Weaves", value: "Crisp Matte Percale (1/1) · Silky Lustrous Satin Stripe (1cm/2cm) · Plain Sateen" },
      { label: "Items Available", value: "Fitted Sheets, Flat Sheets, Duvet Covers, Oxford & Housewife Pillowcases" },
      { label: "Certifications", value: "OEKO-TEX Standard 100 certified non-toxic" },
    ],
    features: [
      "Sanforized pre-shrunk fabric ensuring exact mattress fit across repeated laundering",
      "Color-coded size labels inside hems for streamlined hotel housekeeping sortation",
      "High-tensile stitching along sheet hems and duvet envelope closures",
      "Consolidated directly into your container alongside our bath linen",
    ],
  },
];

const laundrySpecs = [
  { label: "Wash Durability", value: "150+ Commercial Cycles at 60°C–90°C" },
  { label: "Weight Tolerance", value: "Strict ±5% GSM Uniformity Across Batches" },
  { label: "Dimensional Stability", value: "< 5% Length & Width Shrinkage" },
  { label: "Absorbency Rate", value: "< 3 Seconds (Drop Test Method)" },
  { label: "Tensile Strength", value: "Meets ASTM D5034 Commercial Standard" },
  { label: "Bleach Resistance", value: "Grade 4-5 Fastness to Chlorine & Oxygen Bleach" },
];

export default async function HotelBathAndBedLinenPage() {
  const hotelLinenCategory = await getCategoryBySlug("hotel-linen");
  const bathTowelsCategory = await getCategoryBySlug("bath-towels");

  // Merge gallery images if available from database
  const showcaseImages = [
    ...(hotelLinenCategory?.galleryImages ?? []),
    ...(bathTowelsCategory?.galleryImages ?? []),
  ].slice(0, 16);

  const jsonLd = serviceJsonLd(
    "Hotel Bath & Bed Linen Manufacturing",
    "Commercial bath towels, hotel bed linen, bath mats, and luxury robes manufactured in Solapur and supplied to global hotels.",
    "/hospitality/hotel-bath-and-bed-linen",
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
              { label: "Hotel Bath & Bed Linen" },
            ]}
            className="mb-6"
          />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sage-deep">
                <Bath className="h-3.5 w-3.5" />
                Hospitality Textile Programs
              </div>
              <h1 className="mt-4 font-display text-4xl text-taupe md:text-5xl lg:text-6xl">
                Hotel Bath &amp; Bed Linen
              </h1>
              <p className="mt-6 font-body text-lg leading-relaxed text-muted">
                Engineered for luxury hotels, 5-star resorts, and premium hospitality chains. We
                combine direct in-house terry manufacturing in Solapur with vetted Indian mill
                sourcing for high-thread-count bed linen—delivering batch-to-batch consistency that
                surpasses commercial laundry demands.
              </p>

              {/* Explicit Manufacturing vs Sourcing Callout */}
              <div className="mt-6 rounded-xl border border-hairline bg-white p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-deep" />
                  <div className="font-body text-xs leading-relaxed text-muted sm:text-sm">
                    <strong className="text-taupe">Direct Mill Manufacturing:</strong> We manufacture all terry bath towels, sheets, mats, bathrobes, and pool towels in-house at our Solapur mill.{" "}
                    <strong className="text-taupe">Bed Linen Program:</strong> Curated, quality-tested, and supplied through our vetted Indian mill network under our strict quality oversight and single container consolidation.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-sage-deep text-white hover:bg-sage-deep/90">
                  <Link href="/contact#inquiry">Request Hospitality Linen Swatches</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/hospitality/hotel-supplies-and-procurement">
                    View Hotel Supplies &amp; FF&amp;E →
                  </Link>
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl border border-hairline bg-white shadow-xl">
                <div className="relative h-80 w-full sm:h-96">
                  <CmsImage
                    src={hotelLinenCategory?.heroImage || "/images/products/hotel-linen.jpg"}
                    cacheVersion={hotelLinenCategory?.updatedAt}
                    alt="Hotel Bath and Bed Linen Collection"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-taupe/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage">
                      Solapur Manufacturing Facility
                    </p>
                    <p className="font-display text-xl sm:text-2xl">
                      Commercial Laundry Grade · 150+ Wash Cycles
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Laundry Standards & Par Planning Strip */}
      <section className="border-y border-hairline bg-pearl py-12">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                Institutional Performance Standards
              </p>
              <h2 className="mt-1 font-display text-2xl text-taupe md:text-3xl">
                Engineered for Commercial Launderability
              </h2>
            </div>
            <span className="rounded-full bg-oat px-4 py-1.5 font-body text-xs font-medium text-taupe">
              Tested to ASTM &amp; AATCC Commercial Test Methods
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {laundrySpecs.map((spec) => (
              <div key={spec.label} className="rounded-xl border border-hairline bg-white p-4">
                <p className="font-body text-xs text-muted">{spec.label}</p>
                <p className="mt-1 font-display text-base font-semibold text-taupe">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Category Breakdown */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="Detailed Specifications"
              title="The Complete Hospitality Linen Collection"
              description="Each piece is calibrated for exact weight, pile height, and commercial durability to meet 4-star and 5-star brand standards."
              className="mb-14 text-center max-w-3xl mx-auto"
            />
          </FadeUp>

          <div className="space-y-12">
            {linenCategories.map((cat, idx) => (
              <FadeUp key={cat.id} delay={idx * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="border-b border-hairline bg-oat/30 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className={`inline-block rounded-full px-3 py-1 font-body text-xs font-semibold ${cat.tagColor}`}>
                          {cat.tag}
                        </span>
                        <h3 className="mt-2 font-display text-2xl text-taupe sm:text-3xl">
                          {cat.title}
                        </h3>
                        <p className="font-body text-sm font-medium text-sage-deep">
                          {cat.subtitle}
                        </p>
                      </div>
                      <Link
                        href={`/contact#inquiry`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-white px-4 py-2 font-body text-xs font-medium text-taupe shadow-xs transition-colors hover:bg-sage-deep hover:text-white"
                      >
                        Inquire for this SKU →
                      </Link>
                    </div>

                    <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-muted sm:text-base">
                      {cat.description}
                    </p>
                  </div>

                  <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-taupe">
                        Technical Specifications:
                      </p>
                      <div className="mt-3 space-y-2.5">
                        {cat.specs.map((s) => (
                          <div key={s.label} className="flex flex-col border-b border-hairline/60 pb-2 sm:flex-row sm:justify-between sm:items-baseline">
                            <span className="font-body text-xs text-muted">{s.label}:</span>
                            <span className="font-body text-xs font-semibold text-taupe sm:text-right sm:max-w-xs">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-taupe">
                        Commercial Highlights:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {cat.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 font-body text-xs text-muted sm:text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Product Gallery Section */}
      {showcaseImages.length > 0 && (
        <section className="border-t border-hairline bg-oat/30 py-section-mobile md:py-section-desktop">
          <div className="mx-auto max-w-container px-6 md:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                  Real Production Showcase
                </p>
                <h2 className="mt-1 font-display text-3xl text-taupe md:text-4xl">
                  Hotel Linen Gallery
                </h2>
              </div>
              <span className="rounded-full bg-white px-3.5 py-1.5 font-body text-xs font-medium text-sage-deep shadow-xs border border-hairline">
                {showcaseImages.length} High-Resolution Mill Images
              </span>
            </div>

            <ProductGallery
              images={showcaseImages}
              heroImage={hotelLinenCategory?.heroImage || "/images/products/hotel-linen.jpg"}
              productName="Hotel Linen"
              cacheVersion={hotelLinenCategory?.updatedAt}
            />
          </div>
        </section>
      )}

      {/* Par-Level Inventory Advice Callout */}
      <section className="border-t border-hairline bg-pearl py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="rounded-2xl border border-hairline bg-white p-8 md:p-12 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
                  Hospitality Housekeeping Best Practice
                </span>
                <h3 className="mt-2 font-display text-3xl text-taupe">
                  Par-Level Planning &amp; Staged Containers
                </h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted sm:text-base">
                  To prevent towel wear out and eliminate linen shortages during peak weekend occupancy, we assist hotel procurement teams in calculating optimum par levels:
                </p>
                <ul className="mt-4 space-y-2.5 font-body text-xs text-muted sm:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sage-deep" />
                    <strong>1 Par:</strong> Set in guest rooms currently in use
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sage-deep" />
                    <strong>1 Par:</strong> In the laundry wash and dry cycle
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sage-deep" />
                    <strong>1 Par:</strong> Resting in the floor housekeeping linen closets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sage-deep" />
                    <strong>1 Par:</strong> Reserve stock in central storage for seasonal turnover
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-hairline bg-oat/40 p-6">
                <h4 className="font-display text-xl text-taupe">
                  Custom Branding &amp; Tagging Options
                </h4>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                  We integrate your property’s brand identity across every detail:
                </p>
                <div className="mt-4 space-y-2 font-body text-xs text-taupe">
                  <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                    <span>Woven Dobby Jacquard Logos</span>
                    <span className="font-semibold text-sage-deep">Available</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                    <span>Embroidery (Up to 12 Colors)</span>
                    <span className="font-semibold text-sage-deep">Available</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-hairline pb-1.5">
                    <span>RFID Laundry Tracking Chips</span>
                    <span className="font-semibold text-sage-deep">Upon Request</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Barcode Carton &amp; Box Labeling</span>
                    <span className="font-semibold text-sage-deep">Standard</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild className="w-full bg-sage-deep text-white hover:bg-sage-deep/90">
                    <Link href="/contact#inquiry">Calculate Your Property Par Order</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link to Supplies Page */}
      <section className="border-t border-hairline bg-oat/50 py-12 text-center">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
            Turnkey Hotel Sourcing
          </p>
          <h2 className="mt-2 font-display text-2xl text-taupe md:text-3xl">
            Looking for Complete Hotel Fit-Out Supplies?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted">
            Explore our turnkey sourcing capabilities for guest room FF&amp;E furniture, bathroom accessories, amenities, and pool loungers consolidated in single-invoice containers.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild className="bg-sage-deep text-white hover:bg-sage-deep/90">
              <Link href="/hospitality/hotel-supplies-and-procurement">
                View Hotel Supplies &amp; Procurement →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABand prefilledProduct="hotel-linen" />
    </>
  );
}
