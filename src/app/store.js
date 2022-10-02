import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../logic/posts/postSlice";
import usersReducer from "../logic/users/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
  },
});
