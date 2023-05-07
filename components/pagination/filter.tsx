"use client";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHook";
import { filterShowSet } from "@/store/products";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";

export default function FilterButton() {
  const dispatch = useAppDispatch();
  const { filterShow } = useAppSelector((state) => state.products);

  const filterHandler = useCallback(() => {
    dispatch(filterShowSet(!filterShow));
  }, [dispatch, filterShow]);

  return (
    <div className="relative inline-block text-left xl:hidden">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={filterHandler}
        >
          Filter
          <FunnelIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
