import { useReducer } from "react";

const initialState = {
    name: "",
    email: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET":
            return { ...state, [action.payload.name]: action.payload.value };
        case "RESET":
            return initialState;
        case "default":
            return state;
    }
}

function App() {
    const [{ name, email }, dispatch] = useReducer(reducer, initialState);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("name ==>", name);
        console.log("email ==>", email);
        dispatch({ type: "RESET" });
    }
    function handleChange(e) {
        dispatch({ type: "SET", payload: e.target });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="name"
                    value={name}
                    name="name"
                    onChange={handleChange}
                />
                <input
                    placeholder="email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;

/**
 *  <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => dispatch({type:"SET" , payload:{prop:"name" , value:e.target.value}})}
                />
 * 
 */

/**
 *
 * case "SET" : {...state , [action.payload.prop]:action.payload.value}
 */

/**
 *
 * case "SETNAME" : return {...state , name:e.target.value}
 * case "SETEMAIL" : return {...state , email:e.target.value}
 *
 * dispatch({type:"SETNAME" , payload:e.target.value})
 * dispatch({type:"SETEMAIL" , payload:e.target.value})
 *
 *
 *
 */
