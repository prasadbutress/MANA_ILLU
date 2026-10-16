const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/mana_illu_db',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
});

let isConnected = false;

// Test connection on boot
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.warn('[Postgres DB]: Connection to PostgreSQL database not established yet. Utilizing resilient fallback or waiting for database startup.', err.message);
  } else {
    isConnected = true;
    console.log('[Postgres DB]: Connected successfully to PostgreSQL database at', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  getIsConnected: () => isConnected,
};
