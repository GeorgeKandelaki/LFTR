const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
            minlength: [4, "Name must be at least 4 characters long"],
            maxlength: [30, "Name must not exceed 30 characters"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
            validate: [isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            maxlength: [30, "Password must not exceed 30 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "premium_user", "admin", "owner"],
            default: "user",
        },
        avatar: String,
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePasswords = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
