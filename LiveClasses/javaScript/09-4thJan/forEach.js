const arr = [1, 2, 3, 4, 1, 1];

// arr.forEach((ele, i) => {
//     console.log(ele);
// });

const movies = ["movie1", "movie2", "movie3"];

// movies.forEach((ele) => console.log(ele));
const res = [];
arr.forEach((ele) => {
    if (!res.includes(ele)) res.push(ele);
});

// console.log(res);

/**
 *
 * captilise the name
 * console.log(capMe(["sree", "kanth", "name1"])); --> Sree,Kanth,Name1
 *
 *
 */

function capMe(arr) {
    const capmeoutput = [];

    arr.forEach((ele) => {
        capmeoutput.push(
            ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()
        );
    });
    return capmeoutput;
}

// console.log(capMe(["sree", "kanth", "name1"]));

function findNAN(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Number.isNaN(arr[i])) return i;
    }
    return -1;
}
console.log(findNAN([NaN, 1, 2, 3, 4]));
console.log(findNAN([2, 3, NaN, 1, 2, 3, 4]));
console.log(findNAN([1, 2, 3, 4]));
