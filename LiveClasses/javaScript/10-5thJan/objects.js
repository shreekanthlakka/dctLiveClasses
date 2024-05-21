/**
 * Objects are unordered , string indexed  collection of properties
 * and methods
 *
 */

const person = {
    firstName: "Sreekanth",
    lastName: "Lakka",
    city: "Bng",
};

console.log(person.firstName);
//we can also access using ['firstName']
console.log(person["firstName"]);
//person.length dosnt exist use Object.keys(person).length
console.log(Object.keys(person).length);

//   add any property

person.profession = "Software Developer";
console.log(person);

//to delete the property

delete person.profession;

// update a property
person.profession = "Javascript Developer";

// check property in object
console.log("firstName" in person);
console.log(person.hasOwnProperty("firstName"));

// get all keys
console.log(Object.keys(person));
// length of object
console.log(Object.keys(person).length);
console.log(Object.values(person).length);

// get all values
console.log(Object.values(person));
// to know whether something is present
console.log(Object.values(person).includes("sreekanth"));

/**
 *
 * looping of objects
 */

// for in
for (const key in person) {
    console.log(key, person[key]);
}

const num = {
    one: 1,
    two: 2,
    three: 3,
};
for (const key in num) {
    console.log(key, num[key]);
}

const tech = {
    m: "mongoDb",
    e: "ExpressJS",
    r: "ReactJS",
    n: "NodeJS",
};
for (const keys in tech) {
    console.log(`${keys} stands for ${tech[keys]} `);
}

// we can convert an object to an array using Object.entries
console.log(Object.entries(tech));

// person.map((obj) => console.log(`${obj.firstName} ${obj.lastName}`));
