const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required"],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "The name field is required"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [30, "Name cannot exceed 30 characters"],
  },
});

module.exports = mongoose.model("user", userSchema);
