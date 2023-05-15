import React from "react";
import { sections } from "./styles";

import useSWR from "swr";
import { product } from "@/helpers/types";
import { dealOff } from "@/helpers/functions";
import ProductSlide from "@/components/productSlide";

type productProps = {
  title: string;
  url: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Products({ title, url }: productProps) {
  const { data } = useSWR<product[]>(url, fetcher);

  const products: product[] = data
    ? data.map((product) => {
        const { finalPrice, percentageDeal } = dealOff(product.price);
        return { ...product, finalPrice, percentageDeal };
      })
    : [];
  return (
    <section className={`${sections.sectionPadding} products`}>
      <h2 className="text-[36px] text-head-color text-center mb-8">{title}</h2>

      <div className="container m-auto">
        <ProductSlide products={products} />
      </div>
    </section>
  );
}
