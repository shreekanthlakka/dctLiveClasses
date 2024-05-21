import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectToDB } from "./config/db.js";

connectToDB();

app.listen(process.env.PORT, () =>
    console.log(`server is up and running on PORT ${process.env.PORT}`)
);
