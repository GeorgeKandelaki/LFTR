const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Exercise = require("../models/exerciseModel");
const Workout = require("../models/workoutModel");

exports.getExercises = catchAsync(async (req, res, next) => {
    const exercises = await Exercise.find({ workout: req.params.workoutId });

    if (!exercises) return next(new AppError("No exercises found", 404));

    return res.status(200).json({
        status: "success",
        data: {
            exercises,
            items: exercises.length,
        },
    });
});

exports.getExercise = catchAsync(async (req, res, next) => {
    const exercise = await Exercise.findById(req.params.exerciseId);

    if (!exercise) return next(new AppError("No exercise found", 404));

    return res.status(200).json({
        status: "success",
        data: { exercise },
    });
});

exports.createExercise = catchAsync(async (req, res, next) => {
    const workout = await Workout.findById(req.params.workoutId);

    if (!workout) return next(new AppError("Workout was not found", 404));

    const exercise = await Exercise.create({ ...req.body, workout: req.params.workoutId });

    workout.exercises.push(exercise.id);
    await workout.save();

    return res.status(201).json({
        status: "success",
        data: { exercise },
    });
});

exports.updateExercise = catchAsync(async (req, res, next) => {
    const exercise = await Exercise.findByIdAndUpdate(
        req.params.exerciseId,
        { ...req.body },
        { new: true, runValidators: true },
    );

    return res.status(201).json({
        status: "success",
        data: {
            exercise,
        },
    });
});

exports.deleteExercise = catchAsync(async (req, res, next) => {
    const exercise = await Exercise.findById(req.params.exerciseId);

    if (!exercise) return next(new AppError("No exercise found with that ID", 404));

    await exercise.deleteOne();

    return res.status(204).json({ status: "success", data: null });
});
