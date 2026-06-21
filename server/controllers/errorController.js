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

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.statusCode || "error";

    if (process.env.NODE_ENV === "development") {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError") {
            error = castErrorHandler(error);
        }
        prodErrors(res, error);
    }
};
