import Helmet from "@/components/Helmet";
import Banner from "@/components/banner";
import HeroSection from "@/sections/HeroSection";
import Features from "@/sections/Features";
import Catagories from "@/sections/catagories";
import Products from "@/sections/Products";
import DealArea from "@/sections/DealArea";
import Brands from "@/sections/Brands";
import { PRODUCT_API } from "@/routes";
import Transition from "@/components/transition";

const productSection = [
  {
    title: "Latest Products",
  },
  {
    title: "Coming Products",
  },
];

export default function Home() {
  return (
    <Transition>
      <Helmet title="Home" />
      <Banner>
        <HeroSection />
      </Banner>
      <Features />
      <Catagories />
      {productSection.map((productSection, index) => (
        <Products
          title={productSection.title}
          url={`${PRODUCT_API}/products/?offset=${(index + 1) * 10}&limit=10`}
          key={index}
        />
      ))}
      <DealArea />
      <Brands />
    </Transition>
  );
}
