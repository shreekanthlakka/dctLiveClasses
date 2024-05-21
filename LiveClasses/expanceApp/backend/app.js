import express from "express";
import morgan from "morgan";
const app = express();
app.use(morgan("tiny"));
app.use(express.json());

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

import categoriesRouter from "./routes/categories.routes.js";
import expanceRoute from "./routes/expance.routes.js";

app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/expences", expanceRoute);

export { app };
