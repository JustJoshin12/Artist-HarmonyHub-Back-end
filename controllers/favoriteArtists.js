const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");
const FavoriteArtist = require("../models/favoriteArtists");


const createFavoriteArtist = (req, res, next) => {
  const { name, image, followers } = req.body;
  const owner = req.user._id;

  FavoriteArtist.create({ name, image, followers, owner })
    .then((item) => {
      res.send( item );
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad Request"));
      }
        next(err)

    });
};

const getFavoriteArtists = (req, res, next) => {
  FavoriteArtist.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteFavoriteArtist = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  FavoriteArtist.findById(itemId)
    .orFail()
    .then((item) => {
      if (userId !== item.owner.toString()) {
        return next(new ForbiddenError("Forbidden"));
      }
      return item.deleteOne().then(() => res.send({ message: "Item deleted"}));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data entry"))
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
}