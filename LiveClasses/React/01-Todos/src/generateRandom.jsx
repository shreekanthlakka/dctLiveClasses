/*eslint-disable react/prop-types*/

import { useState } from "react";

function GenerateRandom() {
    const [numbers, setNumbers] = useState([]);
    function handleClick() {
        const random = Math.floor(Math.random() * 100) + 1;
        setNumbers((prev) => [...prev, random]);
    }
    function handleDelete(index) {
        // setNumbers((prev) => prev.filter((ele) => ele !== num));
        const arr = [...numbers];
        arr.splice(index, 1);
        setNumbers(arr);
    }
    function handleDeleteAllEven() {
        setNumbers((prev) => prev.filter((ele) => ele % 2 !== 0));
    }
    return (
        <div>
            <h2>Generate random number</h2>
            <button onClick={handleClick}>Generate</button>
            {numbers.length > 0 && (
                <NumbersDisplay numbers={numbers} handleDelete={handleDelete} />
            )}
            <button onClick={handleDeleteAllEven}>
                Delete all Even numbers
            </button>
        </div>
    );
}

function NumbersDisplay({ numbers, handleDelete }) {
    return (
        <>
            {numbers.map((num, i) => (
                <div key={i}>
                    <span>{num}</span>
                    <button onClick={() => handleDelete(i)}>delete</button>
                </div>
            ))}
        </>
    );
}

export default GenerateRandom;
