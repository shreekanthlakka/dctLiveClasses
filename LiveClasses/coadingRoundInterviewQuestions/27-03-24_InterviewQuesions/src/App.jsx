import { useEffect, useState } from "react";

const URI = `http://jsonplaceholder.typicode.com`;
const initialState = {
    name: "",
    email: "",
};
function App() {
    const [users, setUsers] = useState([]);
    const [formDate, setFormDate] = useState(initialState);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState({});
    const [updateName, setUpdateName] = useState("");
    useEffect(() => {
        fetch(`${URI}/users`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    }, []);
    function handleDelete(id) {
        setUsers((prev) => prev.filter((ele) => ele.id !== id));
    }
    function handleSubmit(e) {
        e.preventDefault();
        formDate.id = Math.random();
        setUsers((prev) => [...prev, formDate]);
        setFormDate(initialState);
    }
    function handleChange(e) {
        setFormDate({ ...formDate, [e.target.name]: e.target.value });
    }
    function handleEdit(user) {
        setSelected(user);
        setEdit((e) => !e);
    }
    function handleUpdateUser() {
        if (!updateName) return;
        const newObj = { ...selected, name: updateName };
        setUsers((prev) =>
            prev.map((ele) => (ele.id === selected.id ? newObj : ele))
        );
        setEdit((e) => !e);
        setUpdateName("");
        setSelected({});
    }
    return (
        <div>
            <h3>List of users - {users.length}</h3>
            <ul>
                {users.map((ele) => (
                    <li key={ele.id}>
                        <strong>{ele.name}</strong>
                        <button onClick={() => handleEdit(ele)}>Update</button>
                        <button onClick={() => handleDelete(ele.id)}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add user details </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={formDate.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={formDate.email}
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <dialog
                open={edit}
                style={{ backdropFilter: blur(1), zIndex: 100 }}
            >
                <h2>Update for user - {selected?.name}</h2>
                <input
                    type="text"
                    placeholder="update name"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                />
                <button onClick={() => setEdit((e) => !e)}>Close</button>
                <button onClick={handleUpdateUser}>confirm update</button>
            </dialog>
        </div>
    );
}

export default App;
