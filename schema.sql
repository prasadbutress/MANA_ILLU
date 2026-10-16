-- ============================================================================
-- MANA ILLU ENTERPRISE PRODUCTION DATABASE SCHEMA (PostgreSQL 14+)
-- Designed by: 20-Year Principal Database Architect
-- Target: High-Concurrency, Scalable PropTech Production Engine
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- For gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "citext";    -- Case-insensitive emails
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- Trigram index for fuzzy text search

-- 2. DROP EXISTING OBJECTS (Reverse Dependency Order for Clean Deployments)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS user_favorites CASCADE;
DROP TABLE IF EXISTS contact_requests CASCADE;
DROP TABLE IF EXISTS property_photos CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS otp_verifications CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_timestamp_column() CASCADE;

-- 3. GLOBAL AUTO-UPDATE TRIGGER FUNCTION
-- In production PostgreSQL, DEFAULT CURRENT_TIMESTAMP does NOT auto-update on UPDATE.
-- This trigger handles updated_at automatically across all tables.
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. USERS TABLE
-- Core identity entity with audit trail and soft-delete capabilities
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mobile VARCHAR(15) NOT NULL,
    name VARCHAR(100) NOT NULL DEFAULT 'User',
    email CITEXT,                             -- Case-insensitive, prevents duplicate emails in diff casing
    role VARCHAR(20) NOT NULL DEFAULT 'User',
    city VARCHAR(100) NOT NULL DEFAULT 'Hyderabad',
    avatar VARCHAR(10),                       -- Initials or monogram e.g. 'RT'
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,  -- Soft-delete flag (never hard-delete users in prod)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Business Integrity Constraints
    CONSTRAINT chk_user_role CHECK (role IN ('User', 'Owner', 'Agent', 'Admin')),
    CONSTRAINT chk_user_mobile_format CHECK (mobile ~ '^[0-9+ ]{10,15}$'),
    CONSTRAINT uq_users_mobile UNIQUE (mobile),
    CONSTRAINT uq_users_email UNIQUE (email)
);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ============================================================================
-- 2. PROPERTIES (POST PROPERTY) TABLE
-- Central real estate entity with geo-coords, JSONB amenities, checks, and soft delete
-- ============================================================================
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    posted_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    locality VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Hyderabad',
    
    -- Numerical Specifications with strict non-negative guards
    bhk_count INTEGER NOT NULL DEFAULT 2,
    baths_count INTEGER NOT NULL DEFAULT 2,
    sqft INTEGER NOT NULL,
    expected_price NUMERIC(14, 2) NOT NULL,
    is_negotiable BOOLEAN NOT NULL DEFAULT FALSE,
    construction_status VARCHAR(50) NOT NULL DEFAULT 'Ready to Move',
    
    -- Geospatial coordinates (Required for 'Near Me' and map markers)
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    
    -- JSONB amenities (e.g. ["Zero Brokerage", "24x7 Security", "Covered Parking"])
    features JSONB NOT NULL DEFAULT '["Zero Brokerage"]'::jsonb,
    
    -- Metrics & Metadata
    tag VARCHAR(50) DEFAULT 'New',
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    parking_slots INTEGER NOT NULL DEFAULT 1,
    year_built INTEGER,
    description TEXT,
    
    -- Direct Owner Snapshot (preserves display even if user profile changes)
    owner_name VARCHAR(100),
    owner_phone VARCHAR(20),
    
    -- Lifecycle state
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE, -- Production soft-delete
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Business Rules & Domain Validation
    CONSTRAINT chk_transaction_type CHECK (transaction_type IN ('Sell', 'Rent')),
    CONSTRAINT chk_property_type CHECK (property_type IN ('Flat', 'Villa', 'Plot', 'Commercial', 'Row House')),
    CONSTRAINT chk_construction_status CHECK (construction_status IN ('Ready to Move', 'Under Construction')),
    CONSTRAINT chk_property_status CHECK (status IN ('Active', 'Under Review', 'Sold', 'Rented', 'Archived')),
    CONSTRAINT chk_price_positive CHECK (expected_price > 0),
    CONSTRAINT chk_sqft_positive CHECK (sqft > 0),
    CONSTRAINT chk_bhk_positive CHECK (bhk_count >= 0),
    CONSTRAINT chk_rating_range CHECK (rating >= 0.00 AND rating <= 5.00)
);

