import multer from 'multer';
import fs from 'fs';
import path from 'path';
export default (ctx) => {
  const { e400, e403 } = ctx.errors;
  const { config } = ctx;

  function getRandomInt(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getFileType = (file) => {
    if (file && file.originalname) {
      const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
      if (res && res[1]) {
        return res[1];
      }
    }
    return null;
  };
  // @TODO real file name
  // const getFileName = (file) => {
  //   return file.originalname;
  // };

  const createDir = (targetDir) => {
    targetDir.split('/').forEach((dir, index, splits) => {
      const parent = splits.slice(0, index).join('/');
      const dirPath = path.resolve(parent, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });
  };

  const fileFilter = (req, file, cb) => {
    if (Array.isArray(config.upload.mimetypes)) {
      if (config.upload.mimetypes.indexOf(file.mimetype) === -1) {
        return cb(e400('You are not allowed to upload files with this extension'));
      }
    }
    return cb(null, true);
  };

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      let { path = 'storage' } = config.upload;
      if (req.user && req.user._id) {
        path += `/${req.user._id}`;
      } else if (config.upload.allowGuest) {
        path += '/general';
      } else {
        return cb(e403('Guest can not upload files'));
      }
      if (!fs.existsSync(path)) {
        createDir(path);
      }
      return cb(null, path);
    },
    filename(req, file, cb) {
      // @ TODO: timestamp check
      let fileName;
      if (config.upload.allowSetFilename) {
        fileName = file.originalname;
      } else {
        fileName = `${Date.now()}_${getRandomInt(0, 1000)}.${getFileType(file)}`;
      }
      const { prefix = '' } = config.upload;
      cb(null, `${prefix}${fileName}`);
    },
  });
  const limits = {};
  if (config.upload.maxSize) {
    const fileSize = parseFloat(config.upload.maxSize) * 1024 * 1024;
    limits.fileSize = fileSize;
  }
  const upload = multer({
    storage,
    limits,
    fileFilter,
  });
  const api = ctx.asyncRouter();
  api.post('/many', upload.any(), async (req) => {
    const { files = [] } = req;
    return files.map((file) => {
      return {
        url: `${config.url}/${file.path}`,
        path: `/${file.path}`,
      };
    });
  });
  api.post('/', upload.single('file'), async (req) => {
    console.log(req.file);
    const { file } = req;
    return {
      name: file.fieldname,
      url: `${config.url}/${file.path}`,
      path: `/${file.path}`,
      mimetype: file.mimetype,
      filename: file.originalname,
    };
  });
  return api;
};
