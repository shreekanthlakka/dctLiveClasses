import express from "express";
import { checkSchema } from "express-validator";
import { customRole, isLoggedIn } from "../middleware/isLoggedIn.js";
import { jobValidationSchema } from "../validations/jobValidation.js";
import {
    application,
    applicationUpdateByJobId,
    createJob,
    deleteJob,
    getAllJobs,
    getJobById,
    getSingleApplicationByJobId,
    myPostedJobs,
    updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router
    .route("/myjobpostings")
    .get(isLoggedIn, customRole(["recruiter"]), myPostedJobs);

router
    .route("/")
    .get(getAllJobs) // public route
    .post(
        isLoggedIn,
        customRole(["recruiter"]),
        checkSchema(jobValidationSchema),
        createJob
    );
router
    .route("/:jobId")
    .get(getJobById)
    .put(isLoggedIn, customRole(["recruiter"]), updateJob)
    .delete(isLoggedIn, customRole(["recruiter"]), deleteJob);

//getting all applications belonging to patticular jobId
router
    .route("/:jobId/applications")
    .get(isLoggedIn, customRole(["recruiter"]), application);

//specific application for specific job
//update status for specific application
router
    .route("/:jobId/applications/:appId")
    .get(isLoggedIn, customRole(["recruiter"]), getSingleApplicationByJobId)
    .put(isLoggedIn, customRole(["recruiter"]), applicationUpdateByJobId);

export default router;
