class CustomError extends Error {
    constructor(
        status,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = status;
        this.success = false;
        this.errors = errors;
        this.message = message;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { CustomError };
