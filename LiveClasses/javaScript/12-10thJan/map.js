/**
 *
 * transfer the array into new array
 *
 */

const prices = [125, 135, 145, 155];

// add some value to array

const pricesUpByThree = prices.map(function (ele) {
    return ele + 3;
});

console.log(prices.map((ele) => ele + 3));
console.log("pricesUpByThree: ", pricesUpByThree);

console.log(
    "captilise",
    ["a", "b", "c"].map((ele) => ele.toUpperCase())
);

console.log(
    "return  2 for even and 3 for odd",
    [11, 12, 13, 14].map((ele) => (ele % 2 === 0 ? ele + 2 : ele + 3))
);

console.log("");
