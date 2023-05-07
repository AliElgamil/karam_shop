"use client";
import React from "react";

type props = {
  max: number;
  value: number;
  label: string;
  setInputValue: (value: number) => void;
};

export default function InputRange({
  max,
  value,
  label,
  setInputValue,
}: props) {
  const handleChange = (e: any) => {
    setInputValue(+e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="range_2"
        className="block mb-2 text-sm font-medium text-head-color capitalize"
      >
        {label}
      </label>
      <input
        id="range_2"
        type="range"
        min="0"
        max={max}
        step={10}
        defaultValue={value}
        onChange={handleChange}
        className="range range-warning input_range range-xs"
      />
      <span>${value}</span>
    </div>
  );
}
