import Timer from "@/components/Timer";
import { dealArea } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { newCollection } from "@/constant/heroSection";
import Image from "next/image";
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

export default function DealArea() {
  const dispatch = useAppDispatch();

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
    <section
      className={`flex flex-col lg:flex-row deal_area min-h-[calc(100vh-80px)] flex-wrap`}
    >
      <div className={`${dealArea.title} max-w-full  py-[75px] lg:py-0`}>
        <h2 className="lg:text-[3rem] md:text-[2.5rem] xs:text-[2rem] text-[1.5rem] ">
          Exclusive Hot Deal Ends Soon!
        </h2>
        <p className=" text-[14px]">
          Who are in extremely love with eco friendly system.
        </p>
        <Timer />
      </div>
      <div className="grow lg:w-[50%] max-w-full">
        <Swiper
          slidesPerView={1}
          className="min-h-[100%]"
          autoplay={true}
          loop={true}
          modules={[Navigation, Autoplay]}
          navigation={true}
        >
          {newCollection.map((item, index) => {
            const deal = dealOff(item.price);
            return (
              <SwiperSlide
                className={`bg-transparent min-h-full h-full py-8`}
                key={index}
              >
                <div
                  className={`flex-col  min-h-full flex items-center justify-center gap-5 px-4 ${item.animate}`}
                >
                  <div className="transition duration-700 delay-200">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      priority
                      width={640}
                      height={380}
                      className="w-auto max-w-[350px]"
                    />
                  </div>
                  <div className="flex flex-col gap-4 max-w-[500px] transition duration-700 delay-200 text-center">
                    <h2 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-semibold text-head-color">
                      {item.title}
                    </h2>
                    <span className="flex gap-4 items-center justify-center">
                      <span className="text-white bg-red-600 p-1 rounded-sm">
                        {deal.percentageDeal} off
                      </span>
                      <span className="text-head-color">
                        {deal.finalPrice}$
                      </span>
                      <del>{item.price}$</del>
                    </span>
                    <p className="text-[.8rem]">{item.description}</p>

                    <div className="flex items-center gap-2 justify-center">
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
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
