import User from "../models/user.model.js";
import { asyncHandler } from "./asyncHandler.js";
import { CustomError } from "./customError.js";

const createToken = asyncHandler(async (res, userId) => {
    const user = await User.findById(userId).select("+accessToken");
    if (!user) {
        throw new CustomError(404, "User not found");
    }
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.accessToken = accessToken;
    user.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        secure: true,
        expiresIn: "1h",
    };
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            user,
            session: {
                accessToken,
                refreshToken,
            },
            success: true,
        });
});

export { createToken };
