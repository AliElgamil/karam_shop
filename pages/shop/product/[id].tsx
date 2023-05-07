import Banner from "@/components/banner";
import Helmet from "@/components/Helmet";
import React from "react";

export default function Product() {
  return (
    <div>
      <Helmet title="Product" />
      <Banner>
        <div className="container m-auto">
          <h1 className="text-[24px]  lg:text-[36px] pt-[25vh] pb-[90px] font-semibold text-white text-right ">
            Product Details Page
          </h1>
        </div>
      </Banner>
      <div className="py-[70px]">
        <div className="container m-auto flex gap-8 grow"></div>
      </div>
    </div>
  );
}
