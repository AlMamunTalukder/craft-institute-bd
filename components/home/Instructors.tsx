import Image from "next/image";
import Container from "../shared/Container";
import { getAllInstructors } from "@/queries/content/instructors";
import SectionTitle from "../shared/SectionTitle";

const Instructors = async () => {
  const instructors = (await getAllInstructors()) || [];

  if (!instructors.length) {
    return (
      <Container>
        <div className="my-20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4F0187] text-center mb-10">
            কোর্স প্রশিক্ষক
          </h2>
          <p className="text-center">কোন প্রশিক্ষক নেই</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="my-20">
        <SectionTitle text="কোর্স প্রশিক্ষক" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, idx) => (
            <div
              key={idx}
              className="border border-dashed border-gray-300 rounded-lg overflow-hidden bg-white"
            >
              {/* Image Section */}
              <div className="w-full h-[280px] relative">
                <Image
                  src={instructor.image || "/placeholder.png"}
                  alt={instructor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Info Section */}
              <div className="bg-gray-100 text-center py-4 px-2">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {instructor.name}
                </h3>
                <p className="text-sm text-gray-700">{instructor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Instructors;
