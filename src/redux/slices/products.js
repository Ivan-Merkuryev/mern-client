import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const { data } = await axios.get("/products");
    return data;
  }
);

export const fetchLastProducts = createAsyncThunk(
  "/products/fetchLastProducts",
  async () => {
    const { data } = await axios.get("/productslast");
    return data;
  }
);

export const fetchRemoveProduct = createAsyncThunk(
  "/products/fetchRemoveProduct",
  async (id) => {
    axios.delete(`/products/${id}`);
  }
);

const initialState = {
  products: {
    items: [],
    status: "loading",
  },
  lastProducts: {
    items: [],
    status: "loading",
  },
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products.items = [];
      state.products.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = "loaded";
    },
    [fetchProducts.rejected]: (state) => {
      state.products.items = [];
      state.products.status = "error";
    },
    ////последние 2 товара
    [fetchLastProducts.pending]: (state) => {
      state.lastProducts.items = [];
      state.lastProducts.status = "loading";
    },
    [fetchLastProducts.fulfilled]: (state, action) => {
      state.lastProducts.items = action.payload;
      state.lastProducts.status = "loaded";
    },
    [fetchLastProducts.rejected]: (state) => {
      state.lastProducts.items = [];
      state.lastProducts.status = "error";
    },
    ///Удаление товара
    [fetchRemoveProduct.pending]: (state, action) => {
      state.products.items = state.products.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const productsReducer = ProductsSlice.reducer;
