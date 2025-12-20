const { default: mongoose, Schema } = require("mongoose");
const Exercise = require("./exerciseModel");

const workoutSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
        finished: { type: Boolean, default: false },
        description: { type: String },
        startedAt: { type: Date, default: Date.now() },
        finishedAt: { type: Date },
    },
    { toJSON: true, toObject: true }
);

workoutSchema.pre("delete", function () {
    if (!this.exercise.length) return;

    this.exercises.forEach(async (exercise) => await Exercise.findByIdAndDelete(exercise.id));
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
