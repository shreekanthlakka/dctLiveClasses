import { useReducer } from "react";

const initialState = {
    email: "",
    password: "",
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET":
            return { ...state, [action.payload.name]: action.payload.value };
        case "SET_AUTH":
            return { ...state, isAuthenticated: true };
        case "LOGOUT":
            return { ...state, isAuthenticated: false };
        case "default":
            return state;
    }
}

function App() {
    const [{ email, password, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );
    return (
        <div>
            {isAuthenticated ? (
                <Account email={email} dispatch={dispatch} />
            ) : (
                <Login email={email} password={password} dispatch={dispatch} />
            )}
        </div>
    );
}

function Account({ email, dispatch }) {
    return (
        <h1>
            Welcome {email}
            <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
        </h1>
    );
}

function Login({ email, password, dispatch }) {
    function handleChange(e) {
        dispatch({ type: "SET", payload: e.target });
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!email && !password) {
            return;
        }
        if (password === "secret123") {
            dispatch({ type: "SET_AUTH" });
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
