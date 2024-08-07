const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; 

exports.verifyToken = (req, res, next) => {
  const { accessToken } = req.cookies;

  console.log("access token", req.cookie)

  if (!accessToken) {
    return res.status(401).json({ message: 'No access token provided.' });
  }

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired access token.' });
    } else {
      req.user = decoded;
      next(); 
    }
  });
};
