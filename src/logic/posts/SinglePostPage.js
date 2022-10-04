import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

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
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </small>
        <PostReactions reactions={post.reactions} postId={post.id} />
      </article>
    </section>
  );
};

export default SinglePostPage;
