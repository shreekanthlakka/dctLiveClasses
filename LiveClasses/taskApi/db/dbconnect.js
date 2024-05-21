import mongoose from "mongoose";

const connectWithMongoDB = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then((conn) =>
            console.log(
                `======== MONGODB CONNECTED ======= to`,
                conn.connection.host
            )
        )
        .catch((err) => {
            console.error("===== ERROR IN CONNECTING MONGODB =====", err);
            process.exit(1);
        });
};

export { connectWithMongoDB };
