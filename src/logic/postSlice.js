import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    title: "Title 1",
    content: "Content Details 1",
  },
  {
    title: "Title 2",
    content: "Content Details 2",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const {} = postSlice.actions;

export default postSlice.reducer;
