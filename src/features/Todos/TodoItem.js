import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../api/apiSlice";

const TodoItem = ({ todo }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const { completed, title, id } = todo;
  return (
    <article className="todo_item">
      <input
        type="checkbox"
        onChange={(e) => updateTodo({ ...todo, completed: !completed })}
        checked={completed}
      />
      <p> {title} </p>
      <button className="delete" onClick={() => deleteTodo({ id })}>
        <FontAwesomeIcon icon={solid("trash")} />
      </button>
    </article>
  );
};

export default TodoItem;
