import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaUserFriends,
  FaWhatsapp,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { SiteContent } from "@prisma/client";

type Props = {
  siteContent: SiteContent;
};

const Footer = ({ siteContent }: Props) => {
  const {
    logoDark,
    tagline,
    email,
    phone1,
    phone2,
    address,
    facebook,
    facebookGroup,
    whatsapp,
    youtube,
    telegram,
  } = siteContent;

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: facebook,
      color: "#1877F2",
    },
    {
      icon: <FaUserFriends />,
      label: "Groups",
      href: facebookGroup,
      color: "#4267B2",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: whatsapp,
      color: "#25D366",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: youtube,
      color: "#FF0000",
    },
    {
      icon: <FaTelegramPlane />,
      label: "Telegram",
      href: telegram,
      color: "#0088cc",
    },
  ];

  return (
    <footer
      className="relative text-white py-12 md:py-16"
      style={{
        backgroundImage: `url(${"/bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-black/70 z-0" />

      <div className="relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/">
                <Image
                  src={logoDark}
                  alt="Craft Institute Logo"
                  width={180}
                  height={100}
                />
              </Link>
              <p className="text-sm text-gray-300 mt-3 text-center md:text-left">
                {tagline}
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
                যোগাযোগ করুন
              </h3>
              <div className="space-y-3 text-sm">
                <a
                  href={`tel:${phone1}`}
                  className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
                >
                  <FaPhone className="text-gray-300" />
                  {phone1}
                </a>
                {phone2 && (
                  <a
                    href={`tel:${phone2}`}
                    className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
                  >
                    <FaPhone className="text-gray-300" />
                    {phone2}
                  </a>
                )}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
                >
                  <FaEnvelope className="text-gray-300" />
                  {email}
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
                সোশ্যাল মিডিয়া
              </h3>
              <div className="flex flex-wrap gap-4 mt-2">
                {socialLinks.map(
                  (social, index) =>
                    social.href && (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        title={social.label}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-md"
                        style={{ color: social.color }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-xl">{social.icon}</span>
                      </a>
                    ),
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
                ঠিকানা
              </h3>
              <div className="text-sm leading-relaxed flex items-start gap-3">
                <p className="text-gray-200 text-center md:text-left">
                  {address}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700/50 mt-10 pt-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
              <p>
                © {new Date().getFullYear()} ক্রাফট ইনস্টিটিউট। সর্বস্বত্ব
                সংরক্ষিত।
              </p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <a href="#" className="hover:text-[#DC25FF] transition-colors">
                  গোপনীয়তা নীতি
                </a>
                <span>|</span>
                <a href="#" className="hover:text-[#DC25FF] transition-colors">
                  শর্তাবলী
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
