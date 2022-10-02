import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementBy,
  decrementBy,
} from "../logic/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(4);

  return (
    <div className="App">
      <h1> {count} </h1>

      <div className="row">
        <button onClick={() => dispatch(increment())}> Increment </button>
        <button onClick={() => dispatch(decrement())}> Decrement </button>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div className="row">
        <button onClick={() => dispatch(incrementBy(amount))}>
          Increment By
        </button>
        <button onClick={() => dispatch(decrementBy(amount))}>
          Decrement By
        </button>
      </div>
    </div>
  );
};

export default Counter;
