import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
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

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// postAdapter.getInitialState will automatically generate
// ids: [1,3,4,5...] AND
// entities data object lookup;

const initialState = postAdapter.getInitialState({
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  count: 0,
});

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
  post.body = post.content;

  delete post.content;
  const res = await axios.put(`${POSTS_URI}/${post.id}`, post);

  return res.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  const { id } = post;
  await axios.delete(`${POSTS_URI}/${id}`);

  return post;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateReaction(state, action) {
      const { postId, reaction } = action.payload;

      const post = state.entities[postId];

      if (post) {
        post.reactions[reaction]++;
      }
    },
    increaseCount(state) {
      state.count += 1;
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

      state.status = "succeeded";
      postAdapter.upsertMany(state, loadedPosts);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addANewPost.fulfilled, (state, action) => {
      action.payload.reactions = reactions_obj;
      action.payload.date = new Date().toISOString();
      action.payload.userId = Number(action.payload.userId);

      postAdapter.addOne(state, action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      action.payload.date = new Date().toISOString();
      action.payload.userId = Number(action.payload.userId);
      // state.posts = updatedPosts;
      postAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const { id } = action.payload;

      postAdapter.removeOne(state, id);
    });
  },
});

export const { addNewPost, updateReaction, increaseCount } = postSlice.actions;

export const {
  selectAll: postsSelector,
  selectIds: getPostIds,
  selectById: getPostById,
} = postAdapter.getSelectors((state) => state.posts);

export const getCount = (state) => state.posts.count;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const getPostsByUser = createSelector(
  [postsSelector, (_state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === Number(userId))
);

export default postSlice.reducer;
