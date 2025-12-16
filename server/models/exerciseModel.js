const { default: mongoose, Schema } = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
        // user: { type: Schema.Types.ObjectId, ref: "User" },
        workout: { type: Schema.Types.ObjectId, ref: "Workout" },
        name: { type: String, required: true, trim: true },
        sets: [{ type: Schema.Types.ObjectId, ref: "Set" }],
    },
    { toJSON: true, toObject: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
