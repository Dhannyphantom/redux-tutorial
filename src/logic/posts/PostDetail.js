import React from "react";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import TimeAgo from "./TimeAgo";

let PostDetail = ({ post }) => {
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

PostDetail = React.memo(PostDetail);

export default PostDetail;
