import getFileExtension from '@lskjs/utils/getFileExtension';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Api from '../BaseApi';

export default class V5UploadCardApi extends Api {
  getRoutes() {
    return {
      '/photo': ::this.photo,
      '/remove': ::this.remove,
      // '/delete': ::this.delete,
    };
  }
  constructor(...params) {
    super(...params);

    const e403 = code => this.app.e(code, { status: 403 });

    if (!this.app.config.upload) {
      console.error('!this.app.config.upload');
    }
    const {
      config: { upload: config },
    } = this.app;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const createDir = targetDir => {
      targetDir.split('/').forEach((dir, index, splits) => {
        const parent = splits.slice(0, index).join('/');
        const dirPath = path.resolve(parent, dir);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
        }
      });
    };

    const fileFilter = (req, file, cb) => {
      if (Array.isArray(config.mimetypes)) {
        if (config.mimetypes.indexOf(file.mimetype) === -1) {
          return cb(this.app.e('You are not allowed to upload files with this extension', { status: 400 }));
        }
      }
      return cb(null, true);
    };

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        let { path = 'storage' } = config;
        if (req.user && req.user._id) {
          path += '';
        } else if (config.allowGuest) {
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
        const extension = getFileExtension(file.originalname);
        let fileName;
        if (config.allowSetFilename) {
          fileName = file.originalname;
        } else if (req.user && req.user._id) {
          fileName = `${req.user._id}_${Date.now()}_${getRandomInt(0, 1000)}.${extension}`;
        } else {
          fileName = `${Date.now()}_${getRandomInt(0, 10000)}.${extension}`;
        }
        const { prefix = '' } = config;
        cb(null, `${prefix}${fileName}`);
      },
    });
    const limits = {};
    if (config.maxSize) {
      const fileSize = parseFloat(config.maxSize) * 1024 * 1024;
      limits.fileSize = fileSize;
    }
    this.upload = multer({
      storage,
      limits,
      fileFilter,
    });
  }

  async remove(req) {
    await this.isAuth(req);
    const userId = req.user._id;
    const { id } = req.data;
    const { ImageModel } = this.app.models;
    const image = await ImageModel.findById(id);
    if (!image) throw 'Photo not found';

    if (!image.subjectId || (image.subjectId === userId && image.subjectType === 'profile')) {
      await image.removeFiles();
      await image.remove();
      return {
        status: 'success',
      };
    }
    throw this.app.errors.e403('Permission denied');
  }
  async photo(req, res) {
    await this.isAuth(req);
    const userId = req.user._id;

    return new Promise((resolve, reject) =>
      this.upload.single('file')(req, res, async err => {
        // ctx.log.info(req.headers, 'headers');
        if (err) {
          console.error(err);
          return reject(this.app.e(err, { status: 400 }));
        }
        const { file, data } = req;
        const { type } = data;
        // ctx.log.info({ file }, 'FILE');
        if (!file) return reject(this.app.e.e('file not found', { status: 400 }));
        const { ImageModel } = this.app.models;
        const image = new ImageModel({
          subjectId: userId,
          subjectType: type || 'profile',
          path: `/${file.path}`,
          info: {
            mimetype: file.mimetype,
            size: file.size,
          },
        });
        await image.save();
        await image.saveResizedImages();
        return resolve(ImageModel.prepare(image, { req }));
        // return resolve({
        //   _id: image._id,
        //   url: image.url,
        //   urls: image.urls,
        // });
      }),
    );
  }
}

// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import _ from 'lodash';
// export default (ctx) => {
//   const { e400, e403 } = ctx.errors;
//   const { _checkNotFound } = ctx.helpers;
//   const { config } = ctx;

//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   const getFileType = (file) => {
//     if (file && file.originalname) {
//       const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
//       if (res && res[1]) {
//         return res[1];
//       }
//     }
//     return null;
//   };
//   // @TODO real file name
//   // const getFileName = (file) => {
//   //   return file.originalname;
//   // };

