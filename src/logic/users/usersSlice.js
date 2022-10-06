import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URI = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  const res = await axios.get(USERS_URI);
  return res.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const usersSelector = (state) => state.users;
export const getUserById = (state, userId) =>
  state.users.find((user) => user.id === Number(userId));

export default usersSlice.reducer;
