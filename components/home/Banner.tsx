import Container from "../shared/Container";
import Image from "next/image";
import React from "react";
import { MdArrowForward } from "react-icons/md";

const Banner = () => {
  return (
    <div
      className="relative min-h-[500px] lg:min-h-[600px] flex items-center py-16 md:py-20 lg:py-28"
      style={{
        backgroundImage: `url(${"/bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay with gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="text-center md:text-left text-white md:w-1/2 order-2 md:order-1 px-4 md:px-0">
              <div className="animate-fade-in-up">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
                  কথার জাদুতে মুগ্ধ করার
                </h3>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#DC25FF] drop-shadow-md">
                  ৫০ দিনের চ্যালেঞ্জ
                </h1>
                <div className="space-y-2 text-lg md:text-xl mb-6 font-medium">
                  <p className="drop-shadow">
                    ২৮ তম ফ্রি সেমিনারে যুক্ত হতে রেজিস্ট্রেশন করুন।
                  </p>
                  <p className="drop-shadow">
                    সময়ঃ ১৭ এপ্রিল – বৃহস্পতিবার – রাত ৯টা
                  </p>
                </div>
                <div className="flex justify-center md:justify-start pt-2">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] hover:from-[#3C016F] hover:to-[#DC25FF] transition-all duration-300 border border-white px-6 py-3 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    ভর্তি কনফার্ম করুন{" "}
                    <MdArrowForward className="animate-pulse" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src="/banner-logo-left.png"
                  alt="Banner logo"
                  height={400}
                  width={400}
                  className="object-contain drop-shadow-2xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
