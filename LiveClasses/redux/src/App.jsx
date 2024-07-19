import { useDispatch, useSelector } from "react-redux";
import {
    decrement,
    decrementBy,
    increment,
    incrementBy,
    reset,
    setValue,
} from "./actions/countActions";
import { useState } from "react";

function App() {
    const [val, setVal] = useState("");
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    function handleIncrementBy(val) {
        if (!val) return;
        dispatch(setValue(Number(val)));
        setVal("");
    }

    return (
        <div>
            <h1>My App</h1>
            <input
                placeholder="Set Count value"
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
            />
            <button onClick={() => handleIncrementBy(val)}>Set</button>
            <h3>Count : {count.count}</h3>
            <button onClick={() => dispatch(increment())}> + </button>
            <button onClick={() => dispatch(decrement())}> - </button>
            <button onClick={() => dispatch(incrementBy(2))}> +2 </button>
            <button onClick={() => dispatch(decrementBy(2))}> -2 </button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
}

export default App;
