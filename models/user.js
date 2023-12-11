const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = User;