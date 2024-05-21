import Recuiter from "../models/recruiter.model.js";
import { CustomError } from "../utils/customError.js";

const recuiterValidationSchema = {
    userId: {
        custom: {
            options: async function (val, { req }) {
                const recuiter = await Recuiter.findOne({
                    userId: req.user._id,
                });
                if (recuiter) {
                    throw new CustomError(
                        400,
                        "recuiter profile already exists"
                    );
                }
                return true;
            },
        },
    },
    companyName: {
        in: ["body"],
        exists: {
            errorMessage: "companyName should exists",
        },
        notEmpty: {
            errorMessage: "companyName cannot be empty",
        },
        trim: true,
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "email should exists",
        },
        notEmpty: {
            errorMessage: "email cannot be empty",
        },
        trim: true,
        isEmail: {
            errorMessage: "Invalid Email format",
        },
        normalizeEmail: true,
    },
    website: {
        in: ["body"],
        exists: {
            errorMessage: "website should exists",
        },
        notEmpty: {
            errorMessage: "website cannot be empty",
        },
        trim: true,
    },
    address: {
        in: ["body"],
        exists: {
            errorMessage: "address should exists",
        },
        notEmpty: {
            errorMessage: "address cannot be empty",
        },
        trim: true,
    },
};

export { recuiterValidationSchema };

/**
 *
 * userId
 * companyName
 * email
 * website
 * address
 */
