import { useEffect, useState } from "react";

const URI = "https://jsonplaceholder.typicode.com";

function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${URI}/users`)
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    return (
        <div>
            <h3>Users List</h3>
            <ul>
                {users.length > 0 &&
                    users.map((user, i) => (
                        <li key={user.id}>
                            {i + 1}. {user.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default UserList;
