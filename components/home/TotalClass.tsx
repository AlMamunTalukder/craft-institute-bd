import Container from "../shared/Container";

import React from "react";

const TotalClass = () => {
  return (
    <Container>
      <div className="mt-20 border-dashed border-b pb-20">
        <div className="flex items-center justify-center w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-[#D323F7] to-[#4F0187] text-white mb-5">
          <h1 className="text-3xl md:text-5xl font-bold">50</h1>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          মোট ক্লাস সংখ্যা ৫০টি
        </h1>
      </div>
    </Container>
  );
};

export default TotalClass;
