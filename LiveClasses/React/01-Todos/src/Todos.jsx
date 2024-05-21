/*eslint-disable react/prop-types*/
function Todos({ todos, handleToggle, handleDelete }) {
    return (
        <>
            {todos?.map((todo) => (
                <div key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todos.isCompleted}
                        onChange={() => handleToggle(todo.id)}
                    />
                    <p style={{ display: "inline" }} key={todo.id}>
                        {todo.todo}{" "}
                    </p>
                    <button onClick={() => handleDelete(todo.id)}>
                        delete
                    </button>
                </div>
            ))}
        </>
    );
}

export default Todos;
