import { CustomError } from "./CustomError.js";

const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            return res
                .status(error.statusCode || 500)
                .json(new CustomError(error.statusCode, error.message, error));
        }
    };
};

export { asyncHandler };
