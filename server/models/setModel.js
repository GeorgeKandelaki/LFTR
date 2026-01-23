const { default: mongoose, Schema } = require("mongoose");

const setSchema = new mongoose.Schema(
    {
        exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
        setType: { type: String, enum: ["drop_set", "warm_up", "failure", "none"], default: "none" },
        completed: { type: Boolean, default: false },
        restTime: { type: Number, default: 180 },
    },
    { toJSON: true, toObject: true },
);

setSchema.index({ exercise: 1 });

setSchema.post("save", async function (doc) {
    if (!doc.exercise) return;
    const Exercise = mongoose.model("Exercise");

    await Exercise.findByIdAndUpdate(doc.exercise, { $addToSet: { sets: doc.id } });
});

setSchema.pre("deleteOne", { document: true, query: false }, async function () {
    if (!this.exercise) return;

    await Exercise.findByIdAndUpdate(this.exercise, { $pull: { sets: this.id } });
});

const Set = mongoose.model("Set", setSchema);

module.exports = Set;
