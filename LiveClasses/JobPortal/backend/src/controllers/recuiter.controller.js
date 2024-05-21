import { validationResult } from "express-validator";
import Recuiter from "../models/recruiter.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";

const createRecuiterProfile = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad credentials", errors.array()));
    }
    const { companyName, email, website, address } = req.body;
    const recuiter = await Recuiter.create({
        companyName,
        email,
        website,
        address,
        userId: req.user._id,
    });
    if (!recuiter) {
        throw new CustomError(404, "not able to create recuiter profile");
    }
    res.status(201).json(
        new CustomResponse(
            201,
            "successfully created recuiter profile",
            recuiter
        )
    );
});
const getRecuiterProfileDetails = asyncHandler(async (req, res) => {
    const recuiter = await Recuiter.findOne({ userId: req.user._id });
    if (!recuiter) {
        throw new CustomError(404, "profile not found");
    }
    res.status(200).json(
        new CustomResponse(
            200,
            "sucessfully got the details of recuiter profile ",
            recuiter
        )
    );
});
const updateRecuiterProfileDetails = asyncHandler(async (req, res) => {
    const { companyName, website, address, email } = req.body;
    const recuiter = await Recuiter.findOneAndUpdate(
        { userId: req.user._id },
        { companyName, website, address, email },
        { new: true }
    );

    if (!recuiter) {
        throw new CustomError(401, "not able to update recuiter");
    }
    res.status(200).json(
        new CustomResponse(200, "updated sucessfully ", recuiter)
    );
});

export {
    createRecuiterProfile,
    getRecuiterProfileDetails,
    updateRecuiterProfileDetails,
};
