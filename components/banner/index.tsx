"use client";

import React from "react";
import bg from "../../public/banner-bg.webp";
interface BannerProps {
  children: React.ReactNode;
}

export default function Banner({ children }: BannerProps) {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center banner"
      style={{ backgroundImage: `url("${bg.src}")` }}
    >
      {children}
    </div>
  );
}
