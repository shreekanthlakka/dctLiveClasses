function frequency(str) {
    const output = {};
    for (let i = 0; i < str.length; i++) {
        if (str[i] in output) {
            output[str[i]]++;
        } else {
            output[str[i]] = 1;
        }
    }
    return output;
}

console.log(frequency("ddcccttd")); // {d:3,c:3,t:2}

// again think about the logic

// "ddcccttd".split("").reduce((acc, val) => {
//     if (val in acc) {
//         acc[val]++;
//     } else {
//         acc[val] = 1;
//     }
// }, {});

//find all the repeated characters
// 'dcctt' --- ['c','t']
// find all the nonrepeating characters
