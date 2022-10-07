import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const TodoItem = ({ todo }) => {
  const { completed, title } = todo;
  return (
    <article className="todo_item">
      <input type="checkbox" value={completed} />
      <p> {title} </p>
      <button className="delete">
        <FontAwesomeIcon icon={solid("trash")} />
      </button>
    </article>
  );
};

export default TodoItem;
