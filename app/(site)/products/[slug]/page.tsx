import { notFound } from "next/navigation";
import Link from "next/link";
import {
  createMetadata,
  productJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import { CTABand } from "@/components/CTABand";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { HoverScaleImage } from "@/components/motion/HoverScaleImage";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getProductCategories,
} from "@/lib/data/products";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return createMetadata({
    title: category.metaTitle ?? category.name,
    description: category.metaDescription ?? category.shortDescription,
    path: `/products/${slug}`,
    image: category.heroImage,
  });
}

/** Gallery and hero images come from DB at request time. */
export const dynamic = "force-dynamic";

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductCategories(),
  ]);

  if (!category) notFound();

  console.log("[ProductCategoryPage] render", {
    slug: category.slug,
    shortDescription: category.shortDescription,
    galleryCount: category.galleryImages?.length ?? 0,
    variantCount: category.variants.length,
  });

  const jsonLd = [
    productJsonLd(
      category.name,
      category.description,
      category.slug,
      category.heroImage,
    ),
    serviceJsonLd(
      category.name,
      category.shortDescription,
      `/products/${category.slug}`,
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner */}
      <section className="pt-28">
        <FadeUp>
          <div className="group relative h-[52vh] min-h-[420px] overflow-hidden bg-oat">
            <HoverScaleImage
              src={category.heroImage}
              cacheVersion={category.updatedAt}
              alt={category.name}
              fill
              priority
              sizes="100vw"
              containerClassName="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-taupe/80 via-taupe/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-container px-6 pb-10 md:px-8">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: category.name },
                  ]}
                  className="mb-3 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40"
                />
                <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-sage-deep font-semibold">
                  {category.eyebrow}
                </p>
                <h1 className="font-display text-4xl text-white md:text-5xl lg:text-6xl">
                  {category.name}
                </h1>
                {category.shortDescription ? (
                  <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-white/90 md:text-lg">
                    {category.shortDescription}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 font-body text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-taupe"
                  >
                    View Photo Gallery ({category.galleryImages.length}) ↓
                  </a>
                  <Link
                    href={`/contact?product=${category.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sage-deep px-4 py-2 font-body text-xs font-semibold text-white transition-all hover:bg-sage-deep/90 shadow-sm"
                  >
                    Request Bulk Quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Category Navigation Strip */}
      <nav
        aria-label="Product categories navigation"
        className="sticky top-20 z-20 border-b border-hairline bg-white/95 py-3 shadow-xs backdrop-blur-md"
      >
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="shrink-0 font-body text-xs font-semibold uppercase tracking-wider text-muted mr-1">
              Browse Categories:
            </span>
            {allCategories.map((cat) => {
              const isActive = cat.slug === category.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 font-body text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-sage-deep text-white shadow-sm ring-1 ring-sage-deep font-semibold"
                      : "bg-oat/80 text-taupe hover:bg-oat hover:text-sage-deep",
                  )}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Image Gallery Section - ALWAYS VISIBLE */}
      <section
        id="gallery"
        className="border-b border-hairline bg-oat/50 py-section-mobile md:py-section-desktop"
      >
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.22em] text-sage-deep font-semibold">
                Collection Showcase
              </p>
              <h2 className="mt-1 font-display text-3xl text-taupe md:text-4xl">
                {category.name} Gallery
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-medium text-sage-deep shadow-xs border border-hairline">
                {category.galleryImages.length} High-Res {category.galleryImages.length === 1 ? "Photo" : "Photos"}
              </span>
              <p className="hidden sm:block font-body text-xs text-muted">
                Click any image to view details in full resolution
              </p>
            </div>
          </div>

          <ProductGallery
            images={category.galleryImages}
            heroImage={category.heroImage}
            productName={category.name}
            cacheVersion={category.updatedAt}
          />
        </div>
      </section>

      {/* Product Details & Specifications */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <StaggerChildren className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-body text-lg leading-relaxed text-muted">
                {category.description}
              </p>
              <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-hairline bg-oat p-6">
                  <p className="font-body text-xs uppercase tracking-[0.12em] text-muted">
                    GSM Range
                  </p>
                  <p className="mt-2 font-display text-2xl text-taupe">
                    {category.gsmRange}
                  </p>
                </div>
                <div className="border border-hairline bg-oat p-6">
                  <p className="font-body text-xs uppercase tracking-[0.12em] text-muted">
                    MOQ
                  </p>
                  <p className="mt-2 font-display text-xl text-taupe">
                    {category.moq}
                  </p>
                </div>
                <div className="border border-hairline bg-oat p-6">
                  <p className="font-body text-xs uppercase tracking-[0.12em] text-muted">
                    Lead Time
                  </p>
                  <p className="mt-2 font-display text-xl text-taupe">
                    {category.leadTime}
                  </p>
                </div>
                <div className="border border-hairline bg-oat p-6">
                  <p className="font-body text-xs uppercase tracking-[0.12em] text-muted">
                    Key Finish
                  </p>
                  <p className="mt-2 font-body text-sm text-taupe">
                    Commercial Laundry Tested
                  </p>
                </div>
              </StaggerChildren>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl text-taupe">
                Key Features
              </h2>
              <ul className="mt-4 space-y-3">
                {category.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-body text-base text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {category.variants.length > 0 ? (
                <>
                  <h3 className="mt-8 font-display text-xl text-taupe">
                    Product Variants
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {category.variants.map((variant) => (
                      <li
                        key={variant}
                        className="font-body text-sm text-muted"
                      >
                        {variant}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* Materials, Sizes, Customization & Packaging */}
      <section className="border-y border-hairline bg-white py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <StaggerChildren className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Materials", items: category.materials },
              {
                title: "Sizes",
                items: category.sizes.map((s) => `${s.label}: ${s.cm} (${s.inches})`),
              },
              { title: "Customization", items: category.customization },
              { title: "Packaging", items: category.packaging },
            ].map((block) => (
              <div key={block.title}>
                <h2 className="font-display text-xl text-taupe">{block.title}</h2>
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm leading-relaxed text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Related Categories Grid */}
      <section className="py-section-mobile md:py-section-desktop bg-pearl">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-sage-deep font-semibold">
                Explore More
              </p>
              <h2 className="mt-1 font-display text-2xl text-taupe md:text-3xl">
                Other Towel & Linen Collections
              </h2>
            </div>
            <Link
              href="/products"
              className="font-body text-sm font-medium text-sage-deep hover:underline"
            >
              View All Collections →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allCategories
              .filter((c) => c.slug !== category.slug)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="group block overflow-hidden rounded-lg border border-hairline bg-white transition-all hover:border-sage-deep hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-oat">
                    <HoverScaleImage
                      src={related.cardImage}
                      alt={related.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-taupe/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <p className="font-body text-[11px] uppercase tracking-wider text-sage-deep font-medium">
                      {related.eyebrow}
                    </p>
                    <h3 className="mt-1 font-display text-base text-taupe group-hover:text-sage-deep transition-colors">
                      {related.name}
                    </h3>
                    <p className="mt-1 font-body text-xs text-muted line-clamp-1">
                      {related.gsmRange} • View Gallery →
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABand prefilledProduct={category.slug} />
    </>
  );
}
