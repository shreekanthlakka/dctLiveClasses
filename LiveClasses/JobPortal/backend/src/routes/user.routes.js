import express from "express";
import { checkSchema } from "express-validator";
import {
    adminGetAllUsers,
    checkEmail,
    getLoggedInUserDetails,
    login,
    logout,
    register,
} from "../controllers/user.controller.js";
import { userValidationSchema } from "../validations/userValidationSchema.js";
import { customRole, isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();

router.route("/register").post(checkSchema(userValidationSchema), register);
router.route("/login").post(login);
router.route("/logout").post(isLoggedIn, logout);
router.route("/getLoggedInUser").get(isLoggedIn, getLoggedInUserDetails);
router.route("/checkEmail").get(checkEmail);

//admin routes

router.route("/admin").get(isLoggedIn, customRole(["admin"]), adminGetAllUsers);

export default router;
