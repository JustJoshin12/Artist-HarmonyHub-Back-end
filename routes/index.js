const router = require("express").Router();
const users = require("./users");
const NotFoundError = require("../errors/not-found-error");
const { createUser, login } = require("../controllers/users");
const { authorize } = require("../middleware/auth");
const favoriteArtist = require("./favoriteArtists");
const favoriteTrack = require("./favoriteTracks");
const favoriteAlbum = require("./favoriteAlbums");
const {validateLoginAuthentication, validateUserInfoBody} = require("../middleware/validation");


router.use("/users", authorize, users);
router.use("/favoriteArtists", favoriteArtist);
router.use("/favoriteTracks", favoriteTrack);
router.use("/favoriteAlbums", favoriteAlbum);

router.post("/signin",validateLoginAuthentication, login)
router.post("/signup", validateUserInfoBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;