import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError.js";

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "validation errors", errors.array()));
    }
    next();
};

export { checkValidationErrors };
