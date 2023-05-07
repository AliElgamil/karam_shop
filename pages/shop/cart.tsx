import Banner from "@/components/banner";
import Helmet from "@/components/Helmet";
import React from "react";

export default function Cart() {
  return (
    <div>
      <Helmet title="Cart" />
      <Banner>
        <div className="container m-auto">
          <h1 className="text-[24px]  lg:text-[36px] pt-[25vh] pb-[90px] font-semibold text-white text-right ">
            Cart Page
          </h1>
        </div>
      </Banner>
      <div className="py-[70px]">
        <div className="container m-auto flex gap-8 grow"></div>
      </div>
    </div>
  );
}
