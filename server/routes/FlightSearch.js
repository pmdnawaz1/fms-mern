const express = require('express');
const Flight = require('../models/flight');

const router = express.Router();

router.get('/flights/search', async (req, res) => {
  try {
    const { departureAirport, arrivalAirport, departureDate } = req.query;

    const flights = await Flight.find({
      departureAirport,
      arrivalAirport,
      departureDate: new Date(departureDate),
    });

    res.json({ flights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
