import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactEmails } from "@/components/ContactEmails";
import { Logo } from "@/components/Logo";
import { hasCustomLogo } from "@/lib/brand-logo";
import type {
  NavigationItemData,
  ProductCategoryData,
  SiteSettingsData,
} from "@/lib/types/cms";

type FooterProps = {
  settings: SiteSettingsData;
  companyLinks: NavigationItemData[];
  exportLinks: NavigationItemData[];
  productCategories: ProductCategoryData[];
  logoLightUrl?: string;
  siteName?: string;
};

export function Footer({
  settings,
  companyLinks,
  exportLinks,
  productCategories,
  logoLightUrl,
  siteName,
}: FooterProps) {
  const filteredCompanyLinks = companyLinks.filter(
    (l) => !l.href.includes("certif") && !l.label.toLowerCase().includes("certif"),
  );
  const useImageLogo = hasCustomLogo(undefined, logoLightUrl, "footer");

  return (
    <footer className="relative bg-gradient-to-b from-[#0284c7] to-[#0369a1] text-white">
      <div className="mx-auto max-w-container px-6 py-section-mobile md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            {useImageLogo ? (
              <Logo
                variant="light"
                logoLightUrl={logoLightUrl}
                siteName={siteName}
                logoCacheVersion={settings.updatedAt}
              />
            ) : (
              <BrandLogo
                variant="footer"
                logoUrl={logoLightUrl}
                siteName={siteName}
                logoCacheVersion={settings.updatedAt}
              />
            )}
            <p className="mt-1 font-body text-xs uppercase tracking-[0.22em] text-white/80">
              by {settings.legalName}
            </p>
            <p className="mt-4 max-w-xs font-body text-[13.5px] leading-relaxed text-white/90">
              {settings.footerBlurb}
            </p>
          </div>

          <div>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </p>
            <ul className="space-y-3">
              {filteredCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13.5px] text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Products
            </p>
            <ul className="space-y-3">
              {productCategories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="font-body text-[13.5px] text-white/85 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </p>
            <address className="not-italic">
              <ContactEmails
                primary={settings.contactEmail}
                secondary={settings.contactEmailSecondary}
                linkClassName="font-body text-[13.5px] text-white/85 transition-colors hover:text-white"
              />
              <p className="mt-3 font-body text-[13.5px] text-white/85">
                <a
                  href={`tel:${settings.contactPhone.replace(/\D/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {settings.contactPhone}
                </a>
              </p>
              <p className="mt-3 font-body text-[13.5px] text-white/85">
                {settings.address.city}, {settings.address.region},{" "}
                {settings.address.country}
              </p>
            </address>
            <ul className="mt-6 space-y-3">
              {exportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13.5px] font-medium text-white transition-colors hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-white/80">
            © {new Date().getFullYear()}{" "}
            {settings.copyrightText ??
              `${settings.siteName}. Luxury in Every Thread.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
