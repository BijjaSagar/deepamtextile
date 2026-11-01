/**
 * Updates product category descriptions in the database to structured format.
 * Run with: npx tsx scripts/update-product-descriptions.ts
 */
import { prisma } from "@/lib/db";
import { productCategories } from "@/data/products";

async function main() {
  console.log("[update-product-descriptions] starting description update...");

  let updatedCount = 0;
  for (const product of productCategories) {
    const existing = await prisma.productCategory.findUnique({
      where: { slug: product.slug },
      select: { slug: true, name: true, description: true },
    });

    if (existing) {
      await prisma.productCategory.update({
        where: { slug: product.slug },
        data: { description: product.description },
      });
      console.log(`✓ Updated description for: ${product.name} (${product.slug})`);
      updatedCount++;
    } else {
      console.log(`- Product not found in DB: ${product.slug}`);
    }
  }

  console.log(`[update-product-descriptions] completed. Updated ${updatedCount} products.`);
}

main()
  .catch((err) => {
    console.error("[update-product-descriptions] error:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

