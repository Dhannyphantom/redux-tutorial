import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { usersSelector } from "./usersSlice";

const UsersList = () => {
  const users = useSelector(usersSelector);

  const renderUsers = users.map((user) => (
    <li>
      <Link to={`/users/${user.id}`}> {user.name} </Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>

      <ul className="users">{renderUsers}</ul>
    </section>
  );
};

export default UsersList;
