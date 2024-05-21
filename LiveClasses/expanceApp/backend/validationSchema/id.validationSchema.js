const idValidationSchema = {
    id: {
        in: ["params"],
        isMongoId: {
            errorMessage: "Invalid MongoID",
        },
    },
};

export { idValidationSchema };
