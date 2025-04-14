import Container from "../shared/Container";

import React from "react";
import { BsCheckLg } from "react-icons/bs";

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-gray-800 leading-relaxed">
    <BsCheckLg className="text-green-600 text-base min-w-[1rem] pt-[2px]" />
    <span>{children}</span>
  </li>
);

const CourseOutline = () => {
  return (
    <section className="py-16 bg-[#FBF5F2] relative z-10 mt-20 overflow-hidden">
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#4F0187] mb-10">
          কোর্সে যা শেখানো হবে
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border-l-4 border-[#D523F9]">
            <h3 className="text-2xl font-bold text-[#D523F9] mb-4">
              শুদ্ধ উচ্চারণ কোর্স
            </h3>
            <ul className="space-y-2">
              <ListItem>শুদ্ধ উচ্চারণ</ListItem>
              <ListItem>আঞ্চলিকতামুক্ত বিশুদ্ধ বাংলা ভাষায় কথা বলা</ListItem>
              <ListItem>কণ্ঠস্বর চর্চা ও ফটিশব্দ করা</ListItem>
              <ListItem>মুখের জড়তা কাটানোর কৌশল</ListItem>
              <ListItem>ব্রেথিং ও মেডিটেশন</ListItem>
              <ListItem>কণ্ঠ ভয়েস কোশল</ListItem>
              <ListItem>আবৃত্তি নিরীক্ষণ ও ঢাবের ব্যবহার</ListItem>
              <ListItem>মাইক্রোফোন ও সাউন্ড কনসোল ব্যবহার</ListItem>
              <ListItem>দক্ষ আলোকে হওয়ার কৌশল</ListItem>
              <ListItem>পরিশ্রুত উচ্চারণ</ListItem>
              <ListItem>ক্যামেরা ও মঞ্চ ভিডিও কাটানো</ListItem>
              <ListItem>বডি ল্যাংগুয়েজ ও ব্যাকড্রেস</ListItem>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border-r-4 border-[#D523F9]">
            <h3 className="text-2xl font-bold text-[#D523F9] mb-4">
              ভয়েস আর্টিস্ট কোর্স
            </h3>
            <ul className="space-y-2">
              <ListItem>ভয়েস ওভার টেকনিক</ListItem>
              <ListItem>
                সংবাদ পাঠ, ডকুমেন্টারি, ডাবিং, ক্যারেক্টার ভয়েস এনিমেশন ভয়েস,
                গল্প পাঠ, রেডিও নাটক ইত্যাদি সম্পর্কে বিশেষ ধারণা
              </ListItem>
              <ListItem>ভয়েস আর্টিস্ট হওয়ার সঠিক গাইডলাইন</ListItem>
              <ListItem>স্ক্রিপ্ট রাইটিং ও এনালাইসিস</ListItem>
              <ListItem>
                রেকর্ডিং ও এডিটিংয়ের মূল কাজের প্রক্রিয়া দেখানো
              </ListItem>
              <ListItem>
                অডিও ইন্ট্রোডাকশন, সফটওয়্যার ও স্টুডিও সেটআপের সম্পর্কে ধারণা
              </ListItem>
              <ListItem>ভয়েস ওভার পোর্টফোলিও মেকিং</ListItem>
              <ListItem>মার্কেটিং</ListItem>
              <ListItem>ইনকামের উপায়</ListItem>
              <ListItem>ক্লায়েন্ট ওয়ার্ক</ListItem>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CourseOutline;
