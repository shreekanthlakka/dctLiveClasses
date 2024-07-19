import { useReducer } from "react";

const initialState = {
    counter: 0,
};

function counterReducer(state, action) {
    switch (action.type) {
        case "INC":
            return { ...state, counter: state.counter + 1 };
        case "DEC":
            return { ...state, counter: state.counter - 1 };
        case "default":
            return state;
    }
}

function App() {
    const [{ counter }, dispatch] = useReducer(counterReducer, initialState);
    return (
        <div>
            <h1>Counter : {counter} </h1>
            <button onClick={() => dispatch({ type: "INC" })}>Increment</button>
            <button onClick={() => dispatch({ type: "DEC" })}>Decrement</button>
        </div>
    );
}

export default App;
