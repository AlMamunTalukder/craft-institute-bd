import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getAllInstructors } from "@/queries/content/instructors";
import { columns } from "./columns";

export default async function page() {
  const instructors = (await getAllInstructors()) || [];
  return (
    <div>
      <TableHeader
        title="Instructor"
        linkTitle="Add Instructor"
        href="/dashboard/content/instructor/new"
        data={[]}
        model="Instructor"
        showImport={false}
        showExport={false}
      />
      <div className="py-8">
        <DataTable data={instructors} columns={columns} />
      </div>
    </div>
  );
}
