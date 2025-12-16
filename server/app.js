const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const workoutRouter = require("./routers/workoutRouter");

const app = express();

const allowedOrigins = ["https://localhost:5173"];

// CORS Options
const corsOptions = {
    origin: (origin, callback) => {
        try {
            if (!origin || allowedOrigins.includes(origin.toLowerCase())) return callback(null, true);

            return callback(new Error(`CORS: ${origin} not allowed.`));
        } catch (err) {
            return callback(err);
        }
    },
    credentials: true,
};

// CORS
app.use(cors(corsOptions));

// Static Files
app.use("/static", express.static(path.join(__dirname, "public")));

// JSON parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Top-Level Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/workouts", workoutRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
