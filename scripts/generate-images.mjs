import fs from "node:fs";
import path from "node:path";

const productsDir = path.join(process.cwd(), "public/images/products");
const heroDir = path.join(process.cwd(), "public/images/hero");
const regionsDir = path.join(process.cwd(), "public/images/regions");

[productsDir, heroDir, regionsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Helper to generate a luxury textile SVG
function createTextileSvg(title, sub, color1, color2, accent, patternType) {
  const safeTitle = escapeXml(title);
  const safeSub = escapeXml(sub);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="foldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.4)" />
      <stop offset="50%" stop-color="rgba(2,132,199,0.03)" />
      <stop offset="100%" stop-color="rgba(15,41,66,0.12)" />
    </linearGradient>
    <pattern id="terryWeave" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="2.2" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.3" />
      <circle cx="11" cy="11" r="2.2" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.3" />
    </pattern>
    <pattern id="wafflePattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect x="1" y="1" width="18" height="18" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.35" />
      <rect x="5" y="5" width="10" height="10" fill="${accent}" opacity="0.1" />
    </pattern>
    <pattern id="stripePattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="20" height="40" fill="${accent}" opacity="0.18" />
    </pattern>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="800" fill="url(#bgGrad)" />

  <!-- Ambient lighting -->
  <circle cx="200" cy="180" r="240" fill="#ffffff" opacity="0.4" filter="url(#softGlow)" />
  <circle cx="650" cy="650" r="300" fill="#38bdf8" opacity="0.12" filter="url(#softGlow)" />

  <!-- Fabric Texture Overlay -->
  ${
    patternType === "waffle"
      ? `<rect width="800" height="800" fill="url(#wafflePattern)" />`
      : patternType === "stripe"
      ? `<rect width="800" height="800" fill="url(#stripePattern)" />`
      : `<rect width="800" height="800" fill="url(#terryWeave)" />`
  }

  <!-- Towel Fold Representation -->
  <g transform="translate(100, 160)">
    <!-- Bottom Stack Layer -->
    <rect x="30" y="320" width="540" height="110" rx="14" fill="#e0f2fe" stroke="${accent}" stroke-width="1.2" opacity="0.95" />
    <rect x="30" y="320" width="540" height="110" rx="14" fill="url(#foldGrad)" />

    <!-- Middle Stack Layer -->
    <rect x="20" y="210" width="560" height="115" rx="14" fill="#f0f9ff" stroke="${accent}" stroke-width="1.2" opacity="0.98" />
    <rect x="20" y="210" width="560" height="115" rx="14" fill="url(#foldGrad)" />

    <!-- Top Stack Layer -->
    <rect x="10" y="90" width="580" height="125" rx="16" fill="#ffffff" stroke="${accent}" stroke-width="1.2" />
    <rect x="10" y="90" width="580" height="125" rx="16" fill="url(#foldGrad)" />

    <!-- Decorative Woven Dobby Border Band -->
    <rect x="10" y="140" width="580" height="24" fill="${accent}" opacity="0.25" />
    <line x1="10" y1="139" x2="590" y2="139" stroke="${accent}" stroke-width="1.5" />
    <line x1="10" y1="165" x2="590" y2="165" stroke="${accent}" stroke-width="1.5" />

    <!-- Luxury Woven Damask Brand Label -->
    <g transform="translate(430, 100)">
      <rect x="0" y="0" width="120" height="50" rx="4" fill="#ffffff" stroke="#bae6fd" stroke-width="1" />
      <text x="60" y="24" font-family="serif" font-size="11" font-weight="600" fill="#0f2942" text-anchor="middle" letter-spacing="1.5">DEEPAM</text>
      <text x="60" y="38" font-family="sans-serif" font-size="7" font-weight="600" fill="#0284c7" text-anchor="middle" letter-spacing="2">OEKO-TEX®</text>
    </g>
  </g>

  <!-- Elegant Product Card Caption Plaque -->
  <g transform="translate(60, 640)">
    <rect width="680" height="100" rx="6" fill="#ffffff" opacity="0.96" stroke="#e0e9f1" stroke-width="1" />
    <text x="40" y="44" font-family="Georgia, serif" font-size="24" font-weight="500" fill="#0f2942">${safeTitle}</text>
    <text x="40" y="74" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#5b6e82" letter-spacing="1">${safeSub}</text>
    
    <g transform="translate(560, 36)">
      <circle cx="16" cy="16" r="18" fill="#f0f7fc" stroke="#bae6fd" stroke-width="1" />
      <path d="M12 16h8m-4-4l4 4-4 4" fill="none" stroke="#0284c7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>
</svg>`;
}

const productConfigs = [
  { name: "bath-towels.jpg", title: "Luxury Bath Towels", sub: "500 - 700 GSM · 100% Combed Cotton", c1: "#ffffff", c2: "#f0f9ff", acc: "#0284c7", p: "terry" },
  { name: "hand-towels.jpg", title: "Plush Hand Towels", sub: "550 GSM · Reinforced Ribbed Borders", c1: "#ffffff", c2: "#e0f2fe", acc: "#38bdf8", p: "dobby" },
  { name: "face-towels.jpg", title: "Face Towels & Wash Cloths", sub: "450 GSM · Ultra-Gentle Ring-Spun", c1: "#f8fafc", c2: "#f0f9ff", acc: "#0284c7", p: "terry" },
  { name: "bath-mats.jpg", title: "Heavyweight Bath Mats", sub: "900 GSM · Tufted & Ribbed Floor Adherence", c1: "#f0f7fc", c2: "#e0f2fe", acc: "#0284c7", p: "waffle" },
  { name: "hotel-linen.jpg", title: "Hotel Linen Programs", sub: "300 - 600 TC · Percale & Sateen Stripe", c1: "#ffffff", c2: "#f0f9ff", acc: "#38bdf8", p: "sateen" },
  { name: "bath-robes.jpg", title: "Spa & Luxury Bath Robes", sub: "420 GSM · Shawl Collar & Waffle Weave", c1: "#ffffff", c2: "#e0f2fe", acc: "#0284c7", p: "waffle" },
  { name: "kitchen-towels.jpg", title: "Herringbone Kitchen Towels", sub: "300 GSM · Lint-Free Commercial Grade", c1: "#f8fafc", c2: "#e0f2fe", acc: "#38bdf8", p: "stripe" },
  { name: "beach-towels.jpg", title: "Cabana Beach Towels", sub: "500 GSM · Yarn-Dyed Resort Stripes", c1: "#ffffff", c2: "#bae6fd", acc: "#0284c7", p: "stripe" },
  { name: "pool-towels.jpg", title: "Chlorine-Resistant Pool Towels", sub: "600 GSM · Vat-Dyed Resort Durability", c1: "#f0f9ff", c2: "#e0f2fe", acc: "#0284c7", p: "terry" },
  { name: "spa-towels.jpg", title: "Spa & Wellness Towels", sub: "550 GSM · Oil-Release Chemistry Finish", c1: "#ffffff", c2: "#f0f7fc", acc: "#38bdf8", p: "terry" },
  { name: "private-label.jpg", title: "Private Label Manufacturing", sub: "Custom OEM Weaving, GSM & Packaging", c1: "#ffffff", c2: "#e0f2fe", acc: "#0284c7", p: "dobby" },
  { name: "promotional-towels.jpg", title: "Promotional Corporate Towels", sub: "Custom Woven Headers & Logo Embroidery", c1: "#f8fafc", c2: "#f0f9ff", acc: "#0284c7", p: "stripe" },
];

import sharp from "sharp";

async function main() {
  for (const cfg of productConfigs) {
    const dest = path.join(productsDir, cfg.name);
    if (!fs.existsSync(dest)) {
      const svg = createTextileSvg(cfg.title, cfg.sub, cfg.c1, cfg.c2, cfg.acc, cfg.p);
      const jpegBuffer = await sharp(Buffer.from(svg))
        .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
        .toBuffer();
      fs.writeFileSync(dest, jpegBuffer);
    }
  }
  console.log("✓ Verified product images in public/images/products");

  // Generate Hero Image only if missing
  const heroTowelPath = path.join(heroDir, "hero-towel.jpg");
  if (!fs.existsSync(heroTowelPath)) {
    const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#f0f7fc" />
      <stop offset="100%" stop-color="#e0f0fa" />
    </linearGradient>
    <radialGradient id="sunbeam" cx="80%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.2" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1000" height="1200" fill="url(#heroBg)" />
  <rect width="1000" height="1200" fill="url(#sunbeam)" />

  <!-- Subtle grid lines -->
  <g stroke="#e0e9f1" stroke-width="0.8" opacity="0.7">
    <line x1="100" y1="0" x2="100" y2="1200" />
    <line x1="900" y1="0" x2="900" y2="1200" />
    <line x1="0" y1="200" x2="1000" y2="200" />
    <line x1="0" y1="1000" x2="1000" y2="1000" />
  </g>

  <!-- Big stacked luxury towels representation -->
  <g transform="translate(180, 240)">
    <!-- Towel 4 (base) -->
    <rect x="40" y="440" width="600" height="160" rx="20" fill="#e0f2fe" stroke="#bae6fd" stroke-width="1.5" />
    <!-- Towel 3 -->
    <rect x="25" y="300" width="630" height="160" rx="20" fill="#eff6ff" stroke="#bae6fd" stroke-width="1.5" />
    <!-- Towel 2 -->
    <rect x="15" y="160" width="650" height="160" rx="20" fill="#f8fafc" stroke="#e0e9f1" stroke-width="1.5" />
    <!-- Towel 1 (top) -->
    <rect x="0" y="20" width="680" height="160" rx="22" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5" />

    <!-- Dobby header stripe -->
    <rect x="0" y="80" width="680" height="32" fill="#0284c7" opacity="0.25" />
    <line x1="0" y1="79" x2="680" y2="79" stroke="#0284c7" stroke-width="1.8" />
    <line x1="0" y1="113" x2="680" y2="113" stroke="#0284c7" stroke-width="1.8" />

    <!-- Stitched label -->
    <g transform="translate(480, 35)">
      <rect width="150" height="60" rx="6" fill="#ffffff" stroke="#bae6fd" stroke-width="1.2" />
      <text x="75" y="28" font-family="serif" font-size="13" font-weight="600" fill="#0f2942" text-anchor="middle" letter-spacing="2">DEEPAM</text>
      <text x="75" y="46" font-family="sans-serif" font-size="8.5" font-weight="600" fill="#0284c7" text-anchor="middle" letter-spacing="2.5">SOLAPUR EXPORT</text>
    </g>
  </g>

  <!-- Ambient Luxury Badge -->
  <g transform="translate(140, 920)">
    <rect width="720" height="130" rx="8" fill="#ffffff" opacity="0.96" stroke="#e0e9f1" stroke-width="1.5" />
    <text x="50" y="55" font-family="Georgia, serif" font-size="28" font-weight="500" fill="#0f2942">100% Combed Cotton</text>
    <text x="50" y="92" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#0284c7" letter-spacing="3" text-transform="uppercase">OEKO-TEX® Standard 100 Certified Quality</text>
    <g transform="translate(620, 48)">
      <circle cx="20" cy="20" r="24" fill="#f0f7fc" />
      <path d="M12 20l6 6 12-12" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>
</svg>`;

    const heroJpeg = await sharp(Buffer.from(heroSvg))
      .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
      .toBuffer();
    fs.writeFileSync(heroTowelPath, heroJpeg);
    console.log("✓ Generated real binary hero image in public/images/hero/hero-towel.jpg");
  }

  // Create a placeholder image for any missing product / CMS image fallback
  const placeholderSvg = createTextileSvg(
    "Deepam Luxury Textiles",
    "Solapur, Maharashtra, India · Export Grade Quality",
    "#ffffff",
    "#f0f7fc",
    "#0284c7",
    "terry",
  );
  const placeholderJpeg = await sharp(Buffer.from(placeholderSvg))
    .jpeg({ quality: 90 })
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), "public/images/placeholder.jpg"), placeholderJpeg);
  console.log("✓ Generated fallback placeholder in public/images/placeholder.jpg");

  // Generate missing favicon and apple-touch-icon sizes from icon.png
  const iconSrc = path.join(process.cwd(), "public/icon.png");
  if (fs.existsSync(iconSrc)) {
    await sharp(iconSrc).resize(16, 16).png().toFile(path.join(process.cwd(), "public/favicon-16.png"));
    await sharp(iconSrc).resize(32, 32).png().toFile(path.join(process.cwd(), "public/favicon-32.png"));
    await sharp(iconSrc).resize(180, 180).png().toFile(path.join(process.cwd(), "public/apple-touch-icon.png"));
    console.log("✓ Generated favicon-16.png, favicon-32.png, apple-touch-icon.png");
  }

  // Ensure logo.png and logo-light.png exist in public/
  const logoTransparent = path.join(process.cwd(), "public/images/logo-transparent.png");
  const logoDarkMode = path.join(process.cwd(), "public/images/logo-dark-mode.png");
  if (fs.existsSync(logoTransparent)) {
    fs.copyFileSync(logoTransparent, path.join(process.cwd(), "public/logo.png"));
  }
  if (fs.existsSync(logoDarkMode)) {
    fs.copyFileSync(logoDarkMode, path.join(process.cwd(), "public/logo-light.png"));
  }
  console.log("✓ Ensured public/logo.png and public/logo-light.png exist");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
