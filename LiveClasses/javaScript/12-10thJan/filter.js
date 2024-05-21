const prices = [135, 145, 155, 165];

// traditional approch

const res = [];
for (let i = 0; i < prices.length; i++) {
    if (prices[i] > 140) res.push(prices[i]);
}
console.log("prices > 140", res);

// filter approch

/**
 * const res2 = prices.filter(function(ele){
 *          return ele>140
 * })
 */

const res2 = prices.filter((ele) => ele > 140);
console.log(res2);

console.log(
    "even numbers",
    [11, 12, 13, 14].filter((ele) => ele % 2 === 0)
);

console.log(
    "string  elements in an array",
    ["one", 2, "three", 4, "five"].filter((ele) => typeof ele === "string")
);

console.log(
    "find truthy values",
    [false, true, 0, 1, undefined, null, [], {}, "", "dct"].filter((ele) => ele)
);

console.log(
    "names starts eith a",
    ["adi", "ishan", "pranav", "bhargav", "amaresh", "aditi"].filter(
        (ele) => ele[0] === "a"
    )
);
