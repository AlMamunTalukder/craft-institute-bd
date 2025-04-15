import BannerForm from "@/components/Forms/BannerForm";
import FormHeader from "@/components/Forms/FormHeader";
import { db } from "@/prisma/db";

export default async function UpdateSiteContentPage() {
  const data = await db.banner.findFirst();

  if (!data) {
    return <div className="text-center mt-10 text-gray-500">No data found</div>;
  }

  return (
    <>
      <FormHeader
        href="/content/banner"
        parent=""
        title="Banner"
        editingId={data.id}
      />
      <BannerForm initialValues={data} />
    </>
  );
}
