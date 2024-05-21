/**
 * benifit of arrow function
 *
 */

const dev = {
    name: "steve",
    profession: "Software Engg",
    skills: ["js", "react", "node", "py"],
    details: function () {
        this.skills.forEach((ele) => {
            console.log(`${this.name} knows ${ele}`);
        });
    },
};

/**
 * es5 hack to  hold the refference of this on that variable
 *
 */
const dev1 = {
    name: "steve",
    profession: "Software Engg",
    skills: ["js", "react", "node", "py"],
    details: function () {
        var that = this;
        this.skills.forEach(function (ele) {
            console.log(`${that.name} knows ${ele}`);
        });
    },
};

dev.details();
dev1.details();
