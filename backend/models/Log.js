const { Log } = require('../sequelize/db');

module.exports = {
  async create(instance) {
    if (!instance) {
      const error = new Error('No object provided');
      error.status = 400;
      throw error;
    }
    const logObj = await Log.create(instance);
    return logObj;
  },
};
