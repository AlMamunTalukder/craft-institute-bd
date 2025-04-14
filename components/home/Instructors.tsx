import Image from "next/image";
import Container from "../shared/Container";

const instructors = [
  {
    name: "মোহাম্মদ সেলিম",
    title: "ভয়েস ওভার ডিরেক্টর",
    image: "/md-salim.png",
  },
  {
    name: "তাপস কুমার খুদা",
    title: "ডাবিং ডিরেক্টর",
    image: "/tapas.png",
  },
  {
    name: "সমাপন মিত্র",
    title: "ভয়েস আর্টিস্ট (থিয়েটার)",
    image: "/samapan.png",
  },
  {
    name: "নেহার আহমাদ",
    title: "ভয়েস ওভার আর্টিস্ট",
    image: "/nesar.png",
  },
];

const Instructors = () => {
  return (
    <Container>
      <div className="my-20">
        <h2 className="text-2xl md:text-3xl font-bold text-[#4F0187] text-center mb-10">
          কোর্স প্রশিক্ষক
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {instructors.map((instructor, idx) => (
            <div key={idx}>
              <div>
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  width={300}
                  height={300}
                  className="w-full h-full rounded-t-md"
                />
              </div>
              <div className="bg-[#4F0187] rounded-b-md p-3 text-center text-white">
                <h3 className="text-lg font-semibold">{instructor.name}</h3>
                <p className="text-sm">{instructor.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Instructors;
