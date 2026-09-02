const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Article = require("./models/article");

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/news_explorer_db")
  .then(() => console.log(" Connected to MongoDB successfully"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.get("/test-db", async (req, res) => {
  try {
    const testUser = await User.create({
      email: `test_${Date.now()}@example.com`,
      password: "hashedpassword123",
      name: "Test Explorer",
    });

    const testArticle = await Article.create({
      keyword: "Technology",
      title: "Mongoose Validation Test",
      text: "Testing schema validation rules for News Explorer.",
      date: "September 2, 2026",
      source: "Tech News",
      link: "https://example.com/article",
      image: "https://example.com/image.jpg",
      owner: testUser._id,
    });

    res.status(201).json({
      message: "Schema validation tests passed successfully!",
      user: testUser,
      article: testArticle,
    });
  } catch (err) {
    res.status(400).json({
      error: "Schema Validation Failed",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
