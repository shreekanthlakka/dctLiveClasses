import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: String,
    },
    { timeStamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
