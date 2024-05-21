import { useEffect, useReducer, useState } from "react";

const localDate = localStorage.getItem("todo");
const initialState = localDate ? JSON.parse(localDate) : [];

function reducer(state, action) {
    switch (action.type) {
        case "addTodo":
            return [...state, action.payload];
        case "removeTodo":
            return state.filter((ele) => ele.id !== action.payload);
        case "toggleCompleted":
            return state.map((ele) =>
                ele.id === action.payload
                    ? { ...ele, isComplected: !ele.isComplected }
                    : ele
            );
        case "default":
            return state;
    }
}

function TodoApp() {
    const [input, setInput] = useState("");
    const [todos, dispatch] = useReducer(reducer, initialState);
    function handleAddClick(e) {
        e.preventDefault();
        if (!input) return;
        const newTodo = {
            id: Math.random(),
            todo: input,
            isComplected: false,
        };
        dispatch({ type: "addTodo", payload: newTodo });
        setInput("");
    }
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos));
    }, [todos]);
    return (
        <div>
            <h1>Todo App using useReducer</h1>
            <form onSubmit={handleAddClick}>
                <input
                    type="text"
                    placeholder="add a todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Add todo</button>
            </form>
            <h3>Listing Todos - {todos.length}</h3>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() =>
                            dispatch({
                                type: "toggleCompleted",
                                payload: todo.id,
                            })
                        }
                    />
                    <p style={{ display: "inline" }} key={todo.id}>
                        {todo.todo}{" "}
                    </p>
                    <button
                        onClick={() =>
                            dispatch({ type: "removeTodo", payload: todo.id })
                        }
                    >
                        delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TodoApp;
