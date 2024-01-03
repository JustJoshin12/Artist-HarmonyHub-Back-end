const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");
const ConflictError = require("../errors/conflict-error");
const FavoriteArtist = require("../models/favoriteArtists");

const createFavoriteArtist = (req, res, next) => {
  const { name, image, followers, spotifyId } = req.body;
  const owner = req.user._id;

  FavoriteArtist.findOne({ name, owner }).then((existingArtist) => {
    if (existingArtist) {
      next(new ConflictError("Artist already in favorites"));
    } else {
      FavoriteArtist.create({ name, image, followers, spotifyId, owner })
        .then((item) => {
          res.send(item);
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new BadRequestError("Bad Request"));
          }
          next(err);
        });
    }
  });
};

const getFavoriteArtists = (req, res, next) => {
  const userId = req.user._id;

  FavoriteArtist.find({ owner: userId })
    .then((items) => res.send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteFavoriteArtist = (req, res, next) => {
  const { name } = req.params;
  const decodedArtistName = decodeURIComponent(name);
  const userId = req.user._id;

  FavoriteArtist.findOne( {name: decodedArtistName} )
    .orFail()
    .then((item) => {
      if (userId !== item.owner.toString()) {
        return next(new ForbiddenError("Forbidden"));
      }
      return item.deleteOne().then(() => res.send({ message: "Item deleted" }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data entry"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Info not found"));
      }
      next(err);
    });
};

module.exports = {
  createFavoriteArtist,
  getFavoriteArtists,
  deleteFavoriteArtist,
};
