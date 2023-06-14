import Banner from "@/components/banner";
import Helmet from "@/components/Helmet";

export default function Checkout() {
  return (
    <div>
      <Helmet title="Cart" />
      <Banner>
        <div className="container m-auto">
          <h1 className="text-[24px]  lg:text-[36px] pt-[25vh] pb-[90px] font-semibold text-white text-right ">
            Checkout
          </h1>
        </div>
      </Banner>
    </div>
  );
}
