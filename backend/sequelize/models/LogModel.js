module.exports = (sequelize, type) => sequelize.define(
  'log_interactions',
  {
    id: {
      type: type.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    ip: {
      type: type.STRING,
      allowNull: true,
    },
    fingerprint: {
      type: type.STRING,
      allowNull: true,
    },
    session_id: {
      type: type.STRING,
      allowNull: true,
    },
    interaction: {
      type: type.TEXT,
      allowNull: true,
    },
    user_agent: {
      type: type.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    indexes: [
      // { unique: true, fields: ['email'] },
    ],
  },
);
