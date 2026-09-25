-- ========================================================
-- DEEPAM TEXTILES - PRODUCTION MYSQL DATABASE SCHEMA & SEED
-- Character set: utf8mb4, Collation: utf8mb4_unicode_ci
-- Compatible with: MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+
-- ========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for: AdminUser
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `AdminUser` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminUser_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for: SiteContent
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SiteContent` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'site',
  `brandName` VARCHAR(255) NOT NULL DEFAULT 'Deepam Textiles',
  `tagline` TEXT NOT NULL,
  `heroTitle` TEXT NOT NULL,
  `heroSubtitle` TEXT NOT NULL,
  `experienceYears` INT NOT NULL DEFAULT 28,
  `monthlyCapacityTons` INT NOT NULL DEFAULT 550,
  `loomsCount` INT NOT NULL DEFAULT 200,
  `countriesServed` INT NOT NULL DEFAULT 35,
  `primaryEmail` VARCHAR(255) NOT NULL DEFAULT 'export@deepamtextile.com',
  `salesEmail` VARCHAR(255) NOT NULL DEFAULT 'sales@deepamtextile.com',
  `phone` VARCHAR(100) NOT NULL DEFAULT '+91 70661 48936',
  `whatsappNumber` VARCHAR(100) NOT NULL DEFAULT '+917066148936',
  `addressCity` VARCHAR(255) NOT NULL DEFAULT 'Solapur, Maharashtra',
  `addressCountry` VARCHAR(255) NOT NULL DEFAULT 'India',
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for: Product
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Product` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `gsmRange` VARCHAR(100) NOT NULL DEFAULT '450 - 700 GSM',
  `material` VARCHAR(255) NOT NULL DEFAULT '100% Combed Ring-Spun Cotton',
  `dimensions` VARCHAR(255) NOT NULL DEFAULT '70 x 140 cm / 27 x 54 in',
  `weaveType` VARCHAR(255) NOT NULL DEFAULT 'Terry / Dobby Border / Zero Twist',
  `minOrderQty` VARCHAR(100) NOT NULL DEFAULT '1,000 pcs per color/size',
  `description` TEXT NOT NULL,
  `features` TEXT NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_slug_key` (`slug`),
  KEY `Product_category_idx` (`category`),
  KEY `Product_sortOrder_idx` (`sortOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for: Inquiry
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inquiry` (
  `id` VARCHAR(191) NOT NULL,
  `refNumber` VARCHAR(191) NOT NULL,
  `fullName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  `companyName` VARCHAR(255) NOT NULL,
  `targetRegion` VARCHAR(100) NOT NULL,
  `destinationCountry` VARCHAR(100) NOT NULL,
  `productCategory` VARCHAR(100) NOT NULL,
  `estimatedQuantity` VARCHAR(100) NOT NULL,
  `gsmSpecification` VARCHAR(100) DEFAULT NULL,
  `isSampleRequested` TINYINT(1) NOT NULL DEFAULT 0,
  `privateLabelInterest` TINYINT(1) NOT NULL DEFAULT 0,
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'NEW',
  `notes` TEXT DEFAULT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Inquiry_refNumber_key` (`refNumber`),
  KEY `Inquiry_status_idx` (`status`),
  KEY `Inquiry_targetRegion_idx` (`targetRegion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Initial Seed data for: AdminUser
-- --------------------------------------------------------
INSERT INTO `AdminUser` (`id`, `email`, `passwordHash`, `createdAt`, `updatedAt`) VALUES ('cmuftx1ba0000rxowpqt7awjh', 'admin@deepamtextile.com', '$2a$10$s/NkyAPotGEYZMTq0.etxOW5Hd18mnTKobwUvnBq4ZpCh7OUDMqi6', 1790272323046, 1790272323046) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);

