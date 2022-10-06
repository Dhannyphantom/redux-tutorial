import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCount, increaseCount } from "../logic/posts/postSlice";

const Header = () => {
  const count = useSelector(getCount);
  const dispatch = useDispatch();
  return (
    <header>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/post">
              New Post
            </Link>
          </li>
          <li>
            <Link className="link" to="/users">
              Users
            </Link>
          </li>
        </ul>
        <button className="delete" onClick={() => dispatch(increaseCount())}>
          {count}
        </button>
      </nav>
    </header>
  );
};

export default Header;
