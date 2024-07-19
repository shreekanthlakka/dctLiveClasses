import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.routes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("__dirname => ", __dirname);
const writeStream = fs.createWriteStream(path.join(__dirname, `./access.log`), {
    flags: "a",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev", { stream: writeStream }));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`);
    next();
});

app.use("/api/v1/users", userRoutes);

export default app;
