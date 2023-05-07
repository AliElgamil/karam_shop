import Helmet from "@/components/Helmet";
import Banner from "@/components/banner";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHook";
import { getAllProducts, getSlide } from "@/store/products";

export default function Shop() {
  const dispatch = useAppDispatch();
  const { products, slide, slides } = useAppSelector(
    (state) => state.products
  );
  const router = useRouter();
  const { pageNumber } = router.query;

  useEffect(() => {
    const unsubscrib = setTimeout(() => {
      if (!products.length) {
        dispatch(getAllProducts());
      }
    }, 500);

    return () => clearTimeout(unsubscrib);
  }, [dispatch, pageNumber, products.length, router]);

  useEffect(() => {
    const unsubscrib = setTimeout(() => {
      dispatch(
        getSlide({
          slides: [...slides],
          pageNumber: pageNumber ? +pageNumber : 1,
        })
      );
    }, 100);
    return () => clearTimeout(unsubscrib);
  }, [dispatch, pageNumber, slides]);

  return (
    <div className="shop">
      <Helmet title="Shop" />
      <Banner>
        <div className="container m-auto">
          <h1 className="text-[24px]  lg:text-[36px] pt-[25vh] pb-[90px] font-semibold text-white text-right ">
            Shop Category page
          </h1>
        </div>
      </Banner>
      <div className="py-[70px]">
        <div className="container m-auto flex gap-8 grow">
          <Filter />
          <Pagination
            slide={slide || []}
            pageNumber={pageNumber ? +pageNumber : 1}
          />
        </div>
      </div>
    </div>
  );
}
