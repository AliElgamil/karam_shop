"use client";
import { product } from "@/helpers/types";
import ProductCard from "../ProductCard";
import Pages from "./pages";
import Sort from "./sort";
import { useAppSelector } from "@/hook/reduxHook";
import { Fragment } from "react";
import LottieImage from "../lottieImage";
import Link from "next/link";
import FilterButton from "./filter";

type slides = {
  slide: product[];
  pageNumber: number;
};

export default function Pagination({ slide, pageNumber }: slides) {
  const { error, isLoading } = useAppSelector((state) => state.products);

  return (
    <div className="flex flex-col w-full">
      <div className="py-4 px-5 mb-8 flex w-full justify-between items-center bg-[#828BB3] h-[70px]">
        {!error || !isLoading ? (
          <Fragment>
            <div className="flex gap-4">
              <Sort />
              <FilterButton />
            </div>
            <Pages pageNumber={pageNumber} />
          </Fragment>
        ) : null}
      </div>
      {isLoading ? (
        <div className=" flex justify-center">
          <LottieImage
            src="https://assets7.lottiefiles.com/packages/lf20_robeep7z.json"
            addClass="w-[300px]"
          />
        </div>
      ) : !error && slide.length ? (
        <div className="grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {slide.map((pro, index) => (
            <ProductCard product={pro} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex items-center flex-col pb-[50px]">
          <LottieImage src="https://assets7.lottiefiles.com/packages/lf20_0s6tfbuc.json" />
          <p>
            No Items In this page
            <Link href={`/`} className="text-main-color underline ml-1">
              Go to Home Page
            </Link>
          </p>
        </div>
      )}
      <div className="py-4 px-5 mt-8 flex w-full justify-between items-center bg-[#828BB3]  h-[70px]">
        {!error || !isLoading ? <Pages pageNumber={pageNumber} /> : null}
      </div>
    </div>
  );
}
