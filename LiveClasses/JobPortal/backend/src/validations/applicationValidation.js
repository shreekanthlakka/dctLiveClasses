import Application from "../models/application.model.js";

const applicationValidationSchema = {
    job: {
        in: ["body"],
        exists: {
            errorMessage: "job is required",
        },
        notEmpty: {
            errorMessage: "job cannot be emtpy",
        },
        isMongoId: {
            errorMessage: "job should be a valid",
        },
        custom: {
            options: async function (value, { req }) {
                const application = await Application.findOne({
                    job: value,
                    candidate: req.user._id,
                });
                if (application) {
                    throw new Error("You have already applied for this job");
                }
                return true;
            },
        },
    },
};

const applicationTrackSchema = {};

export { applicationTrackSchema, applicationValidationSchema };
