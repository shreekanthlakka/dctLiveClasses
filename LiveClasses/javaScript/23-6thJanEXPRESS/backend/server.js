const express = require("express");
const app = express();

// app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to express server").json({
        success: "ok",
    });
});

app.get("/students", (req, res) => {
    const students = [
        { id: 1, name: "John" },
        { id: 2, name: "sree" },
        { id: 3, name: "Rahul" },
    ];
    res.json({
        success: true,
        data: students,
    });
});

app.get("/courses", (req, res) => {
    const courses = [
        { id: "101", name: "Full Stack development" },
        { id: "102", name: "React JS" },
    ];
    res.json({
        success: true,
        data: courses,
    });
});

app.get("/myName", (req, res) => {
    const name = "sreekanth";
    const vowelsCount = name
        .split("")
        .filter((ele) => ["a", "e", "i", "o", "u"].includes(ele)).length;
    const consonantCount = name
        .split("")
        .filter((ele) => !["a", "e", "i", "o", "u"].includes(ele)).length;
    res.json({
        total: name.length,
        vowelsCount,
        consonantCount,
    });
});

app.listen(5000, () => console.log("server is running on port 5000"));
