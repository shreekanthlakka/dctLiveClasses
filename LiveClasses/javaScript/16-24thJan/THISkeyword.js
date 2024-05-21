/**
 *
 * arrow function => doesnt have the value of this on its own
 *
 * it will reffer this from outer scope
 */

console.log(this);

function greet() {
    const obj = {
        a: 10,
        b: 10,
        sum: function () {
            console.log("in ES5 function ---", this);
            // here this reffer to this particular object
            return this.a + this.b;
        },
        sumarrow: () => {
            console.log("in => function", this);
        },
    };
    console.log(obj.sum());
    console.log(obj.sumarrow());
    function greet2() {
        console.log("this in greet2 =======", this);
        const obj2 = {
            a: 40,
            b: 40,
            sub: function () {
                console.log("this in greet2", this);
            },
            mul: () => {
                console.log("this in greeet2 with =>", this);
            },
        };
        obj2.sub();
        obj2.mul();
    }
    greet2();
}
greet();
