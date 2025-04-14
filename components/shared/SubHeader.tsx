"use client";

import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaTelegramPlane,
  FaUsers,
  FaRegHandPointRight,
} from "react-icons/fa";
import Container from "./Container";
import dynamic from "next/dynamic";
import { SiteContent } from "@prisma/client";

type Props = {
  siteData: SiteContent;
};

const CountdownTimer = dynamic(
  () => import("@/components/home/CountdownTimer"),
  { ssr: false },
);

export default function SubHeader({ siteData }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", href: "#" },
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "#" },
    { icon: <FaYoutube />, label: "YouTube", href: "#" },
    { icon: <FaTelegramPlane />, label: "Telegram", href: "#" },
    { icon: <FaUsers />, label: "Community", href: "#" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#4F0187] to-[#3C016F] text-white py-2 md:py-3">
      {/* Top social bar */}
      <Container>
        <div className="flex justify-center md:justify-end mb-1 md:mb-2 pt-1">
          <div className="flex items-center gap-3 md:gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-xs md:text-sm hover:text-[#DC25FF] transition-all duration-300 flex items-center justify-center h-6 w-6 md:h-7 md:w-7 rounded-full bg-white/10 hover:bg-white/20"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-purple-300/20 pt-2 md:pt-3">
          {/* Left side - Registration info and time */}
          <div className="flex items-center md:items-start flex-col text-center md:text-left mb-3 md:mb-0 md:w-2/5">
            <h3 className="font-bold text-sm md:text-base lg:text-lg">
              ফ্রি সেমিনারে যুক্ত হতে রেজিস্ট্রেশন করুন।
            </h3>
            <div className="flex items-center gap-1 text-xs md:text-sm text-gray-200 mt-1">
              <span>সময়ঃ ১৭ এপ্রিল – বৃহস্পতিবার – রাত ৯টা</span>
            </div>
          </div>

          {/* Middle - Countdown timer */}
          <div className="mb-3 md:mb-0 md:mx-2 lg:mx-4 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-sm px-3 md:px-5 py-2 rounded-lg border border-white/10 shadow-lg">
              <CountdownTimer />
            </div>
          </div>

          {/* Right side - Registration button */}
          <div className="w-full md:w-1/4">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] border border-white/70 px-3 md:px-5 py-2 rounded-lg text-white hover:shadow-lg hover:shadow-[#DC25FF]/20 transition-all duration-300 w-full">
              <FaRegHandPointRight className="text-base md:text-lg" />
              <span className="text-xs md:text-sm font-semibold">
                ভর্তি কনফার্ম করুন
              </span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
