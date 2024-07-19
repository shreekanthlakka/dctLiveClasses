import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app.js";

let mongo;

beforeAll(async () => {
    process.env.JWT_SECRET = "SREEKANTH";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collection();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});
