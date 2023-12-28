const mongoose = require("mongoose");
const validator = require("validator");

const FavoriteAlbum = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  artist: {
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
  totalTracks: {
    type: Number,
    min: 0,
    max: 1000,
  },
});

module.exports = mongoose.model("favoriteAlbum", FavoriteAlbum);
