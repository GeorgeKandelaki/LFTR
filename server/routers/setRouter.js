const express = require("express");

const Set = require("../models/setModel");
const filterBody = require("../middlewares/filterBody");
const validateResourceParent = require("../middlewares/validateResourceParent");
const setController = require("../controllers/setController");

const router = express.Router({ mergeParams: true });

router.route("/").get(setController.getSets).post(setController.createSet);

router
    .route("/:setId")
    .all(validateResourceParent("setId", "exerciseId", "exercise", Set))
    .get(setController.getSet)
    .patch(filterBody("reps", "weight", "completed", "restTime", "setType"), setController.updateSet)
    .delete(setController.deleteSet);

module.exports = router;
