import React from "react";
import { sections } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { Autoplay, Navigation } from "swiper";
import ProductCard from "@/components/ProductCard";
import { product } from "@/helpers/types";
import { dealOff } from "@/helpers/functions";

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
        <Swiper
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            568: {
              slidesPerView: 2,
            },
          }}
          autoplay={true}
          loop={true}
          modules={[Autoplay, Navigation]}
          navigation
        >
          {products?.map((product, index) => (
            <SwiperSlide className={`bg-transparent  h-auto py-8`} key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
