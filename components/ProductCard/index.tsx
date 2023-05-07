"use client";
import React, { Fragment } from "react";
import ImageLazy from "../ImageLazy";
import { productStyle } from "../styles";
import { useAppDispatch } from "@/hook/reduxHook";
import { addToCart } from "@/store/cart";
import { product } from "@/helpers/types";
import Link from "next/link";
import { SHOP } from "@/routes";

type productProps = {
  product: product;
};

export default function ProductCard({ product }: productProps) {
  const dispatch = useAppDispatch();

  const addProduct = () =>
    dispatch(
      addToCart({
        images: product.images,
        title: product.title,
        price: product.price,
        finalPrice: product.finalPrice ? product.finalPrice : 0,
        id: product.id,
        quantity: 1,
      })
    );

  return (
    <div
      className={`flex-col flex items-center justify-center gap-5 px-4 group`}
    >
      <div className="transition duration-700 delay-200 w-full">
        <ImageLazy
          src={product.images[0]}
          alt={product.title}
          addClass="min-h-[210px]"
          imgClass="group-hover:rotate-[10deg] group-hover:scale-[1.25] min-h-[210px] max-h-[270px]"
        />
      </div>
      <div className="flex flex-col items-start w-full gap-4 max-w-[500px] transition duration-700 delay-200">
        <h3 className="text-head-color font-bold ">{product.title}</h3>
        <p className="flex gap-2 items-center">
          <span className="text-head-color font-bold">
            ${product.finalPrice}
          </span>
          {product.percentageDeal === "0%" ? null : (
            <Fragment>
              <del>${product.price}</del>
              <span className="text-white bg-red-600 p-1 rounded-sm">
                {product.percentageDeal} off
              </span>
            </Fragment>
          )}
        </p>

        <ul className="flex gap-2">
          <li>
            <button
              className={productStyle.button}
              onClick={() => addProduct()}
              type="button"
            >
              <span className={productStyle.buttonIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </span>
              <span className={productStyle.buttonText}>Add to bag</span>
            </button>
          </li>
          <li>
            <button className={productStyle.button} type="button">
              <span className="p-2 rounded-full bg-[var(--main-color)] text-white relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </span>
              <span className={productStyle.buttonText}>wishlist</span>
            </button>
          </li>
          <li>
            <Link
              href={`${SHOP}product/${product.id}`}
              className={productStyle.button}
            >
              <span className="p-2 rounded-full bg-[var(--main-color)] text-white relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </span>
              <span className={productStyle.buttonText}>view more</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
