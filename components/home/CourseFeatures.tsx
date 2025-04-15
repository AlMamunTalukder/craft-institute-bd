import Container from "../shared/Container";

import React from "react";
import {
  FaVideo,
  FaUsers,
  FaCertificate,
  FaBriefcase,
  FaHandsHelping,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import SectionTitle from "../shared/SectionTitle";

const features = [
  {
    icon: FaVideo,
    title: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন",
    bgColor: "bg-[#FFE4EC]",
    iconColor: "text-[#D61C4E]",
  },
  {
    icon: FaUsers,
    title: "২৪ ঘণ্টা গ্রুপ সাপোর্ট",
    bgColor: "bg-[#E4F0FF]",
    iconColor: "text-[#1C4DD6]",
  },
  {
    icon: FaCertificate,
    title: "সার্টিফিকেট প্রদান",
    bgColor: "bg-[#FFF9E4]",
    iconColor: "text-[#D69F1C]",
  },
  {
    icon: FaBriefcase,
    title: "আমাদের সাথে কাজ করার সুযোগ",
    bgColor: "bg-[#E4FFF1]",
    iconColor: "text-[#1CD675]",
  },
  {
    icon: MdSupportAgent,
    title: "কোর্স শেষে সাপোর্ট",
    bgColor: "bg-[#F2E4FF]",
    iconColor: "text-[#7D1CD6]",
  },
  {
    icon: FaHandsHelping,
    title: "কাজ পাওয়ার ক্ষেত্রে সহযোগিতা",
    bgColor: "bg-[#E4FFFF]",
    iconColor: "text-[#1CBAD6]",
  },
];

const CourseFeatures = () => {
  return (
    <Container>
      <div className="mt-20">
        <SectionTitle text="কোর্সের বৈশিষ্ট্য" />
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`rounded-md p-5 flex flex-col items-center text-center ${feature.bgColor}`}
              >
                <Icon className={`w-10 h-10 mb-4 ${feature.iconColor}`} />
                <p className="text-gray-800 font-medium">{feature.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default CourseFeatures;
