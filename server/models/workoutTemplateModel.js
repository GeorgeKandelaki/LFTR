const mongoose = require("mongoose");

const workoutTemplateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Template must be owned by an user!"] },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: "No description." },
    exercises: [
        {
            _id: false,
            name: { type: String, required: true, trim: true },
            sets: [
                {
                    _id: false,
                    reps: { type: Number, required: true },
                    weight: { type: Number, required: true },
                    setType: { type: String, enum: ["drop_set", "warm_up", "failure", "none"], default: "none" },
                    completed: { type: Boolean, default: false },
                    restTime: { type: Number, default: 180 },
                },
            ],
        },
    ],
});

module.exports = mongoose.model("WorkoutTemplate", workoutTemplateSchema);
