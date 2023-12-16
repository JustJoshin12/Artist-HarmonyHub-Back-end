const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  userName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email:  {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "email is invalid",
    },
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  }

});

users.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((data) => {
      if (!data) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, data.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return data;
      });
    });
};

module.exports = mongoose.model("users",users)