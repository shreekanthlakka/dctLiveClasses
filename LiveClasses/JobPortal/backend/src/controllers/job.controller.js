import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

const createJob = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "validation result", errors.array()));
    }
    const {
        title,
        description,
        openings,
        location,
        jobType,
        experience,
        deadline,
        skills,
        salary,
    } = req.body;
    const job = await Job.create({
        title,
        description,
        openings,
        location,
        jobType,
        experience,
        deadline,
        skills,
        salary,
        recruiterId: req.user._id,
    });
    if (!job) {
        throw new CustomError(400, "failed to create the job");
    }
    res.status(201).json(
        new CustomResponse(201, "sucessfully created the job listing", job)
    );
});

const myPostedJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ recruiterId: req.user._id });
    if (!jobs) {
        throw new CustomError(400, "failed to fetch all jobs");
    }
    res.status(200).json(new CustomResponse(200, "all jobs", jobs));
});

const getJobById = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    console.log("job ID ===> ", jobId);
    const job = await Job.findOne({
        // recruiterId: req.user._id,
        _id: jobId,
    });
    if (!job) {
        throw new CustomError(400, "failed to getthe job");
    }
    res.status(200).json(
        new CustomResponse(200, "sucessfully fetched the job", job)
    );
});

const updateJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const job = await Job.findOneAndUpdate(
        {
            recruiterId: req.user._id,
            _id: jobId,
        },
        req.body,
        { new: true }
    );
    if (!job) {
        throw new CustomError(400, "failed to update the job");
    }
    res.status(200).json(
        new CustomResponse(200, "sucessfully updated the job", job)
    );
});

const deleteJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const job = await Job.findOneAndDelete({
        recruiterId: req.user._id,
        _id: jobId,
    });
    if (!job) {
        throw new CustomError(400, "failed to delete the job");
    }
    res.status(200).json(
        new CustomResponse(200, "sucessfully deleted the job", job)
    );
});

//public route
const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().populate("recruiterId");
    if (!jobs) {
        throw new CustomError(400, "failed to fetch all jobs");
    }
    res.status(200).json(new CustomResponse(200, "all jobs", jobs));
});

const application = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const job = await Job.findOne({ _id: jobId, recruiterId: req.user._id });
    if (!job) {
        return res.status(404).json(new CustomError(404, "record not found"));
    }
    const applications = await Application.find({ job: job._id }).populate(
        "candidate"
    );
    if (!applications) {
        throw new CustomError(400, "no applications found");
    }
    res.status(200).json(
        new CustomResponse(
            200,
            `applications belonging to ${job.title}`,
            applications
        )
    );
});

const getSingleApplicationByJobId = asyncHandler(async (req, res) => {
    const { jobId, appId } = req.params;
    const job = await Job.find({ _id: jobId, recruiterId: req.user._id });
    if (!job) {
        return res.status(404).json(new CustomError(404, "record not found"));
    }
    const application = await Application.findOne({
        _id: appId,
        job: job._id,
    }).populate("candidate");
    if (!application) {
        return res
            .status(404)
            .json(new CustomError(404, "no application for this job"));
    }
    res.status(200).json(
        new CustomResponse(200, `application for job ${job.title}`, application)
    );
});

const applicationUpdateByJobId = asyncHandler(async (req, res) => {
    const { jobId, appId } = req.params;
    const job = await Job.findOne({ _id: jobId, recruiterId: req.user._id });
    if (!job) {
        return res.status(404).json(new CustomError(404, "record not found"));
    }
    const { status } = req.body;
    const application = await Application.findOneAndUpdate(
        {
            _id: appId,
            job: job._id,
        },
        { status },
        { new: true }
    );
    if (!application) {
        return res
            .status(404)
            .json(new CustomError(404, "no application for this job"));
    }
    res.status(200).json(
        new CustomResponse(
            200,
            `updated application for job ${job.title}`,
            application
        )
    );
});

export {
    createJob,
    getAllJobs,
    myPostedJobs,
    updateJob,
    deleteJob,
    getJobById,
    application,
    getSingleApplicationByJobId,
    applicationUpdateByJobId,
};
