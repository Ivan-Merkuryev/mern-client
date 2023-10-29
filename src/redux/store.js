import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { productsReducer } from "./slices/products";
import { authReducer } from "./slices/auth";
import { memberReducer } from "./slices/member";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    products: productsReducer,
    auth: authReducer,
    member: memberReducer
  },
});

export default store;
