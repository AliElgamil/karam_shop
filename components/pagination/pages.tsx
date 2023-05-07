"use client";
import { useAppSelector } from "@/hook/reduxHook";
import { SHOP } from "@/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

type pagesProps = {
  pageNumber: number;
};

export default function Pages({ pageNumber }: pagesProps) {
  const router = useRouter();
  const { filtredProducts, slides } = useAppSelector((state) => state.products);
  const start = useCallback(() => {
    const startNumber = pageNumber - 1;
    if (pageNumber === 1) return 1;
    else if (pageNumber === slides.length) return startNumber - 1;
    return startNumber;
  }, [slides.length, pageNumber]);

  const end = useCallback(() => {
    const endNumber = pageNumber + 1;
    if (pageNumber - 1 === 0) return pageNumber + 2;
    return endNumber;
  }, [pageNumber]);

  const prePage = useCallback(() => {
    router.push(`${SHOP}${pageNumber - 1}`);
  }, [pageNumber, router]);

  const nextPage = useCallback(() => {
    router.push(`${SHOP}${pageNumber + 1}`);
  }, [pageNumber, router]);
  return (
    <ul className="flex self-end text-head-color gap-2">
      {
        <li
          onClick={prePage}
          className={`${
            pageNumber !== 1 && slides.length !== 0
              ? "cursor-pointer"
              : "hide_btn opacity-70 pointer-events-none"
          } place-content-center w-[40px] h-[30px] grid`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </li>
      }

      {slides.map((_, ind) =>
        ind + 1 >= start() && ind + 1 <= end() ? (
          pageNumber === ind + 1 ? (
            <li
              key={ind * Math.random()}
              className="gradient text-white w-[30px] h-[30px] grid place-content-center"
            >
              <Link href={`${SHOP}${ind + 1}`}>{ind + 1}</Link>
            </li>
          ) : (
            <li
              key={ind * Math.random()}
              className="w-[30px] h-[30px] grid place-content-center"
            >
              <Link href={`${SHOP}${ind + 1}`}>{ind + 1}</Link>
            </li>
          )
        ) : null
      )}
      {
        <li
          className={`${
            pageNumber === slides.length || !filtredProducts.length
              ? "hide_btn opacity-70 pointer-events-none"
              : "cursor-pointer"
          } place-content-center w-[40px] h-[30px] grid`}
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </li>
      }
    </ul>
  );
}
