import FormHeader from "@/components/Forms/FormHeader";
import InstructorForm from "@/components/Forms/InstructorForm";
import { getInstructorById } from "@/queries/content/instructors";

export default async function UpdateInstructor({
  params,
}: {
  params: { id: string };
}) {
  const instructorId = params.id;
  const instructor = await getInstructorById(instructorId);
  if (!instructor) {
    return <div>Instructor not found</div>;
  }
  return (
    <div className="py-8">
      <FormHeader
        href="/content/instructor/list"
        parent=""
        title="Instructors"
        editingId={instructorId}
      />
      <InstructorForm initialValues={instructor} />
    </div>
  );
}
