const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const testPath = path.join(__dirname, './../dist', req.path);
  if (req.path === '/' || !fs.existsSync(testPath)) {
    return next();
  }
  console.log(testPath);
  return res.status(200).sendFile(testPath);
};
