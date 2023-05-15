"use client";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHook";
import {
  filterCategory,
  filterPrice,
  getAllCatagories as getAllCatagories,
  filterShowSet,
} from "@/store/products";
import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useState } from "react";
import InputRange from "../range";

export default function Filter() {
  const dispatch = useAppDispatch();
  const {
    catagories,
    filteredCatagories,
    products,
    sortType,
    maxPrice,
    minPrice,
    filterShow,
  } = useAppSelector((state) => state.products);
  const [maxPriceVal, setMaxPriceVal] = useState<number>(5000);
  const [minPriceVal, setMinPriceVal] = useState<number>(0);

  useEffect(() => {
    if (!catagories.length) dispatch(getAllCatagories());
  }, [catagories.length, dispatch]);

  const checked = (e: any) => {
    const inputValue: string = e.target.value;
    dispatch(
      filterCategory({
        category: inputValue,
        catagories: [...filteredCatagories],
      })
    );
  };

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      dispatch(
        filterPrice({
          catagories: [...filteredCatagories],
          products: [...products],
          sortType,
          maxPrice: maxPriceVal,
          minPrice: minPriceVal,
        })
      );
    }, 100);
    return () => clearTimeout(unsubscribe);
  }, [
    dispatch,
    filteredCatagories,
    maxPrice,
    maxPriceVal,
    minPrice,
    minPriceVal,
    products,
    sortType,
  ]);

  const filterHandler = useCallback(() => {
    dispatch(filterShowSet(!filterShow));
  }, [dispatch, filterShow]);

  return (
    <div
      className={`xl:w-[300px] w-full fixed top-0 left-0 z-50  xl:static xl:z-0 xl:bg-transparent h-full transition-all ${
        filterShow
          ? "translate-x-0 opacity-100"
          : "-translate-x-full xl:translate-x-0 opacity-0 xl:opacity-100"
      }`}
    >
      <div
        className="inset-0 absolute bg-black/50 -z-10"
        onClick={filterHandler}
      ></div>
      <div className="max-w-[300px] bg-white h-full">
        <div className="py-4 px-5 mb-8 h-[70px] flex w-full justify-between items-center bg-[#828BB3] ">
          <h2 className="text-[1.3rem] text-white">catagories</h2>
        </div>

        <ul className="flex gap-4 flex-col px-4 max-h-[300px] overflow-auto">
          {catagories.map((cat, index) => (
            <li key={index} className="grow flex justify-between relative">
              <input
                type="checkbox"
                id={`cat-${index + 1}`}
                className="cursor-pointer hidden input_check"
                defaultValue={cat}
                defaultChecked={true}
                onChange={checked}
              />
              <label
                htmlFor={`cat-${index + 1}`}
                className="grow cursor-pointer flex justify-between items-center after:w-4 after:h-4 after:border after:border-1 after:block"
              >
                <span>{cat}</span>
                <CheckIcon className="w-7 h-7 text-main-color absolute -right-[9px] -top-[4px] hidden" />
              </label>
            </li>
          ))}
        </ul>

        <div className="py-4 px-5 my-8 h-[70px] flex w-full justify-between items-center bg-[#828BB3] ">
          <h2 className="text-[1.3rem] text-white">Price</h2>
        </div>

        <div className="px-4">
          <InputRange
            label={"min price"}
            value={minPriceVal <= maxPriceVal ? minPriceVal : maxPriceVal}
            max={maxPriceVal}
            setInputValue={setMinPriceVal}
          />
          <InputRange
            label={"max price"}
            value={maxPriceVal}
            max={maxPrice}
            setInputValue={setMaxPriceVal}
          />
        </div>
      </div>
    </div>
  );
}
