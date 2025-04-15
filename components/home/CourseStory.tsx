import Container from "../shared/Container";

import Image from "next/image";
import React from "react";
import SectionTitle from "../shared/SectionTitle";

const CourseStory = () => {
  return (
    <div className="mt-20">
      <Container>
        <div className="border-dashed border-b pb-20">
          <SectionTitle text="কোর্স স্টোরি" />
          <Image
            src="/cup.png"
            height={500}
            width={500}
            alt=""
            className="max-w-60 mx-auto mb-5"
          />
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#D223F6] mb-2">
            প্রমিত ভাষা শেখার
          </h2>
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#4F0187]">
            ৫০ দিনের চ্যালেঞ্জ
          </h2>
        </div>
        <div className="border-dashed border-b pb-20">
          <Image
            src="/outline.png"
            height={500}
            width={500}
            alt="decorative shape"
            className="md:max-w-[600px] w-full mx-auto mt-20"
          />
        </div>
      </Container>
    </div>
  );
};

export default CourseStory;
