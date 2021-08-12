// import multer from 'multer';
// import fs from 'fs';
// import nodepath from 'path';
// import random from 'lodash/random';
// import get from 'lodash/get';
// import aws from 'aws-sdk';
// import multerS3 from 'multer-s3';
// import Api from '@lskjs/server-api';

// export default class UploadApi extends Api {
//   getFileType(file) {
//     if (file && file.originalname) {
//       const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);  //eslint-disable-line
//       if (res && res[1]) {
//         return res[1];
//       }
//     }
//     return null;
//   }
//   // @TODO real file name
//   // const getFileName = (file) => {
//   //   return file.originalname;
//   // };

//   createDir(targetDir) {
//     if (!fs.existsSync(targetDir)) {
//       targetDir.split('/').forEach((dir, index, splits) => {
//         const parent = splits.slice(0, index).join('/');
//         const dirPath = nodepath.resolve(parent, dir);
//         if (!fs.existsSync(dirPath)) {
//           fs.mkdirSync(dirPath);
//         }
//       });
//     }
//   }

//   getFilePath(req, file) {
//     const { e403 } = this.app.errors;
//     const { config } = this;
//     let { path = 'storage' } = config;

//     if (req.user && req.user._id) {
//       path += `/${req.user._id}`;
//     } else if (config.allowGuest) {
//       path += '/general';
//     } else {
//       throw e403('Guest can not upload files');
//     }

//     let fileName;
//     if (config.allowSetFilename) {
//       fileName = file.originalname;
//     } else {
//       fileName = `${Date.now()}_${random(0, 1000)}.${this.getFileType(file)}`;
//     }
//     const { prefix = '' } = config;
//     const path2 = `${path}/${prefix}${fileName}`;
//     // console.log({ path2 });

//     return path2;
//   }

//   getS3Storage() {
//     return multerS3({
//       s3: this.s3,
//       bucket: this.config.s3.bucket,
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       acl: 'public-read',
//       key3: (req, file, cb) => {
//         const filename = nodepath.parse(file.originalname);
//         // console.log({ req, file });
//         // console.log(`avatar_${req.user._id}.${filename.ext}`);
//         cb(null, `avatar_${req.user._id}.${filename.ext}`);
//       },
//       key: async (req, file, cb) => {
//         let filename;
//         try {
//           // console.log('req, file', file);
//           filename = this.getFilePath(req, file);
//           // console.log('filename', filename);
//           filename = filename.replace(/\//g, '__');
//           // console.log('filename2', filename);
//         } catch (err) {
//           return cb(err);
//         }
//         return cb(null, filename);
//       },
//     });
//   }

//   getDiskStorage() {
//     // const config = this.app.config.upload;
//     const storage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         // console.log('destination');
//         let path;
//         let dirname;
//         try {
//           path = this.getFilePath(req, file);
//           dirname = path.split('/').slice(0, -1).join('/');
//           this.createDir(dirname);
//         } catch (err) {
//           return cb(err);
//         }
//         return cb(null, dirname);
//       },
//       filename: (req, file, cb) => {
//         let path;
//         let filename;
//         try {
//           path = this.getFilePath(req, file);
//           [filename] = path.split('/').reverse();
//         } catch (err) {
//           return cb(err);
//         }
//         // console.log('filename', filename);
//         // this.createDir(filename);
//         return cb(null, filename);
//       },
//     });
//     return storage;
//   }

//   getMulter() {
//     const { e400 } = this.app.errors;
//     const config = this.app.config.upload;
//     const fileFilter = (req, file, cb) => {
//       if (Array.isArray(config.mimetypes)) {
//         if (config.mimetypes.indexOf(file.mimetype) === -1) {
//           return cb(e400('You are not allowed to upload files with this extension'));
//         }
//       }
//       return cb(null, true);
//     };

//     const limits = {};
//     if (config.maxSize) {
//       const fileSize = parseFloat(config.maxSize) * 1024 * 1024;
//       limits.fileSize = fileSize;
//     }
//     // console.log('getMulter', {
//     //   storage: this.storage,
//     //   limits,
//     //   fileFilter,
//     // });
//     return multer({
//       storage: this.storage,
//       limits,
//       fileFilter,
//     });
//   }

//   getApi() {
//     const config = this.app.config.upload;
//     function processFile(file) {
//       if (config.s3) {
//         return {
//           name: file.fieldname,
//           url: file.location,
//           path: file.location,
//           relative: `/${file.key}`,
//           mimetype: file.contentType,
//           filename: file.originalname,
//         };
//       }

//       return {
//         name: file.fieldname,
//         url: `${config.url}/${file.path}`,
//         path: `/${file.path}`,
//         relative: `/${file.path}`,
//         mimetype: file.mimetype,
//         filename: file.originalname,
//       };
//     }

//     const api = this.app.asyncRouter();
//     api.post('/many', this.multer.any(), async (req) => {
//       const { files = [] } = req;
//       return files.map(processFile);
//     });

//     // const upload = multer();
//     // api.post('/', this.multer.single('file'), async (req) => {
//     api.post('/', this.multer.single('file'), async (req) => {
//       const { file } = req;
//       if (!file) {
//         throw new Err('!file');
//       }
//       return processFile(file);
//     });
//     return api;
//   }

//   async run() {
//     this.app.app.use('/api/module/upload', this.getApi());
//   }
// }
