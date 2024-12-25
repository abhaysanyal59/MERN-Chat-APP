const express = require("express");
const {getUsersForSidebar,getMessages,sendMessages} = require("../controllers/message.controller.js");
const protectRoute = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages);
module.exports = router;

