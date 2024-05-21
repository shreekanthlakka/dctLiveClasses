import Task from "../models/task.model.js";

const taskValidationSchema = {
    title: {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "Title is required",
        },
        notEmpty: {
            errorMessage: "Title should not be empty",
        },
        isLength: {
            options: { max: 10 },
            errorMessage: "Title must have max of 10 characters",
        },
        custom: {
            options: async function (val) {
                const existTask = await Task.findOne({ title: val });
                if (existTask) {
                    console.log(existTask._id);
                    throw new Error("This Title already Exists");
                }
                return true;
            },
        },
    },
    description: {
        in: ["body"],
        trim: true,
    },
    status: {
        in: ["body"],
        exists: {
            errorMessage: "Status is required",
        },
        trim: true,
        notEmpty: {
            errorMessage: "Please provide a valid Status",
        },
        isIn: {
            options: [["pending", "inprogress", "completed"]],
            errorMessage:
                "Invalid value for Status - choose  from 'pending', 'inprogress' or 'complete' only",
        },
    },
};

export { taskValidationSchema };
