// Global Types
export type product = {
  images: string[];
  title: string;
  price: number;
  finalPrice: number;
  id: number;
  quantity?: number;
  totalPrice?: number;
  category?: {
    name: string;
  };
  percentageDeal?: string;
  url?: string;
};

// Redux Types
export type products = {
  products: product[];
  filtredProducts: product[];
  catograies: string[];
  filteredCatgories: string[];
  slides: product[][];
  slide: product[];
  sortType: string;
  isLoading: boolean;
  error: boolean;
  maxPrice: number;
  minPrice: number;
  filterShow: boolean;
};
export type category = {
  name: string;
};

export type filterProps = {
  products: product[];
  catograies: string[];
};

export type getSlideProps = {
  pageNumber: number;
  slides: product[][];
};

export type sortProductsProps = {
  type: string;
};

export type filterCatgoryProps = {
  category: string;
  catograies: string[];
};

export type filterPriceProps = {
  catograies: string[];
  products: product[];
  sortType: string;
  maxPrice: number;
  minPrice: number;
};
