import express from "express";
import { customRole, isLoggedIn } from "../middleware/isLoggedIn.js";
import { apply, check } from "../controllers/application.controller.js";
import { checkSchema } from "express-validator";
import { applicationValidationSchema } from "../validations/applicationValidation.js";

const router = express.Router();

router
    .route("/")
    .post(
        isLoggedIn,
        customRole(["candidate"]),
        checkSchema(applicationValidationSchema),
        apply
    );
router
    .route("/check/:jobId")
    .get(isLoggedIn, customRole(["candidate", "recruiter"]), check);

export default router;
