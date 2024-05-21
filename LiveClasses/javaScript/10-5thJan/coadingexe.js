const persons = [
    { name: "john", age: 21, budget: 23000 },
    { name: "steve", age: 32, budget: 40000 },
    { name: "Martin", age: 16, budget: 2700 },
];

// function getBudgets(arr) {
//     console.log(arr.reduce((acc, val) => acc + val.budget, 0));
// }

function getBudgets(arr) {
    let total = 0;
    arr.forEach((ele) => (total += ele.budget));
    return total;
}
console.log(getBudgets(persons));

const product = {
    shampoo: 5.99,
    rubberDucks: 15.99,
};
const product1 = {
    shampoo: 35.99,
    rubberDucks: 15.99,
};
function freeShipping(obj) {
    let total = 0;
    for (let key in obj) {
        total = total + obj[key];
    }
    return total > 50 ? true : false;
}
console.log(freeShipping(product));
console.log(freeShipping(product1));

function mapping(arr) {
    const result = {};
    arr.forEach((ele) => {
        result[ele] = ele.toUpperCase();
    });
    return result;
}

const obj = ["q", "w", "e"].map((ele) => {
    return {
        [ele]: ele.toUpperCase(),
    };
});

console.log(obj);
console.log(mapping(["a", "b", "c"]));

const objLength = ["react", "express", "node"].map((ele) => {
    return {
        [ele]: ele.length,
    };
});

function objLen(arr) {
    const outObj = {};
    arr.forEach((ele) => {
        outObj[ele] = ele.length;
    });
    return outObj;
}
console.log(objLen(["react", "express", "node"]));
// console.log(objLength);
