const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env", quiet: true, debug: false });

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_STRING)
    .then(() => console.log("MongoDB has connected successfully..."))
    .catch((err) => console.log(err, "------MONGOOSE CONNECTION ERROR------"));

app.listen(port, () => {
    console.log(`Server successfully started. Listening for requests on ${port}...`);
});
