import {
  product,
  products,
  getSlideProps,
  sortProductsProps,
  category,
  filterCategoryProps,
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
  filteredProducts: [],
  catagories: [],
  filteredCatagories: [],
  slides: [],
  slide: [],
  sortType: "",
  isLoading: true,
  error: false,
  maxPrice: 5000,
  minPrice: 0,
  filterShow: false,
  singleProduct: null,
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
export const getAllCatagories = createAsyncThunk<category[]>(
  "productSlice/getAllCatagories",
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
    filterCategory: (state, action: PayloadAction<filterCategoryProps>) => {
      const { category, catagories } = action.payload;
      const existingCategory = catagories.includes(category);
      let filteredCatagories: string[];

      if (existingCategory) {
        filteredCatagories = catagories.filter((cat) => category !== cat);
      } else {
        filteredCatagories = [...catagories, category];
      }

      state.filteredCatagories = [...filteredCatagories];
    },
    filterPrice: (state, action: PayloadAction<filterPriceProps>) => {
      const { catagories, products, sortType, maxPrice, minPrice } =
        action.payload;

      const filterProducts = filter(products, catagories, maxPrice, minPrice);

      const sort = ProductSorted([...filterProducts], sortType);
      const slides = slideSlices([...sort]);
      state.sortType = sortType;
      state.slides = [...slides];
    },
    filterShowSet: (state, action: PayloadAction<boolean>) => {
      state.filterShow = action.payload;
    },
    getProduct: (
      state,
      action: PayloadAction<{ products: product[]; id: number }>
    ) => {
      const { products, id } = action.payload;

      const product = products.find((product) => product.id === id);

      state.singleProduct = product ? product : null;
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
    builder.addCase(getAllCatagories.fulfilled, (state, { payload }) => {
      const categories = payload.map((category) => category.name);
      state.catagories = categories;
      state.filteredCatagories = categories;
      state.isLoading = false;
    });
    builder.addCase(getAllCatagories.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(getAllCatagories.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {
  getSlide,
  sortProducts,
  filterCategory,
  filterPrice,
  filterShowSet,
  getProduct,
} = productSlice.actions;

export default productSlice.reducer;
