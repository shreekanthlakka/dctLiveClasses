import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
    switch (action.type) {
        case "inc":
            return { ...state, count: state.count + state.step };
        case "dec":
            return { ...state, count: state.count - state.step };
        case "setCount":
            return { ...state, count: action.payload };
        case "reset":
            return initialState;
        case "setStep":
            return { ...state, step: action.payload };
        default:
            return state;
    }
}

function App() {
    const [{ count, step }, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <h2>use Reducer Example</h2>
            <div>
                <div>Step : {step}</div>
                <input
                    type="text"
                    placeholder="input Step number"
                    onChange={(e) =>
                        dispatch({
                            type: "setStep",
                            payload: Number(e.target.value),
                        })
                    }
                />
            </div>
            <button onClick={() => dispatch({ type: "dec" })}> - </button>
            <span>count : {count}</span>
            <button onClick={() => dispatch({ type: "inc" })}> + </button>
            <div>
                <button onClick={() => dispatch({ type: "reset" })}>
                    reset
                </button>
            </div>
        </div>
    );
}

export default App;
