const obj = {
    a: 1,
    b: 2,
    c: 3,
};
for (const keys in obj) {
    console.log(`${keys}: ${obj[keys]}`);
}

Object.keys(obj).join(); //gives "abc"

const object = { a: 1, b: 2, c: 3 };

function keysAndValues(obj) {
    const objKeys = Object.keys(obj);
    const objValues = Object.values(obj);
    return [objKeys, objValues];

    // const keys = [] , values=[]
    // for(const key in obj){
    //     keys.push(key);
    //     values.push(obj[key])
    // }
    // return [keys , values]
}
// console.log(keysAndValues(object));

const object1 = { a: 1, b: 2, c: 3 };

function objectToArray(obj) {
    // return Object.entries(obj);
    let arr = [];
    for (const keys in obj) {
        arr.push([keys, obj[keys]]);
    }
    return arr;
}

// console.log(objectToArray(object1));

function expensiveOrder(order, amount) {
    const output = {};
    for (const key in order) {
        if (order[key] > amount) {
            output[key] = order[key];
        }
    }
    return output;
}

// console.log(expensiveOrder({ a: 3000, b: 200, c: 1050 }, 1000));

function expensiveOrder(order, amount) {
    const output = [];
    for (const key in order) {
        if (order[key] > amount) {
            output.push(key);
        }
    }
    return output;
}
console.log(expensiveOrder({ a: 3000, b: 200, c: 1050 }, 1000));

/**
 * invert({ "z": "q", "w": "f" })
➞ { "q": "z", "f": "w" }

invert({ "a": 1, "b": 2, "c": 3 })
➞ { 1: "a", 2: "b", 3: "c" }

invert({ "zebra": "koala", "horse": "camel" })
➞ { "koala": "zebra", "camel": "horse" }
 */

function invert(obj) {
    let result = {};
    for (let key in obj) {
        result[obj[key]] = key;
    }
    return result;
}

console.log(invert({ zebra: "koala", horse: "camel" }));

/**
 * 
 *## Characters and ASCII Code
 *Write a function that transforms an array of characters into an array of objects, where:

 *The keys are the characters themselves.
 *The values are the ASCII codes of those characters.
 *Examples*

 *toObj(["a", "b", "c"]) ➞ [{a: 97}, {b: 98}, {c: 99}]

 *toObj(["z"]) ➞ [{z: 122}]

 *toObj([]) ➞ []
 */

function toObj(arr) {
    const output = [];
    arr.forEach((element) => {
        output.push({ [element]: element.charCodeAt() });
    });
    return output;
}

console.log(toObj(["a", "b", "c"]));
