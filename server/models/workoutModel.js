const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
        finished: { type: Boolean, default: false },
        description: { type: String },
        startedAt: { type: Date, default: Date.now() },
        finishedAt: { type: Date, default: null },
    },

    { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

workoutSchema.index({ user: 1 });

workoutSchema.virtual("duration").get(function () {
    if (!this.finishedAt) return null;
    return this.finishedAt - this.startedAt;
});

workoutSchema.pre("deleteOne", { document: true, query: false }, async function () {
    const Exercise = mongoose.model("Exercise");

    if (!this.exercises?.length) return;

    await Exercise.deleteMany({ _id: { $in: this.exercises } });
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
