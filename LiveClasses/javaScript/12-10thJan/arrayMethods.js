/**
 * Array methods
 *
 * push() pop() shift() unshift()
 *
 * slice()
 * includes()
 * indexOf()
 * lastIndexOf()
 * sort()
 * reverse()
 * join()
 *
 *  ---------------ES6 Methods---------
 * forEach()
 *
 */

// find the element which is greater than 135---returns the first ele
// (in this case 145 )in an array
const prices = [135, 145, 155, 165];

let n;
for (let i = 0; i < prices.length; i++) {
    if (prices[i] > 135) {
        n = prices[i];
        break;
    }
}
console.log(n);

// ES6 future for above is find() method
//

//find() ---> find() findes in an array of objects based on CONDITION

console.log(
    "find method ",
    prices.find((ele) => ele > 135)
);

/**
 *
 * find the first even number
 *
 */
const firstEvenNumber = [11, 21, 31, 40, 41, 50];

console.log(
    "first Even Number",
    firstEvenNumber.find((ele) => {
        return ele % 2 === 0;
    })
);

const arr2 = [10, 11, "1", "adam"].find((ele) => typeof ele === "string");

const arr3 = [
    { id: 1, name: "marker", price: 50 },
    { id: 2, name: "scale", price: 100 },
    { id: 3, name: "board", price: 150 },
];

console.log(
    "price more than 50 rupees",
    arr3.find((ele) => ele.price > 50)
    // arr3.find((ele) => ele["price"] > 15)  we can also call using
    // square brackets
);

//find the first student with id:dct123

console.log(
    "rollNo dct123",
    [
        { id: "dct111", name: "name1" },
        { id: "dct123", name: "name2" },
        { id: "dct133", name: "name3" },
    ].find((ele) => ele.id === "dct123")
);

// first element whose length >= 8
console.log(
    "password length >= 8 is",
    ["secret", "secret1", "secret12", "secret123"].find(
        (ele) => ele.length >= 8
    )
);
