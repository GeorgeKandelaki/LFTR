const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const filterBody = require("../middlewares/filterBody");

const router = express.Router();

router.use(authController.protect);

router.get("/me", userController.getUser);
router.patch(
    "/me/updateUser",
    filterBody(["name", "email", "avatar"]),
    userController.upload.single("avatar"),
    userController.updateUser
);
router.patch(
    "/me/updatePassword",
    filterBody(["currentPassword", "newPassword", "confirmPassword"]),
    userController.updatePassword
);

module.exports = router;
