import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./db/dbconnect.js";

connectDB();

app.listen(process.env.PORT, () =>
    console.log(`Server is up and running on port ${process.env.PORT}`)
);
