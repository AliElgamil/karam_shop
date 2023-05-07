"use client";
import React, { useCallback, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHook";
import { sortProducts, filterPrice } from "@/store/products";

export default function Sort() {
  const dispatch = useAppDispatch();
  const { products, filteredCatgories, minPrice, maxPrice } = useAppSelector(
    (state) => state.products
  );
  const [sortType, setSortType] = useState<string>("");

  const sort = useCallback(
    (type: string) => {
      if (type === sortType) {
        setSortType("");
        dispatch(
          filterPrice({
            products: [...products],
            catograies: [...filteredCatgories],
            sortType: "",
            maxPrice,
            minPrice,
          })
        );
      } else {
        setSortType(type);
        dispatch(
          sortProducts({
            type,
          })
        );
      }
    },
    [dispatch, filteredCatgories, maxPrice, minPrice, products, sortType]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Sort
          <AdjustmentsHorizontalIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active || sortType === "highPrice"
                      ? "bg-main-color text-white"
                      : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => sort("highPrice")}
                >
                  {active ? (
                    <ArrowLongUpIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowLongUpIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  High Price
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active || sortType === "lowPrice"
                      ? "bg-main-color text-white"
                      : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm mt-1`}
                  onClick={() => sort("lowPrice")}
                >
                  {active ? (
                    <ArrowLongDownIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowLongDownIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Low Price
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
function filterSlide(arg0: {
  products: import("../../helpers/types").product[];
  catograies: string[];
}): any {
  throw new Error("Function not implemented.");
}
