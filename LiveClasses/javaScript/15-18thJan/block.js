/**
 *
 * block scope for() , if() if()else()
 */

for (let i = 0; i < 5; i++) {
    console.log(i);
}

const obj = {
    a: 1,
    b: 2,
    c: 3,
};
for (const key in obj) {
    const str = `the val of ${key} is ${obj[key]}`;
    console.log(str);
}
