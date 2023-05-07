"use client";
import React, { Fragment, useEffect, useState } from "react";
import { header } from "../styles";
import { useAppSelector } from "@/hook/reduxHook";
import Link from "next/link";
import NoCartItem from "./NoCartItem";
import CartItem from "../cartItem";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartModal() {
  const { totalQuantity, cartItems, totalPrice } = useAppSelector(
    (state) => state.cart
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    const windowClick = () => setShow(false);
    window.addEventListener("click", windowClick);

    return () => window.removeEventListener("click", windowClick);
  }, []);

  const showCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setShow(!show);
  };

  const stopClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      <button
        className={`${header.navBtn} hover:text-main-color relative`}
        type="button"
        onClick={showCart}
      >
        <span className="hidden">icon</span>
        {totalQuantity ? (
          <span className="absolute -top-4 -right-3 rounded-full bg-[var(--main-color)] text-white text-[.7rem] w-5 h-5 leading-5">
            {totalQuantity}
          </span>
        ) : null}
        <ShoppingCartIcon className="w-6 h-6" />
      </button>

      {show ? (
        <ul
          className="absolute w-[500px] h-[313px] bg-white shadow-lg right-0 bottom-0 translate-y-[338px] grid grid-rows-[1fr_auto] rounded-b-md"
          onClick={stopClick}
        >
          <li className="cart_item-list">
            <ul className="px-4 max-h-[235px] overflow-auto h-full">
              {!cartItems.length ? (
                <NoCartItem />
              ) : (
                cartItems.map((cartItem) => (
                  <CartItem item={cartItem} key={cartItem.id} />
                ))
              )}
            </ul>
          </li>
          <li className="flex justify-between w-full py-3 px-4 border-t-[1px] border-gray-300">
            <div className="cart_bottom flex items-center justify-between w-full">
              <h6>
                <span>${totalPrice}</span>
              </h6>
              <button
                className={`gradient-btn text-white rounded-md py-3 px-5 ${
                  !cartItems.length ? "opacity-70 pointer-events-none" : ""
                }`}
                type="button"
              >
                <Link href="/checkout"> Checkout</Link>
              </button>
            </div>
          </li>
        </ul>
      ) : null}
    </Fragment>
  );
}
