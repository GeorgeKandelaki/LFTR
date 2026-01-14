const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

function signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "90d",
    });
}

function createSendToken(user, statusCode, req, res) {
    const token = signToken({ id: user._id });

    const cookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        data: {
            user,
            token,
        },
    });
}

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    else if (req.cookies?.jwt) token = req.cookies.jwt;

    if (!token) return next(new AppError("You are not logged in! Please log in to get access.", 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) return next(new AppError("The user belonging to this token no longer exists.", 401));

    req.user = user;
    next();
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError("Please provide email and password", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePasswords(password, user.password)))
        return next(new AppError("Email or password is incorrect", 401));

    createSendToken(user, 200, req, res);
});

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "user",
        avatar: "default.jpg",
    });

    createSendToken(user, 201, req, res);
});

exports.checkIfLoggedIn = catchAsync(async (req, res, next) => {});
