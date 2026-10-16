const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authenticate, optionalAuth } = require('../middleware/auth');

// Public read routes
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);

// Create route (Protected, but allows optionalAuth for guest postings)
router.post('/', optionalAuth, propertyController.createProperty);

// Update / Delete routes
router.put('/:id', authenticate, propertyController.updateProperty);
router.delete('/:id', authenticate, propertyController.deleteProperty);

// Interaction endpoint: Owner Call / WhatsApp click tracker
router.post('/:id/inquiry', optionalAuth, propertyController.recordInquiry);

module.exports = router;
