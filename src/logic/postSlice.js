import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    title: "Title 1",
    content: "Content Details 1",
  },
  {
    id: nanoid(),
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
export const postsSelector = (state) => state.posts;

export default postSlice.reducer;
