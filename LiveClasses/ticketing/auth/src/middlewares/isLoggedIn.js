import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/CustomError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new CustomError(402, "not logged in or unauthorized");
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        throw new CustomError(402, "not logged in or unauthorized");
    }
    req.user = decode;
    next();
});

export { isLoggedIn };
