import React from "react";
import { useSelector } from "react-redux";
import PostDetail from "./PostDetail";

import { getPostError, getPostStatus, getPostIds } from "./postSlice";

const PostRender = () => {
  const orderedPostsIds = useSelector(getPostIds);
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  let content;

  switch (status) {
    case "loading":
      content = <p>Loading...</p>;
      break;
    case "succeeded":
      content = orderedPostsIds.map((postId) => (
        <PostDetail postId={postId} key={postId} />
      ));
      break;
    case "failed":
      content = <p>Error occured: {error}</p>;
      break;
    default:
      content = <p>Error 419</p>;
      break;
  }

  return (
    <section>
      <h1>Posts</h1>
      {content}
    </section>
  );
};

export default PostRender;
