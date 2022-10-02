import React from "react";

import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import TimeAgo from "./TimeAgo";

const PostDetail = ({ post }) => {
  return (
    <article>
      <h4> {post.title} </h4>
      <p> {post.body.substring(0, 100)} </p>
      <small>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </small>
      <PostReactions reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default PostDetail;
