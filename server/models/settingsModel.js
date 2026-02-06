const { default: mongoose, Schema } = require("mongoose");

const settingsSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        metric: {
            type: String,
            enum: ["metric", "imperial"],
            default: "metric",
        },
        restTime: { type: Number, default: 180 },
    },
    { toJSON: true, toObject: true },
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
