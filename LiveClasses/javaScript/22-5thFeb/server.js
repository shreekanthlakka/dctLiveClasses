const http = require("http");
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/") {
        res.end("welcome to website");
    }
    if (req.url === "/students") {
        const students = [
            { id: 1, name: "John" },
            { id: 2, name: "sree" },
            { id: 3, name: "Rahul" },
        ];
        res.end(JSON.stringify(students));
    }
    if (req.url === "/courses") {
        const courses = [
            { id: "101", name: "Full Stack development" },
            { id: "102", name: "React JS" },
        ];
        res.end(JSON.stringify(courses));
    }
});

server.listen(5000, () => console.log("Server is running on port 5000"));
