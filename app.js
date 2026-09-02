const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const rateLimiter = require("./middlewares/rate-limiter");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const { validateUserBody } = require("./middlewares/validation");

const NotFoundError = require("./errors/not-found-error");
const UnauthorizedError = require("./errors/unauthorized-error");

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/news_explorer_db")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.post("/test-validation", validateUserBody, (req, res) => {
  res.status(200).json({ message: "Validation passed!", body: req.body });
});

app.get("/test-error", (req, res, next) => {
  next(new NotFoundError("Requested resource was not found"));
});

app.get("/test-auth", auth, (req, res) => {
  res.status(200).json({ message: "Auth middleware passed!", user: req.user });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
