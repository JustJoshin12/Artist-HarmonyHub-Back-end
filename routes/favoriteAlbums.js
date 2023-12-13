const router = require("express").Router();

const {
  createFavoriteAlbum,
  getFavoriteAlbums,
  deleteFavoriteAlbum
} = require("../controllers/favoriteAlbums");

const { authorize } = require("../middleware/auth");
const {validateFavoriteAlbumBody, validateId} = require("../middleware/validation");
// CRUD

// Create
router.post("/", authorize, validateFavoriteAlbumBody, createFavoriteAlbum);

// Read
router.get("/", getFavoriteAlbums);

// Delete
router.delete("/:itemId", authorize, validateId, deleteFavoriteAlbum);


module.exports = router;