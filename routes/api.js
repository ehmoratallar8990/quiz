const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');

// const upload = multer({ dest: '../../uploads/' });

const destinationPath = path.join(__dirname, '../uploads');
// const destinationPath = '../../uploads';
const upload = multer({ dest: destinationPath });

// https://weekendprojects.dev/posts/fix-for-npm-sharp-command-failed-error/#:~:text=The%20reason%20why%20the%20error,cache%20and%20reinstall%20NPM%20sharp

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ok',
  });
});

const LogController = require('../backend/controllers/LogController');
const UploadController = require('../backend/controllers/UploadController');

router.post('/log', LogController.log);
router.post('/upload', [upload.array('files')], UploadController.upload);
router.get('/file/:id', UploadController.get);

// router.post('/upload', [upload.array('files')], async (req, res) => {
//   // const reqCopy = structuredClone(req);
//   // reqCopy.upload = upload;
//   // eslint-disable-next-line no-param-reassign
//   req.upload = upload;
//   await UploadController.upload(req, res);
// });

// Catch unknown route
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
  });
});

module.exports = router;
