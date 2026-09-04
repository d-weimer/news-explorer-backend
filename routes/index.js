const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const articleRoutes = require("./articles");
const NotFoundError = require("../errors/not-found-error");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

router.use(auth);
router.use("/users", userRoutes);
router.use("/articles", articleRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
