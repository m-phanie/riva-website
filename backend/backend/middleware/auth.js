const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getUsers } = require('../config/db');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    console.log('Auth Middleware - Verifying token with secret:', secret);
    console.log('Auth Middleware - Token:', token.substring(0, 20) + '...');
    
    const decoded = jwt.verify(token, secret);
    console.log('Auth Middleware - Decoded token:', decoded);
    
    const users = await getUsers();
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      console.log('Auth Middleware - User not found for ID:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware - Token verification error:', error.message);
    console.error('Auth Middleware - Error stack:', error.stack);
    return res.status(401).json({ message: 'Not authorized, token failed: ' + error.message });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
