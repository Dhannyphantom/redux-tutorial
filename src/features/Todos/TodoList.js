import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    alert(newTodo);
  };

  let content;
  //   do something

  return (
    <section>
      <h1>Todos</h1>
      <form className="form">
        <div>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
            placeholder="Add a new todo "
          />
        </div>
        <div>
          <button type="button" onClick={addNewTodo}>
            <FontAwesomeIcon icon={solid("upload")} />
          </button>
        </div>
      </form>
      <section>{content}</section>
    </section>
  );
};

export default TodoList;
