import React from "react";
import { useSelector } from "react-redux";
import { postsSelector } from "./postSlice";

const PostRender = () => {
  const posts = useSelector(postsSelector);

  const renderPosts = posts.map((post, idx) => {
    return (
      <article key={post.id}>
        <h4> {post.title} </h4>
        <p> {post.content.substring(0, 100)} </p>
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
