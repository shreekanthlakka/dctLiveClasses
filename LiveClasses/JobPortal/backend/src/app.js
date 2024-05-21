import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`);
    next();
});

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE ,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// // const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = dirname(fileURLToPath(import.meta.url));

// console.log("__dirname", __dirname);
// console.log("==>", path.join(__dirname, "access.log"));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

import users from "./routes/user.routes.js";
import candidate from "./routes/candidate.routes.js";
import recruiter from "./routes/recuiter.routes.js";
import jobs from "./routes/job.routes.js";
import application from "./routes/application.routes.js";

app.use("/api/v1/users", users);
app.use("/api/v1/users/candidate", candidate);
app.use("/api/v1/users/recruiter", recruiter);
app.use("/api/v1/jobs", jobs);
app.use("/api/v1/application", application);

export default app;
