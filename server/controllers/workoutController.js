const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Workout = require("../models/workoutModel");
const { default: mongoose } = require("mongoose");

const { filterObj } = require("../utils/utils");

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

exports.uploadWorkoutObj = catchAsync(async function (req, res, next) {
    const Exercise = mongoose.model("Exercise");
    const Set = mongoose.model("Set");

    const workout = await Workout.create(filterObj(req.body, ["exercises", "workoutStarted"]));

    if (!workout) return next(new AppError("Workout couldn't be created. Try again.", 404));

    for (let i = 0; i < req.body.exercises.length; i++) {
        const curExercise = req.body.exercises[i];
        const filteredExercise = { ...filterObj(curExercise, ["sets"]), workout: workout.id };
        const exercise = await Exercise.create(filteredExercise);

        workout.exercises.push(exercise.id);

        for (let t = 0; t < curExercise.sets.length; t++) {
            const curSet = { ...curExercise.sets[t], exercise: exercise.id };
            const set = await Set.create(curSet);

            exercise.sets.push(set.id);
        }

        await exercise.save();
    }

    await workout.save();

    return res.status(200).json({
        status: "success",
        data: workout,
    });
});
