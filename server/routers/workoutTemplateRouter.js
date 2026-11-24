const express = require("express");

const WorkoutTemplate = require("../models/workoutTemplateModel");
const workoutTemplateController = require("../controllers/workoutTemplateController");
const authController = require("../controllers/authController");
const validateResourceUser = require("../middlewares/validateResourceUser");

const router = express.Router();

router.use(authController.protect);

router.post("/templates/create", workoutTemplateController.createTemplate);
router.get("/templates", workoutTemplateController.getTemplates);
router
    .route("/templates/:templateId")
    .all(validateResourceUser("templateId", WorkoutTemplate))
    .get(workoutTemplateController.getTemplate)
    .patch(workoutTemplateController.updateTemplate)
    .delete(workoutTemplateController.deleteTemplate);

module.exports = router;
