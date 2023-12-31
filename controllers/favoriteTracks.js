const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");
const ConflictError = require("../errors/conflict-error");
const FavoriteTrack = require("../models/favoriteTracks");

const createFavoriteTrack = (req, res, next) => {
  const { name, image } = req.body;
  const owner = req.user._id;

  FavoriteTrack.findOne({ name, owner })
    .then((existingTrack) => {
      if (existingTrack) {
        next(new ConflictError("Track already in favorites"));
      } else {
        FavoriteTrack.create({ name, image, owner })
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

const getFavoriteTracks = (req, res, next) => {
  const userId = req.user._id;

  FavoriteTrack.find({ owner: userId })
    .then((items) => res.send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteFavoriteTrack = (req, res, next) => {
  const { name } = req.params;
  const userId = req.user._id;

  FavoriteTrack.findOne({name:name})
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
  createFavoriteTrack,
  getFavoriteTracks,
  deleteFavoriteTrack,
};
