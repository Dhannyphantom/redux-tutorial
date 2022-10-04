import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URI = "https://jsonplaceholder.typicode.com/posts";

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

export const addANewPost = createAsyncThunk(
  "posts/addANewPost",
  async (post_data) => {
    post_data.body = post_data.content;
    delete post_data.content;
    const res = await axios.post(POSTS_URI, post_data);

    return res.data;
  }
);

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  post.form.body = post.form.content;

  delete post.form.body;
  const res = await axios.put(`${POSTS_URI}/${post.postId}`, post.form);

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
    builder.addCase(addANewPost.fulfilled, (state, action) => {
      action.payload.reactions = reactions_obj;
      action.payload.date = new Date().toISOString();
      action.payload.userId = Number(action.payload.userId);

      state.posts.push(action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      action.payload.reactions = reactions_obj;
      action.payload.date = new Date().toISOString();
      action.payload.userId = Number(action.payload.userId);

      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }

        return post;
      });

      state.posts = updatedPosts;
    });
  },
});

export const { addNewPost, updateReaction } = postSlice.actions;

export const postsSelector = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getPostById = (state, postId) =>
  state.posts.posts.find((post_data) => post_data.id === postId);

export default postSlice.reducer;
