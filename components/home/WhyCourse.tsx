import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Container from "../shared/Container";

const WhyCourse = () => {
  return (
    <div>
      <Container>
        <div className="relative mt-20">
          {/* Top Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#46056B] mb-10">
            শিক্ষার্থীদের কাজের <br /> পোর্টফোলিও
          </h2>

          {/* Grid layout for video and bullet points */}
          <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
            {/* Video */}
            <div className="w-full">
              <iframe
                className="w-full h-64 md:h-[400px] rounded-md"
                src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0&modestbranding=1&showinfo=0&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Bullet Points */}
            <div>
              <div className="w-full bg-[#4F0187] rounded-md text-white p-5 text-xl font-semibold mb-4 text-center">
                কোর্সটি কেন প্রয়োজন ?
              </div>
              <ul className="text-[#2D2D2D] space-y-3">
                {[
                  "আত্মবিশ্বাস দূর করে বিশুদ্ধ বাংলায় অনর্গল কথা বলতে পারবেন।",
                  "মুখের জড়তা কাটাতে পারবেন।",
                  "কন্টেন্ট স্ক্রিপ্টিং করতে পারবেন।",
                  "সুন্দর মাউডুলেশন এবং নিজস্ব ঢঙে আলোচক হিসেবে তৈরি করতে পারবেন।",
                  "উপস্থাপনায় নিজের কথা বলাতে পারবেন।",
                  "ক্যামেরা ভীতি দূর করতে পারবেন।",
                  "ক্যামেরায়, মঞ্চে এবং অডিও কনটেন্টে সহজে কথা বলতে পারবেন।",
                  "গ্রাফিক মিডিয়ার বিভিন্ন ক্ষেত্রে: রেডিও জকি, টিভি রিপোর্টার, ডাবিং আর্টিস্ট এবং কন্টেন্ট ক্রিয়েটর হিসেবে নিজেকে প্রস্তুত করতে পারবেন।",
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaCheck className="text-green-600 mt-1 min-w-[16px]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shapes */}
          <Image
            src={"/shape1.png"}
            height={100}
            width={100}
            alt="Decorative shape"
            className="absolute top-[30%] right-0 w-16 md:w-20 opacity-40"
          />
          <Image
            src={"/shape2.png"}
            height={100}
            width={100}
            alt="Decorative shape"
            className="absolute top-[70%] right-0 w-16 md:w-20 opacity-40"
          />
        </div>
      </Container>
    </div>
  );
};

export default WhyCourse;
