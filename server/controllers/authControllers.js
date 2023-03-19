const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {};

authController.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = authController;
