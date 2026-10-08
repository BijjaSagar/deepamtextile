import Link from "next/link";
import { MultiStepInquiryForm } from "@/components/MultiStepInquiryForm";
import { CatalogCTA } from "@/components/CatalogGateModal";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { getProductInterestOptions } from "@/lib/data/products";
import { getPageContent } from "@/lib/data/pages";
import { getSiteSettings } from "@/lib/data/site-settings";
import { ArrowRight } from "lucide-react";

type CTABandProps = {
  prefilledProduct?: string;
  showForm?: boolean;
  variant?: "full" | "centered";
};

export async function CTABand({
  prefilledProduct,
  showForm = true,
  variant = "full",
}: CTABandProps) {
  if (variant === "centered") {
    const page = await getPageContent("contact");
    const catalog = (page?.sections.catalog ?? {}) as {
      pdfUrl?: string;
      pdfLabel?: string;
    };

    return (
      <section className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-section-mobile text-center text-white md:py-24">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <FadeUp>
            <p className="font-body text-[11.5px] font-semibold uppercase tracking-[0.28em] text-sky-200">
              Let&apos;s Work Together
            </p>
            <h2 className="mt-3.5 font-display text-[clamp(1.875rem,4vw,3rem)] text-white">
              Ready to source premium textiles?
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-base text-sky-100">
              Tell us what you need — towels, hotel linen, or a full private-label
              program — and our export team will respond within one business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact#inquiry"
                className="btn-solid group border-white bg-white text-[#0284c7] hover:bg-sky-50 hover:text-[#0369a1]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
              <CatalogCTA
                appearance="ghost"
                className="border-white/60 text-white hover:border-white hover:bg-white hover:text-[#0284c7]"
                catalogPdfUrl={catalog.pdfUrl ?? ""}
                catalogPdfLabel={catalog.pdfLabel}
              />
            </div>
          </FadeUp>
        </div>
      </section>
    );
  }

  const [productInterestOptions, settings] = await Promise.all([
    getProductInterestOptions(),
    getSiteSettings(),
  ]);

  return (
    <section className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-section-mobile text-white md:py-section-desktop">
      <div className="mx-auto max-w-container px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Start Your Order"
              title="Request a quote for USA & Canada export"
              description="Share your specifications, quantities, and timeline. Our export team responds within one business day with pricing, lead times, and sampling options."
              dark
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center border border-white/40 px-6 font-body text-sm text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Contact our team
              </Link>
              <Link
                href="/products"
                className="inline-flex h-11 items-center px-6 font-body text-sm text-sky-100 transition-colors hover:text-white"
              >
                Browse all products →
              </Link>
            </div>
          </div>
          {showForm && (
            <div className="border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:p-8">
              <MultiStepInquiryForm
                prefilledProduct={prefilledProduct}
                variant="dark"
                productInterestOptions={productInterestOptions}
                inquiryEnabled={settings.inquiryEnabled}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
