"use client";
import { product } from "@/helpers/types";
import React from "react";
import ImageLazy from "../ImageLazy";
import { useAppDispatch } from "@/hook/reduxHook";
import { deCreaseItem, inCreaseItem, removeItem } from "@/store/cart";

type item = {
  item: product;
};

export default function CartItem({ item }: item) {
  const dispatch = useAppDispatch();

  const removeItemFromCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(removeItem(item.id));
  };

  const deCreaseItemFun = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(deCreaseItem(item.id));
  };

  const inCreaseItemFun = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(inCreaseItem(item.id));
  };

  return (
    <li className="cart_item-info flex  gap-3 border-b-[1px] border-gray-300 last-of-type:border-0 py-3">
      <div className="image max-w-[70px]">
        <ImageLazy src={item.images[0]} alt={item.title} />
      </div>
      <div className="cart_product-info flex gap-5 items-center justify-between w-full">
        <div>
          <h6 className="cart_product-name">{item.title}</h6>
          <p className="flex items-center gap-5 cart_product-price">
            <span>
              <b>{item.quantity}</b>x ${item.finalPrice}
            </span>
            <span>${item.totalPrice}</span>
          </p>
        </div>
        <div className="flex items-center justify-between  gap-3 inc_dec-btn">
          <button
            type="button"
            className="gradient-btn text-white rounded-sm"
            onClick={inCreaseItemFun}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <span className="text-[1.2rem] inline-block w-4 text-center">
            {item.quantity}
          </span>
          <button
            type="button"
            className="gradient-btn text-white rounded-sm"
            onClick={deCreaseItemFun}
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
                d="M19.5 12h-15"
              />
            </svg>
          </button>
          <button
            className=" bg-red-600 p-1 text-white rounded-sm"
            type="button"
            onClick={removeItemFromCart}
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
