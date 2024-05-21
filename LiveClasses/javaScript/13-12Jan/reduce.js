/**
 *
 * reduce() method
 */

const prices = [10, 20, 30, 40, 50];
let total = 0;
for (let i = 0; i < prices.length; i++) {
    total += prices[i];
}
console.log("total --", total); // Output: 150

// Using reduce()
// not passing an intial values only with array of premitive datatypes
//always u have to pass initial values for non premitive datatypes
//          ---> like array and objects
const result = prices.reduce(function (acc, val) {
    return acc + val;
}, 0);

console.log("reduce res", result);

const arr1 = [10, 11, 20, 21, 30];

const sumEven = arr1.reduce((acc, val) => {
    if (val % 2 === 0) return acc + val;
    else return acc;
}, 0);

//BODMAS -- brackets > Orders(sqrt etc) > Division > Mul > Add > Sub

console.log(
    "total ",
    [
        { name: "marker", price: 10 },
        { name: "scale", price: 5 },
        { name: "board", price: 150 },
    ].reduce((acc, val) => {
        return acc + val.price;
    }, 0)
);

console.log(
    "total val",
    [
        { name: "marker", price: 10, quantity: 3 },
        { name: "scale", price: 5, quantity: 3 },
        { name: "board", price: 150, quantity: 2 },
    ].reduce((acc, val) => {
        return acc + val.price * val.quantity;
    }, 0)
);

const sumOfEven = [10, 11, 12, 13, 14];

const res = sumOfEven.reduce((acc, val) => {
    if (val % 2 === 0) return [...acc, val];
    else return acc;
}, []);
console.log("array of evens", res);

const res2 = sumOfEven.reduce((acc, val) => {
    if (val % 2 === 0) acc.push(val);
    return acc;
}, []);
console.log("array of evens res2", res2);
