import express from "express";
import { checkSchema, body, oneOf } from "express-validator";
import {
    createATask,
    deleteATask,
    getATask,
    getAllTasks,
    updateATask,
} from "../controllers/task.controller.js";
import Task from "../models/task.model.js";
import { taskValidationSchema } from "../validationSchema/task.validationSchema.js";
import { mongoIdValidationSchema } from "../validationSchema/mongoId.validationSchema.js";

const router = express.Router();

router
    .route("/")
    .post(checkSchema(taskValidationSchema), createATask)
    .get(getAllTasks);

router
    .route("/:id")
    .get(checkSchema(mongoIdValidationSchema), getATask)
    .put(
        checkSchema(mongoIdValidationSchema),
        body("status")
            .notEmpty()
            .custom((val) =>
                ["inprogress", "completed", "pending"].includes(val)
            )
            .withMessage("Invalid status"),

        body("title")
            .exists()
            .notEmpty()
            .custom(async (val) => {
                const existsTitle = await Task.findOne({ title: val });
                if (existsTitle) throw new Error("Title already exists");
            }),
        updateATask
    )
    .delete(checkSchema(mongoIdValidationSchema), deleteATask);

export default router;
