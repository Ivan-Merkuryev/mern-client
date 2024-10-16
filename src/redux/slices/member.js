import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchMemberInfo = createAsyncThunk(
    "/member/fetchMemberInfo",
    async () => {
      const { data } = await axios.get("/auth/member");
      return data;
    }
)

const initialState = {
  data: null,
  status: "loading",
};

const MemberSlice = createSlice({
  name: "member",
  initialState,
  extraReducers: {
    [fetchMemberInfo.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchMemberInfo.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchMemberInfo.rejected]: (state) => {
      state.status = "loading";
      state.data = null;
    },
  },
});

export const memberReducer = MemberSlice.reducer