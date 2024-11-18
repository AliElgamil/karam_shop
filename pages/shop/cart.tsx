import Banner from "@/components/banner";
import Helmet from "@/components/Helmet";
import CartItem from "@/components/cartItem";
import { useAppSelector } from "@/hook/reduxHook";
import React from "react";
import Link from "next/link";
import { SHOP } from "@/routes";
import Transition from "@/components/transition";

export default function Cart() {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  return (
    <Transition>
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
          <div className="container m-auto flex gap-8 grow">
            {cartItems.length ? (
              <div className="flex flex-wrap flex-col grow gap-8 max-w-[600px] m-auto">
                <ul className="flex flex-col gap-4 grow">
                  {cartItems.map((cartItem, index) => (
                    <CartItem item={cartItem} key={index} />
                  ))}
                  <li className="flex grow justify-between text-head-color items-baseline">
                    <h2 className="text-[1.5rem] font-bold">Subtotal</h2>
                    <span className="text-[1.2rem] font-bold">
                      ${totalPrice}
                    </span>
                  </li>
                </ul>
                <div>
                  <Link
                    href={`${SHOP}/checkout`}
                    className="gradient-btn py-3 px-8 rounded-lg capitalize text-white"
                  >
                    checkout
                  </Link>
                </div>
              </div>
            ) : (
              <p>No Items</p>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
}
