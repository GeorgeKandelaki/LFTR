const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "/public/avatars"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
        cb(null, "avatar" + "_" + file.originalname.toLowerCase().trim().replaceAll(" ", "_") + "-" + uniqueSuffix);
    },
});

exports.upload = multer({ storage: storage, fileFilter: function (req, file, cb) {} });

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) return next(new AppError("No user found.", 404));

    return res.status(200).json({ status: "success", data: { user } });
});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.updatePassword = catchAsync(async (req, res, next) => {});
