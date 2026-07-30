const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization; // e.g. "Bearer abc123..."

  if (!authHeader) {
    return res.status(401).json({ message: "Please login" });
  }

  const token = authHeader.split(' ')[1]; // "Bearer" and the token are separated by a space

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // continue to the route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;