//   const createDir = (targetDir) => {
//     targetDir.split('/').forEach((dir, index, splits) => {
//       const parent = splits.slice(0, index).join('/');
//       const dirPath = path.resolve(parent, dir);
//       if (!fs.existsSync(dirPath)) {
//         fs.mkdirSync(dirPath);
//       }
//     });
//   };

//   const fileFilter = (req, file, cb) => {
//     if (Array.isArray(config.upload.mimetypes)) {
//       if (config.upload.mimetypes.indexOf(file.mimetype) === -1) {
//         return cb(e400('You are not allowed to upload files with this extension'));
//       }
//     }
//     return cb(null, true);
//   };

//   const storage = multer.diskStorage({
//     destination(req, file, cb) {
//       let { path = 'storage' } = config.upload;
//       if (req.user && req.user._id) {
//         path += '';
//       } else if (config.upload.allowGuest) {
//         path += '/general';
//       } else {
//         return cb(e403('Guest can not upload files'));
//       }
//       if (!fs.existsSync(path)) {
//         createDir(path);
//       }
//       return cb(null, path);
//     },
//     filename(req, file, cb) {
//       // @ TODO: timestamp check
//       let fileName;
//       if (config.upload.allowSetFilename) {
//         fileName = file.originalname;
//       } else if (req.user && req.user._id) {
//         fileName = `${req.user._id}_${Date.now()}_${getRandomInt(0, 1000)}.${getFileType(file)}`;
//       } else {
//         fileName = `${Date.now()}_${getRandomInt(0, 10000)}.${getFileType(file)}`;
//       }
//       const { prefix = '' } = config.upload;
//       cb(null, `${prefix}${fileName}`);
//     },
//   });
//   const limits = {};
//   if (config.upload.maxSize) {
//     const fileSize = parseFloat(config.upload.maxSize) * 1024 * 1024;
//     limits.fileSize = fileSize;
//   }
//   const upload = multer({
//     storage,
//     limits,
//     fileFilter,
//   });
//   const api = ctx.asyncRouter();
//   // api.post('/many', upload.any(), async (req) => {
//   //   const { files = [] } = req;
//   //   return files.map((file) => {
//   //     return {
//   //       url: `${config.url}/${file.path}`,
//   //       path: `/${file.path}`,
//   //     };
//   //   });
//   // });
//   api.post('/profile/photo', async (req, res) => {
//     // ctx.log.info(req.headers, 'HEADERS')
//     console.log(req, 'body');
//     return new Promise((resolve, reject) => {
//       return upload.single('file')(req, res, async (err) => {
//         // ctx.log.info(req.headers, 'headers');
//         if (err) {
//           console.error(err);
//           return reject(e400(err));
//         }
//         const { file } = req;
//         // ctx.log.info({ file }, 'FILE');
//         if (!file) return reject(e400('file not found'));
//         const { Image } = ctx.models;
//         const image = new Image({
//           subjectId: _.get(req, 'user._id', null),
//           subjectType: 'profile',
//           path: `/${file.path}`,
//           info: {
//             mimetype: file.mimetype,
//             size: file.size,
//           },
//         });
//         await image.save();
//         await image.saveResizedImages();
//         return resolve({
//           id: image._id,
//           url: image.url,
//           urls: image.urls,
//         });
//       });
//     });
//   });
//   api.delete('/profile/photo', async (req) => {
//     const { id } = req.allParams();
//     const profileId = _.get(req, 'user._id');
//     const { Image } = ctx.models;
//     const image = await Image
//     .findById(id)
//     .then(_checkNotFound('Photo'));
//     if (!image.subjectId || (image.subjectId === profileId && image.subjectType === 'profile')) {
//       await image.removeFiles();
//       await image.remove();
//       return {
//         status: 'success',
//       };
//     }
//     throw e403('Permission denied');
//   });
//   return api;
// };
