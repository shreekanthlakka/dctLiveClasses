import mongoose from "mongoose";

const connectToDB = () => {
    mongoose
        .connect(process.env.URI)
        .then((res) => {
            console.log(`mongoDB CONNECTED `);
        })
        .catch((err) => {});
};

export { connectToDB };
