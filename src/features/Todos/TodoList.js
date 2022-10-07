import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useGetTodosQuery } from "../../api/apiSlice";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(newTodo);
    setNewTodo("");
  };

  const renderTodos = todos.slice(-10).map((todo) => <TodoItem todo={todo} />);

  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (isSuccess) {
    content = renderTodos;
  } else if (isError) {
    content = <h2> {error} </h2>;
  }
  //   do something

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
