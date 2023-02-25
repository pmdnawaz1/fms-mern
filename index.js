const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connecting to MongoDB
mongoose.connect('mongodb+srv://pmdnawaz1:Yarasool12@cluster0.vbrmysz.mongodb.net/login?retryWrites=true&w=majority',
 { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Defining user schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Defining authentication routes
app.get('/',(req,res)=>{
  res.send("Hello")
})
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Defining booking schema and model
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flight: {
      flightNumber: { type: String, required: true },
      airline: { type: String, required: true },
      departure: { type: Date, required: true },
      arrival: { type: Date, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
    },
    passengers: [{ type: String, required: true }],
    price: { type: Number, required: true },
    created: { type: Date, default: Date.now },
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  // Defining booking routes
  app.post('/api/bookings', authenticateUser, async (req, res) => {
    const { flightNumber, airline, departure, arrival, origin, destination, passengers, price } = req.body;
  
    try {
      const booking = new Booking({
        user: req.userId,
        flight: { flightNumber, airline, departure, arrival, origin, destination },
        passengers,
        price,
      });
      await booking.save();
  
      res.json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.get('/api/bookings', authenticateUser, async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.userId }).sort('-created').exec();
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.delete('/api/bookings/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
  
    try {
      const booking = await Booking.findById(id).exec();
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      if (booking.user.toString() !== req.userId.toString()) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      await booking.delete();
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // MW function to authenticate user
  function authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'secret');
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})