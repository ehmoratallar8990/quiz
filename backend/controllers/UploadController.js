const sharp = require('sharp'); // For generating thumbnails
const fs = require('fs');
const path = require('path'); // For extracting file extension
const { Upload } = require('../sequelize/db');

const destinationPath = path.join(__dirname, '../../uploads');

module.exports = {
  async upload(req, res) {
    try {
      const payload = req.body;
      payload.fingerprint = req?.headers?.fingerprint ?? null;
      payload.session_id = req?.headers?.session_id ?? null;
      payload.ip = req?.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? null;
      payload.user_agent = req?.headers['user-agent'] ?? null;
      const { files } = req;

      if (!files) {
        return res.status(400).json({
          message: 'No files provided',
        });
      }
      if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({
          message: 'No file array provided, or its empty',
        });
      }

      const cleanPath = (stringPath) => {
        const pathArray = stringPath.split('/');
        const uploadsIndex = pathArray.findIndex((element) => element === 'uploads');

        if (uploadsIndex !== -1) {
          const newpath = pathArray.slice(uploadsIndex).join('/');
          return newpath;
        }
        return null;
      };

      // Loop through each uploaded file
      const uploadedFiles = await Promise.all(files.map(async (file) => {
        const ext = path.extname(file.originalname).toLowerCase();

        let fileMeta = {
          ip: req.ip,
          session_id: req.sessionId,
          fingerprint: req.fingerprint,
          user_agent: req.user_agent,
          filename: `${file.filename}${ext}`,
        };

        // Construct new file path with the UUID name and original file extension
        let newFilePath = `${destinationPath}/files/${file.filename}${ext}`;

        // Check if the uploaded file is an image
        if (file.mimetype.startsWith('image/')) {
          newFilePath = `${destinationPath}/images/${file.filename}${ext}`;

          // Generate thumbnail
          const thumbnail = await sharp(file.path).resize(400).toBuffer();

          // Construct new file path for thumbnail with the UUID name and ".thumb" extension
          const thumbFilePath = `${destinationPath}/thumbnails/${file.filename}.thumb${ext}`;

          // Save the thumbnail file with the new file path
          fs.writeFileSync(thumbFilePath, thumbnail);
          fs.renameSync(file.path, newFilePath);

          // Return the uploaded file object with UUID name, file path, and original file name
          fileMeta = {
            ...fileMeta,
            original_name: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            path: cleanPath(newFilePath),
            thumbnail: cleanPath(thumbFilePath),
            size: file.size,
            type: 'image',
          };

          const fileInstance = await Upload.create(fileMeta);

          return fileInstance;
        }
        fs.renameSync(file.path, newFilePath);

        // Return the uploaded file object with UUID name, file path, and original file name
        fileMeta = {
          ...fileMeta,
          original_name: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          path: cleanPath(newFilePath),
          thumbnail: null,
          size: file.size,
          type: 'file',
        };
        const fileInstance = await Upload.create(fileMeta);
        return fileInstance;
      }));

      // Return the array of uploaded file objects
      return res.status(200).json({
        message: 'Ok',
        data: uploadedFiles,
      });
    } catch (error) {
      const status = error?.status ?? 500;
      return res.status(status).json({
        error,
        message: error?.message,
      });
    }
  },
  async get(req, res) {
    try {
      const { id } = req.params;
      const { raw, thumbnail } = req.query;

      if (!id) {
        return res.status(400).json({
          message: 'No id provided',
        });
      }
      const file = await Upload.findOne({
        where: {
          id,
        },
      });
      console.log(id);

      if (!file) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      if (raw) {
        return res.sendFile(path.join(__dirname, './../../', file.path));
      }
      if (thumbnail) {
        if (!file.thumbnail) {
          return res.status(404).json({
            message: 'Not found',
          });
        }
        return res.sendFile(path.join(__dirname, './../../', file.thumbnail));
      }

      return res.status(200).json({
        message: 'Ok',
        data: file,
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
