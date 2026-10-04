import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import {
  productCategories,
  companyStats,
  certifications,
} from "@/data/products";
import {
  STATIC_HEADER,
  STATIC_FOOTER_COMPANY,
  STATIC_FOOTER_EXPORT,
} from "@/lib/data/navigation";
import {
  DEFAULT_HOME_SECTIONS,
  DEFAULT_ABOUT_SECTIONS,
  DEFAULT_MANUFACTURING_SECTIONS,
  DEFAULT_PRIVATE_LABEL_SECTIONS,
  DEFAULT_FAQ_SECTIONS,
  DEFAULT_CONTACT_SECTIONS,
  DEFAULT_PRODUCTS_SECTIONS,
} from "@/lib/data/pages";
import { siteConfig } from "@/lib/utils";
import { DEFAULT_COLORS } from "@/lib/data/site-settings";

const TABLE_SCHEMAS: { name: string; ddl: string }[] = [
  {
    name: "AdminUser",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`AdminUser\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`email\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`password\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`name\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`role\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
        \`active\` tinyint(1) NOT NULL DEFAULT '1',
        \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`AdminUser_email_key\` (\`email\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "Certification",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`Certification\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`name\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`code\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`description\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`pdfUrl\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`sortOrder\` int NOT NULL DEFAULT '0',
        \`visible\` tinyint(1) NOT NULL DEFAULT '1',
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "Inquiry",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`Inquiry\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`name\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`company\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`country\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`email\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`phone\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`productInterest\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`message\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`buyerType\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`estimatedVolume\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`targetMarket\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`source\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
        \`emailSent\` tinyint(1) NOT NULL DEFAULT '0',
        \`emailError\` text COLLATE utf8mb4_unicode_ci,
        \`readAt\` datetime(3) DEFAULT NULL,
        \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`),
        KEY \`Inquiry_createdAt_idx\` (\`createdAt\`),
        KEY \`Inquiry_readAt_idx\` (\`readAt\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "NavigationItem",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`NavigationItem\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`label\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`href\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`type\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'link',
        \`sortOrder\` int NOT NULL DEFAULT '0',
        \`visible\` tinyint(1) NOT NULL DEFAULT '1',
        \`location\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`NavigationItem_location_sortOrder_idx\` (\`location\`,\`sortOrder\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "PageContent",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`PageContent\` (
        \`slug\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`metaTitle\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`metaDescription\` text COLLATE utf8mb4_unicode_ci,
        \`sections\` json NOT NULL,
        \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`slug\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "ProductCategory",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`ProductCategory\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`slug\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`name\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`shortDescription\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`description\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`eyebrow\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`heroImage\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`cardImage\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`galleryImages\` json NOT NULL,
        \`features\` json NOT NULL,
        \`variants\` json NOT NULL,
        \`materials\` json NOT NULL,
        \`sizes\` json NOT NULL,
        \`gsmRange\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`customization\` json NOT NULL,
        \`packaging\` json NOT NULL,
        \`idealFor\` json NOT NULL,
        \`leadTime\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`moq\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`metaTitle\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`metaDescription\` text COLLATE utf8mb4_unicode_ci,
        \`sortOrder\` int NOT NULL DEFAULT '0',
        \`visible\` tinyint(1) NOT NULL DEFAULT '1',
        \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`ProductCategory_slug_key\` (\`slug\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "SiteSettings",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`SiteSettings\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
        \`siteName\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Deepam Textiles',
        \`legalName\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Deepam Textiles',
        \`tagline\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Experience the Luxury. Crafting Excellence Since 1998.',
        \`description\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`logoUrl\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/images/logo-transparent.png',
        \`logoLightUrl\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/images/logo-dark-mode.png',
        \`faviconUrl\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '/favicon.ico',
        \`colorPearl\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
        \`colorOat\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#f0f7fc',
        \`colorTaupe\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#0f2942',
        \`colorMuted\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#5b6e82',
        \`colorSage\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#38bdf8',
        \`colorSageDeep\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#0284c7',
        \`colorHairline\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#e0e9f1',
        \`contactEmail\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'export@deepamtextile.com',
        \`contactEmailSecondary\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'sales@deepamtextile.com',
        \`contactPhone\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '+91 70661 48936',
        \`leadsToEmail\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'export@deepamtextile.com',
        \`resendFromEmail\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`inquiryEnabled\` tinyint(1) NOT NULL DEFAULT '1',
        \`whatsappNumber\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '+917066148936',
        \`calendlyUrl\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`footerBlurb\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`copyrightText\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`exportMarkets\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USA · Canada · Europe · Middle East · Australia',
        \`addressStreet\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MIDC Industrial Area, Akkalkot Road',
        \`addressCity\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Solapur',
        \`addressRegion\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Maharashtra',
        \`addressCountry\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'India',
        \`addressPostalCode\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '413006',
        \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: "Stat",
    ddl: `
      CREATE TABLE IF NOT EXISTS \`Stat\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`value\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`label\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`sortOrder\` int NOT NULL DEFAULT '0',
        \`visible\` tinyint(1) NOT NULL DEFAULT '1',
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
];

const REQUIRED_TABLES = TABLE_SCHEMAS.map((t) => t.name);

let cachedInitializationSuccess = false;

export async function getDatabaseHealth() {
  try {
    const rawTables = (await prisma.$queryRawUnsafe("SHOW TABLES;")) as Record<
      string,
      string
    >[];
    const existingTables: string[] = [];

    for (const row of rawTables) {
      const tableName = Object.values(row)[0];
      if (tableName) {
        existingTables.push(tableName);
      }
    }

    const missingTables = REQUIRED_TABLES.filter(
      (req) =>
        !existingTables.some((ext) => ext.toLowerCase() === req.toLowerCase()),
    );

    let adminCount = 0;
    let productCount = 0;
    let inquiryCount = 0;

    if (
      existingTables.some((t) => t.toLowerCase() === "adminuser".toLowerCase())
    ) {
      try {
        adminCount = await prisma.adminUser.count();
      } catch {}
    }
    if (
      existingTables.some(
        (t) => t.toLowerCase() === "productcategory".toLowerCase(),
      )
    ) {
      try {
        productCount = await prisma.productCategory.count();
      } catch {}
    }
    if (
      existingTables.some((t) => t.toLowerCase() === "inquiry".toLowerCase())
    ) {
      try {
        inquiryCount = await prisma.inquiry.count();
      } catch {}
    }

    return {
      connected: true,
      error: null,
      existingTables,
      missingTables,
      allTablesReady: missingTables.length === 0,
      adminCount,
      productCount,
      inquiryCount,
    };
  } catch (err) {
    return {
      connected: false,
      error: err instanceof Error ? err.message : String(err),
      existingTables: [],
      missingTables: REQUIRED_TABLES,
      allTablesReady: false,
      adminCount: 0,
      productCount: 0,
      inquiryCount: 0,
    };
  }
}

export async function ensureDatabaseTablesExist(): Promise<{
  success: boolean;
  createdTables: string[];
  error?: string;
}> {
  const created: string[] = [];
  try {
    for (const schema of TABLE_SCHEMAS) {
      await prisma.$executeRawUnsafe(schema.ddl);
      created.push(schema.name);
    }
    return { success: true, createdTables: created };
  } catch (err) {
    console.error("[ensureDatabaseTablesExist] DDL error:", err);
    return {
      success: false,
      createdTables: created,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function seedInitialDataIfEmpty(): Promise<{
  success: boolean;
  seeded: string[];
  error?: string;
}> {
  const seeded: string[] = [];

  try {
    // 1. Site Settings
    const settingsCount = await prisma.siteSettings.count();
    if (settingsCount === 0) {
      await prisma.siteSettings.create({
        data: {
          id: "default",
          siteName: siteConfig.name,
          legalName: siteConfig.legalName,
          tagline: siteConfig.tagline,
          description: siteConfig.description,
          logoUrl: "/images/logo-transparent.png",
          logoLightUrl: "/images/logo-dark-mode.png",
          colorPearl: DEFAULT_COLORS.pearl,
          colorOat: DEFAULT_COLORS.oat,
          colorTaupe: DEFAULT_COLORS.taupe,
          colorMuted: DEFAULT_COLORS.muted,
          colorSage: DEFAULT_COLORS.sage,
          colorSageDeep: DEFAULT_COLORS.sageDeep,
          colorHairline: DEFAULT_COLORS.hairline,
          contactEmail: siteConfig.email,
          contactEmailSecondary: siteConfig.emailSecondary,
          contactPhone: siteConfig.phone,
          leadsToEmail: process.env.LEADS_TO_EMAIL ?? siteConfig.leadsEmail,
          resendFromEmail: process.env.RESEND_FROM_EMAIL ?? null,
          inquiryEnabled: true,
          whatsappNumber:
            process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+917066148936",
          calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? null,
          footerBlurb:
            "Premier Indian manufacturer and global exporter of luxury terry towels, hotel bath linen, and private label collections from Solapur, Maharashtra.",
          exportMarkets: "USA · Canada · Europe · Middle East · Australia",
          addressStreet: siteConfig.address.street,
          addressCity: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
          addressPostalCode: siteConfig.address.postalCode,
        },
      });
      seeded.push("SiteSettings");
    }

    // 2. Navigation Items
    const navCount = await prisma.navigationItem.count();
    if (navCount === 0) {
      const navItems = [
        ...STATIC_HEADER,
        ...STATIC_FOOTER_COMPANY,
        ...STATIC_FOOTER_EXPORT,
      ];
      for (const item of navItems) {
        await prisma.navigationItem.create({
          data: {
            label: item.label,
            href: item.href,
            type: item.type,
            sortOrder: item.sortOrder,
            visible: item.visible,
            location: item.location,
          },
        });
      }
      seeded.push("NavigationItem");
    }

    // 3. Product Categories
    const productCount = await prisma.productCategory.count();
    if (productCount === 0) {
      for (const [index, product] of productCategories.entries()) {
        await prisma.productCategory.create({
          data: {
            slug: product.slug,
            name: product.name,
            shortDescription: product.shortDescription,
            description: product.description,
            eyebrow: product.eyebrow,
            heroImage: product.heroImage,
            cardImage: product.cardImage,
            galleryImages: [],
            features: product.features,
            variants: product.variants ?? [],
            materials: product.materials,
            sizes: product.sizes,
            gsmRange: product.gsmRange,
            customization: product.customization,
            packaging: product.packaging,
            idealFor: product.idealFor,
            leadTime: product.leadTime,
            moq: product.moq,
            sortOrder: index,
            visible: true,
          },
        });
      }
      seeded.push("ProductCategory");
    }

    // 4. Stats
    const statCount = await prisma.stat.count();
    if (statCount === 0) {
      for (const [index, stat] of companyStats.entries()) {
        await prisma.stat.create({
          data: {
            value: stat.value,
            label: stat.label,
            sortOrder: index,
            visible: true,
          },
        });
      }
      seeded.push("Stat");
    }

    // 5. Certifications
    const certCount = await prisma.certification.count();
    if (certCount === 0) {
      for (const [index, cert] of certifications.entries()) {
        await prisma.certification.create({
          data: {
            name: cert.name,
            code: cert.certificateNumber ?? null,
            description: cert.description,
            pdfUrl: cert.pdfUrl ?? null,
            sortOrder: index,
            visible: true,
          },
        });
      }
      seeded.push("Certification");
    }

    // 6. Page Contents
    const pageCount = await prisma.pageContent.count();
    if (pageCount === 0) {
      const pages = [
        {
          slug: "home",
          metaTitle: siteConfig.name,
          metaDescription: siteConfig.description,
          sections: DEFAULT_HOME_SECTIONS,
        },
        {
          slug: "about",
          metaTitle: "About Us",
          metaDescription:
            "Learn about Deepam Textiles—premium textile manufacturing in Solapur, India since 1998, exporting to USA, Canada, Europe, and the Middle East.",
          sections: DEFAULT_ABOUT_SECTIONS,
        },
        {
          slug: "manufacturing",
          metaTitle: "Manufacturing",
          metaDescription:
            "Vertical textile manufacturing from yarn selection to export packaging. ISO-certified facility in Solapur, India serving international buyers.",
          sections: DEFAULT_MANUFACTURING_SECTIONS,
        },
        {
          slug: "certifications",
          metaTitle: "Certifications",
          metaDescription:
            "ISO 9001:2015, OEKO-TEX Standard 100, BCI, GOTS, BSCI, and SEDEX/SMETA compliance for export textile manufacturing from India.",
          sections: {},
        },
        {
          slug: "private-label",
          metaTitle: "Private Label",
          metaDescription:
            "Launch or scale your towel and linen brand with full private label manufacturing—from custom weaving to retail-ready packaging. Export worldwide.",
          sections: DEFAULT_PRIVATE_LABEL_SECTIONS,
        },
        {
          slug: "contact",
          metaTitle: "Contact",
          metaDescription:
            "Contact Deepam Textiles export team for B2B textile inquiries and RFQs. Global buyers welcome. Response within one business day.",
          sections: DEFAULT_CONTACT_SECTIONS,
        },
        {
          slug: "faq",
          metaTitle: "FAQ",
          metaDescription:
            "Frequently asked questions about MOQs, samples, lead times, shipping, payment terms, customization, and certifications for Deepam Textiles export buyers.",
          sections: DEFAULT_FAQ_SECTIONS,
        },
        {
          slug: "products",
          metaTitle: "Products",
          metaDescription:
            "Explore our full range of premium B2B textile products—bath towels, hotel linen, spa towels, private label, and more for global export.",
          sections: DEFAULT_PRODUCTS_SECTIONS,
        },
      ];

      for (const page of pages) {
        await prisma.pageContent.upsert({
          where: { slug: page.slug },
          update: {},
          create: page,
        });
      }
      seeded.push("PageContent");
    }

    // 7. Admin User
    const adminEmail = (
      process.env.ADMIN_EMAIL ?? "admin@deepamtextile.com"
    ).toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD ?? "RIYA@lovesdad143";

    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await prisma.adminUser.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: "Deepam Admin",
          role: "admin",
          active: true,
        },
      });
      seeded.push("AdminUser");
    }

    return { success: true, seeded };
  } catch (err) {
    console.error("[seedInitialDataIfEmpty] Error:", err);
    return {
      success: false,
      seeded,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function ensureDatabaseInitialized(force = false): Promise<{
  success: boolean;
  message: string;
  health: Awaited<ReturnType<typeof getDatabaseHealth>>;
}> {
  if (cachedInitializationSuccess && !force) {
    const health = await getDatabaseHealth();
    return {
      success: true,
      message: "Database already verified in memory cache.",
      health,
    };
  }

  const ddlResult = await ensureDatabaseTablesExist();
  if (!ddlResult.success) {
    const health = await getDatabaseHealth();
    return {
      success: false,
      message: `Table creation failed: ${ddlResult.error}`,
      health,
    };
  }

  const seedResult = await seedInitialDataIfEmpty();
  const health = await getDatabaseHealth();

  if (health.allTablesReady) {
    cachedInitializationSuccess = true;
    return {
      success: true,
      message: `Database tables and seed data ready! Seeded: ${seedResult.seeded.join(", ") || "None (already populated)"}`,
      health,
    };
  }

  return {
    success: false,
    message: `Database partially initialized. Missing: ${health.missingTables.join(", ")}`,
    health,
  };
}
