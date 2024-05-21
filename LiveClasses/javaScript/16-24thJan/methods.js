const obj = {
    name: "marker",
    price: 15,
    isAvailable: true,
    reviews: [{}, {}, {}],
};

obj.brand = "cello";
console.log(Object.keys(obj).length);
console.log(obj.hasOwnProperty("price"));

/**
 * object contains method also
 *
 * property ----any key which holds information
 * method ---behaviour/functionality of an object
 */

const person = {
    firstName: "Sreekanth",
    lastName: "Lakka",
    getFullName: function () {
        return `${this.firstName} ${this.lastName}`;
    },
};
console.log("FullName", person.getFullName());

const values = {
    a: 10,
    b: 20,
    add: function () {
        return this.a + this.b;
    },
    multiply: function () {
        return this.a * this.b;
    },
    sub: function () {
        return this.a - this.b;
    },
    divide: function () {
        if (this.b === 0) throw new Error("Cannot Divide by Zero");
        else return this.a / this.b;
    },
};
console.log("A+B --", values.add());
console.log("A*B --", values.multiply());
console.log("A-B --", values.sub());
console.log("A/B --", values.divide());

/**
 *
 * Bank Transaction

 *Create an object to specify data of customers in a bank.The data to be stored is: 
 *Account Number, Name, Balance.Assume a maximum of 200 customers in the bank

 *create a method called as transaction which takes
 *    2 args amount and code(1 for deposit, 0 for withdraw )
 * Create a method the display the current balance for the customer
 *If the withdraw amount is more than the balance then display 
 *    "The balance is insufficient for the specified withdrawal"
 *
 *
 */

const customer = {
    accountNumber: 123,
    balance: 1000,
    name: "Sreekanth",
    maxCustomers: 200,

    currentBalance: function () {
        return `Balance is INR ${
            this.balance
        } as on ${new Date().toLocaleString()}`;
    },
    transactions: function (amount, code) {
        if (code === 0) {
            if (amount > this.balance) return `Insufficient balance`;
            if (amount < this.balance) {
                this.balance = this.balance - amount;
                // return this;
                return `Withdrawal of INR ${amount} successful.`;
            }
        } else if (code === 1) {
            this.balance = this.balance + +amount;
            return `Deposit of INR ${amount} successful.`;
            // return this;
        } else return "Invalid Code";
    },
};

console.log(customer.balance);
console.log(customer.currentBalance());
console.log(customer.transactions(5000, 1));
console.log(customer.currentBalance());
console.log(customer.transactions(500, 0));
console.log(customer.currentBalance());
