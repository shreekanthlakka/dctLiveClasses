import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import Application from "../models/application.model.js";
import { CustomResponse } from "../utils/customResponse.js";

const apply = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad request", errors.array()));
    }
    const { job } = req.body;
    const application = await Application.create({
        job,
        candidate: req.user._id,
    });
    if (!application) {
        throw new CustomError(400, "failed to apply for job");
    }
    res.status(201).json(
        new CustomResponse(201, "applied sucessfully", application)
    );
});

const check = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const application = await Application.findOne({
        job: jobId,
        candidate: req.user._id,
    });
    if (application) {
        return res
            .status(200)
            .json({ isApplied: true, success: true, application });
    } else {
        res.status(200).json({
            isApplied: false,
            success: false,
            application: {},
        });
    }
});

export { apply, check };
