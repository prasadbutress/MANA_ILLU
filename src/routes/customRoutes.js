const express = require('express');
const router = express.Router();
const customController = require('../controllers/customController');
const { authenticate } = require('../middleware/auth');

// Public custom endpoints
router.get('/stats', customController.getPlatformStats);
router.get('/localities', customController.getLocalities);
router.post('/filter-search', customController.filterSearch);
router.get('/featured', customController.getFeaturedProperties);

// Protected custom inquiries log
router.get('/inquiries', authenticate, customController.getInquiriesList);

module.exports = router;
