import React from "react";
import { useSelector } from "react-redux";

const PostRender = () => {
  const posts = useSelector((state) => state.posts);

  const renderPosts = posts.map((obj, idx) => {
    return (
      <article key={obj.title + idx}>
        <h4> {obj.title} </h4>
        <p> {obj.content} </p>
      </article>
    );
  });

  return (
    <div>
      <h1>Posts</h1>
      {renderPosts}
    </div>
  );
};

export default PostRender;
