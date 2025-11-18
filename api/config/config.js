require('dotenv').config();

const dialectOptions = {
  options: {
    instanceName: process.env.DB_INSTANCE || '',
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
  }
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    // dialectModule: require('mysql2'),
    dialectOptions,
    pool: { max: 10, min: 0, idle: 30000 },
    logging: console.log
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    // dialectModule: require('mysql2'),
    dialectOptions,
    pool: { max: 20, min: 2, idle: 30000 },
    logging: console.log
  }
};
