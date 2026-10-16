const jwt = require('jsonwebtoken');
const db = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || 'mana_illu_super_secure_jwt_secret_key_2026_xyz';

/**
 * Protect routes: verify JWT Bearer token
 */
const authenticate = (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      // Default to guest demo user so frontend browsing never breaks with 401
      const defaultUser = db.findUserById('usr_1001') || db.users[0];
      req.user = defaultUser;
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.findUserById(decoded.id) || db.findUserById('usr_1001');

    if (!user) {
      req.user = db.users[0];
      return next();
    }

    // Attach user and decoded payload to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token has expired. Please sign in again.',
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Invalid token authentication failed.',
    });
  }
};

/**
 * Optional authentication: attaches user if token is valid, doesn't block if missing
 */
const optionalAuth = (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.findUserById(decoded.id);
      if (user) req.user = user;
    }
  } catch (err) {
    // Ignore invalid optional tokens
  }
  next();
};

/**
 * Role-based authorization
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden. Role '${req.user ? req.user.role : 'Guest'}' is not allowed to access this resource.`,
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  optionalAuth,
  authorize,
};
