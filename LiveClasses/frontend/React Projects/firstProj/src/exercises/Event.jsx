function Event() {
    const fruits = ["apple", "mango", "orange"];
    function handleClick() {
        alert("clicked");
    }
    function handleShow(value) {
        console.log(value);
    }
    function handleSelect(ele) {
        console.log("You clicked :", ele);
    }
    function handleVowels(ele) {
        const vowels = ele
            .split("")
            .filter((letter) =>
                ["a", "e", "i", "o", "u"].includes(letter)
            ).length;
        console.log("vowels", vowels);
    }
    function handleReverse(ele) {
        console.log(
            "reverse of word",
            ele,
            "is",
            ele.split("").reverse().join("")
        );
    }
    return (
        <div>
            <h2>Event handlers</h2>
            <button onClick={handleClick}> Click </button>
            <div>
                <button value={1} onClick={(e) => handleShow(e.target.value)}>
                    show value
                </button>
            </div>
            <div>
                <button value={2} onClick={(e) => handleShow(e.target.value)}>
                    show value
                </button>
            </div>
            <div>
                <button value={3} onClick={(e) => handleShow(e.target.value)}>
                    show value
                </button>
            </div>
            <ul>
                {fruits.map((ele, i) => (
                    <>
                        <li key={i}>{ele}</li>
                        <button onClick={() => handleSelect(ele)}>
                            select
                        </button>
                        <button onClick={() => handleVowels(ele)}>
                            Count Vowels
                        </button>
                        <button onClick={() => handleReverse(ele)}>
                            Reverse format
                        </button>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default Event;
