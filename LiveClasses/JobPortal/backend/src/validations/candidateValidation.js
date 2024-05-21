import Candidate from "../models/candidate.model.js";
import { CustomError } from "../utils/customError.js";
import User from "../models/user.model.js";

const candidateValidationSchema = {
    userId: {
        custom: {
            options: async function (val, { req }) {
                const candidate = await Candidate.findOne({
                    userId: req.user._id,
                });
                if (candidate) {
                    throw new CustomError(403, "profile already created");
                }
                return true;
            },
        },
    },
    firstName: {
        in: ["body"],
        exists: {
            errorMessage: "First name field is requires",
        },
        notEmpty: {
            errorMessage: "First name cannot be left blank.",
        },
        trim: true,
    },
    lastName: {
        in: ["body"],
        exists: {
            errorMessage: "last name field is requires",
        },
        notEmpty: {
            errorMessage: "last name cannot be left blank.",
        },
        trim: true,
    },
    mobileNumber: {
        in: ["body"],
        exists: {
            errorMessage: "Mobile number is required",
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "Mobile number must be 10 digits long ",
        },
        custom: {
            options: async function (val) {
                const candidate = await User.findOne({ mobileNumber: val });
                if (candidate) {
                    throw new CustomError(401, "phone number already used");
                }
                return true;
            },
        },
    },
    address: {
        in: ["body"],
        exists: {
            errorMessage: "address field is requires",
        },
        notEmpty: {
            errorMessage: "address cannot be left blank.",
        },
        trim: true,
    },
};

export { candidateValidationSchema };
