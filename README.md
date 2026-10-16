# MANA ILLU Backend API Documentation

Welcome to the backend service for **MANA ILLU** (Real Estate App).

## 🚀 Running the Server

Inside the `backend/` directory:

```bash
# Start server
npm start

# Or with live reload in development
npm run dev
```

Server URL: `http://localhost:5000`  
Health Check: `http://localhost:5000/api/health`

---

## 🔐 Authentication & OTP Bypass

- **OTP Bypass Code**: `123456`
- When calling `/api/auth/send-otp` with any 10-digit mobile number, the verification code `123456` will be accepted by `/api/auth/verify-otp`.
- Successful verification returns a **JWT Bearer Token** for protected API endpoints.

---

## 📡 API Endpoints Reference

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/send-otp` | Request OTP for mobile number | No |
| `POST` | `/api/auth/verify-otp` | Verify OTP (bypass `123456`) & get JWT token | No |
| `GET` | `/api/auth/me` | Get current logged-in user details | Yes (Bearer Token) |
| `POST` | `/api/auth/logout` | Invalidate / logout session | Yes (Bearer Token) |

### 2. Properties (`/api/properties`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/properties` | Get all properties (supports `status`, `type`, `beds`, `minPrice`, `maxPrice`, `search`, `sortBy`) | No |
| `GET` | `/api/properties/:id` | Get property details by ID | No |
| `POST` | `/api/properties` | Create / post new property (From Post Property screen) | Optional / Yes |
| `PUT` | `/api/properties/:id` | Update property details | Yes (Bearer Token) |
| `DELETE` | `/api/properties/:id` | Delete property | Yes (Bearer Token) |
| `POST` | `/api/properties/:id/inquiry` | Log user interaction when tapping "Call Owner" or "WhatsApp" | No / Optional |

### 3. User & Favorites (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/users/profile` | View profile details | Yes (Bearer Token) |
| `PUT` | `/api/users/profile` | Update profile info (name, email, city) | Yes (Bearer Token) |
| `GET` | `/api/users/favorites` | View user's saved/favorite properties | Yes (Bearer Token) |
| `POST` | `/api/users/favorites/:propertyId` | Toggle property favorite status (save / unsave) | Yes (Bearer Token) |

### 4. Notifications (`/api/notifications`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/notifications` | View system and listing notifications | No |
| `PUT` | `/api/notifications/:id/read` | Mark single notification as read | No |
| `PUT` | `/api/notifications/read-all` | Mark all notifications as read | No |
| `DELETE` | `/api/notifications/:id` | Remove notification | No |

### 5. Custom Endpoints (`/api/custom`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/custom/stats` | Platform metrics (total listings, buy/rent count, inquiries, top localities) | No |
| `POST` | `/api/custom/filter-search` | Advanced multi-attribute search (filter modal integration) | No |
| `GET` | `/api/custom/featured` | Top rated & featured properties for hero banners | No |
| `GET` | `/api/custom/inquiries` | Direct inquiries log for owners/admin | Yes (Bearer Token) |

---

## 🗄️ Database Architecture & Future DB Migration

The current backend uses a centralized database store in [`src/models/db.js`](file:///c:/Users/MAGANTI%20PRASAD/OneDrive/Attachments/Desktop/MANA_ILLU-frontend/backend/src/models/db.js).

When ready to connect **MongoDB** (Mongoose) or **PostgreSQL** (Prisma / Sequelize):
1. Install driver: `npm install mongoose` or `npm install prisma @prisma/client`
2. Replace method internals inside `db.js` with your ORM queries without altering any route or controller contracts.
