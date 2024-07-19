import User from "../models/user.model.js";

const userValidationSchema = {
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
        },
        notEmpty: {
            errorMessage: "Name should not be empty",
        },
        trim: true,
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "Email is required",
        },
        notEmpty: {
            errorMessage: "Email should not be empty",
        },
        trim: true,
        custom: {
            options: async function (val) {
                const user = await User.findOne({ email: val });
                if (user) {
                    throw new Error("Email already exists");
                }
                return true;
            },
        },
    },
    password: {
        in: ["body"],
        exists: {
            errorMessage: "Password is required",
        },
        notEmpty: {
            errorMessage: "Password should not be empty",
        },
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: "Password should be at least 5 characters",
        },
    },
};

export { userValidationSchema };
