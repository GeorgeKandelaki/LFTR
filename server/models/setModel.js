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
    { toJSON: true, toObject: true }
);

const Set = mongoose.model("Set", setSchema);
