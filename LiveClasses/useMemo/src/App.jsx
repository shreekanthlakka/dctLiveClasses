import { useMemo, useRef, useState } from "react";

function App() {
    const [numbers, setNumbers] = useState([]);
    const [num, setNum] = useState("");

    // const sum = numbers.reduce((acc, val) => {
    //     console.log("IN REDUCE CALCULATION");
    //     return acc + val;
    // }, 0);

    // useMemo(() => {
    //     sum.current = numbers.reduce((acc, val) => acc + val, 0);
    // }, [numbers]);

    const sum = useMemo(() => {
        console.log("IN REDUCE CALCULATION USEMEMO HOOK");
        const res = numbers.reduce((acc, val) => acc + val, 0);
        return res;
    }, [numbers]);

    function handleSubmit(e) {
        e.preventDefault();
        setNumbers([...numbers, num]);
        setNum("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Listing Numbers - {numbers.length}</h2>
            {numbers.map((num, i) => (
                <li key={i}>{num}</li>
            ))}
            <h2>Sum ---- {sum}</h2>
            <input
                type="text"
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
            />
            <button type="submit">submit</button>
        </form>
    );
}

export default App;
