const db = require('../models/db');

/**
 * @route   GET /api/properties
 * @desc    Get all properties with filtering, search, and sorting
 * @access  Public
 */
const getProperties = async (req, res, next) => {
  try {
    let list = await db.getAllProperties();
    const {
      status,       // 'Buy' | 'Rent'
      type,         // 'Flat' | 'Villa' | 'Plot' | 'Commercial'
      city,
      locality,
      minPrice,
      maxPrice,
      beds,         // 1, 2, 3, 4
      search,       // generic text query
      sortBy,       // 'price_asc', 'price_desc', 'rating', 'newest'
    } = req.query;

    // Filter: Status (Buy vs Rent)
    if (status) {
      const s = status.toLowerCase();
      list = list.filter(p => p.status.toLowerCase() === s);
    }

    // Filter: Type
    if (type && type !== 'All') {
      list = list.filter(p => p.type.toLowerCase() === type.toLowerCase());
    }

    // Filter: Beds
    if (beds) {
      const bedsNum = parseInt(beds, 10);
      list = list.filter(p => p.beds === bedsNum);
    }

    // Filter: Price Range
    if (minPrice) {
      list = list.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter(p => p.price <= Number(maxPrice));
    }

    // Filter: City / Locality
    if (city) {
      list = list.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (locality) {
      list = list.filter(p =>
        p.address.toLowerCase().includes(locality.toLowerCase()) ||
        p.title.toLowerCase().includes(locality.toLowerCase())
      );
    }

    // Search query across title, description, address
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Default: newest first
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/properties/:id
 * @desc    Get single property details by ID
 * @access  Public
 */
const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await db.findPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: `Property with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/properties
 * @desc    Create / Post a new property listing (From PostPropertyScreen)
 * @access  Protected (or Optional Auth for guests)
 */
const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      transactionType,
      propertyType,
      locality,
      city,
      price,
      bhk,
      beds,
      sqft,
      description,
      features,
      images,
      ownerName,
      ownerPhone,
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        success: false,
        error: 'Title and price are required fields.',
      });
    }

    // Parse beds from BHK string if given (e.g. "3 BHK" -> 3)
    let parsedBeds = Number(beds);
    if (!parsedBeds && bhk) {
      parsedBeds = parseInt(bhk, 10) || 2;
    }

    const newProperty = await db.createProperty({
      title,
      status: transactionType === 'Rent' ? 'Rent' : 'Buy',
      transactionType: transactionType === 'Rent' ? 'Rent' : 'Sell',
      type: propertyType || 'Flat',
      propertyType: propertyType || 'Flat',
      locality: locality || 'Hyderabad, TG',
      address: locality || 'Hyderabad, TG',
      city: city || 'Hyderabad, TG',
      price: Number(price),
      expected_price: Number(price),
      beds: parsedBeds || 2,
      bhk_count: parsedBeds || 2,
      sqft: Number(sqft) || 1200,
      description: description || 'Verified zero brokerage property direct from owner.',
      features: Array.isArray(features) ? features : ['Zero Brokerage', '24x7 Water'],
      images: Array.isArray(images) && images.length ? images : undefined,
      agent: {
        name: ownerName || (req.user ? req.user.name : 'Direct Owner'),
        title: 'Direct Owner',
        avatar: (ownerName || (req.user ? req.user.name : 'DO')).slice(0, 2).toUpperCase(),
        calls: ownerPhone || (req.user ? `+91 ${req.user.mobile}` : '+91 98480 00000'),
      },
      postedByUserId: req.user ? req.user.id : null,
    });

    // Notify about new listing
    await db.addNotification({
      title: 'New Property Posted! 🏡',
      message: `${newProperty.title} was listed in ${newProperty.address}`,
      type: 'new_listing',
      propertyId: newProperty.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Property created successfully.',
      data: newProperty,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/properties/:id
 * @desc    Update an existing property
 * @access  Protected
 */
const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = db.findPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: `Property with ID ${id} not found.`,
      });
    }

    const updated = db.updateProperty(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Property updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property
 * @access  Protected
 */
const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteProperty(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Property with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Property ${id} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/properties/:id/inquiry
 * @desc    Log owner call / WhatsApp button click
 * @access  Public / Optional Auth
 */
const recordInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type = 'Call', userMobile, userName } = req.body;
    const property = await db.findPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: `Property with ID ${id} not found.`,
      });
    }

    const inquiry = await db.addInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      type, // 'Call' | 'WhatsApp'
      userId: req.user ? req.user.id : null,
      userName: userName || (req.user ? req.user.name : 'Interested Buyer'),
      userMobile: userMobile || (req.user ? req.user.mobile : 'Anonymous'),
    });

    return res.status(200).json({
      success: true,
      message: `${type} inquiry recorded successfully.`,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  recordInquiry,
};
