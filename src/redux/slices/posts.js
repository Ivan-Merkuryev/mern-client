import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "/posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

export const fetchLastPosts = createAsyncThunk(
  "/posts/fetchLastPosts",
  async () => {
    const { data } = await axios.get("/postslast");
    return data;
  }
);

export const fetchFeed = createAsyncThunk(
  "/posts/fetchFeed",
  async () => {
    const { data } = await axios.get("/feed");
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  lastPosts: {
    items: [],
    status: "loading",
  },
  feed: {
    items: [],
    status: "loading",
  },
};

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    ///Получение всех постов
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    ///Получение последних постов
    [fetchLastPosts.pending]: (state) => {
      state.lastPosts.items = [];
      state.lastPosts.status = "loading";
    },
    [fetchLastPosts.fulfilled]: (state, action) => {
      state.lastPosts.items = action.payload;
      state.lastPosts.status = "loaded";
    },
    [fetchLastPosts.rejected]: (state) => {
      state.lastPosts.items = [];
      state.lastPosts.status = "error";
    },
    ///Получение последних постов и товаров подписок
    [fetchFeed.pending]: (state) => {
      state.feed.items = [];
      state.feed.status = "loading";
    },
    [fetchFeed.fulfilled]: (state, action) => {
      state.feed.items = action.payload;
      state.feed.status = "loaded";
    },
    [fetchFeed.rejected]: (state) => {
      state.feed.items = [];
      state.feed.status = "error";
    },

    ///Удаление поста
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = PostsSlice.reducer;
