import mongoose, { Types } from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        status: {
            type: String,
            default: "submitted",
        },
    },
    { timestamps: true }
);
const Application = mongoose.model("Application", applicationSchema);
export default Application;
