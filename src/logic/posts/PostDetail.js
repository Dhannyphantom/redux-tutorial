import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import { getPostById } from "./postSlice";
import TimeAgo from "./TimeAgo";

const PostDetail = ({ postId }) => {
  const post = useSelector((state) => getPostById(state, postId));
  return (
    <article>
      <h4> {post.title} </h4>
      <p> {post.body.substring(0, 75)}... </p>
      <small>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </small>
      <PostReactions reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default PostDetail;
