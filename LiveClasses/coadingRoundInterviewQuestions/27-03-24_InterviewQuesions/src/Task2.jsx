/*eslint-disable react/prop-types*/

import { useState } from "react";

const URI = `http://jsonplaceholder.typicode.com`;

function Task2() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);
        fetch(`${URI}/users/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));

        fetch(`${URI}/todos?userId=${Number(userId)}`)
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
                setIsLoading(false);
            });
    }
    // useEffect(() => {
    //     fetch(`${URI}/todos?userId=${Number(userId)}`)
    //         .then((res) => res.json())
    //         .then((data) => setTodos(data));
    // }, [userId]);

    function handleReset() {
        setUser({});
        setTodos([]);
    }
    return (
        <div>
            <h2>Enter the id </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    onMouseEnter={handleReset}
                    placeholder="enter the id to fetch users data"
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                />
                <button type="submit">Submit</button>
            </form>

            {Object.keys(user).length > 0 && (
                <UserDetails user={user} isLoading={isLoading} />
            )}
            {todos.length > 0 && (
                <TodoDetails todos={todos} isLoading={isLoading} />
            )}
        </div>
    );
}

function UserDetails({ user, isLoading }) {
    return (
        <>
            {isLoading ? (
                <h2>Loading ... </h2>
            ) : (
                <>
                    <h2>User Details</h2>
                    <p>name : {user.name}</p>
                    <p>email : {user.email}</p>
                </>
            )}
        </>
    );
}

function TodoDetails({ todos, isLoading }) {
    if (isLoading) return <h2>Loading ...</h2>;
    return (
        <>
            {todos.map((ele, i) => (
                <div key={ele.id} style={{ margin: "5px", padding: "10px" }}>
                    {i + 1} - {ele.title}
                </div>
            ))}
        </>
    );
}

export default Task2;
