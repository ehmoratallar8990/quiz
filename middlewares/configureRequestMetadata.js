/* eslint-disable no-param-reassign */
const configureRequestMetadata = (req, res, next) => {
  const { fingerprint, session_id: sessionId } = req.headers;

  req.fingerprint = fingerprint ?? null;
  req.sessionId = sessionId ?? null;

  req.ip = req?.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? null;
  req.userAgent = req?.headers['user-agent'] ?? null;

  next();
};

module.exports = configureRequestMetadata;
