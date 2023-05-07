import Image from "next/image";
import React from "react";
import { sections } from "./styles";

const brands = [
  {
    url: "/brands/1.webp",
  },
  {
    url: "/brands/2.webp",
  },
  {
    url: "/brands/3.webp",
  },
  {
    url: "/brands/4.webp",
  },
  {
    url: "/brands/5.webp",
  },
];

export default function Brands() {
  return (
    <section className={sections.sectionPadding}>
      <div className="flex lg:gap-[112px] md:gap-[56px] gap-[30px] justify-center px-[15px]">
        {brands.map((brand, ind) => (
          <div
            key={ind}
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <Image
              src={brand.url}
              alt=""
              width={118}
              height={70}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
