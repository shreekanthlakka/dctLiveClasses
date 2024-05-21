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

/**
 * class ApiError extends Error {
    constructor(
        status,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = status;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
 * 
 */