-- --------------------------------------------------------
-- Initial Seed data for: SiteContent
-- --------------------------------------------------------
INSERT INTO `SiteContent` (`id`, `brandName`, `tagline`, `heroTitle`, `heroSubtitle`, `experienceYears`, `monthlyCapacityTons`, `loomsCount`, `countriesServed`, `primaryEmail`, `salesEmail`, `phone`, `whatsappNumber`, `addressCity`, `addressCountry`, `updatedAt`) VALUES ('site', 'Deepam Textiles', 'Luxury in Every Thread — Crafted for Global Hospitality', 'Premium Towels & Home Textiles, Made for Your Brand', 'We manufacture premium bath towels, hotel linen and custom home textiles for hospitality, retail and private label buyers across South East Asia, the Middle East, and Europe.', 28, 550, 200, 35, 'export@deepamtextile.com', 'sales@deepamtextile.com', '+91 70661 48936', '+917066148936', 'Solapur, Maharashtra', 'India', 1790272323049) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);

-- --------------------------------------------------------
-- Initial Seed data for: Product
-- --------------------------------------------------------
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1be0001rxowv8p3bjkb', 'bath-towels', 'Bath Towels', 'bath-towels', '500 - 700 GSM', '100% Combed Ring-Spun Cotton', '70 x 140 cm / 80 x 160 cm', 'Plush Terry, Zero-Twist, Dobby Border', '1,000 pcs per color/size', 'Engineered for five-star hotels and luxury retail brands, our bath towels offer supreme absorbency, ultra-soft hand feel, and industrial wash resilience.', '["100% long-staple Indian combed cotton","Reinforced double-needle side hems to prevent fraying","Zero-twist yarn for cloud-like softness and rapid drying","OEKO-TEX® Standard 100 certified non-toxic dyes"]', '/images/products/bath-towels.jpg', 1, 1, 1790272323051, 1790272323051) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bf0002rxow444nex73', 'hand-towels', 'Hand Towels', 'hand-towels', '500 - 600 GSM', '100% Ring-Spun Combed Cotton', '50 x 90 cm / 50 x 100 cm', 'Terry with elegant ribbed or plain cam border', '1,500 pcs per color', 'Refined, durable hand towels crafted for executive washrooms, boutique guest rooms, and upscale department store collections.', '["High absorbency with fast-drying capillary action","Vat dyed for exceptional colorfastness against frequent laundering","Custom dobby border and logo embroidery available"]', '/images/products/hand-towels.jpg', 2, 1, 1790272323052, 1790272323052) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bg0003rxowtcq587p9', 'face-towels', 'Face Towels & Wash Cloths', 'face-towels', '450 - 550 GSM', '100% Natural Combed Cotton', '30 x 30 cm / 33 x 33 cm', 'Fine Terry with lock-stitched edges', '3,000 pcs', 'Ultra-gentle face cloths designed for luxury spa treatments and daily hospitality comfort.', '["Hypoallergenic and delicate on sensitive skin","Dense pile structure minimizes lint shedding","Withstands 100+ commercial wash cycles at 60°C"]', '/images/products/face-towels.jpg', 3, 1, 1790272323052, 1790272323052) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bg0004rxowte0flvvr', 'bath-mats', 'Bath Mats & Tub Mats', 'bath-mats', '800 - 1000 GSM', 'Heavyweight 100% Cotton', '50 x 80 cm / 60 x 90 cm', 'Heavy ribbed terry with Greek key or solid border', '1,000 pcs', 'Substantial, non-slip hotel tub mats with high pile density that instantly absorb excess water and step into sheer luxury.', '["Ultra-heavyweight 900 GSM construction for firm floor adherence","Quick drying without rubberized backing for commercial laundry ease","Embossed border and custom hotel jacquard crest available"]', '/images/products/bath-mats.jpg', 4, 1, 1790272323053, 1790272323053) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bh0005rxowsiyx5upx', 'hotel-linen', 'Hotel Linen Programs', 'hotel-linen', '300 - 600 Thread Count', '100% Combed Cotton Percale & Sateen', 'Single, Double, Queen, King, Super King', 'Silky Sateen Stripe (1cm/2cm) & Crisp Percale', '500 sets / 2,000 meters', 'Comprehensive bedroom and bathroom linen turnkey programs for multinational hotel chains, serviced apartments, and cruise lines.', '["Breathable high-thread-count Egyptian-grade yarns","Color-coded size identification hem threads for fast housekeeping","Sanforized anti-shrinkage pre-treatment"]', '/images/products/hotel-linen.jpg', 5, 1, 1790272323054, 1790272323054) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bi0006rxowt1hfb58n', 'bath-robes', 'Luxury Bath Robes', 'bath-robes', '380 - 450 GSM', '100% Cotton Terry / Waffle / Velour', 'S, M, L, XL, XXL (Unisex Kimono & Shawl Collar)', 'Plush Shawl Collar or Lightweight Honeycomb Waffle', '500 pcs', 'Opulent bathrobes tailored with generous patch pockets, double belt loops, and luxurious drape for resorts and spas.', '["Dual-texture: soft sheared velour outer with absorbent terry inside","Generous wrap-around cut with sturdy hanger loop","Bespoke embroidery on chest and back"]', '/images/products/bath-robes.jpg', 6, 1, 1790272323054, 1790272323054) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bj0007rxowsua0dm7p', 'kitchen-towels', 'Kitchen & Dining Towels', 'kitchen-towels', '250 - 350 GSM', '100% Combed Cotton or Cotton-Linen Blend', '45 x 70 cm / 50 x 70 cm', 'Herringbone, Jacquard, and Glass Cloth Weave', '2,000 pcs', 'Lint-free, streak-free drying towels for professional culinary environments, luxury restaurants, and homeware brands.', '["Zero-lint finish ideal for wine glass and crystal polishing","Reinforced hanging loop with woven brand label","High grease and water absorption capacity"]', '/images/products/kitchen-towels.jpg', 7, 1, 1790272323055, 1790272323055) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bj0008rxow9t5edykx', 'beach-towels', 'Cabana & Beach Towels', 'beach-towels', '450 - 600 GSM', '100% Cotton Velour / Terry', '90 x 180 cm / 100 x 200 cm', 'Yarn-dyed Cabana Stripe & Jacquard Woven', '1,000 pcs', 'Oversized resort towels engineered to resist direct sunlight, saltwater, and frequent beach club rotation.', '["Vat-dyed fibers maintain vibrant coloration under intense UV","Velour front for sand resistance, loop terry back for drying","Classic European cabana stripe & custom resort jacquard weaving"]', '/images/products/beach-towels.jpg', 8, 1, 1790272323056, 1790272323056) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bk0009rxowe276x3an', 'pool-towels', 'Pool & Lounger Towels', 'pool-towels', '500 - 650 GSM', '100% Chlorine-Resistant Cotton', '85 x 165 cm / 90 x 180 cm', 'Double Loop Terry with woven center identifier stripe', '1,000 pcs', 'Heavy-duty pool towels treated for chlorine resistance, making them ideal for high-traffic hotel pool decks and waterparks.', '["Indanthrene / Vat dyed to resist chemical fading from chlorine","Heavy double-looped pile cushions against teak loungers","Quick-dry yarn structure prevents musty damp odors"]', '/images/products/pool-towels.jpg', 9, 1, 1790272323057, 1790272323057) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bl000arxow5j3i7jgh', 'spa-towels', 'Spa & Wellness Towels', 'spa-towels', '550 - 650 GSM', '100% Super-Fine Micro-Cotton', '70 x 140 cm / 100 x 150 cm', 'Velvet touch terry with oil-release finish', '1,000 pcs', 'Calming earth-toned wellness towels infused with stain-resistant release chemistry to withstand massage oils and mud wraps.', '["Special oil-release chemical treatment aids oil removal during wash","Sophisticated natural palette: Sage, Oat, Taupe, Slate, Pearl","Luxuriously deep pile for indulgent treatment bed draping"]', '/images/products/spa-towels.jpg', 10, 1, 1790272323057, 1790272323057) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bl000brxow005ujvy6', 'private-labeling', 'Private Label Manufacturing', 'private-labeling', 'Custom (350 - 900 GSM)', 'Organic GOTS, BCI, Egyptian or Indian Cotton', 'Custom Specifications as per Buyer Tech Pack', 'Bespoke Dobby, Jacquard, Terry, Waffle, Velour', '2,000 pcs per specification', 'End-to-end private labeling services: custom GSM, Pantone yarn dyeing, woven damask labels, custom barcode tags, and sustainable export packaging.', '["Full brand customization: woven jacquard borders & crests","Retail ready packaging: FSC certified cartons, hangtags, polybags","Comprehensive lab testing reports provided with every shipment"]', '/images/products/private-label.jpg', 11, 1, 1790272323058, 1790272323058) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Product` (`id`, `slug`, `title`, `category`, `gsmRange`, `material`, `dimensions`, `weaveType`, `minOrderQty`, `description`, `features`, `image`, `sortOrder`, `published`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bm000crxow33t1yavs', 'promotional-towels', 'Promotional & Corporate Towels', 'promotional-towels', '380 - 500 GSM', '100% Cotton', '40 x 80 cm / 70 x 140 cm', 'Border Jacquard or Precision Embroidery', '1,500 pcs', 'High-impact branded textiles for corporate gifting, golf tournaments, brand activations, and promotional merchandise campaigns.', '["High-definition border weaving reproduces complex company logos","Fast turnaround times for scheduled brand marketing events","Competitive bulk price points with uncompromising terry quality"]', '/images/products/promotional-towels.jpg', 12, 1, 1790272323058, 1790272323058) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);

