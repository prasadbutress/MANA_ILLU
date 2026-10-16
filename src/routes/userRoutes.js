const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// All user routes require JWT authentication
router.use(authenticate);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/favorites', userController.getFavorites);
router.post('/favorites/:propertyId', userController.toggleFavorite);

module.exports = router;
