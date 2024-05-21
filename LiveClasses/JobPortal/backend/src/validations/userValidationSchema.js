import { normalizePath } from "vite";
import User from "../models/user.model.js";

const userValidationSchema = {
    username: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Username cannot be empty",
        },
        exists: {
            errorMessage: "username should be present",
        },
        trim: true,
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "email should be present",
        },
        notEmpty: {
            errorMessage: "email should not be empty",
        },
        isEmail: {
            errorMessage: "provide valid email",
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async function (value) {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error("Email already registered");
                }
                return true;
            },
        },
    },
    password: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "password cannot be empty",
        },
        exists: {
            errorMessage: "password should be present",
        },
        custom: {
            options: async function (val) {
                if (val.length < 8) {
                    throw new Error(
                        "password must be atleast 5 characters long"
                    );
                    return true;
                }
            },
        },
    },
    role: {
        in: ["body"],
        exists: {
            errorMessage: "role should be present",
        },
        notEmpty: {
            errorMessage: "role should not be empty",
        },
        trim: true,
        custom: {
            options: function (val) {
                if (!["recruiter", "candidate", "admin"].includes(val)) {
                    throw new Error(
                        "user role should be either recruiter or candidate or admin"
                    );
                }
                return true;
            },
        },
    },
};

export { userValidationSchema };
