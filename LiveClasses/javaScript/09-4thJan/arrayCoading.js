/**
 *
 *
 * function for Jockpot
 */

function testJackpot(arr) {
    const val = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (val !== arr[i]) return false;
    }
    return true;
}

// console.log(testJackpot(["a", "a", "a", "a"]));
// console.log(testJackpot(["SS", "Ss", "ss", "SS"]));

/**
 *
 * remove the duplicates
 */

function removeDuplicates(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(removeDuplicates([1, 0, 1, 0]));

/**
 *
 * arr.reduce((acc,ele) => {
 * if(includes(ele))
 * },[])
 */

const arrr = [1, 0, 1, 0, 2, 3, 5, 2, 1];
const res = arrr.reduce((acc, val) => {
    if (!acc.includes(val)) {
        return [...acc, val];
    } else return [...acc];
}, []);

// console.log(res);

/**
 *
 * mirroring an array
 *
 * [1,2,3.4.5] -----> [1,2,3,4,5,4,3,2,1]
 *
 *
 */



function mirror(arr) {
    const res = [];
    arr.forEach((element) => res.push(element));
    for (let i = arr.length - 2; i >= 0; i--) res.push(arr[i]);
    return res;
}

// console.log(mirror([0, 1, 2, 3])); // 0,1,2,3.2,1,0
