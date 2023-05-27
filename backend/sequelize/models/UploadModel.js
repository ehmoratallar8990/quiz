module.exports = (sequelize, type) => sequelize.define(
  'uploads',
  {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      primaryKey: true,
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
    original_name: {
      type: type.STRING,
      allowNull: true,
    },
    filename: {
      type: type.STRING,
      allowNull: true,
    },
    encoding: {
      type: type.STRING,
      allowNull: true,
    },
    mimetype: {
      type: type.STRING,
      allowNull: true,
    },
    path: {
      type: type.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: type.STRING,
      allowNull: true,
    },
    size: {
      type: type.NUMERIC,
      allowNull: true,
    },
    type: {
      type: type.STRING,
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
