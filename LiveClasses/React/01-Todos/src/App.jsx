/*eslint-disable react/prop-types*/

import { useState } from "react";
import Todos from "./Todos";
import EmptyTodos from "./EmptyTodo";
import { useLocalStorageState } from "./useLocalStorage.js";

function App() {
    const [todoData, setTodoData] = useLocalStorageState([], "localtodo");
    // const [todoData, setTodoData] = useLocalStorage([], "todos");
    const [input, setInput] = useState("");

    function handleAddTodo() {
        if (!input) return;
        const inpTodo = {
            id: Math.random(),
            todo: input,
            isCompleted: false,
        };
        setTodoData([...todoData, inpTodo]);
        setInput("");
    }

    function handleToggle(id) {
        setTodoData((prev) =>
            prev.map((ele) =>
                ele.id === id ? { ...ele, isCompleted: !ele.isCompleted } : ele
            )
        );
    }

    function handleDelete(id) {
        setTodoData((prev) => prev.filter((ele) => ele.id !== id));
    }

    return (
        <div>
            <h2>Todos App</h2>
            <input
                type="text"
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" htmlFor="input" onClick={handleAddTodo}>
                Add a Todo
            </button>
            {todoData?.length > 0 && <h2>Listing Todos -{todoData?.length}</h2>}
            {todoData?.length === 0 ? (
                <EmptyTodos message="Your Todos are empty try to add hitting Add Todos" />
            ) : (
                <Todos
                    todos={todoData}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                />
            )}
            <AddFive />
        </div>
    );
}

function AddFive() {
    const [count, setCount] = useState(0);

    function handleAddFive() {
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
    }

    return (
        <div>
            <p>Count - -- {count}</p>
            <button onClick={handleAddFive}> Add 5 </button>
        </div>
    );
}

export default App;
