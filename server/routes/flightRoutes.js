// routes/flightRoutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

router.get('/', async (req, res, next) => {
  try {
    const flights = await Flight.find().select('-__v');
    return res.json({ flights });
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { airline, flightNo, source, destination, departureDate, departureTime, arrivalDate, arrivalTime, fare } = req.body;
    const flight = await Flight.create({ airline, flightNo, source, destination, departureDate, departureTime, arrivalDate, arrivalTime, fare });
    return res.status(201).json({ flight });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
