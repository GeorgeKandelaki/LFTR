const { default: mongoose } = require("mongoose");

const workoutTemplateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: [true, "Template must be owned by an user!"] },
    template: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            name: { type: String, trim: true, required: true },
            workoutTemplate: { type: Object },
        },
    ],
});

module.exports = mongoose.model("WorkoutTemplate", workoutTemplateSchema);
