import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/SectionHeading";
import { StatStrip } from "@/components/StatStrip";
import { CTABand } from "@/components/CTABand";
import { ContactEmails } from "@/components/ContactEmails";
import { FadeUp } from "@/components/motion/FadeUp";
import { resolveRenderableCmsImageUrl } from "@/lib/cms-asset";
import { resolveCmsImage } from "@/lib/image-props";
import { getStats } from "@/lib/data/stats";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getPageContent } from "@/lib/data/pages";

export async function generateMetadata() {
  const page = await getPageContent("about");
  return createMetadata({
    title: page?.metaTitle ?? "About Us",
    description:
      page?.metaDescription ??
      "Learn about Deepam Textiles—premium textile manufacturing in Solapur, India since 1998, exporting to USA, Canada, Europe, and the Middle East.",
    path: "/about",
  });
}

export const revalidate = 86400;

export default async function AboutPage() {
  const [companyStats, settings, aboutPage] = await Promise.all([
    getStats(),
    getSiteSettings(),
    getPageContent("about"),
  ]);

  const hero = (aboutPage?.sections.hero ?? {}) as {
    eyebrow?: string;
    title?: string;
    imageUrl?: string;
  };
  const intro = (aboutPage?.sections.intro ?? {}) as {
    title?: string;
    body?: string;
    imageUrl?: string;
  };

  const [heroImageUrl, introImageUrl] = await Promise.all([
    resolveRenderableCmsImageUrl(hero.imageUrl),
    resolveRenderableCmsImageUrl(intro.imageUrl),
  ]);

  console.log("[AboutPage] resolved CMS images", {
    heroImageUrl,
    introImageUrl,
    rawHero: hero.imageUrl,
    rawIntro: intro.imageUrl,
  });

  return (
    <>
      {heroImageUrl ? (
        <section className="relative min-h-[50vh] overflow-hidden pt-28">
          <div className="absolute inset-0">
            <Image
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
              {...resolveCmsImage(heroImageUrl, aboutPage?.updatedAt)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pearl/90 via-pearl/75 to-pearl" />
          </div>
          <div className="relative mx-auto max-w-container px-6 pb-section-mobile md:px-8 md:pb-section-desktop">
            <FadeUp>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.22em] text-sage-deep">
                {hero.eyebrow ?? "Our Story"}
              </p>
              <h1 className="max-w-3xl font-display text-4xl text-taupe md:text-5xl lg:text-6xl">
                {hero.title ?? "Where heritage meets export excellence"}
              </h1>
            </FadeUp>
          </div>
        </section>
      ) : (
        <section className="pt-32 pb-section-mobile md:pb-section-desktop">
          <div className="mx-auto max-w-container px-6 md:px-8">
            <FadeUp>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.22em] text-sage-deep">
                {hero.eyebrow ?? "Our Story"}
              </p>
              <h1 className="max-w-3xl font-display text-4xl text-taupe md:text-5xl lg:text-6xl">
                {hero.title ?? "Where heritage meets export excellence"}
              </h1>
            </FadeUp>
          </div>
        </section>
      )}

      <section className="pb-section-mobile md:pb-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <FadeUp className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden bg-oat">
                {introImageUrl ? (
                  <Image
                    alt="Deepam Textiles facility in Solapur"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    {...resolveCmsImage(introImageUrl, aboutPage?.updatedAt)}
                  />
                ) : null}
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="lg:col-span-7 lg:pl-8">
              <SectionHeading
                title={intro.title ?? "Deepam Textiles — Est. 1998, Solapur"}
                description={
                  intro.body ??
                  "Solapur has been India's terry towel capital for over a century. Deepam Textiles was founded here in 1998 with a singular focus: produce textiles that meet the exacting standards of international hospitality, retail, and institutional buyers."
                }
              />
              <div className="mt-8 space-y-4 font-body text-base leading-relaxed text-muted">
                <p>
                  Deepam Textiles is our flagship manufacturing and export brand—engineered specifically for
                  B2B buyers across the United States, Canada, Europe, the Middle East, and Australia who require consistent
                  GSM, reliable lead times, and complete export documentation.
                </p>
                <p>
                  Our vertically integrated facility spans modern production floors with 200+ high-speed airjet and rapier looms,
                  automated dyeing, finishing, cutting, stitching, and quality laboratories.
                  We deliver 550+ MT monthly capacity and maintain certifications including ISO 9001, OEKO-TEX, GOTS, BSCI, and SEDEX.
                </p>
                <p>
                  Whether you are a five-star hotel group replenishing par levels, a
                  retail chain launching a home collection, or an emerging brand
                  building a private label program—we partner with you from sampling
                  through shipment.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-taupe py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <StatStrip stats={companyStats} dark />
        </div>
      </section>

      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <SectionHeading
              eyebrow="Our Values"
              title="What guides every production run"
              className="mb-12"
            />
          </FadeUp>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Consistency",
                text: "±5% GSM tolerance and colour matching across every batch—non-negotiable for hospitality procurement.",
              },
              {
                title: "Transparency",
                text: "Open factory visits, third-party audits, and clear communication at every stage of production.",
              },
              {
                title: "Partnership",
                text: "We grow with our buyers—from first sample to multi-year supply agreements.",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div className="border-t border-hairline pt-6">
                  <h3 className="font-display text-xl text-taupe">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="mt-12 font-body text-sm text-muted">
            Ready to partner?{" "}
            <Link href="/contact" className="text-sage-deep hover:underline">
              Contact our export team
            </Link>{" "}
            or email{" "}
            <ContactEmails
              primary={settings.contactEmail}
              secondary={settings.contactEmailSecondary}
              layout="inline"
              linkClassName="text-sage-deep hover:underline"
            />
          </p>
        </div>
      </section>

      <CTABand showForm={false} />
    </>
  );
}
