const expenceValidationSchema = {
    expanceDate: {
        in: ["body"],
        exists: {
            errorMessage: "expence date is required",
        },
        notEmpty: {
            errorMessage: "expence date cannot be empty",
        },
        isDate: {
            //yyyy-mm-dd format
            errorMessage: "Expense Date must be a valid date.",
        },
        custom: {
            options: function (value) {
                if (new Date(value) > new Date()) {
                    throw new Error(
                        "expance date cannot be greater than today"
                    );
                }
                return true;
            },
        },
    },
    amount: {
        in: ["body"],
        exists: {
            errorMessage: "amount  is required",
        },
        notEmpty: {
            errorMessage: "amount  cannot be empty",
        },
        isInt: {
            errorMessage: "Amount should be a numeric",
            options: { min: 1 },
        },
        custom: {
            options: function (value) {
                if (value <= 0)
                    throw new Error("amount should be greater than 0");
                return true;
            },
        },
    },
};

export { expenceValidationSchema };
