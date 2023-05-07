import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import products from "./products";
export const store = configureStore({
  reducer: {
    cart,
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
