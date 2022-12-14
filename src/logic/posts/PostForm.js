import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersSelector } from "../users/usersSlice";
import { addANewPost } from "./postSlice";

const initials = { title: "", content: "", userId: "" };

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(usersSelector);

  const [form, setForm] = useState(initials);

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
    if (!validator) return;
    dispatch(addANewPost(form));
    setForm(initials);
    navigate("/");
  };

  return (
    <section>
      <h2>New Post</h2>
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
        <button disabled={!validator} type="button" onClick={onFormSubmit}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default PostForm;
