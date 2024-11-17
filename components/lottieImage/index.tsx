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
  // useEffect(() => {
  //   const animation = lottie.loadAnimation({
  //     container: document.getElementById("lottie-container") as Element,
  //     renderer: "svg",
  //     loop: true,
  //     autoplay: true,
  //     animationData: lottieBug,
  //   });

  //   return () => animation.destroy(); // Cleanup on unmount
  // }, [lottieBug]);
  return (
    <Lottie
      animationData={lottieBug}
      loop={true}
      className={addClass ? addClass : ""}
    />
  );
}
