const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Workout = require("../models/workoutModel");
const { default: mongoose, model } = require("mongoose");

const { filterObj, isObjEmpty } = require("../utils/utils");

exports.getWorkouts = catchAsync(async function (req, res, next) {
    const workouts = await Workout.find({ user: req.user.id })
        .sort({ finishedAt: -1 })
        .populate({
            path: "exercises",
            populate: { path: "sets" },
        });

    if (!workouts.length) return next(new AppError("No Workouts associated with the user."));

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

    const workout = await Workout.create({
        ...filterObj(req.body, ["exercises", "workoutStarted"]),
        user: req.user.id,
    });

    if (!workout) return next(new AppError("Workout couldn't be created. Try again.", 404));

    if (!req.body.exercises.length) return next(new AppError("Workout must have exercises in it.", 401));

    for (let i = 0; i < req.body.exercises.length; i++) {
        const curExercise = req.body.exercises[i];
        const filteredExercise = { ...filterObj(curExercise, ["sets"]), workout: workout.id };
        const exercise = await Exercise.create({ ...filteredExercise, user: req.user.id });

        workout.exercises.push(exercise.id);

        for (let t = 0; t < curExercise.sets.length; t++) {
            const curSet = { ...curExercise.sets[t], exercise: exercise.id };
            const set = await Set.create({ ...curSet, user: req.user.id });

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

exports.updateWorkoutObj = catchAsync(async (req, res, next) => {
    const Exercise = mongoose.model("Exercise");
    const Set = mongoose.model("Set");

    const updateObj = req.body;

    // TODO: Instead of sequential loops use Promise.all()
    // TODO: Fixing the stale state in req.resource
    // TODO: Too much redundant DB queries
    // TODO: Needs shit ton of optimization and code refactoring

    // WORKOUT UPDATES
    if (!isObjEmpty(updateObj.updatedWorkoutFields)) {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            updateObj.workoutId,
            filterObj(updateObj.updatedWorkoutFields, ["user", "exercises", "finished", "startedAt", "finishedAt"]),
            {
                runValidators: true,
                new: true,
            },
        );

        if (!updatedWorkout) return next(new AppError("Couldn't update workout", 400));
    }

    // EXERCISE UPDATES
    if (updateObj.updatedExercises.length) {
        for (const exercise of updateObj.updatedExercises) {
            const ownerVerified = req.resource.exercises.some(
                (exerciseId) => exerciseId.toString() === exercise.exerciseId,
            );

            if (!ownerVerified) return next(new AppError("This Exercises doesn't belong to this workout", 401));

            const updatedExercise = await Exercise.findByIdAndUpdate(
                exercise.exerciseId,
                filterObj(exercise.updatedFields, ["user", "workout", "sets"]),
                { runValidators: true, new: true },
            );

            if (!updatedExercise) return next(new AppError("Couldn't update exercise", 400));
        }
    }

    // SET UPDATES
    if (updateObj.updatedSets.length) {
        for (const set of updateObj.updatedSets) {
            const exercise = await Exercise.findById(set.exerciseId);

            if (!exercise) return next(new AppError("The parent exercise doesn't exist", 404));

            const workoutVerified = req.resource.exercises.some(
                (exerciseId) => exerciseId.toString() === set.exerciseId,
            );
            const ownerVerified = exercise.sets.some((setId) => setId.toString() === set.setId);

            if (!ownerVerified || !workoutVerified)
                return next(new AppError("This Set doesn't belong to this exercise", 401));

            const updatedSet = await Set.findByIdAndUpdate(
                set.setId,
                filterObj(set.updatedFields, ["exercise", "user", "completed"]),
                { runValidators: true, new: true },
            );

            if (!updatedSet) return next(new AppError("Couldn't update set", 400));
        }
    }

    return res.status(200).json({
        status: "success",
        data: null,
    });
});

exports.getBestSets = catchAsync(async (req, res, next) => {
    const Exercise = mongoose.model("Exercise");

    const exerciseStats = await Exercise.aggregate([
        {
            $match: { user: req.user._id },
        },

        {
            $unwind: "$sets",
        },

        {
            $lookup: {
                from: "sets",
                localField: "sets",
                foreignField: "_id",
                as: "setObjects",
            },
        },

        {
            $unwind: "$setObjects",
        },

        { $addFields: { multipliedWeight: { $multiply: ["$setObjects.weight", "$setObjects.reps"] } } },

        { $sort: { multipliedWeight: -1 } },

        {
            $group: {
                _id: "$name",
                uniqueExercises: { $addToSet: "$workout" },
                bestSet: { $first: "$setObjects" },

                // sets: { $push: { _id: "$setObjects._id", weight: "$setObjects.weight", reps: "$setObjects.reps" } },
                // user: { $push: "$user" },
                // workout: {$push: "$workout"},
                // sets: { $push: "$sets" },
                // setObjects: { $push: "$setObjects" },
                // bestSet: {
                // weight: { $max: "" },
                // reps: "",
            },
        },

        { $addFields: { exercisesDone: { $size: "$uniqueExercises" } } },
    ]);

    return res.status(200).json({
        status: "success",
        stats: exerciseStats,
        results: exerciseStats.length,
    });
});

exports.getPreviousSets = catchAsync(async (req, res, next) => {
    const Set = mongoose.model("Set");
    const Exercise = mongoose.model("Exercise");

    const data = await Exercise.aggregate([
        {
            $match: { user: req.user._id },
        },

        {
            $lookup: {
                from: "workouts",
                localField: "workout",
                foreignField: "_id",
                as: "workoutObj",
            },
        },

        { $unwind: "$workoutObj" },

        {
            $lookup: {
                from: "sets",
                localField: "sets",
                foreignField: "_id",
                as: "setObjects",
            },
        },

        { $sort: { "workoutObj.finishedAt": -1 } },

        {
            $group: {
                _id: "$name",
                workout: {
                    $first: {
                        _id: "$workoutObj._id",
                        startedAt: "$workoutObj.startedAt",
                        finishedAt: "$workoutObj.finishedAt",
                    },
                },
                sets: { $first: "$setObjects" },
            },
        },
    ]);

    return res.status(200).json({
        status: "success",
        data,
    });
});

exports.getWorkoutStatsWeekly = catchAsync(async (req, res, next) => {
    const dateNow = new Date();
    const dateFilter = {
        startingDate: new Date(new Date(new Date().setHours(0, 0, 0, 0)).setMonth(new Date().getMonth() - 2)),
        weeklyStartingDates: [],
    };

    const weeklyDate = dateFilter.startingDate;
    let i;
    for (
        i = new Date(new Date(weeklyDate).setDate(weeklyDate.getDate() - ((weeklyDate.getDay() + 6) % 7)));
        i.getTime() <= new Date().getTime();
        i.setDate(i.getDate() + 7)
    )
        dateFilter.weeklyStartingDates.push(new Date(i));
    dateFilter.weeklyStartingDates.push(new Date(i));

    let stats = await Workout.aggregate([
        {
            $match: { user: req.user._id, finishedAt: { $gte: dateFilter.weeklyStartingDates[0] } },
        },

        {
            $bucket: {
                groupBy: "$finishedAt",
                boundaries: dateFilter.weeklyStartingDates,
                output: {
                    count: { $sum: 1 },
                },
            },
        },
    ]);

    let buf = 0;
    stats = dateFilter.weeklyStartingDates
        .map((date) => {
            const ids = stats.map((stat) => stat._id.getTime());
            if (!ids.includes(date.getTime())) return { _id: date, count: 0 };

            return stats[buf++];
        })
        .slice(0, -1);

    return res.status(200).json({
        status: "success",
        stats: stats,
    });
});

exports.getWorkoutStatsMonthly = catchAsync(async (req, res, next) => {
    const dateNow = new Date();
    const dateFilter = {
        startingDate: new Date(new Date(new Date().setHours(0, 0, 0, 0)).setFullYear(new Date().getFullYear() - 1)),
        monthlyStartingDates: [],
    };

    let i;
    for (
        i = new Date(new Date(new Date(dateFilter.startingDate).setDate(1)));
        i.getTime() <= dateNow.getTime();
        i.setMonth(i.getMonth() + 1)
    )
        dateFilter.monthlyStartingDates.push(new Date(i));
    dateFilter.monthlyStartingDates.push(new Date(i));

    let stats = await Workout.aggregate([
        {
            $match: { user: req.user._id, finishedAt: { $gte: dateFilter.monthlyStartingDates[0] } },
        },

        {
            $bucket: {
                groupBy: "$finishedAt",
                boundaries: dateFilter.monthlyStartingDates,
                output: {
                    count: { $sum: 1 },
                },
            },
        },
    ]);

    let buf = 0;
    stats = dateFilter.monthlyStartingDates
        .map((date) => {
            const ids = stats.map((stat) => stat._id.getTime());
            if (!ids.includes(date.getTime())) return { _id: date, count: 0 };

            return stats[buf++];
        })
        .slice(0, -1);

    return res.status(200).json({
        status: "success",
        stats,
    });
});
