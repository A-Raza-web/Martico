const express = require("express");
const router = express.Router();
const { signup, signin, updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/signin", signin);
router.post("/signup", signup);
router.put("/profile", authMiddleware, updateProfile);


module.exports = router;