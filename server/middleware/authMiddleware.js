const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, config.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.log(config.SECRET_KEY,"sectrt")
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      User.findById(decodedToken.id)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          return res.status(500).json({ message: 'Error finding user', error: err });
        });
    }
  });
};

module.exports = {
  authenticateUser,
};
