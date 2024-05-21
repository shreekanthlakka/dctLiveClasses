import { useEffect, useState } from "react";
const URI = "https://jsonplaceholder.typicode.com";

function ShowUser() {
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        (async function getUsers() {
            const res = await fetch(`${URI}/users`);
            const data = await res.json();
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        if (!selectedId) return;
        (async () => {
            const res = await fetch(`${URI}/users/${selectedId}`);
            const data = await res.json();
            setSelectedUser(data);
        })();
    }, [selectedId]);
    return (
        <div>
            <h1>Users</h1>
            <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
            >
                <option value="">Select the User</option>
                {users?.map((ele) => (
                    <option key={ele.id} value={ele.id}>
                        {ele.name}
                    </option>
                ))}
            </select>
            {selectedId && <SelectedUser user={selectedUser} />}
        </div>
    );
}

function SelectedUser({ user }) {
    // console.log("user", user);
    return (
        <div>
            <h2>selected user</h2>
            <p>name : {user.name}</p>
            <p>username : {user.username}</p>
            <p>email : {user.email}</p>
        </div>
    );
}

export default ShowUser;
