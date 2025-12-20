const express = require("express");

const authController = require("../controllers/authController");
const workoutController = require("../controllers/workoutController");
const exerciseRouter = require("./exerciseRouter");

const Workout = require("../models/workoutModel");
const validateResourceUser = require("../middlewares/validateResourceUser");
const filterBody = require("../middlewares/filterBody");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(workoutController.getWorkouts).post(workoutController.createWorkout);

router
    .route("/:workoutId")
    .all(validateResourceUser("workoutId", Workout))
    .get(workoutController.getWorkout)
    .patch(filterBody(["name", "startedAt", "finishedAt", "description", "exercises"]), workoutController.editWorkout)
    .delete(workoutController.deleteWorkout);

// Exercise Routes
router.use("/:workoutId/exercise", validateResourceUser("workoutId", Workout), exerciseRouter);

module.exports = router;
