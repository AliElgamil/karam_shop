"use client";
import LottieData from "@/hook/LottieData";
import Lottie from "lottie-react";
type props = {
  src: string;
  addClass?: string;
};

export default function LottieImage({ src, addClass }: props) {
  const lottieBug = LottieData({
    src,
  });

  return (
    <Lottie
      animationData={lottieBug}
      loop={true}
      className={addClass ? addClass : ""}
    />
  );
}
