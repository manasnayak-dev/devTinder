const express = require("express");
const userAuthRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationSignupData } = require("../utils/validators");

userAuthRouter.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    const { password, firstName, lastName, email } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    validationSignupData(req);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordhash,
    });
    await user.save();
    res.send("User added sucessfully");

    // console.log(passwordhash);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userAuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.send("Invalid email...");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await user.getjwt();

      res.cookie("token", token);
      res.send("Login successful..");
    } else {
      res.send("password is incorrect..");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userAuthRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successfully...");
});

module.exports = userAuthRouter;