-- --------------------------------------------------------
-- Initial Seed data for: Inquiry
-- --------------------------------------------------------
INSERT INTO `Inquiry` (`id`, `refNumber`, `fullName`, `email`, `phone`, `companyName`, `targetRegion`, `destinationCountry`, `productCategory`, `estimatedQuantity`, `gsmSpecification`, `isSampleRequested`, `privateLabelInterest`, `message`, `status`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bm000drxow6qvoy6vq', 'DT-RFQ-SEA-2026-001', 'Tan Wei Ming', 'weiming.tan@singaporeresorts.com.sg', '+65 6789 1234', 'Sentosa Heritage Luxury Resorts', 'South East Asia', 'Singapore', 'Pool & Lounger Towels', '15,000 pcs', '600 GSM Vat-Dyed Cabana Stripe', 1, 1, 'Seeking supply for our flagship 5-star island resort. Need chlorine-resistant pool towels and quick-dry cabana towels with custom woven logo.', 'QUOTED', 'Quotation sent via CIF Singapore. Awaiting sample approval.', 1790272323059, 1790272323059) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Inquiry` (`id`, `refNumber`, `fullName`, `email`, `phone`, `companyName`, `targetRegion`, `destinationCountry`, `productCategory`, `estimatedQuantity`, `gsmSpecification`, `isSampleRequested`, `privateLabelInterest`, `message`, `status`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bn000erxowwyw9j13z', 'DT-RFQ-ME-2026-002', 'Rashid Al-Maktoum', 'procurement@alfuttaim-hospitality.ae', '+971 4 388 9000', 'Al-Futtaim Hospitality Group', 'Middle East', 'United Arab Emirates (Dubai)', 'Bath Towels & Hotel Linen', '30,000 pcs (2 x 40ft HQ Containers)', '700 GSM Combed Zero-Twist + 400 TC Bedding', 1, 1, 'We are opening a new luxury property in Downtown Dubai. Need high-end bath towels (700 GSM) and matching bath sheets with gold dobby borders.', 'CONTACTED', 'Spoke with procurement team over WhatsApp. Arranging courier of physical samples to Dubai office.', 1790272323060, 1790272323060) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);
INSERT INTO `Inquiry` (`id`, `refNumber`, `fullName`, `email`, `phone`, `companyName`, `targetRegion`, `destinationCountry`, `productCategory`, `estimatedQuantity`, `gsmSpecification`, `isSampleRequested`, `privateLabelInterest`, `message`, `status`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmuftx1bo000frxowgf75x9wc', 'DT-RFQ-EUR-2026-003', 'Sophie Laurent', 's.laurent@nordic-textil.de', '+49 30 8923 4410', 'Nordic Organic Living GmbH', 'Europe', 'Germany (Hamburg)', 'Bath Robes & Spa Towels', '8,000 pcs', '450 GSM Organic Cotton OEKO-TEX Standard 100', 1, 1, 'We require OEKO-TEX Standard 100 and GOTS compliant bathrobes and wellness spa towels in natural earth tones (Sage, Taupe, Oat). Please send certification dossiers.', 'NEW', 'Lead received from website RFQ. High-potential European retail buyer.', 1790272323060, 1790272323060) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);

SET FOREIGN_KEY_CHECKS = 1;
-- ========================================================
-- END OF SCRIPT
-- ========================================================