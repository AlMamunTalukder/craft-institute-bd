import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="object-cover"
        priority
      />
    </Link>
  );
};

export default Logo;
