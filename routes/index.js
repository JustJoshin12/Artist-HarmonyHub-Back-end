const router = require("express").Router();
const users = require("./users");
const NotFoundError = require("../errors/not-found-error");
const { createUser } = require("../controllers/users");


router.post("/signup", createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;