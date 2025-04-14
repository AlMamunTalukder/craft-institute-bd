import { PrismaClient } from "@prisma/client";

export default async function seedSiteContent(prisma: PrismaClient) {
  const existingContent = await prisma.siteContent.findFirst();

  if (!existingContent) {
    await prisma.siteContent.create({
      data: {
        logoLight: "/images/logo-light.png",
        logoDark: "/images/logo-dark.png",
        tagline: "কথার জাদুতে মুগ্ধ করুন ক্রাফট ইনস্টিটিউটের সাথে।",
        email: "craftinstitutebd@gmail.com",
        phone1: "+8801310726000",
        phone2: "+88001700999093",
        address:
          "মাদানি নগর মাদরাসা সংলগ্ন নুরবাগ আবাসিক এলাকা, ২ নম্বর রোড চিটাগাং রোড, সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ।",
        facebook: "https://www.facebook.com/craft99",
        facebookGroup: "https://www.facebook.com/groups/craftinstitute",
        whatsapp: "https://chat.whatsapp.com/DMqRRerTZs0JRFOxVIebBb",
        youtube: "https://www.youtube.com/@CraftInstitute99",
        telegram: "https://t.me/craftinstitute23",
      },
    });

    console.log("✅ Site content seeded.");
  } else {
    console.log("⚠️ Site content already exists.");
  }
}
