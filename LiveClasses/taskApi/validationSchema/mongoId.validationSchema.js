const mongoIdValidationSchema = {
    id: {
        in: ["params"],
        exists: {
            errorMessage: "ID is required",
        },
        notEmpty: {
            errorMessage: "ID should not be empty",
        },
        isMongoId: {
            errorMessage: "Provided Id is not a valid one",
        },
    },
};

export { mongoIdValidationSchema };
