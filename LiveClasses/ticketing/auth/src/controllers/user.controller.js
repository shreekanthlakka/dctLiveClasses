import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/CustomError.js";
import { sendCookies } from "../utils/sencCookies.js";
import { CustomResponse } from "../utils/CustomResponse.js";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password +accessToken");
    if (!user) {
        throw new CustomError(400, "Invalid email or password");
    }
    const isMatch = await user.isPasswordValid(password);
    if (!isMatch) {
        throw new CustomError(400, "Invalid email or password");
    }
    sendCookies(user, res);
});
const register = asyncHandler(async (req, res) => {
    const { name, email, password, phonenumber, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        phonenumber,
        role,
    });
    if (!user) {
        throw new CustomError(401, "failed to create user");
    }
    res.status(201).json(
        new CustomResponse(201, "user registered sucessfully", user)
    );
});
const logout = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        email: req.user.email,
        _id: req.user._id,
    });
    if (!user) {
        throw new CustomError(400, "bad request");
    }
    user.accessToken = null;
    await user.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 0,
    };
    res.status(200)
        .clearCookie("accessToken", options)
        .json(new CustomResponse(200, "User logged out successfully", {}));
});
const loggedInUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new CustomError(400, "bad request");
    }
    res.status(200).json({
        isAuthenticated: true,
        success: true,
        data: user,
        message: "loggedIn user details",
    });
});

export { login, register, logout, loggedInUser };
