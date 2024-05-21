import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        openings: { type: Number },
        location: [String],
        jobType: { type: String }, //[workFromHome, wfo]
        experience: {
            minExp: { type: Number },
            maxExp: { type: Number },
        },
        deadline: { type: Date },
        skills: [String],
        salary: {
            minSalary: Number,
            maxSalary: Number,
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
