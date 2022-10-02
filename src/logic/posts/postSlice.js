import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URI = "https:jsonplaceholder.typicode.com/posts";

const reactions_obj = {
  thumb: 0, //👊
  wow: 0, //😃
  heart: 0, // 💖
  rocket: 0, //🚀
  coffee: 0, // 🍥
};

const initialState = {
  posts: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  const res = await axios.get(POSTS_URI);
  return res.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
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

      const post = state.posts.find((post_data) => post_data.id === postId);

      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = reactions_obj;

        return post;
      });

      state.posts = loadedPosts;
      state.status = "succeeded";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addNewPost, updateReaction } = postSlice.actions;

export const postsSelector = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export default postSlice.reducer;
