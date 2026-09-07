const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, "The keyword field is required"],
  },
  title: {
    type: String,
    required: [true, "The title field is required"],
  },
  text: {
    type: String,
    required: [true, "The text field is required"],
  },
  date: {
    type: String,
    required: [true, "The date field is required"],
  },
  source: {
    type: String,
    required: [true, "The source field is required"],
  },
  link: {
    type: String,
    required: [true, "The link field is required"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Invalid URL format for link",
    },
  },
  image: {
    type: String,
    required: [true, "The image field is required"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Invalid URL format for image",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("article", articleSchema);
