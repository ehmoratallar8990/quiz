const Log = require('../models/Log');

module.exports = {
  async log(req, res) {
    try {
      const payload = req.body;
      payload.fingerprint = req?.headers?.fingerprint ?? null;
      payload.session_id = req?.headers?.session_id ?? null;
      payload.ip = req?.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? null;
      payload.user_agent = req?.headers['user-agent'] ?? null;
      const { interaction } = payload;

      if (!interaction) {
        return res.status(400).json({
          message: 'No interaction provided',
        });
      }
      const logObj = await Log.create(payload);
      return res.status(200).json({
        message: 'Ok',
        payload,
        data: logObj,
      });
    } catch (error) {
      const status = error?.status ?? 500;
      return res.status(status).json({
        error,
        message: error?.message,
      });
    }
  },
};
