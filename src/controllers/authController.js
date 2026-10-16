const jwt = require('jsonwebtoken');
const db = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || 'mana_illu_super_secure_jwt_secret_key_2026_xyz';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const OTP_BYPASS_CODE = process.env.OTP_BYPASS_CODE || '123456';
const OTP_BYPASS_ENABLED = process.env.OTP_BYPASS_ENABLED !== 'false';

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      mobile: user.mobile,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * @route   POST /api/auth/send-otp
 * @desc    Generate or send OTP (with bypass code enabled)
 * @access  Public
 */
const sendOtp = async (req, res, next) => {
  try {
    const { mobile, purpose = 'login' } = req.body;

    if (!mobile || String(mobile).replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid 10-digit mobile number.',
      });
    }

    const cleanMob = String(mobile).replace(/\D/g, '').slice(-10);

    // Default bypass OTP code
    const generatedOtp = OTP_BYPASS_ENABLED ? OTP_BYPASS_CODE : Math.floor(100000 + Math.random() * 900000).toString();

    // Store in memory (expires in 5 minutes)
    db.otpStore.set(cleanMob, {
      code: generatedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      purpose,
    });

    console.log(`[AUTH] OTP requested for ${cleanMob}. Code: ${generatedOtp} (Bypass active: ${OTP_BYPASS_ENABLED})`);

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to +91 ${cleanMob}.`,
      data: {
        mobile: cleanMob,
        bypassActive: OTP_BYPASS_ENABLED,
        // Provided for developer convenience as requested
        hint: `Use bypass OTP: ${OTP_BYPASS_CODE}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP and sign in / sign up with JWT
 * @access  Public
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { mobile, otp, name, role = 'User', email, city } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Mobile number and OTP are required.',
      });
    }

    const cleanMob = String(mobile).replace(/\D/g, '').slice(-10);
    const enteredOtp = String(otp).trim();

    // Verification check: bypass or stored OTP
    let isValid = false;

    // Development bypass: always accept bypass code 123456
    if (enteredOtp === '123456' || enteredOtp === OTP_BYPASS_CODE) {
      isValid = true;
    } else {
      const stored = db.otpStore.get(cleanMob);
      if (stored && String(stored.code).trim() === enteredOtp && stored.expiresAt > Date.now()) {
        isValid = true;
      }
    }

    if (!isValid) {
      console.warn(`[AUTH FAIL] Mobile: ${cleanMob}, enteredOtp: "${enteredOtp}", expected: "${OTP_BYPASS_CODE}"`);
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP. Use bypass code 123456.',
      });
    }

    // Clear OTP after successful use
    db.otpStore.delete(cleanMob);

    // Check if user exists or create new user
    let user = await db.findUserByMobile(cleanMob);

    if (!user) {
      user = await db.createUser({
        name: name || 'Mana Illu User',
        mobile: cleanMob,
        role: role || 'User',
        email: email || '',
        city: city || 'Hyderabad',
      });
    } else if (name && user.name === 'Mana Illu User') {
      // Update name if provided
      user = await db.updateUser(user.id, { name, email: email || user.email, city: city || user.city });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          mobile: user.mobile,
          role: user.role,
          email: user.email,
          city: user.city,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user profile
 * @access  Protected
 */
const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Protected
 */
const logout = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  getMe,
  logout,
};
