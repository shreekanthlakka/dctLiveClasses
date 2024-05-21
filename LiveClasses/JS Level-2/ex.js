const user = {
    name: "adam",
    email: "admin@gmail.com",
    details: function () {
        return this.name + " " + this.email;
    },
};

console.log(user.details());
