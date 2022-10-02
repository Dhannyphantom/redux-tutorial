import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostDetail from "./PostDetail";

import {
  fetchPosts,
  getPostError,
  getPostStatus,
  postsSelector,
} from "./postSlice";

const PostRender = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  let content;

  switch (status) {
    case "loading":
      content = <p>Loading...</p>;
      break;
    case "succeeded":
      const orderedPosts = [...posts].sort((a, b) =>
        b.date.localeCompare(a.date)
      );

      content = orderedPosts.map((post) => (
        <PostDetail post={post} key={post.id} />
      ));
      break;
    case "failed":
      content = <p>Error occured: {error}</p>;
      break;
    default:
      content = <p>Error 419</p>;
      break;
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <section>
      <h1>Posts</h1>
      {content}
    </section>
  );
};

export default PostRender;
