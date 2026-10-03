const { default: mongoose } = require("mongoose");

const workoutTemplateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.types.ObjectId, required: [true, "Template must be owned by an user!"] },
    template: [
        {
            name: { type: String, trim: true, required: true },
            sets: [{}],
        },
    ],
});

module.exports = mongoose.model("WorkoutTemplate", workoutTemplateSchema);
