/**
 *
 * 'eeddttaa' ---> [e,d,t,a]
 */

const arr = "aabbddee".split("").reduce((acc, val) => {
    if (!acc.includes(val)) return [...acc, val];
    else return acc;
}, []);

// console.log(arr);

/**
 *
 *toObj(["a", "b", "c"]) ➞ [{a: 97}, {b: 98}, {c: 99}]
 */

const obj = ["a", "b", "c"].map((el) => {
    return {
        [el]: el.charCodeAt(),
    };
});

// console.log(obj);

console.log(
    ["a", "b", "c", "z"].reduce((acc, val) => {
        return {
            ...acc,
            [val]: val.charCodeAt(),
        };
    }, [])
);

/**
 * Write a function that has two parameters: orders and cost. Return any orders that are greater than the cost.

 *Examples*

 *expensiveOrders({ "a": 3000, "b": 200, "c": 1050 }, 1000)
 *➞ { "a": 3000, "c": 1050 }

 *expensiveOrders({ "Gucci Fur": 24600, "Teak Dining Table": 3200, "Louis Vutton Bag": 5550, "Dolce Gabana Heels": 4000 }, 20000)
 *➞ { "Gucci Fur": 24600 }
 * 
 */

const orders = { a: 3000, b: 200, c: 1050 };

function expensiveOrders(orders, limit) {
    const result = {};
    for (let key in orders) {
        if (orders[key] > limit) {
            result[key] = orders[key];
        }
    }
    return result;
}

console.log(expensiveOrders(orders, 1000));
console.log(
    expensiveOrders(
        {
            "Gucci Fur": 24600,
            "Teak Dining Table": 3200,
            "Louis Vutton Bag": 5550,
            "Dolce Gabana Heels": 4000,
        },
        3500
    )
);
