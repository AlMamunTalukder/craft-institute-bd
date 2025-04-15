import { PrismaClient } from "@prisma/client";

export default async function seedBanner(prisma: PrismaClient) {
  const existingBanner = await prisma.banner.findFirst({
    where: { title: "কথার জাদুতে মুগ্ধ করার" },
  });

  if (!existingBanner) {
    await prisma.banner.create({
      data: {
        title: "কথার জাদুতে মুগ্ধ করার",
        subtitle: "৫০ দিনের চ্যালেঞ্জ",
        description:
          "২৮ তম ফ্রি সেমিনারে যুক্ত হতে রেজিস্ট্রেশন করুন।\nসময়ঃ ১৭ এপ্রিল – বৃহস্পতিবার – রাত ৯টা",
        dateInfo: "১৭ এপ্রিল – বৃহস্পতিবার – রাত ৯টা",
        ctaText: "রেজিস্ট্রেশন করুন",
        ctaLink: "https://example.com/register",
        bannerImage: "https://your-cdn.com/images/kothar-jadu-banner.jpg",
        backgroundImage: "https://your-cdn.com/images/kothar-jadu-bg.jpg",
        isActive: true,
      },
    });

    console.log("✅ কথার জাদু banner seeded successfully.");
  } else {
    console.log("⚠️ কথার জাদু banner already exists.");
  }
}
