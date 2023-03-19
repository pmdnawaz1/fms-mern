const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("../config");
require("dotenv").config();

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email is not valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const user = await User.create({ email, password });
      const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, {
        expiresIn: "7d",
      });
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email is not valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await user.comparePasswords(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
