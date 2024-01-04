const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");
const ConflictError = require("../errors/conflict-error");
const FavoriteAlbum = require("../models/favoriteAlbums");

const createFavoriteAlbum = (req, res, next) => {
  const { name, image, artist, totalTracks } = req.body;
  const owner = req.user._id;

  FavoriteAlbum.findOne({ name, owner })
    .then((existingAlbum) => {
      if (existingAlbum) {
        next(new ConflictError("Album already in favorites"));
      } else {
        FavoriteAlbum.create({ name, image, artist, totalTracks, owner })
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
    })
    .catch((err) => {
      next(err);
    });
};

const getFavoriteAlbums = (req, res, next) => {
  const userId = req.user._id;

  FavoriteAlbum.find({ owner: userId })
    .then((items) => res.send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteFavoriteAlbum = (req, res, next) => {
  const { name } = req.params;
  const userId = req.user._id;

  FavoriteAlbum.findOne({name:name})
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
  createFavoriteAlbum,
  getFavoriteAlbums,
  deleteFavoriteAlbum,
};
