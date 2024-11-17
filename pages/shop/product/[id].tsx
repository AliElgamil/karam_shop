import Banner from "@/components/banner";
import Helmet from "@/components/Helmet";
import ImageLazy from "@/components/ImageLazy";
import { product } from "@/helpers/types";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { PRODUCT_API } from "@/routes";
import { ParsedUrlQuery } from "querystring";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { dealOff } from "@/helpers/functions";
import ProductSlide from "@/components/productSlide";
import { Fragment, useRef } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { productStyle } from "@/components/styles";
import { useAppDispatch } from "@/hook/reduxHook";
import { addToCart } from "@/store/cart";

export default function Product({
  product,
  suggestedProduct,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dispatch = useAppDispatch();
  const inputQun = useRef<HTMLInputElement>(null);
  const renderBullet = (_: any, className: string) => {
    return `<span class="${className}"></span>`;
  };

  const { finalPrice, percentageDeal } = dealOff(product.price);

  const addToCard = (e: any) => {
    e.preventDefault();
    const qun = inputQun.current?.value ? +inputQun.current?.value : 1;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        finalPrice,
        quantity: qun,
        images: product.images,
      })
    );
  };

  return (
    <div className="single_product">
      <Helmet title="Product" />
      <Banner>
        <div className="container m-auto">
          <h1 className="text-[24px]  lg:text-[36px] pt-[25vh] pb-[90px] font-semibold text-white text-right ">
            Product Details Page
          </h1>
        </div>
      </Banner>
      <div className="py-[70px]">
        <div className="container m-auto">
          <div className="flex  flex-wrap">
            <div className="flex flex-col w-full lg:w-[40%]">
              <Swiper
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  renderBullet,
                }}
                className="max-w-full"
                autoplay={true}
                loop={true}
                modules={[Pagination, Autoplay]}
                effect="slide"
              >
                {product.images.map((item, index) => {
                  return (
                    <SwiperSlide
                      className={`bg-transparent min-h-full h-auto `}
                      key={index}
                    >
                      <ImageLazy src={`${item}`} alt={product.title} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="grow lg:w-[60%] px-[5%] pt-6 flex flex-col">
              <h2 className="text-head-color font-medium text-[24px]">
                {product.title}
              </h2>
              <div className="flex gap-4 text-[24px]  mt-3 items-center">
                <span className="text-main-color font-bold">${finalPrice}</span>
                {finalPrice !== product.price ? (
                  <Fragment>
                    <del>${product.price}</del>
                    <span className="text-white bg-red-600 p-1 rounded-sm">
                      {percentageDeal}
                    </span>
                  </Fragment>
                ) : null}
              </div>
              <ul className="mt-8">
                <li>
                  <span>Category:</span>
                  <span className="pl-6 text-main-color">
                    {product.category?.name}
                  </span>
                </li>
              </ul>
              <p className="mt-8 pt-8 border-t-2 border-gray-300">
                {product.description}
              </p>

              <div className="pt-[30px]">
                <form
                  action=""
                  className="flex gap-2 items-center"
                  onSubmit={addToCard}
                >
                  <input
                    type="number"
                    placeholder="Type here"
                    min={1}
                    defaultValue={1}
                    className="input input-bordered input-warning w-[150px] max-w-xs bg-transparent"
                    ref={inputQun}
                  />
                  <button
                    type="submit"
                    className="gradient-btn text-white py-2 px-4 rounded-md uppercase"
                  >
                    Add to card
                  </button>

                  <button
                    type="button"
                    className={`${productStyle.buttonIcon} hover:bg-gradient-to-r hover:from-[#ffba00] hover:to-[#ff6c00] p-0 w-[40px] h-[40px] flex justify-center items-center outline-none`}
                  >
                    <HeartIcon className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="pt-[70px]">
            <h2 className="text-[2rem] text-head-color">You might also like</h2>

            <div className="w-[80%] suggested">
              <ProductSlide
                products={suggestedProduct}
                slidesViewLg={3}
                slidesViewSm={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${PRODUCT_API}/products`);
  const products: product[] = await res.json();

  const paths = products.map((product) => ({
    params: {
      id: `${product.id}`,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface contextParams extends ParsedUrlQuery {
  id: string;
}

type dataProps = { product: product; suggestedProduct: product[] };

export const getStaticProps: GetStaticProps<dataProps> = async (context) => {
  const { id } = context.params as contextParams;
  const res = await fetch(`${PRODUCT_API}/products/${id}`);
  const product: product = await res.json();
  const getData = await fetch(
    `${PRODUCT_API}/products/?categoryId=${product.category?.id}&offset=1&limit=10`
  );
  const suggestedProduct: product[] = await getData.json();
  return {
    props: {
      product,
      suggestedProduct,
    },
    revalidate: 60 * 60 * 24,
  };
};
