import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

const Candidate = new mongoose.model("Candidate", candidateSchema);

export default Candidate;
