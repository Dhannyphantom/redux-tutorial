import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../logic/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
