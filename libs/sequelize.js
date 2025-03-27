const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : console.log,
  dialectOptions: config.isProd ? {
    ssl: {
      rejectUnauthorized: false
    }
  } : {}
};

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// Sincronización solo en desarrollo (opcional)
if (config.env === 'development') {
  sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch(console.error);
}

module.exports = sequelize;