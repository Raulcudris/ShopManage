const { Pool } = require('pg');
const { config } = require('../config/config');

const options = {
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  ...(config.isProd && {
    ssl: {
      rejectUnauthorized: false
    }
  })
};

const pool = new Pool(options);

// Manejo de errores de conexión
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;