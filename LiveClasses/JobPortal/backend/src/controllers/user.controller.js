import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";
import { createToken } from "../utils/createTokens.js";

const register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad request", errors.array()));
    }
    const { username, email, password, role } = req.body;
    const user = await User.create({
        username,
        email,
        password,
        role,
    });
    if (!user) {
        throw new CustomError(400, "not able to create user");
    }
    res.status(201).json(new CustomResponse(201, "created successfully", user));
});

const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(401)
            .json(new CustomError(401, "bad request", errors.array()));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        // throw new CustomError(401, "Email or Password is wrong");
        return res
            .status(404)
            .json(new CustomError(401, "email or password is wrong"));
    }
    if (!user.checkPassword(password)) {
        return res
            .status(401)
            .json(new CustomError(401, "email or password is wrong"));
    }
    if (user.checkPassword(password)) {
        createToken(res, user._id);
    }
});

const logout = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new CustomError(404, "");
    }
    user.accessToken = null;
    await user.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        maxAge: 0,
    };
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new CustomResponse(200, "loggedout sucessfully", {}));
});

const getLoggedInUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new CustomError(404, "invalid token");
    }
    res.status(200).json({
        status: 200,
        data: user,
        isAuthenticated: true,
        success: true,
        message: "Logged in sucessfully",
    });
});

const checkEmail = asyncHandler(async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user) {
        res.status(200).json({
            isEmailRegistered: true,
        });
    } else {
        res.status(200).json({ isEmailRegistered: false });
    }
});

/**
 *
 * admin controllers
 *
 */

const adminGetAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users) {
        throw new CustomError(500, "server error");
    }
    res.status(200).json(new CustomResponse(200, "all users", users));
});

export {
    register,
    login,
    logout,
    getLoggedInUserDetails,
    adminGetAllUsers,
    checkEmail,
};
