import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type product = {
  id: number;
  title: string;
  price: number;
  finalPrice: number;
  quantity: number;
  totalPrice?: number;
  images: string[];
};

export interface cart {
  totalQuantity: number;
  totalPrice: number;
  cartItems: product[];
}

const initialState: cart = {
  totalQuantity: 0,
  totalPrice: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<product>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.finalPrice * newItem.quantity;

      if (!existItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          finalPrice: newItem.finalPrice,
          quantity: newItem.quantity,
          totalPrice: newItem.finalPrice,
          images: newItem.images ? newItem.images : [],
        });
      } else {
        existItem.quantity += newItem.quantity;
        if (existItem.totalPrice)
          existItem.totalPrice += newItem.finalPrice * newItem.quantity;
      }
    },
    inCreaseItem(state, action: PayloadAction<number>) {
      let item: product | any = state.cartItems.find(
        (item) => item.id === action.payload
      );

      item.totalPrice += item.finalPrice;
      item.quantity++;
      state.totalPrice += item.finalPrice;
      state.totalQuantity++;
    },
    deCreaseItem(state, action: PayloadAction<number>) {
      const item: product | any = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      } else {
        item.totalPrice -= item.finalPrice;
        item.quantity--;
      }
      state.totalPrice -= item.finalPrice;
      state.totalQuantity--;
    },
    removeItem(state, action: PayloadAction<number>) {
      const itemCart: product | any = state.cartItems.find(
        (item) => item.id === action.payload
      );
      state.totalQuantity -= itemCart.quantity;
      state.totalPrice -= itemCart.totalPrice;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== itemCart.id
      );
    },
  },
});

export const { addToCart, deCreaseItem, inCreaseItem, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
