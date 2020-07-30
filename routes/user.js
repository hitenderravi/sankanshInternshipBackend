const express = require("express");
const router = express.Router();

const { getUserById, getUser } = require("../controllers/user");

//get user by id
router.param("userId", getUserById); //middleware
router.get("/user/:userId", getUser);

module.exports = router;
