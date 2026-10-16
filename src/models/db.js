const dbPool = require('../config/db');

const INITIAL_PROPERTIES = [
  {
    id: "a1111111-1111-4111-8111-111111111111",
    title: "Prestige Green Valley",
    address: "Plot 42, Gachibowli",
    locality: "Gachibowli",
    city: "Hyderabad, TG",
    price: 8500000,
    expected_price: 8500000,
    beds: 4,
    bhk_count: 4,
    baths: 3,
    sqft: 2800,
    type: "Buy",
    property_type: "Villa",
    status: "Buy",
    transaction_type: "Sell",
    construction_status: "Ready to Move",
    is_negotiable: true,
    tag: "New",
    rating: 4.9,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1746439318854-4a8bc02a03ba?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1746439318854-4a8bc02a03ba?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1641998277833-3a911b7b56d8?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1638885930125-85350348d266?w=800&h=600&fit=crop&auto=format"
    ],
    agent: {
      name: "Ravi Kumar",
      title: "Direct Owner",
      avatar: "RK",
      calls: "+91 98480 12345"
    },
    description: "Spacious 4BHK villa in the heart of Gachibowli IT corridor. Direct from owner — zero brokerage. Premium fittings, modular kitchen, 24×7 security, power backup, and covered parking. Close to HITEC City and Cyber Towers.",
    features: [
      "Zero Brokerage",
      "24×7 Security",
      "Power Backup",
      "Covered Parking",
      "Modular Kitchen"
    ],
    yearBuilt: 2022,
    parking: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: "a2222222-2222-4222-8222-222222222222",
    title: "Lodha Meridian Flat",
    address: "Block C, Kukatpally",
    locality: "Kukatpally",
    city: "Hyderabad, TG",
    price: 5200000,
    expected_price: 5200000,
    beds: 3,
    bhk_count: 3,
    baths: 2,
    sqft: 1650,
    type: "Flat",
    property_type: "Flat",
    status: "Buy",
    transaction_type: "Sell",
    construction_status: "Ready to Move",
    is_negotiable: false,
    tag: "Featured",
    rating: 4.7,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1643376452350-97eadd2c417f?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1643376452350-97eadd2c417f?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1638541420159-cadd0634f08f?w=800&h=600&fit=crop&auto=format"
    ],
    agent: {
      name: "Sunita Reddy",
      title: "Direct Owner",
      avatar: "SR",
      calls: "+91 98481 67890"
    },
    description: "Well-maintained 3BHK flat on 8th floor in Lodha Meridian. Gated community with clubhouse, pool, gym, and children play area. Just 5 mins to Kukatpally Metro.",
    features: [
      "Zero Brokerage",
      "Clubhouse & Gym",
      "Swimming Pool",
      "Near Metro",
      "Covered Parking"
    ],
    yearBuilt: 2021,
    parking: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "a3333333-3333-4333-8333-333333333333",
    title: "My Home Bhooja Luxury",
    address: "Tower 4, HITEC City",
    locality: "HITEC City",
    city: "Hyderabad, TG",
    price: 13500000,
    expected_price: 13500000,
    beds: 4,
    bhk_count: 4,
    baths: 4,
    sqft: 3420,
    type: "Flat",
    property_type: "Flat",
    status: "Buy",
    transaction_type: "Sell",
    construction_status: "Ready to Move",
    is_negotiable: false,
    tag: "Popular",
    rating: 4.95,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&auto=format"
    ],
    agent: {
      name: "Venkat Rao",
      title: "Direct Owner",
      avatar: "VR",
      calls: "+91 98482 11223"
    },
    description: "Ultra luxury 4BHK apartment in My Home Bhooja, HITEC City. Italian marble flooring, false ceiling, smart home automation, expansive balcony overlooking bio-diversity park.",
    features: [
      "Zero Brokerage",
      "Smart Home Automation",
      "High Ceilings",
      "2-Car Parking",
      "Clubhouse & Spa"
    ],
    yearBuilt: 2023,
    parking: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: "a4444444-4444-4444-8444-444444444444",
    title: "Aparna Sarovar Zenith",
    address: "Nallagandla",
    locality: "Nallagandla",
    city: "Hyderabad, TG",
    price: 38000,
    expected_price: 38000,
    beds: 3,
    bhk_count: 3,
    baths: 3,
    sqft: 1850,
    type: "Flat",
    property_type: "Flat",
    status: "Rent",
    transaction_type: "Rent",
    construction_status: "Ready to Move",
    is_negotiable: false,
    tag: "New",
    rating: 4.6,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format"
    ],
    agent: {
      name: "Kavitha Sharma",
      title: "Direct Owner",
      avatar: "KS",
      calls: "+91 98483 44556"
    },
    description: "Semi-furnished 3BHK for rent in Aparna Sarovar Zenith, Nallagandla. Wardrobes in all bedrooms, modular kitchen with chimney, geysers installed.",
    features: [
      "Zero Brokerage",
      "Semi-Furnished",
      "Gated Community",
      "Near Citizen Hospital",
      "Power Backup"
    ],
    yearBuilt: 2020,
    parking: 1,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_USERS = [
  {
    id: "b1111111-1111-4111-8111-111111111111",
    name: "Ravi Teja",
    mobile: "9848012345",
    role: "User",
    email: "raviteja@example.com",
    city: "Hyderabad",
    avatar: "RT",
    photoUrl: null,
    favorites: ["a1111111-1111-4111-8111-111111111111", "a2222222-2222-4222-8222-222222222222"],
    createdAt: new Date().toISOString()
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "c1111111-1111-4111-8111-111111111111",
    title: "Price Drop Alert! 📉",
    message: "Prestige Green Valley, Gachibowli price reduced by ₹3 Lakhs.",
    time: "10m ago",
    read: false,
    type: "price_drop",
    propertyId: "a1111111-1111-4111-8111-111111111111"
  },
  {
    id: "c2222222-2222-4222-8222-222222222222",
    title: "New 3 BHK Flat in Kondapur 🏡",
    message: "Direct owner listing just added matching your saved search criteria.",
    time: "1h ago",
    read: false,
    type: "new_listing",
    propertyId: "a2222222-2222-4222-8222-222222222222"
  },
  {
    id: "c3333333-3333-4333-8333-333333333333",
    title: "Zero Brokerage Verified ✅",
    message: "Your profile has been verified as a direct home seeker.",
    time: "Yesterday",
    read: true,
    type: "system"
  }
];

