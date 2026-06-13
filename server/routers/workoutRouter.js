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

router.patch("/updateWorkoutObj", validateResourceUser("workoutId", Workout), workoutController.updateWorkoutObj);
router.post("/uploadWorkoutObj", workoutController.uploadWorkoutObj);

router
    .route("/:workoutId")
    .all(validateResourceUser("workoutId", Workout))
    .get(workoutController.getWorkout)
    .patch(filterBody(["name", "startedAt", "finishedAt", "description", "exercises"]), workoutController.editWorkout)
    .delete(workoutController.deleteWorkout);

// Exercise Routes
router.use("/:workoutId/exercise", validateResourceUser("workoutId", Workout), exerciseRouter);

module.exports = router;

/*
When you have:

router.route("/:workoutId")

that route matches:

/123
/abc
/uploadWorkoutObj
/anything

because :workoutId is a *dynamic parameter placeholder*.
So when this route appears FIRST:

router.route("/:workoutId")

and you request:

/uploadWorkoutObj

Express thinks:

req.params.workoutId = "uploadWorkoutObj"

Then your middleware does:

Workout.findById("uploadWorkoutObj")

and Mongoose tries to cast:

"uploadWorkoutObj"

into a Mongo ObjectId.
Which fails:
Cast to ObjectId failed
because:

uploadWorkoutObj !== valid MongoDB ObjectId

Why moving it BELOW works
Because Express checks routes top-to-bottom.
So:

router.post("/uploadWorkoutObj", ...)

gets matched FIRST.
Then Express stops searching.
So it never reaches:

"/:workoutId"

VERY important Express rule
Static routes should usually come BEFORE dynamic param routes.
*/
