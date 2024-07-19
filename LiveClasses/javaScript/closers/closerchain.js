function sum(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}

console.log("SUM ", sum(1)(2)(3));
const sumwithOne = sum(1);
console.log(sumwithOne(2)(3));

const sumArrow = (a) => (b) => (c) => a + b + c;
console.log(sumArrow(1)(2)(3));

//write a function that allow us to do
//const addSix = createBase(6)
//console.log(addSix(10)) //16
//console.log(addSix(21)) //27
function createBase(a) {
    return function (b) {
        return a + b;
    };
}

const addSix = createBase(6);
console.log(addSix(10));
console.log(addSix(21));
