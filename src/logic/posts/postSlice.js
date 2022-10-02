import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const reactions_obj = {
  thumb: 0, //👊
  wow: 0, //😃
  heart: 0, // 💖
  rocket: 0, //🚀
  coffee: 0, // 🍥
};

const initialState = [
  {
    id: nanoid(),
    title: "Title 1",
    content: "Content Details 1",
    reactions: reactions_obj,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: nanoid(),
    title: "Title 2",
    reactions: reactions_obj,
    content: "Content Details 2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(form) {
        return {
          payload: {
            ...form,
            reactions: reactions_obj,
            id: nanoid(),
            date: new Date().toISOString(),
          },
        };
      },
    },
    updateReaction(state, action) {
      const { postId, reaction } = action.payload;

      const post = state.find((post_data) => post_data.id === postId);

      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
});

export const { addNewPost, updateReaction } = postSlice.actions;
export const postsSelector = (state) => state.posts;

export default postSlice.reducer;
