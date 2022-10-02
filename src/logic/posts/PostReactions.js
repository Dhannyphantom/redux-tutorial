import React from "react";
import { useDispatch } from "react-redux";
import { updateReaction } from "./postSlice";

const reactions_lookup = {
  thumb: "👊",
  wow: "😃",
  heart: "💖",
  rocket: "🚀",
  coffee: "🍥",
};

const PostReactions = ({ reactions, postId }) => {
  const dispatch = useDispatch();
  const renderReactions = Object.entries(reactions).map(([emoji, reaction]) => {
    return (
      <div
        onClick={() => dispatch(updateReaction({ reaction: emoji, postId }))}
        key={emoji}
        className="row emoji"
      >
        <span> {reactions_lookup[emoji]} </span>
        <span> {reaction} </span>
      </div>
    );
  });

  return <div className="row">{renderReactions}</div>;
};

export default PostReactions;
