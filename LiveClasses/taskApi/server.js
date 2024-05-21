import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectWithMongoDB } from "./db/dbconnect.js";

connectWithMongoDB();

app.listen(process.env.PORT, () =>
    console.log(`server is up and running on PORT  ${process.env.PORT}`)
);
