const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/', async (req, res) => {
  const { name, email, passport} = req.body;
  const booking = new Booking({
    name,
    email,
    passport
  });
  try {
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while booking flight." });
  }
});

module.exports = router;
