import {
  product,
  products,
  filterProps,
  getSlideProps,
  sortProductsProps,
  category,
  filterCatgoryProps,
  filterPriceProps,
} from "@/helpers/types";
import {
  ProductSorted,
  dealOff,
  filter,
  slideSlices,
} from "@/helpers/functions";
import { PRODUCT_API } from "@/routes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: products = {
  products: [],
  filtredProducts: [],
  catograies: [],
  filteredCatgories: [],
  slides: [],
  slide: [],
  sortType: "",
  isLoading: true,
  error: false,
  maxPrice: 5000,
  minPrice: 0,
  filterShow: false,
};

export const getAllProducts = createAsyncThunk<product[]>(
  "productSlice/getAllProducts",
  async () => {
    const url = `${PRODUCT_API}/products/`;
    const res = await fetch(url);
    const data: product[] = await res.json();

    const products: product[] = data.map((product) => {
      const { finalPrice, percentageDeal } = dealOff(product.price);
      return { ...product, finalPrice, percentageDeal };
    });
    return products;
  }
);
export const getAllCatgories = createAsyncThunk<category[]>(
  "productSlice/getAllCatgories",
  async () => {
    const url = `${PRODUCT_API}/categories/`;
    const res = await fetch(url);
    const data: category[] = await res.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getSlide: (state, action: PayloadAction<getSlideProps>) => {
      const { pageNumber, slides } = action.payload;

      const index = pageNumber - 1;

      if (index < 0 || index > slides.length - 1 || isNaN(pageNumber))
        state.error = true;
      else if (slides.length) {
        state.slide = [...slides[index]];
        state.error = false;
      }
    },
    sortProducts: (state, action: PayloadAction<sortProductsProps>) => {
      const { type } = action.payload;
      state.sortType = type;
    },
    filterCatgory: (state, action: PayloadAction<filterCatgoryProps>) => {
      const { category, catograies } = action.payload;
      const existingCategory = catograies.includes(category);
      let filteredCatgories: string[];

      if (existingCategory) {
        filteredCatgories = catograies.filter((cat) => category !== cat);
      } else {
        filteredCatgories = [...catograies, category];
      }

      state.filteredCatgories = [...filteredCatgories];
    },
    filterPrice: (state, action: PayloadAction<filterPriceProps>) => {
      const { catograies, products, sortType, maxPrice, minPrice } =
        action.payload;

      const filterProducts = filter(products, catograies, maxPrice, minPrice);

      const sort = ProductSorted([...filterProducts], sortType);
      const slides = slideSlices([...sort]);
      state.sortType = sortType;
      state.slides = [...slides];
    },
    filterShowSet: (state, action: PayloadAction<boolean>) => {
      state.filterShow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCatgories.fulfilled, (state, { payload }) => {
      const categories = payload.map((category) => category.name);
      state.catograies = categories;
      state.filteredCatgories = categories;
      state.isLoading = false;
    });
    builder.addCase(getAllCatgories.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(getAllCatgories.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {
  getSlide,
  sortProducts,
  filterCatgory,
  filterPrice,
  filterShowSet,
} = productSlice.actions;

export default productSlice.reducer;
