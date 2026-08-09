const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env", quiet: true, debug: false });

const port = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
    console.log(err.name, ":", err.message);
    console.log("Uncaught exception has occurred! Shuting down...");
    console.log(err);

    process.exit(1);
});

const app = require("./app");

mongoose
    .connect(process.env.DB_STRING)
    .then(() => console.log("MongoDB has connected successfully..."))
    .catch((err) => console.log(err, "------MONGOOSE CONNECTION ERROR------"));

const server = app.listen(port, () => {
    console.log(`Server successfully started. Listening for requests on ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, ":", err.message);
    console.log("Unhandled rejection has occurred! Shutting down...");

    server.close(() => {
        process.exit(1);
    });
});
