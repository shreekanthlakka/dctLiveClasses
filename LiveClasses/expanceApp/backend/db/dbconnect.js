import mongoose from "mongoose";
const connectDB = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((obj) =>
            console.log("connected to mongodb ", obj.connection.host)
        )
        .catch((err) => console.log("error while connecting to DB"));
};

export { connectDB };
