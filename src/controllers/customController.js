const db = require('../models/db');

/**
 * @route   GET /api/custom/stats
 * @desc    Get dashboard metrics (Total properties, buy count, rent count, inquiries, top localities)
 * @access  Public
 */
const getPlatformStats = async (req, res, next) => {
  try {
    const properties = await db.getAllProperties();
    const inquiries = await db.getInquiries();

    const buyCount = properties.filter(p => p.status === 'Buy').length;
    const rentCount = properties.filter(p => p.status === 'Rent').length;

    // Localities breakdown
    const localities = {};
    properties.forEach(p => {
      const loc = p.address ? p.address.split(',')[0].trim() : 'Hyderabad';
      localities[loc] = (localities[loc] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      data: {
        totalProperties: properties.length,
        buyProperties: buyCount,
        rentProperties: rentCount,
        totalInquiries: inquiries.length,
        zeroBrokeragePercent: 100,
        activeLocalities: Object.keys(localities).length,
        localities,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/custom/filter-search
 * @desc    Custom advanced search with combined filters
 * @access  Public
 */
const filterSearch = async (req, res, next) => {
  try {
    const {
      purpose,       // 'Buy' | 'Rent'
      propertyType,  // 'Flat' | 'Villa' | 'Plot' | 'Commercial'
      budgetRange,   // { min, max }
      bhk,           // ['1 BHK', '2 BHK', '3 BHK', '4+ BHK']
      localities,    // array or comma string
    } = req.body;

    let results = await db.getAllProperties();

    if (purpose) {
      results = results.filter(p => p.status.toLowerCase() === purpose.toLowerCase());
    }

    if (propertyType && propertyType !== 'All') {
      results = results.filter(p => p.type.toLowerCase() === propertyType.toLowerCase());
    }

    if (budgetRange) {
      if (budgetRange.min != null) results = results.filter(p => p.price >= Number(budgetRange.min));
      if (budgetRange.max != null) results = results.filter(p => p.price <= Number(budgetRange.max));
    }

    if (bhk && Array.isArray(bhk) && bhk.length > 0) {
      const allowedBeds = bhk.map(b => parseInt(b, 10));
      results = results.filter(p => allowedBeds.includes(p.beds));
    }

    if (localities && localities.length > 0) {
      const locList = Array.isArray(localities) ? localities : [localities];
      results = results.filter(p =>
        locList.some(l => p.address.toLowerCase().includes(l.toLowerCase()))
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/custom/featured
 * @desc    Featured & Trending properties for homepage banner carousel
 * @access  Public
 */
const getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await db.getAllProperties();
    const featured = properties.filter(p => p.tag === 'Featured' || p.tag === 'Popular' || p.rating >= 4.8);

    return res.status(200).json({
      success: true,
      count: featured.length,
      data: featured,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/custom/inquiries
 * @desc    Get all call & WhatsApp inquiries (Admin / Owner view)
 * @access  Protected
 */
const getInquiriesList = async (req, res, next) => {
  try {
    const list = await db.getInquiries();
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
 * @route   GET /api/custom/localities
 * @desc    Get dynamic list of Hyderabad localities with listing counts
 * @access  Public
 */
const getLocalities = async (req, res, next) => {
  try {
    const properties = await db.getAllProperties();
    const map = new Map();

    // Default primary localities
    const defaults = [
      'Gachibowli',
      'Kukatpally',
      'Kondapur',
      'Madhapur',
      'Manikonda',
      'Banjara Hills',
      'Jubilee Hills',
      'HITEC City',
      'Nallagandla',
      'Kompally',
    ];

    defaults.forEach(d => map.set(d, 0));

    properties.forEach(p => {
      if (p.address) {
        defaults.forEach(d => {
          if (p.address.toLowerCase().includes(d.toLowerCase())) {
            map.set(d, (map.get(d) || 0) + 1);
          }
        });
      }
    });

    const list = Array.from(map.entries()).map(([name, count]) => ({
      name,
      city: 'Hyderabad, Telangana',
      count,
    }));

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlatformStats,
  filterSearch,
  getFeaturedProperties,
  getInquiriesList,
  getLocalities,
};
