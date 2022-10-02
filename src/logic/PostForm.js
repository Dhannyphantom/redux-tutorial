import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postSlice";

const PostForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", content: "" });

  const onFormChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onFormSubmit = () => {
    dispatch(addNewPost({ ...form, id: nanoid() }));
  };

  return (
    <section>
      <h2>New Post</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => onFormChange(e)}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={3}
          value={form.content}
          onChange={(e) => onFormChange(e)}
        ></textarea>
        <button type="button" onClick={onFormSubmit}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default PostForm;
