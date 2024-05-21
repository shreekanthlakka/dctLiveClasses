/**
 *
 * implict arguments Object exampe
 *
 *
 */

function add() {
    let sum = 0;
    for (let i = 1; i < arguments.length + 1; i++) {
        sum += arguments[i - 1];
    }
    return sum;
}
// we can pass as many  number of argument as we want to the function 'add'
console.log(add(1, 2, 3, 4, 5));
console.log(add(7, 8, -9));

/**
 *
 * args rest property
 */
function add1(...args) {
    console.log(args);
}
add1(1, 2, 3);

/**
 * default params
 */

//es6 fet
function add2(a = 0, b = 0) {
    return a + b;
}

console.log(add2()); // 0
console.log(add2(1)); // 1

//old way of  doing it in es5
function add3(a, b) {
    a = typeof a === "undefined" ? 0 : a;
    b = typeof b === "undefined" ? 0 : b;
    return a + b;
}
