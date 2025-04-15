"use client";

import React, { useState, useEffect } from "react";
import Container from "./Container";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

type MenuItem = {
  logo: string;
};

const Header = ({ logo }: MenuItem) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Admission", href: "/admission" },
    { name: "Review", href: "/review" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 w-full shadow-sm transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/90"
      }`}
    >
      <Container>
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                height={120}
                width={120}
                alt="Logo"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex gap-6 lg:gap-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="lg:text-base text-sm font-semibold text-gray-600 hover:text-[#DC25FF] transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-[#DC25FF]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 text-gray-600 hover:text-[#DC25FF] transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-1 border-t border-gray-100 animate-fade-down">
            <ul className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block py-2 px-4 text-gray-600 hover:text-[#DC25FF] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;
