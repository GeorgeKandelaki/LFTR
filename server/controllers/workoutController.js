const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Workout = require("../models/workoutModel");

exports.getWorkouts = catchAsync(async function (req, res, next) {
    const workouts = await Workout.find({ user: req.user.id });

    if (!workouts) return next(new AppError("No Workouts associated with the user."));

    return res.status(200).json({
        status: "success",
        data: {
            workouts,
            items: workouts.length,
        },
    });
});

exports.getWorkout = catchAsync(async function (req, res, next) {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout) return next(new AppError("Workout with this ID doesn't exist"));

    return res.status(200).json({
        status: "success",
        data: { workout },
    });
});

exports.createWorkout = catchAsync(async function (req, res, next) {
    const workout = await Workout.create({ ...req.body, user: req.user.id });

    return res.status(201).json({
        status: "success",
        data: { workout },
    });
});

exports.editWorkout = catchAsync(async function (req, res, next) {
    const workout = await Workout.findByIdAndUpdate(req.params.workoutId, req.body, { runValidators: true, new: true });

    return res.status(200).json({
        status: "success",
        data: {
            workout,
        },
    });
});

exports.deleteWorkout = catchAsync(async function (req, res, next) {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout) return next(new AppError("No workout found with that ID", 404));

    await workout.deleteOne();

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
