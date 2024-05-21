const obj = {
    a: 10,
    b: 20,
    c: 30,
};

let sumUsingForIn = 0;

for (const key in obj) {
    sumUsingForIn = sumUsingForIn + obj[key];
}
console.log("using for in", sumUsingForIn); // 60

const sum = Object.values(obj).reduce((acc, value) => acc + value, 0);
console.log(sum);
