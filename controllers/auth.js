const User = require("../models/user");
const { check, validationResult } = require("express-validator"); //validtr

exports.signup = (req, res) => {
  const errors = validationResult(req);
  console.log("errorssss" + req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  console.log("REQ BODY", req.body); //body parser
  console.log("REQ BODadasdaS"); //body parser
  const user = new User(req.body); //creating object for save data

  console.log(user);

  user.save((error, user) => {
    //its save the data

    if (error) {
      console.log("yaha " + error);
      return res.status(400).json({
        error: "User Already Exist",
      });
    }
    res.json({
      email: user.email,
      role: user.role,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body; //extracting data from db

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    //find user in db
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exist",
      });
    }
    if (!user.authenticate(password)) {
      //match id and passw
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }
    //send response to frint end
    const { _id, email, role } = user;
    return res.json({ user: { _id, email, role } });
  });
};
