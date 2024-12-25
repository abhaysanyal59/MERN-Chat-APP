
const express = require("express");
const router = express.Router();
const { logIn, signUp, logOut,updateProfile,checkAuth } = require("../controllers/auth.controller.js");
const protectRoute = require("../middlewares/auth.middleware.js")

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/logout", logOut);

router.put("/updateprofile", protectRoute,updateProfile);
router.get("/checkAuth",protectRoute,checkAuth);

module.exports = router;
