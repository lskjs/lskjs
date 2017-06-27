// import { autobind } from 'core-decorators';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
// import getModels from './models';


export default (ctx) => {
  return class LskUpload {
    async init() {
      this.config = ctx.config.upload;

      if (this.config.s3) {
        this.s3 = new aws.S3(this.config.s3);
      }

      this.storage = this.getStorage();
      this.multer = this.getMulter();

      // this.models = getModels(ctx);
    }


    getFileType(file) {
      if (file && file.originalname) {
        const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
        if (res && res[1]) {
          return res[1];
        }
      }
      return null;
    }
    // @TODO real file name
    // const getFileName = (file) => {
    //   return file.originalname;
    // };

    createDir(targetDir) {
      if (!fs.existsSync(targetDir)) {
        targetDir.split('/').forEach((dir, index, splits) => {
          const parent = splits.slice(0, index).join('/');
          const dirPath = path.resolve(parent, dir);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
          }
        });
      }
    }

    getStorage() {
      if (this.config.s3) {
        return this.getS3Storage();
      }
      return this.getDiskStorage();
    }

    getFilePath(req, file) {
      const { e403 } = ctx.errors;
      const config = this.config;
      let { path = 'storage' } = config;

      if (req.user && req.user._id) {
        path += `/${req.user._id}`;
      } else if (config.allowGuest) {
        path += '/general';
      } else {
        throw e403('Guest can not upload files');
      }

      return path;
    }

    getS3Storage() {
      return multerS3({
        s3: this.s3,
        bucket: this.s3.bucket,
        // metadata: function (req, file, cb) {
        //   cb(null, {fieldName: file.fieldname});
        // },
        key: async (req, file, cb) => {
          let filename;
          try {
            filename = this.getFilePath(req, file);
            filename = filename.replace(/_/g, '/');
          } catch (err) {
            return cb(err);
          }
          return cb(null, filename);
        },
      });
    }
    getDiskStorage() {
      const config = ctx.config.upload;
      const storage = multer.diskStorage({
        // destination(req, file, cb) {
        //   let path;
        //   try {
        //     path = this.getFilePath(req, file);
        //   } catch (err) {
        //     return cb(err);
        //   }
        //   this.createDir(path);
        //   return cb(null, path);
        // },
        filename: (req, file, cb) => {
          let path;
          try {
            path = this.getFilePath(req, file);
          } catch (err) {
            return cb(err);
          }
          const dirname = path.split('/').slice(0, -1).join('/');
          this.createDir(dirname);
          return dirname;
        },
      });
      return storage;
    }
    getMulter() {
      const { e400 } = ctx.errors;
      const config = ctx.config.upload;
      const fileFilter = (req, file, cb) => {
        if (Array.isArray(config.mimetypes)) {
          if (config.mimetypes.indexOf(file.mimetype) === -1) {
            return cb(e400('You are not allowed to upload files with this extension'));
          }
        }
        return cb(null, true);
      };

      const limits = {};
      if (config.maxSize) {
        const fileSize = parseFloat(config.maxSize) * 1024 * 1024;
        limits.fileSize = fileSize;
      }
      return multer({
        storage: this.storage,
        limits,
        fileFilter,
      });
    }
    getApi() {
      const { e400, e403 } = ctx.errors;
      const config = ctx.config.upload;

      const api = ctx.asyncRouter();
      api.post('/many', this.multer.any(), async (req) => {
        const { files = [] } = req;
        return files.map((file) => {
          return {
            url: `${config.url}/${file.path}`,
            path: `/${file.path}`,
          };
        });
      });
      api.post('/', this.multer.single('file'), async (req) => {
        // console.log(req.file);
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
    }
    async run() {
      ctx.app.use('/api/module/upload', this.getApi());
    }
  };
};
