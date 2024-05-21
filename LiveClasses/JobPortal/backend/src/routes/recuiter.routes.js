import express from "express";
import { body, checkSchema } from "express-validator";
import { customRole, isLoggedIn } from "../middleware/isLoggedIn.js";
import {
    createRecuiterProfile,
    getRecuiterProfileDetails,
    updateRecuiterProfileDetails,
} from "../controllers/recuiter.controller.js";

import { recuiterValidationSchema } from "../validations/recuiterValidationSchema.js";

const router = express.Router();

router
    .route("/profile")
    .post(
        isLoggedIn,
        customRole(["recruiter"]),
        checkSchema(recuiterValidationSchema),
        createRecuiterProfile
    )
    .get(isLoggedIn, customRole(["recruiter"]), getRecuiterProfileDetails)
    .put(
        isLoggedIn,
        customRole(["recruiter"]),
        body("companyName").exists().notEmpty().trim(),
        body("email")
            .exists()
            .notEmpty()
            .trim()
            .isEmail()
            .withMessage("Please provide a valid email address"),
        body("website").exists().notEmpty().trim(),
        body("address").exists().notEmpty().trim(),
        updateRecuiterProfileDetails
    );

export default router;
