import { product } from "./types";

// Redux Functions
export const slideSlices: (products: product[]) => product[][] = (products) => {
  const slides = [];

  if (products.length <= 12) return [[...products]];
  for (let i = 1; i < products.length / 12; i++) {
    const start = i * 10 - 10;
    const end = i * 10 + 2;
    slides.push(products.slice(start, end));
  }

  return slides;
};

export const filter: (
  products: product[],
  filteredCatagories: string[],
  maxPrice: number,
  minPrice: number
) => product[] = (products, filteredCatagories, maxPrice, minPrice) => {
  const productsfiltred = products.filter((p) => {
    return (
      filteredCatagories.includes(p.category ? p.category?.name : "") &&
      p.finalPrice > minPrice &&
      p.finalPrice < maxPrice
    );
  });

  return [...productsfiltred];
};

export const ProductSorted: (
  products: product[],
  sortType: string
) => product[] = (products, sortType) => {
  let productsSorted: product[];
  switch (sortType) {
    case "highPrice":
      const sortProductsHigh = products.sort(
        (b, a) => a.finalPrice - b.finalPrice
      );
      productsSorted = [...[...sortProductsHigh]];
      break;
    case "lowPrice":
      const sortProductsLow = products.sort(
        (a, b) => a.finalPrice - b.finalPrice
      );
      productsSorted = [...[...sortProductsLow]];
      break;
    default:
      productsSorted = [...[...products]];
  }

  return [...productsSorted];
};

// Products Sales Methods
export const dealOff: (price: number) => {
  finalPrice: number;
  percentageDeal: string;
} = (price) => {
  const randomSale: number[] = [0, 15, 30, 50];
  const randomIndex = Math.abs(
    Math.ceil(Math.random() * randomSale.length - 1)
  );

  const finalPrice =
    price > randomSale[randomIndex] + 50
      ? price - randomSale[randomIndex]
      : price;
  const percentageDeal = (100 - (finalPrice / price) * 100).toFixed(0) + "%";

  return {
    finalPrice: finalPrice,
    percentageDeal,
  };
};
