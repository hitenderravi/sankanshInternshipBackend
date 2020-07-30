var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator"); //validtr

const { signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email", "email is requiredd").isEmail(), //validaters
    check("password", "password should be atleast 3 char").isLength({ min: 3 }), //validaters
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(), //validaters
    check("password", "password field is required ").isLength({ min: 1 }), //validaters
  ],
  signin
);

module.exports = router;
