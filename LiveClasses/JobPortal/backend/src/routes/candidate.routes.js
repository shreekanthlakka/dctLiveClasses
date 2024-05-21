import express from "express";
import { checkSchema, body } from "express-validator";
import { candidateValidationSchema } from "../validations/candidateValidation.js";
import { customRole, isLoggedIn } from "../middleware/isLoggedIn.js";
import {
    createProfile,
    getProfileDetails,
    updateProfileDetails,
} from "../controllers/candidate.controller.js";

const router = express.Router();

router
    .route("/profile")
    .get(isLoggedIn, customRole(["candidate"]), getProfileDetails)
    .post(
        isLoggedIn,
        customRole(["candidate"]),
        checkSchema(candidateValidationSchema),
        createProfile
    )
    .put(
        isLoggedIn,
        customRole(["candidate"]),
        body("firstName").notEmpty().exists().trim(),
        body("lastName").notEmpty().exists().trim(),
        body("mobileNumber")
            .notEmpty()
            .exists()
            .trim()
            .isMobilePhone("en-IN")
            .withMessage("give  a valid mobile number."),
        body("address").notEmpty().exists().trim(),
        updateProfileDetails
    );

export default router;
