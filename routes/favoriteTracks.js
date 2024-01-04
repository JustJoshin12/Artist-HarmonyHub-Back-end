const router = require("express").Router();

const {
  createFavoriteTrack,
  getFavoriteTracks,
  deleteFavoriteTrack,
} = require("../controllers/favoriteTracks");

const { authorize } = require("../middleware/auth");
const {validateFavoriteTrackBody, validateId} = require("../middleware/validation");

// CRUD

// Create
router.post("/", authorize, validateFavoriteTrackBody, createFavoriteTrack);

// Read
router.get("/",authorize, getFavoriteTracks);

// Delete
router.delete("/:name", authorize, validateId, deleteFavoriteTrack);


module.exports = router;