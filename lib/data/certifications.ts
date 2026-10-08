import { prisma, isDbConfigured } from "@/lib/db";
import { certifications as staticCerts } from "@/data/products";
import type { CertificationData } from "@/lib/types/cms";

export type CertificationDisplay = {
  name: string;
  description: string;
  certificateNumber?: string;
  pdfUrl?: string;
};

function mapCert(row: CertificationData): CertificationDisplay {
  return {
    name: row.name,
    description: row.description,
    certificateNumber: row.code ?? undefined,
    pdfUrl: row.pdfUrl ?? undefined,
  };
}

export async function getCertifications(): Promise<CertificationDisplay[]> {
  return [];
}

export async function getAllCertificationsAdmin(): Promise<CertificationData[]> {
  if (!isDbConfigured()) {
    return staticCerts.map((c, i) => ({
      id: `static-${i}`,
      name: c.name,
      code: c.certificateNumber ?? null,
      description: c.description,
      pdfUrl: c.pdfUrl ?? null,
      sortOrder: i,
      visible: true,
    }));
  }
  try {
    return await prisma.certification.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return staticCerts.map((c, i) => ({
      id: `static-${i}`,
      name: c.name,
      code: c.certificateNumber ?? null,
      description: c.description,
      pdfUrl: c.pdfUrl ?? null,
      sortOrder: i,
      visible: true,
    }));
  }
}
