import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../logic/posts/postSlice";
import PostAuthor from "../logic/posts/PostAuthor";
import TimeAgo from "../logic/posts/TimeAgo";
import PostReactions from "../logic/posts/PostReactions";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => getPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h1>Post not found!</h1>
      </section>
    );
  }

  return (
    <section>
      <article>
        <h4> {post.title} </h4>
        <p> {post.body} </p>
        <small>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </small>
        <PostReactions reactions={post.reactions} postId={post.id} />
      </article>
    </section>
  );
};

export default SinglePostPage;
