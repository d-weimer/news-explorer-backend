const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const NotFoundError = require("../errors/not-found-error");

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        email,
        password: hashedPassword,
        name,
      }),
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("User with this email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data provided"));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Incorrect email or password");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.send({ token });
      });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send(user);
    })
    .catch(next);
};
