import { prisma } from "./prisma";

export type InquiryData = {
  name: string;
  email: string;
  service: string;
  message: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export async function insertInquiry(
  data: InquiryData
): Promise<{ success: boolean; id?: number; isMock?: boolean; error?: string }> {
  const hasDbUrl = Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);

  if (!hasDbUrl) {
    console.warn(
      "[Prisma/PostgreSQL Notice]: No DATABASE_URL configured in environment. Inquiry recorded in development mock mode:",
      data
    );
    return {
      success: true,
      id: Math.floor(Math.random() * 1000) + 1,
      isMock: true,
    };
  }

  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        service: data.service.trim(),
        message: data.message.trim(),
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
      },
    });

    return {
      success: true,
      id: inquiry.id,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[Prisma Insert Error]:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getInquiries(limit = 50) {
  const hasDbUrl = Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  if (!hasDbUrl) return [];

  try {
    return await prisma.inquiry.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[Prisma Fetch Error]:", error);
    return [];
  }
}
