const numbers = [10, 15, 20, 25, 30];

/**
 * find takes a function as argument --> anonymous , predicate , callback , arrow
 */
const r1 = numbers.find((ele) => ele > 18);

const r2 = numbers.filter((ele) => ele % 2 === 0);
console.log("find first ele which is > 18 is --->", r1);
console.log("even numbers", r2);

//
const val = ["10", "5", "2", "11"];
console.log(
    "numbers sum is-->>",
    val.map((ele) => Number(ele)).reduce((acc, val) => acc + val, 0)
);

/**
 * every ----returns true if all elements are true (satisfy the condition)
 *
 * every() is like AND operator
 */

console.log(
    "every ==",
    [10, 21, 30].every((e) => e % 2 === 0)
);
/**
 * some --returns true if atleast one ele satisfy the condition
 *
 * some() --is like OR operator
 */

console.log(
    "some ==",
    [11, 21, 30].some((e) => e % 2 === 0)
);

/**
 * -------------array methods--------------
 *
 * forEach()--we want to traverse all the ele of array --doesnt return anything
 * find() ----find's the first element that satisfies the condition
 * filter()---if we want to filterOut something
 * map() -----transfer the array to new thing
 * reduce()---reduce the array to one single thing
 * every() ---every ele should satisfy the condition
 * some() ----atleast one ele should satisfy the condition
 *
 *
 */
