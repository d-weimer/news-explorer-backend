const router = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  validateArticleBody,
  validateObjectId,
} = require("../middlewares/validation");

router.get("/", getArticles);
router.post("/", validateArticleBody, createArticle);
router.delete("/:articleId", validateObjectId, deleteArticle);

module.exports = router;
