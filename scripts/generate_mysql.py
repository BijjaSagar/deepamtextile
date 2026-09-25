import sqlite3
import os

conn = sqlite3.connect('data/cms.db')
cursor = conn.cursor()

sql_lines = []
sql_lines.append('-- ========================================================')
sql_lines.append('-- DEEPAM TEXTILES - PRODUCTION MYSQL DATABASE SCHEMA & SEED')
sql_lines.append('-- Character set: utf8mb4, Collation: utf8mb4_unicode_ci')
sql_lines.append('-- Compatible with: MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+')
sql_lines.append('-- ========================================================')
sql_lines.append('')
sql_lines.append('SET NAMES utf8mb4;')
sql_lines.append('SET FOREIGN_KEY_CHECKS = 0;')
sql_lines.append('')

# 1. AdminUser
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('-- Table structure for: AdminUser')
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('''CREATE TABLE IF NOT EXISTS `AdminUser` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminUser_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;''')
sql_lines.append('')

# 2. SiteContent
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('-- Table structure for: SiteContent')
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('''CREATE TABLE IF NOT EXISTS `SiteContent` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;''')
sql_lines.append('')

# 3. Product
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('-- Table structure for: Product')
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('''CREATE TABLE IF NOT EXISTS `Product` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;''')
sql_lines.append('')

# 4. Inquiry
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('-- Table structure for: Inquiry')
sql_lines.append('-- --------------------------------------------------------')
sql_lines.append('''CREATE TABLE IF NOT EXISTS `Inquiry` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;''')
sql_lines.append('')

# Data dumping function
def escape_sql(val):
    if val is None:
        return 'NULL'
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, bool):
        return '1' if val else '0'
    s = str(val).replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r')
    return f"'{s}'"

for table in ['AdminUser', 'SiteContent', 'Product', 'Inquiry']:
    rows = cursor.execute(f'SELECT * FROM {table}').fetchall()
    cols = [d[0] for d in cursor.description]
    if rows:
        sql_lines.append('-- --------------------------------------------------------')
        sql_lines.append(f'-- Initial Seed data for: {table}')
        sql_lines.append('-- --------------------------------------------------------')
        col_names = ', '.join([f'`{c}`' for c in cols])
        for r in rows:
            vals = []
            for idx, c in enumerate(cols):
                v = r[idx]
                if table == 'SiteContent' and c == 'brandName':
                    v = 'Deepam Textiles'
                if table == 'SiteContent' and c == 'experienceYears':
                    v = 28
                vals.append(escape_sql(v))
            val_str = ', '.join(vals)
            sql_lines.append(f'INSERT INTO `{table}` ({col_names}) VALUES ({val_str}) ON DUPLICATE KEY UPDATE `updatedAt`=VALUES(`updatedAt`);')
        sql_lines.append('')

sql_lines.append('SET FOREIGN_KEY_CHECKS = 1;')
sql_lines.append('-- ========================================================')
sql_lines.append('-- END OF SCRIPT')
sql_lines.append('-- ========================================================')

output = '\n'.join(sql_lines)

os.makedirs('scripts', exist_ok=True)
with open('schema.mysql.sql', 'w', encoding='utf-8') as f:
    f.write(output)

with open('scripts/schema.mysql.sql', 'w', encoding='utf-8') as f:
    f.write(output)

print('Generated schema.mysql.sql successfully (size:', len(output), 'bytes)')
