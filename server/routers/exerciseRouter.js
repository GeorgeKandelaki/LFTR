const express = require("express");

const filterBody = require("../middlewares/filterBody");
const exerciseController = require("../controllers/exerciseController");
const validateResourceParent = require("../middlewares/validateResourceParent");
const setRouter = require("./setRouter");
const Exercise = require("../models/exerciseModel");

const router = express.Router({ mergeParams: true });

router.route("/").get(exerciseController.getExercises).post(exerciseController.createExercise);

router
    .route("/:exerciseId")
    .all(validateResourceParent("exerciseId", "workoutId", "workout", Exercise))
    .get(exerciseController.getExercise)
    .patch(filterBody("name"), exerciseController.updateExercise)
    .delete(exerciseController.deleteExercise);

router.use("/:exerciseId/set", validateResourceParent("exerciseId", "workoutId", "workout", Exercise), setRouter);

module.exports = router;
