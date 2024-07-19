import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("=========Connected to DataBase sucessfully========");
    } catch (error) {
        console.log("Error while connecting to database🛑🛑🛑", error);
        process.exit(1);
    }
};

export { connectToDB };
