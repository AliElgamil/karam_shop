"use client";
import React from "react";
// import LottieImage from "../lottieImage";
import dynamic from "next/dynamic";

const LottieImage = dynamic(() => import("../lottieImage"), {
  ssr: false,
  loading: () => <div>Loading animation...</div>,
});
export default function NoCartItem() {
  return (
    <li className="h-full grid place-content-center">
      <LottieImage
        src="https://assets5.lottiefiles.com/packages/lf20_3VDN1k.json"
        addClass="w-[150px]"
      />
    </li>
  );
}