const INITIAL_INQUIRIES = [
  {
    id: "d1111111-1111-4111-8111-111111111111",
    propertyId: "a1111111-1111-4111-8111-111111111111",
    userId: "b1111111-1111-4111-8111-111111111111",
    userName: "Ravi Teja",
    userMobile: "9848012345",
    type: "WhatsApp",
    message: "Hi Ravi Kumar, I am interested in your property Prestige Green Valley.",
    status: "Pending",
    createdAt: new Date().toISOString()
  }
];

class Database {
  constructor() {
    this.users = [...INITIAL_USERS];
    this.properties = [...INITIAL_PROPERTIES];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.inquiries = [...INITIAL_INQUIRIES];
    this.otpStore = new Map();
  }

  // --- Users ---
  async findUserByMobile(mobile) {
    const cleanMob = String(mobile).replace(/\D/g, '').slice(-10);
    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query('SELECT * FROM users WHERE mobile = $1 LIMIT 1', [cleanMob]);
        if (res.rows.length > 0) return res.rows[0];
      }
    } catch (e) {
      console.warn('[DB Fallback]:', e.message);
    }
    return this.users.find(u => u.mobile.replace(/\D/g, '').slice(-10) === cleanMob);
  }

  async findUserById(id) {
    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
        if (res.rows.length > 0) return res.rows[0];
      }
    } catch (e) {
      console.warn('[DB Fallback]:', e.message);
    }
    return this.users.find(u => String(u.id) === String(id));
  }

  async createUser(userData) {
    const cleanMob = String(userData.mobile).replace(/\D/g, '').slice(-10);
    const avatar = (userData.name || 'U').slice(0, 2).toUpperCase();
    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query(
          `INSERT INTO users (mobile, name, email, role, city, avatar, is_verified)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *`,
          [
            cleanMob,
            userData.name || 'User',
            userData.email || null,
            userData.role || 'User',
            userData.city || 'Hyderabad',
            avatar,
            false
          ]
        );
        if (res.rows.length > 0) {
          const pgUser = res.rows[0];
          this.users.push(pgUser);
          return pgUser;
        }
      }
    } catch (e) {
      console.warn('[DB Postgres insert user error, using fallback]:', e.message);
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: userData.name || 'User',
      mobile: cleanMob,
      role: userData.role || 'User',
      email: userData.email || '',
      city: userData.city || 'Hyderabad',
      avatar,
      photoUrl: userData.photoUrl || null,
      favorites: [],
      createdAt: new Date().toISOString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id, updates) {
    try {
      if (dbPool.getIsConnected()) {
        const fields = [];
        const values = [];
        let i = 1;
        if (updates.name !== undefined) { fields.push(`name = $${i++}`); values.push(updates.name); }
        if (updates.email !== undefined) { fields.push(`email = $${i++}`); values.push(updates.email); }
        if (updates.city !== undefined) { fields.push(`city = $${i++}`); values.push(updates.city); }
        if (updates.avatar !== undefined) { fields.push(`avatar = $${i++}`); values.push(updates.avatar); }

        if (fields.length > 0) {
          values.push(id);
          const res = await dbPool.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
            values
          );
          if (res.rows.length > 0) return res.rows[0];
        }
      }
    } catch (e) {
      console.warn('[DB Postgres update user fallback]:', e.message);
    }

    const idx = this.users.findIndex(u => String(u.id) === String(id));
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates, updatedAt: new Date().toISOString() };
    return this.users[idx];
  }

  // --- Properties ---
  async getAllProperties() {
    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query(`
          SELECT p.*,
            COALESCE(
              (SELECT json_agg(photo_url ORDER BY photo_order) FROM property_photos WHERE property_id = p.id),
              '[]'::json
            ) as images
          FROM properties p
          WHERE p.is_deleted = FALSE
          ORDER BY p.created_at DESC
        `);
        if (res.rows.length > 0) {
          return res.rows.map(row => ({
            id: row.id,
            title: row.title,
            address: `${row.locality}, ${row.city}`,
            locality: row.locality,
            city: row.city,
            price: Number(row.expected_price),
            expected_price: Number(row.expected_price),
            beds: row.bhk_count,
            bhk_count: row.bhk_count,
            baths: row.baths_count,
            sqft: row.sqft,
            type: row.property_type,
            status: row.transaction_type === 'Sell' ? 'Buy' : 'Rent',
            transaction_type: row.transaction_type,
            tag: row.tag || 'New',
            rating: Number(row.rating) || 5.0,
            reviews: row.reviews_count || 0,
            image: row.images && row.images.length > 0 ? row.images[0] : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format',
            images: row.images || [],
            agent: {
              name: row.owner_name || 'Direct Owner',
              title: 'Direct Owner',
              avatar: (row.owner_name || 'DO').slice(0, 2).toUpperCase(),
              calls: row.owner_phone || '+91 98480 12345'
            },
            description: row.description,
            features: Array.isArray(row.features) ? row.features : ['Zero Brokerage'],
            yearBuilt: row.year_built,
            parking: row.parking_slots,
            createdAt: row.created_at
          }));
        }
      }
    } catch (e) {
      console.warn('[DB Postgres getAllProperties fallback]:', e.message);
    }
    return this.properties;
  }

  async findPropertyById(id) {
    const list = await this.getAllProperties();
    return list.find(p => String(p.id) === String(id));
  }

  async createProperty(propData) {
    const id = `prop_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newProperty = {
      id,
      title: propData.title || 'Untitled Property',
      address: propData.locality || propData.address || 'Hyderabad, TG',
      locality: propData.locality || 'HITEC City',
      city: propData.city || 'Hyderabad, TG',
      price: Number(propData.price || propData.expected_price) || 0,
      expected_price: Number(propData.price || propData.expected_price) || 0,
      beds: Number(propData.beds || propData.bhk_count) || (propData.bhk ? parseInt(propData.bhk, 10) : 2) || 2,
      bhk_count: Number(propData.beds || propData.bhk_count) || (propData.bhk ? parseInt(propData.bhk, 10) : 2) || 2,
      baths: Number(propData.baths) || 2,
      sqft: Number(propData.sqft) || 1200,
      type: propData.type || propData.propertyType || 'Flat',
      property_type: propData.property_type || propData.type || 'Flat',
      status: propData.status || (propData.transactionType === 'Rent' ? 'Rent' : 'Buy'),
      transaction_type: propData.transactionType === 'Rent' ? 'Rent' : 'Sell',
      construction_status: propData.construction_status || 'Ready to Move',
      is_negotiable: !!propData.isNegotiable,
      tag: propData.tag || 'New',
      rating: 5.0,
      reviews: 1,
      image: propData.image || (propData.images && propData.images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format',
      images: propData.images && propData.images.length ? propData.images : [
        propData.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format'
      ],
      agent: propData.agent || {
        name: propData.ownerName || 'Direct Owner',
        title: 'Direct Owner',
        avatar: (propData.ownerName || 'DO').slice(0, 2).toUpperCase(),
        calls: propData.ownerPhone || '+91 98480 00000'
      },
      description: propData.description || 'Verified zero brokerage property direct from owner.',
      features: propData.features || ['Zero Brokerage', '24x7 Water', 'Car Parking'],
      yearBuilt: Number(propData.yearBuilt) || new Date().getFullYear(),
      parking: Number(propData.parking) || 1,
      createdAt: new Date().toISOString()
    };

    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query(
          `INSERT INTO properties
           (title, transaction_type, property_type, locality, city, bhk_count, baths_count, sqft, expected_price, is_negotiable, construction_status, description, owner_name, owner_phone, features)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
           RETURNING id`,
          [
            newProperty.title,
            newProperty.transaction_type,
            newProperty.property_type,
            newProperty.locality,
            newProperty.city,
            newProperty.bhk_count,
            newProperty.baths,
            newProperty.sqft,
            newProperty.expected_price,
            newProperty.is_negotiable,
            newProperty.construction_status,
            newProperty.description,
            newProperty.agent.name,
            newProperty.agent.calls,
            JSON.stringify(newProperty.features)
          ]
        );
        if (res.rows.length > 0) {
          const pgPropId = res.rows[0].id;
          newProperty.id = pgPropId;

          // Save photos into property_photos table
          for (let idx = 0; idx < newProperty.images.length; idx++) {
            await dbPool.query(
              `INSERT INTO property_photos (property_id, photo_url, is_cover_photo, photo_order)
               VALUES ($1, $2, $3, $4)`,
              [pgPropId, newProperty.images[idx], idx === 0, idx + 1]
            );
          }
        }
      }
    } catch (e) {
      console.warn('[DB Postgres createProperty fallback]:', e.message);
    }

    this.properties.unshift(newProperty);
    return newProperty;
  }

  async deleteProperty(id) {
    try {
      if (dbPool.getIsConnected()) {
        await dbPool.query('UPDATE properties SET is_deleted = TRUE WHERE id = $1', [id]);
      }
    } catch (e) {
      console.warn('[DB Postgres deleteProperty fallback]:', e.message);
    }
    const idx = this.properties.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return false;
    this.properties.splice(idx, 1);
    return true;
  }

  // --- Favorites ---
  async getUserFavorites(userId) {
    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query(
          `SELECT property_id FROM user_favorites WHERE user_id = $1`,
          [userId]
        );
        const favIds = res.rows.map(r => r.property_id);
        const allProps = await this.getAllProperties();
        return allProps.filter(p => favIds.includes(p.id));
      }
    } catch (e) {
      console.warn('[DB Postgres getUserFavorites fallback]:', e.message);
    }
    const user = await this.findUserById(userId);
    if (!user) return [];
    return this.properties.filter(p => (user.favorites || []).includes(p.id));
  }

  async toggleFavorite(userId, propertyId) {
    try {
      if (dbPool.getIsConnected()) {
        const check = await dbPool.query(
          `SELECT 1 FROM user_favorites WHERE user_id = $1 AND property_id = $2`,
          [userId, propertyId]
        );
        if (check.rows.length > 0) {
          await dbPool.query(`DELETE FROM user_favorites WHERE user_id = $1 AND property_id = $2`, [userId, propertyId]);
          return { isFavorite: false };
        } else {
          await dbPool.query(`INSERT INTO user_favorites (user_id, property_id) VALUES ($1, $2)`, [userId, propertyId]);
          return { isFavorite: true };
        }
      }
    } catch (e) {
      console.warn('[DB Postgres toggleFavorite fallback]:', e.message);
    }

    const user = await this.findUserById(userId);
    if (!user) return null;
    if (!user.favorites) user.favorites = [];

    const exists = user.favorites.some(id => String(id) === String(propertyId));
    if (exists) {
      user.favorites = user.favorites.filter(id => String(id) !== String(propertyId));
    } else {
      user.favorites.push(propertyId);
    }
    return {
      isFavorite: !exists,
      favorites: user.favorites
    };
  }

  // --- Notifications ---
  async getNotifications(userId) {
    try {
      if (dbPool.getIsConnected() && userId) {
        const res = await dbPool.query(
          `SELECT * FROM notifications WHERE user_id = $1 OR user_id IS NULL ORDER BY created_at DESC LIMIT 30`,
          [userId]
        );
        if (res.rows.length > 0) return res.rows;
      }
    } catch (e) {
      console.warn('[DB Postgres getNotifications fallback]:', e.message);
    }
    return this.notifications;
  }

  async addNotification(notif) {
    const newNotif = {
      id: `notif_${Date.now()}`,
      time: 'Just now',
      read: false,
      createdAt: new Date().toISOString(),
      ...notif
    };
    try {
      if (dbPool.getIsConnected()) {
        await dbPool.query(
          `INSERT INTO notifications (user_id, property_id, title, message, notification_type)
           VALUES ($1, $2, $3, $4, $5)`,
          [notif.userId || null, notif.propertyId || null, notif.title, notif.message, notif.type || 'system']
        );
      }
    } catch (e) {
      console.warn('[DB Postgres addNotification fallback]:', e.message);
    }
    this.notifications.unshift(newNotif);
    return newNotif;
  }

  // --- Inquiries ---
  async addInquiry(inquiryData) {
    const newInquiry = {
      id: `inq_${Date.now()}`,
      status: 'Recorded',
      createdAt: new Date().toISOString(),
      ...inquiryData
    };
    try {
      if (dbPool.getIsConnected()) {
        await dbPool.query(
          `INSERT INTO contact_requests (property_id, seeker_user_id, seeker_name, seeker_mobile, inquiry_type, message, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            inquiryData.propertyId,
            inquiryData.userId || null,
            inquiryData.userName || 'Interested Seeker',
            inquiryData.userMobile || 'Anonymous',
            inquiryData.type || 'Call',
            inquiryData.message || null,
            'Recorded'
          ]
        );
      }
    } catch (e) {
      console.warn('[DB Postgres addInquiry fallback]:', e.message);
    }
    this.inquiries.unshift(newInquiry);
    return newInquiry;
  }

  async getInquiries() {
    try {
      if (dbPool.getIsConnected()) {
        const res = await dbPool.query(`SELECT * FROM contact_requests ORDER BY created_at DESC`);
        if (res.rows.length > 0) return res.rows;
      }
    } catch (e) {
      console.warn('[DB Postgres getInquiries fallback]:', e.message);
    }
    return this.inquiries;
  }
}

module.exports = new Database();
