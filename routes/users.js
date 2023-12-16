const router = require("express").Router();
const { authorize } = require("../middleware/auth");
const { getCurrentUser, updateProfile} = require("../controllers/users");
const {validateUpdateUser} = require("../middleware/validation");


router.get("/me", authorize, getCurrentUser);
router.patch("/me", authorize, validateUpdateUser,updateProfile);


module.exports = router;