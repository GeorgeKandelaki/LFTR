const express = require("express");

const Set = require("../models/setModel");
const filterBody = require("../middlewares/filterBody");
const validateResourceParent = require("../middlewares/validateResourceParent");
const setController = require("../controllers/setController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.route("/").get(setController.getSets).post(setController.createSet);

router
    .route("/:setId")
    .all(validateResourceParent("setId", "exerciseId", "exercise", Set))
    .get(setController.getSet)
    .patch(filterBody("reps", "weight", "completed", "restTime", "setType"), setController.updateSet)
    .delete(setController.deleteSet);

module.exports = router;
