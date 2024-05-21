import express from "express";
import { checkSchema } from "express-validator";
import {
    createAnExpence,
    getAllExpances,
    updateAnExpence,
    deleteAnExpence,
    getSingleExpence,
} from "../controllers/expance.controller.js";
import { expenceValidationSchema } from "../validationSchema/expence.validationSchema.js";
import { idValidationSchema } from "../validationSchema/id.validationSchema.js";

const router = express.Router();

router.route("/all").get(getAllExpances);
router
    .route("/new")
    .post(checkSchema(expenceValidationSchema), createAnExpence);

router
    .route("/:id")
    .get(checkSchema(idValidationSchema), getSingleExpence)
    .patch(
        checkSchema(idValidationSchema),
        checkSchema(expenceValidationSchema),
        updateAnExpence
    )
    .delete(checkSchema(idValidationSchema), deleteAnExpence);
export default router;
