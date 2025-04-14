import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function seedAdminUser(prisma: PrismaClient) {
  const adminEmail = "admin@example.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        name: "Admin",
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        phone: "01234567890",
        password: hashedPassword,
        role: "ADMIN",
        isVerified: true,
        status: true,
      },
    });

    console.log("✅ Admin user seeded.");
  } else {
    console.log("⚠️ Admin user already exists.");
  }
}
