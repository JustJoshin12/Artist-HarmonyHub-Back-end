const router = require("express").Router();

const {
  createFavoriteArtist,
  getFavoriteArtists,
  deleteFavoriteArtist
} = require("../controllers/favoriteArtists");

const { authorize } = require("../middleware/auth");
const {validateFavoriteArtistBody, validateId} = require("../middleware/validation");
// CRUD

// Create
router.post("/", authorize, validateFavoriteArtistBody, createFavoriteArtist);

// Read
router.get("/", authorize, getFavoriteArtists);

// Delete
router.delete("/:itemId", authorize, validateId, deleteFavoriteArtist);


module.exports = router;