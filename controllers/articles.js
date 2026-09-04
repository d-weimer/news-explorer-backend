const Article = require("../models/article");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid article data provided"));
      }
      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .select("+owner")
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Article not found");
      }

      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "You are not authorized to delete this article",
        );
      }

      return Article.findByIdAndDelete(articleId).then(() => {
        res.send({ message: "Article successfully deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid article ID format"));
      }
      return next(err);
    });
};
