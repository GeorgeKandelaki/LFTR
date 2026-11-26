const catchAsync = require("../utils/catchAsync");
const { fieldsToLeave } = require("../utils/utils");
const WorkoutTemplate = require("../models/workoutTemplateModel");
const mongoose = require("mongoose");

exports.createTemplate = catchAsync(async (req, res, next) => {
    const clientTemplate = req.body;

    const template = await WorkoutTemplate.create({
        user: req.user._id,
        name: clientTemplate.name,
        description: clientTemplate.description,
        exercises: clientTemplate.exercises,
    });

    return res.status(201).json({
        status: "success",
        template,
    });
});

exports.getTemplates = catchAsync(async (req, res, next) => {
    const templates = await WorkoutTemplate.find({ user: req.user._id });

    return res.status(200).json({ status: "success", templates });
});

exports.getTemplate = catchAsync(async (req, res, next) => {
    const template = await WorkoutTemplate.findById(req.params.templateId);

    if (!template) return next(new AppError("Couldn't find template with that ID.", 404));

    return res.status(200).json({
        status: "success",
        template,
    });
});

exports.deleteTemplate = catchAsync(async (req, res, next) => {
    await WorkoutTemplate.findByIdAndDelete(req.params.templateId);

    return res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.updateTemplate = catchAsync(async (req, res, next) => {
    const clientTemplate = fieldsToLeave(req.body, ["name", "description", "exercises"]);
    const updatedTemplate = await WorkoutTemplate.findByIdAndUpdate(req.params.templateId, clientTemplate, {
        runValidators: true,
        new: true,
    });

    return res.status(200).json({
        status: "success",
        updatedTemplate,
    });
});
