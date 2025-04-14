import { PrismaClient } from "@prisma/client";
import seedAdminUser from "./seeders/seedAdminUser";
import seedSiteContent from "./seeders/seedSiteContent";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  await seedAdminUser(prisma);
  await seedSiteContent(prisma);

  console.log("✅ All seeders completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
