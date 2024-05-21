/**
 *
 *1.create a constructor function called as expance for keep track of
 * users expances
 * 2.define 2 properties - name, amount[1,2,3,4]
 * define 2 methods - countExpance() , total()
 */

function Expance(name, amount) {
    this.name = name;
    this.amount = amount;
    this.countExpances = function () {
        return `number if expances is ${this.amount.length}`;
    };
    this.total = function () {
        const tot = this.amount.reduce((acc, val) => acc + val, 0);
        return `your total expances is ${tot}`;
    };
}

const u1 = new Expance(" aditya", [120, 250, 350, 100]);
console.log(u1.countExpances());
console.log(u1.total());
const u2 = new Expance("sumana", [100, 200, 300]);
console.log(u2.countExpances());
console.log(u2.total());
