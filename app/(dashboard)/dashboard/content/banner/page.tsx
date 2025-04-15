import TableHeader from "@/components/dashboard/Tables/TableHeader";
import Banner from "@/components/home/Banner";

const page = async () => {
  return (
    <div className="space-y-6">
      <TableHeader
        title="Banner"
        linkTitle="Update Banner"
        href="/dashboard/content/banner/update"
        data={[]}
        model="Banner"
        showImport={false}
        showExport={false}
      />

      <Banner />
    </div>
  );
};

export default page;
