"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function AuthMockup() {
  const darkMode = useTheme();

  return (
    <Image
      alt="Mockup"
      src={
        darkMode
          ? "/assets/images/banner-mockup-dark.svg"
          : "/assets/images/banner-mockup-light.svg"
      }
      width={0}
      height={0}
      className="w-full h-auto"
    />
  );
}
