import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import SubHeader from "@/components/shared/SubHeader";
import { db } from "@/prisma/db";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const siteData = await db.siteContent.findFirst({});
  if (!siteData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <SubHeader
        siteData={{
          facebook: siteData.facebook,
          facebookGroup: siteData.facebookGroup,
          telegram: siteData.telegram,
          whatsapp: siteData.whatsapp,
          youtube: siteData.youtube,
        }}
      />
      <Header logo={siteData.logoLight || ""} />
      {children}
      <Footer siteContent={siteData} />
    </div>
  );
}
