const AppError = require("../utils/appError");

function devErrors(res, error) {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error,
    });
}

function prodErrors(res, error) {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong! Please try again later.",
        });
    }
}

function castErrorHandler(err) {
    const msg = `Invalid value for ${err.path}: ${err.path}!`;

    return new AppError(msg, 400);
}

function duplicateKeyErrorHandler(err) {
    const [key, value] = Object.entries(error.keyValue)[0];

    const msg = `There is already a resource with  ${key} ${value}. Please use another ${key}! `;

    return new AppError(msg, 400);
}

function validationErrorHandler(err) {
    const errors = Object.values(err.errors).map((val) => val.message);
    const errorMessages = errors.join(". ");
    const msg = `Invalid input data. ${errorMessages}`;

    return new AppError(msg, 400);
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.statusCode || "error";

    if (process.env.NODE_ENV === "development") {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError") error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateKeyErrorHandler(error);
        if (error.name === "ValidationError") error = validationErrorHandler(error);
        prodErrors(res, error);
    }
};
