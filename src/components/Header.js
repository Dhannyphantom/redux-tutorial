import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
      </nav>
    </header>
  );
};

export default Header;
