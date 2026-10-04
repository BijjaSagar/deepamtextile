-- MySQL dump 10.13  Distrib 9.6.0, for macos26.4 (arm64)
--
-- Host: localhost    Database: u618910819_deepamtextile
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminUser_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('cmum8os960012rxfateec7e6h','admin@deepamtextile.com','$2a$12$WfYRD/LdYIiJ9GV8TX5hOutqDpRvfSOtq3Wmczfgijxe6B0YQl/x6','Deepam Admin','admin',1,'2026-09-29 05:32:09.355','2026-09-29 05:32:09.355');
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Certification`
--

DROP TABLE IF EXISTS `Certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Certification` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdfUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Certification`
--

LOCK TABLES `Certification` WRITE;
/*!40000 ALTER TABLE `Certification` DISABLE KEYS */;
INSERT INTO `Certification` VALUES ('cmum8orzh000wrxfadp0bca50','ISO 9001:2015','QMS-DT-ISO9001-2015-IN-2847','Quality management systems certification for consistent production standards.','/certificates/iso-9001-2015.pdf',0,1),('cmum8orzn000xrxfadblj5p8b','OEKO-TEX Standard 100','22.HIN.38492','Tested for harmful substances—safe for direct skin contact.','/certificates/oeko-tex-standard-100.pdf',1,1),('cmum8orzp000yrxfa2izmnsjm','BCI','BCI-MEM-2024-DT-1183','Better Cotton Initiative membership supporting sustainable cotton sourcing.','/certificates/bci-membership.pdf',2,1),('cmum8orzr000zrxfacg3gf4a8','GOTS','GOTS-IN-ORG-009284','Global Organic Textile Standard for certified organic cotton programs.','/certificates/gots-certificate.pdf',3,1),('cmum8orzt0010rxfayvx2uz0q','BSCI','BSCI-AUD-2024-DT-4421','Business Social Compliance Initiative for ethical manufacturing practices.','/certificates/bsci-audit-summary.pdf',4,1),('cmum8orzv0011rxfa7yp8p31g','SEDEX / SMETA','SEDEX-ZS-8847291','Supplier Ethical Data Exchange membership with SMETA audit readiness.','/certificates/sedex-membership.pdf',5,1);
/*!40000 ALTER TABLE `Certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inquiry`
--

DROP TABLE IF EXISTS `Inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inquiry` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productInterest` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `buyerType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimatedVolume` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `targetMarket` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
  `emailSent` tinyint(1) NOT NULL DEFAULT '0',
  `emailError` text COLLATE utf8mb4_unicode_ci,
  `readAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Inquiry_createdAt_idx` (`createdAt`),
  KEY `Inquiry_readAt_idx` (`readAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inquiry`
--

LOCK TABLES `Inquiry` WRITE;
/*!40000 ALTER TABLE `Inquiry` DISABLE KEYS */;
/*!40000 ALTER TABLE `Inquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NavigationItem`
--

DROP TABLE IF EXISTS `NavigationItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NavigationItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `href` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'link',
  `sortOrder` int NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `NavigationItem_location_sortOrder_idx` (`location`,`sortOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NavigationItem`
--

LOCK TABLES `NavigationItem` WRITE;
/*!40000 ALTER TABLE `NavigationItem` DISABLE KEYS */;
INSERT INTO `NavigationItem` VALUES ('cmum8oqw20000rxfayjk0qjya','About','/about','link',1,1,'header'),('cmum8oqwy0001rxfa7g72d4pn','Manufacturing','/manufacturing','link',2,1,'header'),('cmum8oqx00002rxfa7p8odd73','Certifications','/certifications','link',3,1,'header'),('cmum8oqx80003rxfamhr6aeqy','Private Label','/private-label','link',4,1,'header'),('cmum8oqy80004rxfal87ybknn','FAQ','/faq','link',5,1,'header'),('cmum8oqyb0005rxfab8teaw7j','Contact','/contact','link',6,1,'header'),('cmum8oqzn0006rxfasdlpyhbr','About Us','/about','link',1,1,'footer_company'),('cmum8or0s0007rxfakme2zc3n','Manufacturing','/manufacturing','link',2,1,'footer_company'),('cmum8or1t0008rxfadicxghu7','Certifications','/certifications','link',3,1,'footer_company'),('cmum8or3d0009rxfas5pcpldb','Private Label','/private-label','link',4,1,'footer_company'),('cmum8or4i000arxfab0i647xx','FAQ','/faq','link',5,1,'footer_company'),('cmum8or5r000brxfayb876v0a','Contact','/contact','link',6,1,'footer_company'),('cmum8or88000crxfae566w0x9','All Products','/products','link',1,1,'footer_export'),('cmum8or9f000drxfa0x8wbqh7','Request Quote','/contact#inquiry','link',2,1,'footer_export');
/*!40000 ALTER TABLE `NavigationItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PageContent`
--

DROP TABLE IF EXISTS `PageContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PageContent` (
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metaDescription` text COLLATE utf8mb4_unicode_ci,
  `sections` json NOT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PageContent`
--

LOCK TABLES `PageContent` WRITE;
/*!40000 ALTER TABLE `PageContent` DISABLE KEYS */;
INSERT INTO `PageContent` VALUES ('about','About Us','Learn about Deepam Textile—four decades of premium textile manufacturing in Solapur, India, exporting to USA, Canada, Europe, and the Middle East.','{\"hero\": {\"title\": \"Where heritage meets export excellence\", \"eyebrow\": \"Our Story\", \"imageUrl\": \"/images/factory/mill-facility.jpg\"}, \"intro\": {\"body\": \"Founded in 1982 in Solapur, Maharashtra—the renowned towel weaving capital of India—Deepam Textile has grown from a master weaver into an integrated export enterprise. Delivering 550+ MT monthly capacity, 200+ looms, and export-grade reliability across North America, Europe, the Middle East, and beyond.\", \"title\": \"Four decades of textile excellence\", \"imageUrl\": \"/images/factory/airjet-looms.jpg\"}}','2026-09-29 05:32:09.026'),('certifications','Certifications','ISO 9001:2015, OEKO-TEX Standard 100, BCI, GOTS, BSCI, and SEDEX/SMETA compliance for export textile manufacturing from India.','{}','2026-09-29 05:32:09.033'),('contact','Contact','Contact Deepam Textile export team for B2B textile inquiries and RFQs. Global buyers welcome. Response within one business day.','{\"hero\": {\"title\": \"Speak with our export team\", \"eyebrow\": \"Get In Touch\", \"imageUrl\": \"/images/factory/mill-facility.jpg\", \"description\": \"Share your product requirements, volume estimates, and timeline. Our dedicated export desk responds to all B2B inquiries within one business day.\"}, \"catalog\": {\"pdfUrl\": \"\", \"pdfLabel\": \"Download Product Catalog\"}}','2026-09-29 05:32:09.037'),('faq','FAQ','Frequently asked questions about MOQs, samples, lead times, shipping, payment terms, customization, and certifications for Deepam Textile export buyers.','{\"hero\": {\"title\": \"Export buyer questions, answered\", \"eyebrow\": \"FAQ\", \"imageUrl\": \"/images/hero/hero-towels.jpg\", \"description\": \"MOQs, sampling, lead times, shipping (FOB Nhava Sheva / CIF destination ports), payment terms, customization, and certifications—everything procurement teams ask before their first order.\"}, \"faqItems\": [{\"answer\": \"MOQs vary by product category—from 250 units for promotional towels to 500–1,000 units per size/colour for bath and hand towels. Full hotel linen programs typically start at 5,000+ units. Contact us for program-specific MOQs.\", \"question\": \"What are your minimum order quantities (MOQs)?\"}, {\"answer\": \"Yes. Physical samples and lab dips are available within 2–3 weeks. Sample costs may apply and are often credited against your first production order.\", \"question\": \"Can I request samples before placing a bulk order?\"}, {\"answer\": \"Lead times range from 35–90 days FOB depending on product category, customization, and order volume. Promotional towels can ship in 30–45 days; full private label programs may require 60–90 days including sampling.\", \"question\": \"What are typical lead times?\"}, {\"answer\": \"Both. Default export port is Nhava Sheva (JNPT), Maharashtra. We offer FOB JNPT or CIF to major North American ports with complete commercial documentation.\", \"question\": \"Do you ship FOB or CIF to the USA and Canada?\"}, {\"answer\": \"Standard terms are 30% deposit upon order confirmation and 70% against bill of lading copy. Established buyers may qualify for adjusted terms after credit review.\", \"question\": \"What payment terms do you offer?\"}, {\"answer\": \"Yes. We offer custom sizes (inch and cm), GSM ranges, Pantone colour matching, dobby borders, embroidery, woven labels, and retail-ready packaging.\", \"question\": \"Can you customize sizes, GSM, colours, and branding?\"}, {\"answer\": \"We maintain ISO 9001:2015, OEKO-TEX Standard 100, BCI membership, GOTS (organic programs), BSCI, and SEDEX/SMETA readiness. Certificate copies are available on request.\", \"question\": \"Which certifications do you hold?\"}]}','2026-09-29 05:32:09.057'),('home','Deepam Textile','Premier Indian manufacturer and global exporter of luxury terry towels, hotel bath linen, and private label collections from Solapur, Maharashtra.','{\"hero\": {\"title\": \"Luxury in Every Thread.\", \"slides\": [{\"caption\": \"Signature Combed Cotton Bath Towels\", \"imageUrl\": \"/images/hero/hero-towels.jpg\"}, {\"caption\": \"Luxury Hotel & Spa Linen Collections\", \"imageUrl\": \"/images/products/hotel-linen.jpg\"}, {\"caption\": \"Bespoke Private-Label Manufacturing\", \"imageUrl\": \"/images/products/private-label.jpg\"}], \"eyebrow\": \"Deepam Textile · Solapur, Maharashtra, India\", \"subtitle\": \"Premier Indian manufacturer and global exporter of luxury terry towels, hotel linen, and private label programs — crafting excellence in Solapur since 1982.\"}, \"heritage\": {\"title\": \"Crafted in Solapur, India Since 1982\", \"eyebrow\": \"Our Heritage\", \"imageUrl\": \"/images/factory/mill-facility.jpg\", \"description\": \"For over four decades, Deepam Textile has been at the forefront of India\'s celebrated terry towel manufacturing region—combining institutional-grade durability with ultra-luxurious finishing for global hospitality, department store, and private label buyers.\"}, \"manufacturing\": {\"imageUrl\": \"/images/factory/airjet-looms.jpg\"}}','2026-09-29 05:32:09.022'),('manufacturing','Manufacturing','Vertical textile manufacturing from yarn selection to export packaging. ISO-certified facility in Solapur, India serving international buyers.','{\"hero\": {\"title\": \"From yarn to export-ready carton\", \"eyebrow\": \"Our Facility\", \"imageUrl\": \"/images/factory/airjet-looms.jpg\", \"description\": \"Vertically integrated manufacturing facility in Solapur, Maharashtra—with in-house warping, high-speed airjet weaving, continuous bleaching & dyeing, automated cut-and-sew, and rigorous quality laboratories.\"}, \"facility\": {\"imageUrl\": \"/images/factory/mill-facility.jpg\"}}','2026-09-29 05:32:09.030'),('private-label','Private Label','Launch or scale your towel and linen brand with full private label manufacturing—from custom weaving to retail-ready packaging. Export worldwide.','{\"hero\": {\"title\": \"Your brand. Our manufacturing excellence.\", \"eyebrow\": \"Private Label · High Priority\", \"imageUrl\": \"/images/products/private-label.jpg\", \"description\": \"Partner with Deepam Textile to launch, scale, or refresh your towel and linen collections. End-to-end private label execution—from initial yarn selection and dobby border design to barcode packaging and international container shipments.\"}, \"specs\": {\"title\": \"Private label specifications\", \"pdfUrl\": \"\", \"pdfLabel\": \"Download specification sheet (PDF)\", \"description\": \"Download our private label capability sheet with GSM ranges, customization options, MOQs, lead times, and packaging formats for global export buyers.\"}, \"packaging\": {\"imageUrl\": \"/images/products/hotel-linen.jpg\"}}','2026-09-29 05:32:09.035'),('products','Products','Explore our full range of premium B2B textile products—bath towels, hotel linen, spa towels, private label, and more for global export.','{\"hero\": {\"title\": \"Premium textiles for every channel\", \"eyebrow\": \"Export Catalogue\", \"imageUrl\": \"/images/hero/hero-towels.jpg\", \"description\": \"Twelve product collections engineered for luxury hospitality, retail brands, healthcare, spa, and promotional buyers. Each product profile includes GSM ranges, dimensions, yarn specs, and customization options.\"}}','2026-09-29 05:32:09.063');
/*!40000 ALTER TABLE `PageContent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductCategory`
--

DROP TABLE IF EXISTS `ProductCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `eyebrow` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heroImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `galleryImages` json NOT NULL,
  `features` json NOT NULL,
  `variants` json NOT NULL,
  `materials` json NOT NULL,
  `sizes` json NOT NULL,
  `gsmRange` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customization` json NOT NULL,
  `packaging` json NOT NULL,
  `idealFor` json NOT NULL,
  `leadTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moq` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metaDescription` text COLLATE utf8mb4_unicode_ci,
  `sortOrder` int NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductCategory_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategory`
--

LOCK TABLES `ProductCategory` WRITE;
/*!40000 ALTER TABLE `ProductCategory` DISABLE KEYS */;
INSERT INTO `ProductCategory` VALUES ('cmum8oras000erxfaydbzn9la','bath-towels','Bath Towels','Plush, absorbent bath towels engineered for luxury hospitality and premium retail.','Our signature bath towels combine long-staple cotton with precision terry construction for exceptional loft, absorbency, and durability through commercial laundering cycles. Designed for five-star hotels, boutique resorts, and discerning retail brands across North America.','Signature Collection','/images/products/bath-towels.jpg','/images/products/bath-towels.jpg','[]','[\"Double-loop terry for superior absorbency\", \"Pre-shrunk and colour-fast through 200+ wash cycles\", \"Reinforced hems with double-needle stitching\", \"Low-lint finish for commercial laundry compatibility\"]','[]','[\"100% long-staple combed cotton\", \"Premium cotton-poly blends (70/30, 80/20)\", \"Organic cotton (GOTS certified upon request)\", \"Zero-twist construction for ultra-plush hand-feel\"]','[{\"cm\": \"70 × 140 cm\", \"label\": \"Standard Bath\", \"inches\": \"27.5\\\" × 55\\\"\"}, {\"cm\": \"80 × 160 cm\", \"label\": \"Oversized Bath\", \"inches\": \"31.5\\\" × 63\\\"\"}, {\"cm\": \"90 × 180 cm\", \"label\": \"Bath Sheet\", \"inches\": \"35.5\\\" × 71\\\"\"}]','500–700 GSM','[\"Dobby borders and satin stripes\", \"Embroidery up to 15,000 stitches\", \"Custom dye matching (Pantone)\", \"Woven labels and hang tags\"]','[\"Individual polybag with branded insert\", \"Bulk cartons (12–24 units)\", \"Retail-ready gift sets\", \"Custom branded packaging upon MOQ\"]','[\"Luxury hotels\", \"Resort chains\", \"Premium home retailers\"]','45–60 days FOB','500 units per size/colour',NULL,NULL,0,1,'2026-09-29 05:32:08.117'),('cmum8orcz000frxfax7a2pyd9','hand-towels','Hand Towels','Refined hand towels with consistent weight and finish for guest bathrooms and retail sets.','Hand towels that balance softness with quick-drying performance. Each piece is calibrated for uniform GSM across production runs—critical for hospitality procurement and private label consistency.','Essentials','/images/products/hand-towels.jpg','/images/products/hand-towels.jpg','[]','[\"Uniform GSM tolerance ±5%\", \"Quick-dry loop construction\", \"Reinforced header tape\", \"Colour-matched to bath towel collections\"]','[]','[\"100% combed cotton terry\", \"Bamboo-cotton blend (50/50)\", \"Recycled cotton blend options\"]','[{\"cm\": \"40 × 70 cm\", \"label\": \"Standard Hand\", \"inches\": \"16\\\" × 28\\\"\"}, {\"cm\": \"50 × 90 cm\", \"label\": \"Guest Hand\", \"inches\": \"20\\\" × 35\\\"\"}]','400–550 GSM','[\"Contrast border or self-border dobby\", \"Logo embroidery (chest or corner)\", \"Custom sizes for ADA-compliant dispensers\"]','[\"Sleeve-wrapped pairs\", \"Bulk packs of 24\", \"Matched set packaging with bath towels\"]','[\"Hotels\", \"Spas\", \"Bathroom accessory brands\"]','40–55 days FOB','1,000 units per colour',NULL,NULL,1,1,'2026-09-29 05:32:08.195'),('cmum8ore9000grxfahjqxvuke','face-towels','Face Towels & Washcloths','Soft, gentle face towels and washcloths for spa, hospitality, and skincare retail.','Face towels crafted with a tighter loop for a smoother surface against skin. Ideal for facial care routines, spa treatments, and premium guest amenities where tactile quality defines the brand experience.','Guest Comfort','/images/products/face-towels.jpg','/images/products/face-towels.jpg','[]','[\"Gentle loop for sensitive skin\", \"Bleach-safe white and custom colours\", \"Consistent sizing for amenity kits\", \"Low-pilling finish\"]','[]','[\"100% cotton velour face\", \"Organic cotton terry\", \"Micro-cotton for ultra-softness\"]','[{\"cm\": \"30 × 30 cm\", \"label\": \"Washcloth\", \"inches\": \"12\\\" × 12\\\"\"}, {\"cm\": \"33 × 33 cm\", \"label\": \"Face Towel\", \"inches\": \"13\\\" × 13\\\"\"}, {\"cm\": \"40 × 40 cm\", \"label\": \"Guest Face\", \"inches\": \"16\\\" × 16\\\"\"}]','350–450 GSM','[\"Spa logo embroidery\", \"Custom weave patterns\", \"Scented packaging partnerships\"]','[\"Individual wrap for amenity trays\", \"Sets of 6 or 12 in display boxes\", \"Bulk cartons for institutional buyers\"]','[\"Spas\", \"Skincare brands\", \"Boutique hotels\"]','35–50 days FOB','2,000 units',NULL,NULL,2,1,'2026-09-29 05:32:08.242'),('cmum8orez000hrxfa7n3bluld','bath-mats','Bath Mats','Non-slip, highly absorbent bath mats built for daily commercial use.','Bath mats with dense pile construction and reinforced backing options. Engineered to withstand heavy foot traffic in hotel bathrooms while maintaining shape and absorbency over thousands of wash cycles.','Floor Collection','/images/products/bath-mats.jpg','/images/products/bath-mats.jpg','[]','[\"High-density pile for water retention\", \"Anti-skid latex or TPR backing options\", \"Quick-dry core construction\", \"Reinforced binding on all edges\"]','[]','[\"100% cotton tufted pile\", \"Cotton with latex backing\", \"Microfiber top with cotton base\"]','[{\"cm\": \"50 × 80 cm\", \"label\": \"Standard Mat\", \"inches\": \"20\\\" × 32\\\"\"}, {\"cm\": \"60 × 90 cm\", \"label\": \"Large Mat\", \"inches\": \"24\\\" × 36\\\"\"}, {\"cm\": \"50 × 70 cm\", \"label\": \"Contour Mat\", \"inches\": \"20\\\" × 28\\\"\"}]','600–800 GSM','[\"Logo tufting or embroidery\", \"Custom shapes and sizes\", \"Colour-coordinated to towel collections\"]','[\"Rolled and banded\", \"Flat-fold retail packaging\", \"Bulk cartons (10–20 units)\"]','[\"Hotels\", \"Senior living\", \"Home goods retailers\"]','45–60 days FOB','500 units',NULL,NULL,3,1,'2026-09-29 05:32:08.268'),('cmum8ori0000irxfalz9roj6v','hotel-linen','Hotel Linen Programs','Complete linen programs with matched weights, colours, and replenishment planning.','End-to-end hotel linen sourcing: bath towels, hand towels, face cloths, bath mats, and pool towels in coordinated palettes. We support par-level planning, seasonal refreshes, and brand-standard compliance for multi-property groups.','Hospitality','/images/products/hotel-linen.jpg','/images/products/hotel-linen.jpg','[]','[\"Matched GSM across entire program\", \"Par-level and replenishment support\", \"Brand-standard colour libraries\", \"Commercial laundry tested\"]','[]','[\"Institutional-grade combed cotton\", \"Blended options for cost optimization\", \"Premium white and custom colour programs\"]','[{\"cm\": \"Custom per property\", \"label\": \"Full Program\", \"inches\": \"Custom per property\"}, {\"cm\": \"70 × 140 cm bath + accessories\", \"label\": \"Standard Bath Set\", \"inches\": \"27.5\\\" × 55\\\" bath + accessories\"}]','400–650 GSM (program-dependent)','[\"Property-specific embroidery\", \"Custom dobby borders per brand tier\", \"Seasonal colour rotations\", \"Dedicated account management\"]','[\"Property-coded bulk cartons\", \"Amenity kit assembly\", \"Direct-to-warehouse shipping (FOB/CIF)\"]','[\"Hotel groups\", \"Management companies\", \"Franchise operators\"]','60–90 days for full program rollout','Program-based (typically 5,000+ units)',NULL,NULL,4,1,'2026-09-29 05:32:08.377'),('cmum8oriq000jrxfap0sta15t','bath-robes','Bath Robes','Kimono, shawl, and hooded robes in terry and waffle weaves for hospitality and retail.','Luxury bath robes with tailored fit, reinforced seams, and premium finishing. Available in terry, waffle, and microfiber constructions for spa, suite, and retail channels across North America.','Spa & Suite','/images/products/bath-robes.jpg','/images/products/bath-robes.jpg','[]','[\"Double-stitched seams and reinforced shoulders\", \"Generous sizing with belt loops\", \"Patch or shawl collar options\", \"Colour-fast through commercial care\"]','[]','[\"100% cotton terry (400 GSM)\", \"Cotton waffle weave\", \"Microfiber with cotton lining\", \"Organic cotton terry\"]','[{\"cm\": \"Chest 110–120 cm\", \"label\": \"S/M\", \"inches\": \"43\\\"–47\\\" chest\"}, {\"cm\": \"Chest 125–140 cm\", \"label\": \"L/XL\", \"inches\": \"49\\\"–55\\\" chest\"}, {\"cm\": \"Chest 145–160 cm\", \"label\": \"XXL\", \"inches\": \"57\\\"–63\\\" chest\"}]','350–450 GSM (terry); waffle by weave','[\"Embroidered monograms and logos\", \"Custom collar and pocket styles\", \"Branded hang tags and gift boxes\"]','[\"Individual polybag with hanger\", \"Gift box sets for retail\", \"Bulk cartons (12–24 units)\"]','[\"Resorts\", \"Spa brands\", \"Luxury retail\"]','55–75 days FOB','300 units per style/size',NULL,NULL,5,1,'2026-09-29 05:32:08.403'),('cmum8ork0000krxfawlvnbe42','kitchen-towels','Kitchen Towels','Absorbent, lint-free kitchen towels for hospitality kitchens and gourmet retail.','Flat-weave and terry kitchen towels designed for professional kitchens and premium home goods. Striped, checked, and solid patterns with excellent absorbency and minimal lint transfer.','Culinary','/images/products/kitchen-towels.jpg','/images/products/kitchen-towels.jpg','[]','[\"Lint-free flat weave options\", \"High absorbency terry variants\", \"Colour-fast through bleach cycles\", \"Hanging loops on select styles\"]','[]','[\"100% cotton herringbone\", \"Terry velour kitchen towels\", \"Linen-cotton blends\"]','[{\"cm\": \"45 × 70 cm\", \"label\": \"Standard\", \"inches\": \"18\\\" × 28\\\"\"}, {\"cm\": \"50 × 80 cm\", \"label\": \"Oversized\", \"inches\": \"20\\\" × 32\\\"\"}]','300–400 GSM','[\"Custom stripe and check patterns\", \"Logo jacquard weaving\", \"Private label packaging\"]','[\"Sets of 3 or 6 with belly band\", \"Bulk cartons (48–96 units)\", \"Retail-ready display boxes\"]','[\"Restaurant groups\", \"Culinary retail\", \"Corporate gifting\"]','40–55 days FOB','1,000 units per pattern',NULL,NULL,6,1,'2026-09-29 05:32:08.449'),('cmum8orlh000lrxfay9hl4t30','beach-towels','Beach Towels','Vibrant, quick-dry beach towels for resort retail and hospitality pool programs.','Large-format beach towels with reactive dye prints, velour finishes, and sand-resistant construction. Built for resort boutiques, pool cabanas, and seasonal retail across coastal markets.','Resort','/images/products/beach-towels.jpg','/images/products/beach-towels.jpg','[]','[\"Reactive dye for colour longevity\", \"Sand shakes off easily\", \"Oversized coverage\", \"Quick-dry fiber technology\"]','[]','[\"100% cotton velour\", \"Cotton-poly blend for weight reduction\", \"Recycled cotton options\"]','[{\"cm\": \"75 × 150 cm\", \"label\": \"Standard Beach\", \"inches\": \"30\\\" × 60\\\"\"}, {\"cm\": \"90 × 180 cm\", \"label\": \"Oversized Beach\", \"inches\": \"35\\\" × 71\\\"\"}, {\"cm\": \"150 cm diameter\", \"label\": \"Round Beach\", \"inches\": \"59\\\" diameter\"}]','400–500 GSM','[\"All-over print (screen or digital)\", \"Resort logo placement\", \"Custom colourways per season\"]','[\"Rolled with branded band\", \"Individual polybags\", \"Display-ready hook packaging\"]','[\"Beach resorts\", \"Pool retail\", \"Tourism merchandise\"]','50–65 days FOB','500 units per design',NULL,NULL,7,1,'2026-09-29 05:32:08.501'),('cmum8orm7000mrxfaczlbxmw0','pool-towels','Pool Towels','Durable, chlorine-resistant pool towels for hotels, clubs, and aquatic centres.','Pool towels engineered for chlorine exposure, sun fading, and high-volume laundering. Lighter weight than bath towels with faster dry times—ideal for pool decks and fitness facilities.','Aquatic','/images/products/pool-towels.jpg','/images/products/pool-towels.jpg','[]','[\"Chlorine-resistant dye systems\", \"Lightweight quick-dry construction\", \"High-volume laundry durability\", \"Vivid colour retention\"]','[]','[\"100% ring-spun cotton\", \"Cotton-poly blends (60/40)\", \"Solution-dyed acrylic options\"]','[{\"cm\": \"70 × 140 cm\", \"label\": \"Standard Pool\", \"inches\": \"27.5\\\" × 55\\\"\"}, {\"cm\": \"60 × 120 cm\", \"label\": \"Compact Pool\", \"inches\": \"24\\\" × 47\\\"\"}]','350–450 GSM','[\"Property logo dobby or print\", \"Colour-coded by pool zone\", \"Numbered inventory systems\"]','[\"Bulk cartons (24–48 units)\", \"Laundry bag compatible sizing\", \"RFID tagging upon request\"]','[\"Hotels with pools\", \"Country clubs\", \"Aquatic centres\"]','45–60 days FOB','1,000 units per colour',NULL,NULL,8,1,'2026-09-29 05:32:08.527'),('cmum8ornh000nrxfam98y1jsa','spa-towels','Spa Towels','Ultra-soft spa towels in white and natural tones for treatment rooms and wellness brands.','Spa-grade towels with exceptional softness, consistent white brightness, and gentle loop construction. Designed for treatment tables, relaxation lounges, and premium wellness retail.','Wellness','/images/products/spa-towels.jpg','/images/products/spa-towels.jpg','[]','[\"Optical white brightness maintained\", \"Extra-soft zero-twist options\", \"Treatment table sizing available\", \"Hypoallergenic finishing\"]','[]','[\"100% combed cotton (spa white)\", \"Bamboo-cotton blend\", \"Organic cotton (certified)\"]','[{\"cm\": \"40 × 70 cm\", \"label\": \"Spa Hand\", \"inches\": \"16\\\" × 28\\\"\"}, {\"cm\": \"70 × 140 cm\", \"label\": \"Spa Bath\", \"inches\": \"27.5\\\" × 55\\\"\"}, {\"cm\": \"100 × 180 cm\", \"label\": \"Treatment Wrap\", \"inches\": \"39\\\" × 71\\\"\"}]','450–600 GSM','[\"Spa logo embroidery\", \"Natural dye colour palettes\", \"Aromatherapy-compatible packaging\"]','[\"Wellness kit assembly\", \"Eco-friendly paper wrap\", \"Retail gift sets\"]','[\"Day spas\", \"Wellness resorts\", \"Beauty brands\"]','45–60 days FOB','500 units per size',NULL,NULL,9,1,'2026-09-29 05:32:08.573'),('cmum8orp1000orxfaenntbnt0','private-labeling','Private Label Manufacturing','Full private label programs—from product development to packaging and export logistics.','Partner with Deepam Textile to launch or scale your towel and linen brand. We offer end-to-end private label services: product development, sampling, custom weaving, branding, packaging, and FOB/CIF export to USA and Canada.','Your Brand','/images/products/private-label.jpg','/images/products/private-label.jpg','[]','[\"Dedicated product development team\", \"Sampling within 2–3 weeks\", \"Full brand compliance documentation\", \"Flexible MOQs for growing brands\"]','[]','[\"Full material library access\", \"Custom blend development\", \"Sustainable fiber options\"]','[{\"cm\": \"Any specification\", \"label\": \"Custom Development\", \"inches\": \"Any specification\"}]','300–700+ GSM (custom)','[\"Logo weaving and embroidery\", \"Custom packaging and inserts\", \"Brand guidelines implementation\", \"Exclusive colour development\"]','[\"Retail-ready packaging design\", \"E-commerce friendly formats\", \"Bulk and mixed-SKU cartons\"]','[\"Emerging brands\", \"Retail chains\", \"Amazon/e-commerce sellers\"]','60–90 days (including sampling)','Flexible — from 500 units per SKU',NULL,NULL,10,1,'2026-09-29 05:32:08.630'),('cmum8orqb000prxfazgowt2ib','promotional-towels','Promotional Towels','Custom-branded towels for corporate gifting, events, and promotional campaigns.','Cost-effective promotional towels with screen printing, embroidery, or jacquard logo placement. Ideal for corporate gifts, golf tournaments, fitness brands, and trade show giveaways targeting North American markets.','Branded','/images/products/promotional-towels.jpg','/images/products/promotional-towels.jpg','[]','[\"Multi-colour screen printing\", \"Embroidery up to 12 colours\", \"Fast turnaround on standard sizes\", \"Bulk pricing tiers\"]','[]','[\"100% cotton velour (print-friendly)\", \"Microfiber sports towels\", \"Cotton terry promotional weights\"]','[{\"cm\": \"40 × 80 cm\", \"label\": \"Sports Towel\", \"inches\": \"16\\\" × 32\\\"\"}, {\"cm\": \"40 × 60 cm\", \"label\": \"Golf Towel\", \"inches\": \"16\\\" × 24\\\"\"}, {\"cm\": \"70 × 140 cm\", \"label\": \"Full Size Promo\", \"inches\": \"27.5\\\" × 55\\\"\"}]','300–450 GSM','[\"Full-colour screen print\", \"Embroidered logos\", \"Custom pantone colours\", \"Individual name personalization\"]','[\"Individual polybag with logo sticker\", \"Bulk cartons\", \"Gift box upgrades\"]','[\"Corporate gifting\", \"Sports events\", \"Marketing agencies\"]','30–45 days FOB','250 units per design',NULL,NULL,11,1,'2026-09-29 05:32:08.676');
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `siteName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Deepam Textile',
  `legalName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Deepam Textiles',
  `tagline` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Luxury in Every Thread. Crafting Excellence Since 1982.',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `logoUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/images/logo-transparent.png',
  `logoLightUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/images/logo-dark-mode.png',
  `faviconUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '/favicon.ico',
  `colorPearl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `colorOat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#f0f7fc',
  `colorTaupe` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#0f2942',
  `colorMuted` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#5b6e82',
  `colorSage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#38bdf8',
  `colorSageDeep` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#0284c7',
  `colorHairline` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#e0e9f1',
  `contactEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'export@deepamtextile.com',
  `contactEmailSecondary` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'sales@deepamtextile.com',
  `contactPhone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '+91 70661 48936',
  `leadsToEmail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'export@deepamtextile.com',
  `resendFromEmail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inquiryEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `whatsappNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '+917066148936',
  `calendlyUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `footerBlurb` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `copyrightText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exportMarkets` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USA · Canada · Europe · Middle East · Australia',
  `addressStreet` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MIDC Industrial Area, Akkalkot Road',
  `addressCity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Solapur',
  `addressRegion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Maharashtra',
  `addressCountry` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'India',
  `addressPostalCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '413006',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES ('default','Deepam Textiles','Deepam Textiles','Experience the Luxury. Crafting Excellence Since 1998.','Premier Indian manufacturer and global exporter of luxury terry towels, hotel bath linen, and private label collections from Solapur, Maharashtra.','/images/logo-transparent.png','/images/logo-dark-mode.png','/favicon.ico','#ffffff','#f0f7fc','#0f2942','#5b6e82','#38bdf8','#0284c7','#e0e9f1','export@deepamtextile.com','sales@deepamtextile.com','+91 70661 48936','export@deepamtextile.com',NULL,1,'+917066148936',NULL,'Premier Indian manufacturer and global exporter of luxury terry towels, hotel bath linen, and private label collections from Solapur, Maharashtra.',NULL,'USA · Canada · Europe · Middle East · Australia','MIDC Industrial Area, Akkalkot Road','Solapur','Maharashtra','India','413006','2026-09-29 05:32:07.430');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stat`
--

DROP TABLE IF EXISTS `Stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stat` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stat`
--

LOCK TABLES `Stat` WRITE;
/*!40000 ALTER TABLE `Stat` DISABLE KEYS */;
INSERT INTO `Stat` VALUES ('cmum8oru3000qrxfapy1xvh2a','40+','Years Manufacturing',0,1),('cmum8orvx000rrxfaplgnz5fg','550 MT','Monthly Capacity',1,1),('cmum8orx9000srxfac838mp98','200+','Looms & Machines',2,1),('cmum8orz0000trxfaqvognvhj','35+','Countries Served',3,1),('cmum8orz4000urxfayzroz0gq','500+','Containers Shipped',4,1),('cmum8orz6000vrxfabgmbvogx','100%','Combed Ring-Spun Cotton',5,1);
/*!40000 ALTER TABLE `Stat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-29 15:57:28
