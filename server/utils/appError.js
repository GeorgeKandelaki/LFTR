class AppError extends Error {
    constructor(message, errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}

module.exports = AppError;
