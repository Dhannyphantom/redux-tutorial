import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAddTodoMutation, useGetTodosQuery } from "../../api/apiSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Boolean(newTodo)) return;
    addTodo({ userId: 1, completed: false, title: newTodo });
    setNewTodo("");
  };

  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (isSuccess) {
    content = todos
      .slice(0, 11)
      .map((todo) => <TodoItem key={todo.id} todo={todo} />);
  } else if (isError) {
    content = <h2> {error} </h2>;
  }

  return (
    <section>
      <h1>Todos</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
            placeholder="Add a new todo "
          />
        </div>
        <div>
          <button type="submit">
            <FontAwesomeIcon icon={solid("upload")} />
          </button>
        </div>
      </form>
      <section>{content}</section>
    </section>
  );
};

export default TodoList;
