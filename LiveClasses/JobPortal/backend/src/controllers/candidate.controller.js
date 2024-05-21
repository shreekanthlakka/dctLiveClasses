import { validationResult } from "express-validator";
import Candidate from "../models/candidate.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";

const createProfile = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad request", errors.array()));
    }
    const { firstName, lastName, address, mobileNumber } = req.body;
    const candidate = await Candidate.create({
        userId: req.user._id,
        firstName,
        lastName,
        mobileNumber,
        address,
    });
    if (!candidate) {
        throw new CustomError(401, "not able to create  profile");
    }
    res.status(201).json(
        new CustomResponse(201, "profile created successfully", candidate)
    );
});

const getProfileDetails = asyncHandler(async (req, res) => {
    const candidate = await Candidate.findOne({ userId: req.user._id });
    if (!candidate) {
        throw new CustomError(404, "no profile found");
    }
    res.status(200).json(
        new CustomResponse(
            200,
            "candidate profile  fetched successfully",
            candidate
        )
    );
});

const updateProfileDetails = asyncHandler(async (req, res) => {
    const candidate = await Candidate.findOneAndUpdate(
        {
            userId: req.user._id,
        },
        req.body,
        { new: true }
    );
    if (!candidate) {
        throw new CustomResponse(404, "Profile didnt update!");
    }
    res.status(200).json(
        new CustomResponse(200, "updated sucessfully", candidate)
    );
});

export { createProfile, getProfileDetails, updateProfileDetails };
