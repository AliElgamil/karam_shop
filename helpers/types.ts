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
    id?: number;
  };
  percentageDeal?: string;
  url?: string;
  description?: string;
};

// Redux Types
export type products = {
  products: product[];
  filteredProducts: product[];
  catagories: string[];
  filteredCatagories: string[];
  slides: product[][];
  slide: product[];
  sortType: string;
  isLoading: boolean;
  error: boolean;
  maxPrice: number;
  minPrice: number;
  filterShow: boolean;
  singleProduct: null | product;
};
export type category = {
  name: string;
};

export type filterProps = {
  products: product[];
  catagories: string[];
};

export type getSlideProps = {
  pageNumber: number;
  slides: product[][];
};

export type sortProductsProps = {
  type: string;
};

export type filterCategoryProps = {
  category: string;
  catagories: string[];
};

export type filterPriceProps = {
  catagories: string[];
  products: product[];
  sortType: string;
  maxPrice: number;
  minPrice: number;
};
