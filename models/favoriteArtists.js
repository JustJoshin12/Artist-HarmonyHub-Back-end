const mongoose = require("mongoose");
const validator = require("validator");

const FavoriteArtist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  followers: {
    type: Number,
    min: 0,
    max: 100000000000000000000
  }
});


module.exports = mongoose.model("favoriteArtist", FavoriteArtist);