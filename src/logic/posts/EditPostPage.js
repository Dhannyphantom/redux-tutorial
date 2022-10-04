import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usersSelector } from "../users/usersSlice";
import { updatePost, getPostById } from "./postSlice";

const initials = { title: "", content: "", userId: "" };

const EditPostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const post = useSelector((state) => getPostById(state, Number(postId)));
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: post.title,
    content: post.body,
    userId: post.userId,
  });
  const [status, setStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>;
      </section>
    );
  }

  const usersDropdown = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });
  const validator = Object.values(form).every((str) => Boolean(str));

  const onFormChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onFormSubmit = () => {
    if (!validator && status === "idle") return;
    setStatus("pending");

    try {
      dispatch(
        updatePost({ id: post.id, ...form, reactions: post.reactions })
      ).unwrap();
      setForm(initials);
      navigate(`/post/${post.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => onFormChange(e)}
        />
        <label htmlFor="userId">Author: </label>
        <select
          onChange={onFormChange}
          id="userId"
          value={form.userId}
          name="userId"
        >
          <option value=""></option>
          {usersDropdown}
        </select>
        <label htmlFor="content">Content: </label>
        <textarea
          name="content"
          id="content"
          rows={3}
          value={form.content}
          onChange={(e) => onFormChange(e)}
        ></textarea>
        {status === "pending" && <i>Loading...</i>}
        <button disabled={!validator} type="button" onClick={onFormSubmit}>
          Update Post
        </button>
      </form>
    </section>
  );
};

export default EditPostPage;
