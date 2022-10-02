import React from "react";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import { postsSelector } from "./postSlice";
import TimeAgo from "./TimeAgo";

const PostRender = () => {
  const posts = useSelector(postsSelector);

  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post, idx) => {
    return (
      <article key={post.id}>
        <h4> {post.title} </h4>
        <p> {post.content.substring(0, 100)} </p>
        <small>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </small>
        <PostReactions reactions={post.reactions} postId={post.id} />
      </article>
    );
  });

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts}
    </section>
  );
};

export default PostRender;
