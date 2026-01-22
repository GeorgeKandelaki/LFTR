const AppError = require("./appError");

exports.isObjEmpty = function isObjEmpty(obj) {
    if (obj.constructor !== Object) return false;

    return Boolean(Object.keys(obj).length);
};

exports.extractJWT = function extractJWT(req) {
    if (req.headers.authorization?.startsWith("Bearer")) return req.headers.authorization.split(" ")[1];

    if (req.cookies?.jwt) return req.cookies.jwt;

    return null;
};

exports.requireJWT = function requireJWT(req) {
    const token = extractJWT(req);

    if (!token) throw new AppError("Not logged in", 401);

    return token;
};
