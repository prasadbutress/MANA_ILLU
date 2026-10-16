const db = require('../models/db');

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Protected
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await db.findUserById(req.user.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile (name, email, city, avatar, photo)
 * @access  Protected
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, city, avatar, photoUrl } = req.body;
    const updated = await db.updateUser(req.user.id, {
      ...(name && { name }),
      ...(email && { email }),
      ...(city && { city }),
      ...(avatar && { avatar }),
      ...(photoUrl !== undefined && { photoUrl }),
    });

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/users/favorites
 * @desc    Get saved/favorite properties for current user
 * @access  Protected
 */
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await db.getUserFavorites(req.user.id);
    return res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/users/favorites/:propertyId
 * @desc    Toggle favorite on/off for a property
 * @access  Protected
 */
const toggleFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const result = await db.toggleFavorite(req.user.id, propertyId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'User not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: result.isFavorite ? 'Property saved to favorites.' : 'Property removed from favorites.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
  toggleFavorite,
};
