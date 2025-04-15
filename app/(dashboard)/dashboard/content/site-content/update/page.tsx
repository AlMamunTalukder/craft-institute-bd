import FormHeader from "@/components/Forms/FormHeader";
import SiteContentForm from "@/components/Forms/SiteContentForm";
import { db } from "@/prisma/db";
import React from "react";

export default async function UpdateSiteContentPage() {
  const data = await db.siteContent.findFirst();

  if (!data) {
    return <div className="text-center mt-10 text-gray-500">No data found</div>;
  }

  return (
    <>
      <FormHeader
        href="/content/site-content"
        parent=""
        title="Site Content"
        editingId={data.id}
      />
      <SiteContentForm initialValues={data} />
    </>
  );
}
