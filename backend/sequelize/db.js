const { Sequelize } = require('sequelize');
const LogModel = require('./models/LogModel');
const UploadModel = require('./models/UploadModel');

const {
  DB_ENABLED,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_LOG,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

console.log('**DB_ENABLED: ', process.env.DB_ENABLED);

let {
  DB_FORCE,
  DB_ALTER,
} = process?.env ?? false;

DB_FORCE = (typeof (DB_FORCE) === 'string') ? DB_FORCE.trim().toLowerCase() === 'true' : DB_FORCE ?? false;
DB_ALTER = (typeof (DB_ALTER) === 'string') ? DB_ALTER.trim().toLowerCase() === 'true' : DB_ALTER ?? false;

let db = {};

if (DB_ENABLED?.trim().toLowerCase() === 'true') {
  const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
      host: DB_HOST,
      port: DB_PORT,
      logging: JSON.parse(DB_LOG.toLowerCase()),
      dialect: 'mysql',
    },

  );

  // Initialize Models
  const Log = LogModel(sequelize, Sequelize);
  const Upload = UploadModel(sequelize, Sequelize);

  // Relationships

  // Export
  db = {
    ...db,
    Log,
    Upload,
  };

  sequelize.sync({ force: DB_FORCE, alter: DB_ALTER }).then(() => {
    console.log('✅ Tables synced');
  }).catch((e) => {
    console.log('❌ Tables synced Failed!!');
    console.log('❌', e);
  });
} else {
  console.log('ℹ️ DB Connection not enabled in .ENV');
}

module.exports = db;