CREATE TRIGGER trg_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ============================================================================
-- 3. PROPERTY_PHOTOS TABLE
-- Normalized gallery images with sequence control and thumbnail indexing
-- ============================================================================
CREATE TABLE property_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    is_cover_photo BOOLEAN NOT NULL DEFAULT FALSE,
    photo_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_photo_order_range CHECK (photo_order BETWEEN 1 AND 15)
);

-- Ensure only one cover photo can be set per property
CREATE UNIQUE INDEX uq_property_single_cover_photo 
ON property_photos (property_id) 
WHERE (is_cover_photo = TRUE);

-- ============================================================================
-- 4. CONTACT_REQUESTS (INQUIRIES / LEADS) TABLE
-- Tracks direct owner calls & WhatsApp clicks with lead state lifecycle
-- ============================================================================
CREATE TABLE contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    seeker_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    seeker_name VARCHAR(100) NOT NULL,
    seeker_mobile VARCHAR(20) NOT NULL,
    inquiry_type VARCHAR(20) NOT NULL,
    message TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Recorded',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_inquiry_type CHECK (inquiry_type IN ('Call', 'WhatsApp', 'Visit Request')),
    CONSTRAINT chk_inquiry_status CHECK (status IN ('Recorded', 'Contacted', 'Follow Up', 'Closed'))
);

-- ============================================================================
-- 5. USER_FAVORITES (SAVED SHORTLISTS) TABLE
-- High-throughput junction table with composite uniqueness
-- ============================================================================
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_user_favorite_property UNIQUE (user_id, property_id)
);

-- ============================================================================
-- 6. NOTIFICATIONS TABLE
-- Real-time in-app notifications with indexable read status and typed payloads
-- ============================================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL DEFAULT 'system',
    metadata JSONB,                          -- Optional deep-link or action parameters
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_notification_type CHECK (notification_type IN ('price_drop', 'new_listing', 'inquiry', 'system', 'verification'))
);

-- ============================================================================
-- 7. OTP_VERIFICATIONS TABLE
-- Production security table: handles TTL expiry, attempt locking, and replay defense
-- ============================================================================
CREATE TABLE otp_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mobile VARCHAR(15) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    purpose VARCHAR(30) NOT NULL DEFAULT 'login',
    attempts INTEGER NOT NULL DEFAULT 0,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_otp_purpose CHECK (purpose IN ('login', 'signup', 'reset_pin', 'phone_verify')),
    CONSTRAINT chk_max_attempts CHECK (attempts <= 5)
);

-- ============================================================================
-- PRODUCTION HIGH-PERFORMANCE INDEXING STRATEGY
-- ============================================================================

-- 1. Search Query Compound Index (The #1 executed query in real estate apps)
-- Filters: transaction_type + property_type + price range + status
CREATE INDEX idx_properties_search_composite 
ON properties (transaction_type, property_type, expected_price) 
WHERE (is_deleted = FALSE AND status = 'Active');

-- 2. Locality and Location Indexes
CREATE INDEX idx_properties_locality_active 
ON properties (locality) 
WHERE (is_deleted = FALSE AND status = 'Active');

-- 3. Trigram Index for Fast Fuzzy Text Search on Title & Locality (Typo-tolerant)
CREATE INDEX idx_properties_title_trgm ON properties USING gin (title gin_trgm_ops);
CREATE INDEX idx_properties_locality_trgm ON properties USING gin (locality gin_trgm_ops);

-- 4. JSONB Index for Filter by Amenities (e.g., properties with 'Swimming Pool' or 'Zero Brokerage')
CREATE INDEX idx_properties_features_jsonb ON properties USING gin (features);

-- 5. Foreign Key & Query Optimizer Indexes
CREATE INDEX idx_properties_posted_by ON properties (posted_by_user_id);
CREATE INDEX idx_property_photos_property_id ON property_photos (property_id, photo_order);
CREATE INDEX idx_contact_requests_owner_id ON contact_requests (owner_user_id, created_at DESC);
CREATE INDEX idx_user_favorites_user_id ON user_favorites (user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications (user_id, is_read) WHERE (is_read = FALSE);
CREATE INDEX idx_otp_active ON otp_verifications (mobile, expires_at) WHERE (is_used = FALSE);
