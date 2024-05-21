/*eslint-disable react/prop-types*/

import { useReducer, useState } from "react";

function todoReducer(state, action) {
    switch (action.types) {
        case "add":
            return [...state, action.payload];

        case "default":
            return state;
    }
}

function TodoUSEREDUCER() {
    const [input, setInput] = useState("");
    const [todos, dispatch] = useReducer(todoReducer, []);
    function handleClick(input) {
        if (!input) return;
        const newTodoObj = {
            id: Math.random(),
            todo: input,
            isCompleted: false,
        };
        dispatch({ type: "add", payload: newTodoObj });
    }

    return (
        <div>
            <h1>Todo App using useReducer</h1>
            <input
                type="text"
                placeholder="add a todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" onClick={() => handleClick(input)}>
                Add todo
            </button>
            <h3>Listing Todos - {todos.length}</h3>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.isCompleted} />
                    <p style={{ display: "inline" }} key={todo.id}>
                        {todo.todo}{" "}
                    </p>
                    <button>delete</button>
                </div>
            ))}
        </div>
    );
}

export default TodoUSEREDUCER;

/**
 * 
 * 
 * import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "REMOVE": {
      return state.filter((ele) => {
        return ele.id != action.payload;
      });
    }
    case "CHANGE": {
      return state.map((ele) => {
        if (ele.id == action.payload) {
          return { ...ele, isCompleted: !ele.isCompleted };
        } else {
          return ele;
        }
      });
    }
  }
}

export default function TodoReducer() {
  const [todos, dispatch] = useReducer(reducer, []);
  const handleAdd = () => {
    const title = prompt("Enter title");
    if (title) {
      const todo = {
        id: Number(new Date()),
        title: title,
        isCompleted: false,
      };
      dispatch({ type: "ADD", payload: todo });
    }
  };
  return (
    <div>
      <h2>TodoApp using useReducer</h2>
      <h2>Listing Todos - {todos.length} </h2>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((ele) => {
          return (
            <li key={ele.id}>
              <input
                type="checkbox"
                checked={ele.isCompleted}
                onChange={(e) => {
                  dispatch({ type: "CHANGE", payload: ele.id });
                }}
              />
              {ele.title}
              <button
                onClick={() => {
                  dispatch({ type: "REMOVE", payload: ele.id });
                }}
              >
                remove
              </button>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
 */
