const users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");


const createUser = (req, res, next) => {
  const { name, userName, password, email, avatar } = req.body;

  if (!email) {
    return next(new BadRequestError("Please include an email"));
  }

  return users
    .findOne({ email })
    .then((user) => {
      if (user) {
         next(new ConflictError("A user with this email already exists."))
      }

      return bcrypt.hash(password, 10)
      .then((hash) => {
        users
          .create({ name, avatar, email, password: hash, userName })
          .then((data) => res.send({
            name: data.name,
            avatar: data.avatar,
            email: data.email,
            userName: data.userName
          }))
          .catch((err) => {
            if (err.name === "ValidationError") {
               next(new BadRequestError("Invalid data entry"))
            }
            if (err.code === 11000) {
               next(new ConflictError("Email already exist"))
            }
           next(err)
          });
      });
    })
    .catch((err) => {
      next(err)
    })
};

module.exports = {
  createUser,
};