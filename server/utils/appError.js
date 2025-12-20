class AppError extends Error {
    super(message, errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}

module.exports = AppError;
