/**
 * Es6 future
 * function() {} ----> ()=>{}
 *
 * we cannt use  arrow functions in constructors , prototypes
 */

const num = [2, 3, 4, 5, 6].filter((ele) => ele % 2 === 0);

console.log("number which are even", num); //[2, 4, 6]
