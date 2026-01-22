const catchAsync = require("../utils/catchAsync");
const Set = require("../models/setModel");
const AppError = require("../utils/appError");
const { findByIdAndDelete } = require("../models/workoutModel");

exports.getSets = catchAsync(async (req, res, next) => {
    const sets = await Set.find({ exercise: req.params.exerciseId });

    if (!sets) return next(new AppError("No sets found", 404));

    return res.status(200).json({
        status: "success",
        data: {
            sets,
            items: sets.length,
        },
    });
});

exports.getSet = catchAsync(async (req, res, next) => {
    const set = await Set.findById(req.params.setId);

    if (!set) return next(new AppError("No set found with that ID", 404));

    return res.status(200).json({
        status: "success",
        data: {
            set,
        },
    });
});

exports.createSet = catchAsync(async (req, res, next) => {
    const set = await Set.create({ ...req.body, exercise: req.params.exerciseId });

    return res.status(201).json({
        status: "success",
        data: { set },
    });
});

exports.updateSet = catchAsync(async (req, res, next) => {
    const set = await findByIdAndUpdate(req.params.setId, { ...req.body }, { new: true, runValidators: true });

    return res.status(200).json({
        status: "success",
        data: { set },
    });
});

exports.deleteSet = catchAsync(async (req, res, next) => {
    const set = await Set.findById(req.params.setId);

    if (!set) return next(new AppError("No set found with that ID", 404));

    await set.deleteOne();

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
