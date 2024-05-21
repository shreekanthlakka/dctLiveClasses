const jobValidationSchema = {
    title: {
        in: ["body"],
        exists: {
            errorMessage: "title should be present",
        },
        notEmpty: {
            errorMessage: "title cannot be empty",
        },
        trim: true,
    },
    description: {
        in: ["body"],
        exists: {
            errorMessage: "description should be present",
        },
        notEmpty: {
            errorMessage: "description cannot be empty",
        },
        trim: true,
    },
    // recruiterId: {
    //     in: ["body"],
    //     exists: {
    //         errorMessage: "recruiter should be present",
    //     },
    //     notEmpty: {
    //         errorMessage: "recruiter cannot be empty",
    //     },
    //     isMongoId: {
    //         errorMessage: "recruiter should be a valid mongo id",
    //     },
    // },
    openings: {
        in: ["body"],
        exists: {
            errorMessage: "openings should be present",
        },
        notEmpty: {
            errorMessage: "openings cannot be empty",
        },
        trim: true,
    },
    location: {
        in: ["body"],
        exists: {
            errorMessage: "location should be present",
        },
        notEmpty: {
            errorMessage: "location cannot be empty",
        },
        trim: true,
    },
    jobType: {
        in: ["body"],
        exists: {
            errorMessage: "jobtype should be present",
        },
        notEmpty: {
            errorMessage: "jobtype cannot be empty",
        },
        // [fullTime, partTime, contract, internship]
        custom: {
            options: function (val) {
                const options = ["wfh", "wfo", "hybrid"];
                if (!options.includes(val)) {
                    throw new Error(
                        "jobtype should be one of wfh, wfo or hybrid"
                    );
                }
                return true;
            },
        },
    }, //[workFromHome, wfo]
    "experience.minExp": {
        in: ["body"],
        exists: {
            errorMessage: "min experience should be present",
        },
        notEmpty: {
            errorMessage: "experience cannot be empty",
        },
        trim: true,
    },
    "experience.maxExp": {
        in: ["body"],
        exists: {
            errorMessage: "max experience should be present",
        },
        notEmpty: {
            errorMessage: "experience cannot be empty",
        },
        trim: true,
        isNumeric: {
            max: {
                options: { max: 10 },
                errorMessage: "max experience should be less than 10",
            },
        },
        custom: {
            options: (val, { req }) => {
                if (val > 10) {
                    throw new Error(
                        "max experience should not exceed more than 10"
                    );
                }
                if (val < req.body.experience.minExp) {
                    throw new Error(
                        "max experience should be greater than min experience"
                    );
                }
                return true;
            },
        },
    },
    deadline: {
        in: ["body"],
        exists: {
            errorMessage: "deadline should be present",
        },
        notEmpty: {
            errorMessage: "deadline cannot be empty",
        },
        trim: true,
        isDate: {
            errorMessage: "deadline should be a date",
        },
        custom: {
            options: (val) => {
                if (new Date(val) < Date.now) {
                    throw new Error(
                        "deadline should be greater than current date"
                    );
                }
                return true;
            },
        },
    },
    skills: {
        in: ["body"],
        exists: {
            errorMessage: "skills should be present",
        },
        notEmpty: {
            errorMessage: "skills cannot be empty",
        },
        trim: true,
        isArray: {
            errorMessage: "skills should be an array",
        },
        custom: {
            options: (value) => {
                if (value.length === 0) {
                    throw new Error("minimum one skill should be added");
                }
                return true;
            },
        },
    },
    "salary.minSalary": {
        in: ["body"],
        exists: {
            errorMessage: "min salary should be present",
        },
        notEmpty: {
            errorMessage: "min salary cannot be empty",
        },
        trim: true,
    },
    "salary.maxSalary": {
        in: ["body"],
        exists: {
            errorMessage: "max salary should be present",
        },
        notEmpty: {
            errorMessage: "max salary cannot be empty",
        },
        custom: {
            options: function (value, { req }) {
                if (+req.body.salary.minSalary > +value) {
                    throw new Error(
                        "max salary should be greater than min salary"
                    );
                }
                return true;
            },
        },
    },
};

export { jobValidationSchema };
