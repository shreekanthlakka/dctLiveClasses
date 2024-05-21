const users = [
    {
        id: 1,
        username: "Aarav Patel",
        email: "aarav.patel@example.com",
        country: "India",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 2,
        username: "Lily Wang",
        email: "lily.wang@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=22",
    },
    {
        id: 3,
        username: "Ethan Jones",
        email: "ethan.jones@example.com",
        country: "USA",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=33",
    },
    {
        id: 4,
        username: "Sophia Liu",
        email: "sophia.liu@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=44",
    },
    {
        id: 5,
        username: "Vihaan Krishna",
        email: "vihaan.krishna@example.com",
        country: "India",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=55",
    },
    {
        id: 6,
        username: "Emma Chen",
        email: "emma.chen@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=66",
    },
    {
        id: 7,
        username: "Noah Patel",
        email: "noah.patel@example.com",
        country: "India",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=77",
    },
    {
        id: 8,
        username: "Olivia Zhang",
        email: "olivia.zhang@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=88",
    },
    {
        id: 9,
        username: "Mason Smith",
        email: "mason.smith@example.com",
        country: "USA",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=99",
    },
    {
        id: 10,
        username: "Ava Gupta",
        email: "ava.gupta@example.com",
        country: "India",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=100",
    },
];
const output = users.reduce((acc, val) => {
    if (Object.prototype.hasOwnProperty.call(acc, val.country)) {
        acc[val.country]++;
    } else {
        acc[val.country] = 1;
    }
    return acc;
}, {});
// acc.hasOwnProperty(`${val.country}`)
const output2 = users.reduce((acc, val) => {
    Object.prototype.hasOwnProperty.call(acc, val.country)
        ? acc[val.country]++
        : (acc[val.country] = 1);
    return acc;
}, {});

console.log("output 2 ===<> ", output2);

const result = users.reduce((acc, val) => {
    return (acc = Object.keys(acc).includes(val.country)
        ? { ...acc, [val.country]: acc[val.country] + 1 }
        : { ...acc, [val.country]: 1 });
}, {});

//creating an array of objects [{country:"india" , count:2} , {} ,{}]

const res = users.reduce((acc, val) => {
    if (!acc.map((ele) => ele.country).includes(val.country)) {
        return [...acc, { country: val.country, count: 1 }];
    } else {
        acc.find((ele) => ele.country === val.country).count++;
        // obj.count = obj.count + 1;
        return acc;
    }
}, []);

console.log(output);
console.log("RESULT ->>>>>>", result); // Outputs
console.log("result --->", res);
