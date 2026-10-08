import { CmsImage } from "@/components/CmsImage";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureGrid } from "@/components/FeatureGrid";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductMarquee } from "@/components/ProductMarquee";
import { StatStrip } from "@/components/StatStrip";
import { CTABand } from "@/components/CTABand";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ManufacturingSection } from "@/components/ManufacturingSection";
import { HomeInquirySection } from "@/components/HomeInquirySection";
import { FadeUp } from "@/components/motion/FadeUp";
import { ArrowRight } from "lucide-react";
import {
  whyChooseUsFeatures,
  manufacturingHighlights,
  audienceSegments,
} from "@/data/products";
import { getProductCategories } from "@/lib/data/products";
import { getStats } from "@/lib/data/stats";
import { getPageContent } from "@/lib/data/pages";
import { resolveCmsImage } from "@/lib/image-props";
import { cn } from "@/lib/utils";

/** Product cards must reflect DB uploads at runtime, not CI build-time picsum seeds. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [productCategories, companyStats, homePage] =
    await Promise.all([
      getProductCategories(),
      getStats(),
      getPageContent("home"),
    ]);

  const hero = (homePage?.sections.hero ?? {}) as {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    slides?: { imageUrl: string; caption: string }[];
  };
  const heritage = (homePage?.sections.heritage ?? {}) as {
    eyebrow?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  const manufacturingSection = (homePage?.sections.manufacturing ?? {}) as {
    imageUrl?: string;
  };

  const heritageImageUrl = heritage.imageUrl?.trim() ?? "";
  console.log("[HomePage] heritage section", {
    imageUrl: heritageImageUrl || null,
    updatedAt: homePage?.updatedAt,
  });

  return (
    <>
      <HeroSection
        eyebrow={hero.eyebrow ?? "Deepam Textiles · Solapur, Maharashtra, India"}
        title={hero.title ?? "Luxury in Every Thread."}
        subtitle={
          hero.subtitle ??
          "Premier Indian manufacturer & global exporter of luxury terry towels, hotel linen & private-label manufacturing — crafted in Solapur, India since 1998."
        }
        slides={hero.slides}
        imageCacheVersion={homePage?.updatedAt}
      />

      {/* About / Heritage */}
      <section
        id="about"
        className="scroll-mt-28 py-section-mobile md:py-section-desktop"
      >
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div
            className={cn(
              "grid items-start gap-12 lg:gap-16",
              heritageImageUrl
                ? "lg:grid-cols-2 lg:items-center"
                : "lg:grid-cols-[0.8fr_1.2fr]",
            )}
          >
            {heritageImageUrl ? (
              <FadeUp>
                <div className="relative aspect-[4/3] overflow-hidden border border-hairline bg-oat">
                  <CmsImage
                    src={heritageImageUrl}
                    cacheVersion={homePage?.updatedAt}
                    alt={
                      heritage.title
                        ? `${heritage.title} — Deepam Textiles`
                        : "Deepam Textiles heritage in Solapur, India"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </FadeUp>
            ) : null}
            {heritageImageUrl ? (
              <FadeUp delay={0.1}>
                <SectionHeading
                  eyebrow={heritage.eyebrow ?? "Our Heritage"}
                  title={
                    heritage.title ??
                    "Crafted in Solapur, India"
                  }
                />
                <div className="mt-6 font-body text-base leading-relaxed text-muted md:text-[16.5px]">
                  <p>
                    {heritage.description ??
                      "Since 1998, Deepam Textiles has been at the heart of India's premier terry towel manufacturing region—bringing institutional-grade quality and boutique-level finishing to global B2B buyers."}
                  </p>
                  <Link
                    href="/about"
                    className="mt-6 inline-flex items-center gap-2 border-b border-sage-deep pb-1 font-body text-[12.5px] uppercase tracking-[0.14em] text-taupe transition-colors hover:text-sage-deep"
                  >
                    Read our full story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeUp>
            ) : (
              <>
                <FadeUp>
                  <SectionHeading
                    eyebrow={heritage.eyebrow ?? "Our Story"}
                    title={
                      heritage.title ??
                      "A premier textile manufacturer, built for discerning global buyers."
                    }
                  />
                </FadeUp>
                <FadeUp delay={0.1}>
                  <div className="font-body text-base leading-relaxed text-muted md:text-[16.5px]">
                    <p>
                      Deepam Textiles is a premier textile manufacturing and
                      export company headquartered in Solapur, Maharashtra — one
                      of the world&apos;s renowned towel-manufacturing hubs.
                    </p>
                    <p className="mt-4">
                      {heritage.description ??
                        "We supply high-quality cotton towels, bath linen, hospitality textiles, and private-label solutions to importers, distributors, retailers, hospitality buyers, and brands worldwide — with consistent quality and reliable global delivery support."}
                    </p>
                    <Link
                      href="/about"
                      className="mt-6 inline-flex items-center gap-2 border-b border-sage-deep pb-1 font-body text-[12.5px] uppercase tracking-[0.14em] text-taupe transition-colors hover:text-sage-deep"
                    >
                      Read our full story
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </FadeUp>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-16 text-white md:py-20 shadow-inner">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <StatStrip stats={companyStats} limit={4} />
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="scroll-mt-28 bg-oat py-section-mobile md:py-section-desktop"
      >
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="Product Portfolio"
              title="A complete range of premium textiles"
              align="center"
              className="mx-auto mb-12 md:mb-14"
            />
          </FadeUp>
          <ProductMarquee categories={productCategories} />
          <CategoryGrid categories={productCategories} columns={4} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="The reliability buyers return for"
              className="mb-12 md:mb-14"
            />
          </FadeUp>
          <FeatureGrid features={whyChooseUsFeatures} />
        </div>
      </section>

      {/* Solutions */}
      <section
        id="solutions"
        className="scroll-mt-28 bg-oat py-section-mobile md:py-section-desktop"
      >
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="Solutions For"
              title="Built around how you buy"
              align="center"
              className="mx-auto mb-12 md:mb-14"
            />
          </FadeUp>
          <SolutionsSection segments={audienceSegments} />
        </div>
      </section>

      {/* Manufacturing */}
      <section
        id="manufacturing"
        className="scroll-mt-28 py-section-mobile md:py-section-desktop"
      >
        <div className="mx-auto max-w-container px-6 md:px-8">
          <ManufacturingSection
            steps={manufacturingHighlights}
            imageUrl={manufacturingSection.imageUrl}
            imageCacheVersion={homePage?.updatedAt}
          />
        </div>
      </section>

      <CTABand variant="centered" />

      <HomeInquirySection />
    </>
  );
}
