/**
 *
 * prototypes
 */
function Customer(name, balance, accNo) {
    this.BankName = "SBIN";
    this.name = name;
    this.balance = balance;
    this.accountNo = accNo;
}

Customer.prototype.checkBalance = function () {
    return `The balance is INR ${
        this.balance
    } as on ${new Date().toLocaleString()}`;
};

Customer.prototype.deposit = function (amount) {
    this.balance = this.balance + amount;
    return `U deposited amount of ${amount} sucessfull and your current balance is ${this.balance}`;
};

const customer1 = new Customer("John", 1000, "ACC1234");
const customer2 = new Customer("John2", 10001, "ACC12345");

console.log(customer1.checkBalance());
console.log(customer2.checkBalance());
console.log(customer2.deposit(20050));

/**
 * complex number
 *
 *  sum of two complex numbers ---->  (a + ib) + (c + id) = (a + c) + i(b + d)
 *
 *  multiplay two complex numbers ---> (a + ib). (c + id) = (ac – bd) + i(ad + bc)
 *
 *
 */

class Complex {
    constructor(real, img) {
        this.real = real;
        this.img = img;
    }
    //(a + ib) + (c + id) = (a + c) + i(b + d)
    plus(num) {
        return `${this.real + num.real}+i${this.img + num.img}`;
    }
    //(a + ib). (c + id) = (ac – bd) + i(ad + bc)
    times(num) {
        return `${this.real * num.real - this.img * num.img}+i${
            this.real * num.real + this.img * num.img
        }`;
    }
}

const c1 = new Complex(3, 5);
const c2 = new Complex(1, 2);

console.log(c1.plus(c2));
console.log(c1.times(c2));

/**
 * using functional constructor
 *
 */

function ComplexNumber(real, img) {
    this.real = real;
    this.img = img;
    this.add = function (num) {
        return `${this.real + num.real}+i${this.img + num.img}`;
    };
    this.multiplay = function (num) {
        return `${this.real * num.real - this.img * num.img}+i${
            this.real * num.real + this.img * num.img
        }`;
    };
}

const c3 = new ComplexNumber(3, 5);
const c4 = new ComplexNumber(1, 2);

console.log(c3.add(c4));
console.log(c3.multiplay(c4));

/**
 * using prototype
 *
 */

function ComplexProto(real, img) {
    this.real = real;
    this.img = img;
}

ComplexProto.prototype.add = function (num) {
    return `${this.real + num.real}+i${this.img + num.img}`;
};

ComplexProto.prototype.mul = function (num) {
    return `${this.real * num.real - this.img * num.img}+i${
        this.real * num.real + this.img * num.img
    }`;
};

const c6 = new ComplexProto(3, 4);
const c7 = new ComplexProto(1, 2);
console.log(c6.add(c7));
console.log(c6.mul(c7));
