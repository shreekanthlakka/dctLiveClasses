import express from "express";
import { checkSchema, body } from "express-validator";
import { userValidationSchema } from "../validation/user.validation.js";
import {
    loggedInUser,
    login,
    logout,
    register,
} from "../controllers/user.controller.js";
import { checkValidationErrors } from "../middlewares/validationError.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router
    .route("/login")
    .post(
        body("email")
            .exists()
            .trim()
            .notEmpty()
            .isEmail()
            .withMessage("Provide a valid email"),
        body("password").exists().trim().notEmpty(),
        checkValidationErrors,
        login
    );
router
    .route("/register")
    .post(checkSchema(userValidationSchema), checkValidationErrors, register);
router.route("/logout").post(isLoggedIn, logout);
router.route("/loggedInUser").get(isLoggedIn, loggedInUser);

export default router;
