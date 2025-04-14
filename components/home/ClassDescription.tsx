import Container from "../shared/Container";

import React from "react";

const departments = [
  {
    name: "মেইন ক্লাস",
    description:
      "কোর্সে উল্লেখিত সিলেবাসের প্রতিটি বিষয় নিয়ে বিস্তারিত আলোচনাসহ পাঠ দান করানো হয়।",
  },
  {
    name: "প্রবলেম সলভিং ক্লাস",
    description:
      "অর্থাৎ সমস্যা সমাধান ক্লাস। যেখানে শিক্ষার্থীর সমস্যা চিহ্নিত করে, প্রত্যেককে আলাদা ভাবে সময় দিয়ে তা সমাধানের মাধ্যমে পড়া আদায় করা হয়।",
  },
  {
    name: "প্রাক্টিস ক্লাস",
    description:
      "যেখানে শিক্ষার্থীদের ক্লাসের পড়াগুলো চর্চার মাধ্যমে প্রয়োগ করানো হ",
  },
  {
    name: "স্পেশাল ক্লাস",
    description:
      "এই ক্লাসটি মূলত দূর্বল শিক্ষার্থীদের জন্য। যাদের মেইন, প্রবলেম সলভিং ও প্রাক্টিস এই তিনটি ক্যাটাগরিতে ক্লাস করার পরেও সমস্যা থাকবে , তাদের জন্য রয়েছে স্পেশাল ক্লাস।",
  },
  {
    name: "প্রেজেন্টেশন রিভিউ",
    description:
      "শিক্ষার্থীদের ভিডিও প্রেজেন্টেশনে প্রয়োগের ক্ষেত্রে কোথায় কী কী সমস্যা রয়েছে তা পর্যালোচনার মাধ্যমে ত্রুটিগুলো সমাধান করা হয়।",
  },
  {
    name: "ভিডিও প্রেজেন্টেশন",
    description:
      "৩০০০ মিনিট ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসে শেখানো বিষয়গুলো সরাসরি প্রয়োগ করানো হয়।",
  },
];

const ClassDescription = () => {
  return (
    <Container>
      <div className="border-dashed border-b pb-20">
        <div className="lg:w-3/4 mx-auto lg:px-0 px-5 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`p-6 text-center border-b border-[#4F0187] md:border-b-0 ${
                  index < departments.length - 3 ? "lg:border-b" : ""
                } ${index % 3 !== 2 ? "md:border-r" : ""}`}
              >
                <h3 className="text-xl font-semibold text-[#4F0187] mb-2">
                  {dept.name}
                </h3>
                <p className="text-sm text-gray-600">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClassDescription;
