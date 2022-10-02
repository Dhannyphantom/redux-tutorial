import React from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(usersSelector);
  const user = users.find((usr) => usr.id === userId);
  return <span>by {user?.name ?? "Unknown Author"} </span>;
};

export default PostAuthor;
