require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());

//  auth api route
app.use("/api/auth", require("./routes/auth"));

// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

const PORT = process.env.port || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);
  server.close(() => process.exit(1));
});
