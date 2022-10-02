import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: nanoid(), name: "John Snow" },
  { id: nanoid(), name: "Peter Parker" },
  { id: nanoid(), name: "Luke Skywalker" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const usersSelector = (state) => state.users;

export default usersSlice.reducer;
