import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        companyName: {
            type: String,
        },
        email: {
            type: String,
        },
        website: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;

/**
 *
 * userId
 * companyName
 * email
 * website
 * address
 */
