import React, { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import { newCollection } from "@/constant/heroSection";
import { useAppDispatch } from "@/hook/reduxHook";
import { addToCart } from "@/store/cart";
import { product } from "@/helpers/types";

const dealOff: (price: number) => {
  finalPrice: number;
  percentageDeal: string;
} = (price) => {
  const finalPrice = price - 15;
  const percentageDeal = (100 - (finalPrice / price) * 100).toFixed(0) + "%";

  return {
    finalPrice,
    percentageDeal,
  };
};

export default function HeroSection() {
  const dispatch = useAppDispatch();

  const renderBullet = (index: number, className: string) => {
    const item = newCollection[index];
    return `<span class="${className}"><img src='${item.images[1]}' width='70px' height='70px' alt='shoes' /></span>`;
  };

  const addProduct = (pro: product) =>
    dispatch(
      addToCart({
        id: pro.id,
        title: pro.title,
        price: pro.price,
        quantity: 1,
        totalPrice: pro.price,
        images: pro.images,
        finalPrice: pro.finalPrice ? pro.finalPrice : 0,
      })
    );

  return (
    <div className="container m-auto hero">
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet,
        }}
        className="min-h-[100vh] max-w-full"
        autoplay={true}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        effect="slide"
        navigation={true}
      >
        {newCollection.map((item, index) => {
          const deal = dealOff(item.price);
          return (
            <SwiperSlide
              className={`bg-transparent min-h-full h-auto py-8`}
              key={index}
            >
              <div
                className={`flex-col-reverse lg:flex-row min-h-full flex items-center justify-center gap-5 px-4 ${item.animate}`}
              >
                <div className="flex flex-col gap-4 max-w-[500px] transition duration-700 delay-200">
                  <h2 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-semibold text-head-color">
                    {item.title}
                  </h2>
                  <p className="text-[.8rem]">{item.description}</p>
                  <span className="flex gap-4 items-center">
                    <span className="text-white bg-red-600 p-1 rounded-sm">
                      {deal.percentageDeal} off
                    </span>
                    <span className="text-head-color">{deal.finalPrice}$</span>
                    <del>{item.price}$</del>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-3"
                      onClick={() =>
                        addProduct({
                          images: item.images,
                          title: item.title,
                          price: item.price,
                          finalPrice: deal.finalPrice,
                          id: item.id,
                        })
                      }
                    >
                      <span className="w-[50px] h-[50px] rounded-full gradient-btn grid place-items-center text-white">
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
                      </span>
                      <span className="uppercase text-head-color text-[12px] font-medium">
                        Add to bag
                      </span>
                    </button>
                  </div>
                </div>
                <div className="transition duration-700 delay-200">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    priority
                    width={640}
                    height={380}
                    className="w-auto"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
