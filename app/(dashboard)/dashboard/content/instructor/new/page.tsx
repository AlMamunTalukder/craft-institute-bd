import FormHeader from "@/components/Forms/FormHeader";
import InstructorForm from "@/components/Forms/InstructorForm";
import React from "react";

export default function NewInstructorPage() {
  return (
    <>
      <FormHeader
        href="/content/instructors"
        parent=""
        title="Instructors"
        editingId={""}
      />
      <InstructorForm />
    </>
  );
}
