import React from "react";
import { useSelector } from "react-redux";

import { getUserById } from "./usersSlice";
import { postsSelector } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => getUserById(state, userId));

  const userPosts = useSelector((state) => {
    const posts = postsSelector(state);

    return posts.filter((post) => post.userId === Number(userId));
  });

  const renderPosts = userPosts.map((post) => (
    <li>
      <Link to={`/post/${post.id}`}> {post.title} </Link>
    </li>
  ));

  return (
    <section>
      <h2> {user.name} </h2>

      <ol>{renderPosts}</ol>
    </section>
  );
};

export default UserPage;
