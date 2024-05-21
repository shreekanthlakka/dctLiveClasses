/**
 * slice()
 * repeat()
 * includes()
 * indexOf()
 * lastIndexOf()
 * array ---> Push() , Pop() , shift() , unshift() , sort() , reverse()
 * length---property
 * slice()
 * Array.isArray(arr) ---> returns true or false
 *
 *
 * method --behaviour
 * property--information
 *
 *
 *
 */

const str = "bengaluru";
console.log(str.includes("e")); // true, returns the first occurrence of a specified string within a string

//array - ordered , interger indexed , collection of values
const arr = [10, 20, 30]; //
console.log(typeof arr); //returns Object
console.log(Array.isArray(arr)); // returns an true
console.log(arr.includes(10));

//object - unordered , string indexed collection of values
const person = {
    firstName: "sreekanth",
    lastName: "lakka",
};
console.log(Array.isArray(person)); // returns false
console.log(typeof person); // returns Object

/**
 * 1 .Given a string 'javaScript' .print one below the other
 *
 */

const str1 = "javaScript";
// str1.split("").map((e) => console.log(e));

for (let i = 0; i <= str1.length - 1; i++) console.log(str1[i]);

console.log("------");

/**
 * 2 print only charactor a
 *
 *
 *
 */

// str1.split("").forEach((el) => {
//     if (el === "a") {
//         console.log(el);
//     }
// });

// one liner
// console.log(
//     str1
//         .split("")
//         .filter((el) => el === "a")
//         .join()
// );

console.log("------");

/**
 * 3 . print expect a
 *
 *
 */
console.log(
    str1
        .split("")
        .filter((e) => e !== "a")
        .join()
        .replaceAll(",", " ")
);

for (let i = 0; i <= str1.length - 1; i++)
    if (str1[i] !== "a") console.log(str1[i]);

console.log("------");

/**
 *
 * 4.print characters at even indexs
 *
 */

for (let i = 0; i <= str1.length - 1; i = i + 2) console.log(str1[i]);

console.log("------");

/**
 *
 * 5. Print if the character is an ovel
 */

console.log(
    str1
        .split("")
        .filter((el) => "aeiou".includes(el))
        .join()
);

console.log("------");

/**
 *
 * 6 print only ovel and present in even index
 */

console.log("------");

// str.split('').filter(el=> el%2 ===0 || 'aeiou'.includes(el))

for (i = 0; i <= str1.length - 1; i = i + 2) {
    if ("aeiou".includes(str1[i])) console.log(str1[i]);
}

console.log("------");
/**
 *
 * 7 print ovels on odd indexed elements
 */

for (i = 1; i <= str1.length - 1; i = i + 2) {
    if ("aeiou".includes(str1[i])) console.log(str1[i]);
}

console.log("------");

/**
 *
 * 8 print if char is vowel or index is even
 */

for (let i = 0; i <= str1.length - 1; i++) {
    if ("aeiou".includes(str1[i]) || i % 2 === 0) console.log(str1[i]);
}

console.log("------");
/**
 *
 * 9 print the charactors from the end of the string
 */

console.log(str1.split("").reverse().join());

console.log("------");

/**
 * 10 print the index if non vowal charactors
 *
 *
 */

for (let i = 0; i <= str1.length - 1; i++) {
    if ("aeiou".includes(str1[i])) console.log(`index ${i} -- ${str1[i]}`);
}
console.log("------");

/**
 *
 * 11.
 *
 * arr1=[10,20,30,40,50]
 *
 * print only elements only greater than 20
 */
const arr1 = [10, 20, 30, 40, 50];

console.log(arr1.filter((el) => el > 20).join(","));

for (let i = 0; i <= arr1.length - 1; i++) {
    if (arr1[i] > 20) console.log(arr1[i]);
}
console.log("------");

/**
 *
 * 12.
 *
 * arr1=[10,20,30,40,50]
 *
 * print only the numbers greater 20 lessthen 50
 */

console.log(arr1.filter((el) => el > 20 && el < 50));

for (let i = 0; i <= arr1.length - 1; i++) {
    if (arr1[i] > 20 && arr1[i] < 50) console.log(arr1[i]);
}
console.log("------");

/**
 * 13 print array in reverse
 */

console.log(arr1.reverse());

/**
 *
 * 14
 * count the numbers of even numbers in the array and print the count
 *
 */

res = arr1.filter((el) => el % 2 === 0).reduce((acc, val) => acc + val, 0);
console.log(res);

Array.from({ length: 20 }, (_, i) => i)
    .filter((e) => e % 2 === 0)
    .reduce((acc, val) => acc + val, 0);

/**
 * 15.
 * find the sum of arr
 */

console.log(arr1.reduce((acc, val) => acc + val, 0));
