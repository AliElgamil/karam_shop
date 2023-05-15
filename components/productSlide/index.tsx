import { product } from "@/helpers/types";
import React, { Fragment } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import ProductCard from "@/components/ProductCard";
type productSlideProps = {
  products: product[];
  slidesViewLg?: number;
  slidesViewSm?: number;
};

export default function ProductSlide({
  products,
  slidesViewLg = 4,
  slidesViewSm = 2,
}: productSlideProps) {
  return (
    <Fragment>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: slidesViewLg,
          },
          568: {
            slidesPerView: slidesViewSm,
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
    </Fragment>
  );
}
// export default function ProductSlide({ products }: productSlideProps) {
//   return (
//     <Fragment>
//       {products?.map((product, index) => (
//         <SwiperSlide className={`bg-transparent  h-auto py-8`} key={index}>
//           <ProductCard product={product} />
//         </SwiperSlide>
//       ))}
//     </Fragment>
//   );
// }
