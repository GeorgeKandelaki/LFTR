const { default: mongoose, Schema } = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
        // user: { type: Schema.Types.ObjectId, ref: "User" },
        workout: { type: Schema.Types.ObjectId, ref: "Workout" },
        name: { type: String, required: true, trim: true },
        sets: [{ type: Schema.Types.ObjectId, ref: "Set" }],
    },
    { toJSON: true, toObject: true },
);

exerciseSchema.index({ workout: 1, name: 1 });

exerciseSchema.post("save", async function (doc) {
    const Workout = mongoose.model("Workout");

    await Workout.findByIdAndUpdate(doc.workout, { $addToSet: { exercises: doc.id } });
});

exerciseSchema.pre("deleteOne", { document: true, query: false }, async function () {
    if (!this.sets.length) return;
    const Set = mongoose.model("Set");

    await Set.deleteMany({ _id: { $in: this.sets } });
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
