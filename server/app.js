const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { xss } = require("express-xss-sanitizer");

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const workoutRouter = require("./routers/workoutRouter");

const app = express();

const allowedOrigins = ["http://localhost:5173"];

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

// Parse req.body into JSON
app.use(bodyParser.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Protection Against XSS
app.use(xss());

// Cookie Parser
app.use(cookieParser());

// Top-Level Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/workouts", workoutRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
