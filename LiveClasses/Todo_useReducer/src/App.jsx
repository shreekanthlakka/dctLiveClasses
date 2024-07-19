import { useState } from "react";
import { useTodo } from "./context/todoContext";

function App() {
    return (
        <div>
            <AddTodo />
            <ListTodos />
        </div>
    );
}

function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { dispatch } = useTodo();

    function handleSubmit(e) {
        e.preventDefault();
        if (!title && !description) return;
        const todo = {
            id: Math.floor(Math.random() * 99999),
            title,
            description,
            isComplected: false,
        };
        dispatch({ type: "ADD_TODO", payload: todo });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

function ListTodos() {
    const { todos } = useTodo();
    return (
        <ul>
            {todos?.map((todo) => (
                <TodoDetails key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

function TodoDetails({ todo }) {
    const { dispatch } = useTodo();
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.isComplected}
                onChange={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
            />
            <h3>title - {todo.title}</h3>
            <p>Description - {todo.description}</p>
            <button
                onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
                }
            >
                delete
            </button>
        </li>
    );
}

export default App;
