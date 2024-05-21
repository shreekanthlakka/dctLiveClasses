import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        // throw new CustomError(404, "invalid token");
        return res.status(404).json(new CustomError(404, "invalid token", {}));
    }
    const decode = await jwt.verify(token, process.env.SECRET);
    req.user = {
        _id: decode._id,
        role: decode.role,
    };
    next();
});

const customRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new CustomError(403, `not authorized to access this role`)
            );
        }
        next();
    };
};

export { isLoggedIn, customRole };
