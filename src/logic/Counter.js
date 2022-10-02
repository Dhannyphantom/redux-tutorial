import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../logic/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1> {count} </h1>
      <div className="row">
        <button onClick={() => dispatch(increment())}> Increment </button>
        <button onClick={() => dispatch(decrement())}> Decrement </button>
      </div>
    </div>
  );
};

export default Counter;
