import Module from '@lskjs/module';
import multer from 'multer';
import fs from 'fs';
import nodepath from 'path';
import random from 'lodash/random';
import get from 'lodash/get';

const mimetypes = {
  'application/graphql': 'graphql',
  'application/javascript': 'js',
  'application/json': 'json',
  'application/ld+json': 'json',
  'application/msword': 'doc',
  'application/pdf': 'pdf',
  'application/sql': 'sql',
  'application/vnd.api+json': 'json',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.documen': 'docx',
  'application/xml': 'xml',
  'application/zip': 'zip',
  'audio/mpeg': 'mpeg',
  'audio/ogg': 'ogg',
  'image/gif': 'gif',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'text/css': 'css',
  'text/csv': 'csv',
  'text/html': 'html',
  'text/plain': 'txt',
  'text/xml': 'xml',
};

export default class UploadServerModule extends Module {
  name = 'UploadServerModule';
  async init() {
    await super.init();
    this.config = get(this.app, 'config.upload');
    if (!this.config) {
      this.app.log.error('config.upload is missing');
      this.config = {};
    }
    if (!this.config.url) {
      this.config.url = this.app.config.url;
    }
    this.initStorage();
    this.multer = this.getMulter();
  }

  getMulter() {
    const config = this.app.config.upload;
    const fileFilter = (req, file, cb) => {
      if (Array.isArray(config.mimetypes)) {
        if (config.mimetypes.indexOf(file.mimetype) === -1) {
          return cb(this.app.e('You are not allowed to upload files with this extension'));
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

  initStorage() {
    this.storage = this.getStorage();
  }
  getFileInfo(file) {
    if (this.config.s3) {
      return {
        name: file.fieldname,
        url: file.location,
        path: file.location,
        relative: `/${file.key}`,
        mimetype: file.mimetype,
        filename: file.originalname,
        info: {
          size: file.size,
          bucket: file.bucket,
          acl: file.acl,
          etag: file.etag,
        },
      };
    }
    return {
      name: file.fieldname,
      url: this.app.url(`/${file.path}`),
      path: `/${file.path}`,
      relative: `/${file.path}`,
      mimetype: file.mimetype,
      filename: file.originalname,
    };
  }
  getFileExt(file) {
    if (file && file.mimetype && mimetypes[file.mimetype]) {
      return mimetypes[file.mimetype];
    }
    if (file && file.originalname) {
      const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);  //eslint-disable-line
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
        const dirPath = nodepath.resolve(parent, dir);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
        }
      });
    }
  }

  getFilePath(req, file) {
    const { config } = this;
    let { path = 'storage' } = config;

    if (req.user && req.user._id) {
      path += `/${req.user._id}`;
    } else if (config.allowGuest) {
      path += '/guests';
    } else {
      this.app.log.error('Guest can not upload files');
      throw this.app.e('Guest can not upload files', { status: 403 });
    }

    let fileName;
    if (config.allowSetFilename && file.originalname !== 'blob') {
      fileName = file.originalname;
    } else {
      fileName = `${Date.now()}_${random(0, 1000)}`;
      const ext = this.getFileExt(file);
      if (ext) {
        fileName = `${fileName}.${ext}`;
      }
    }
    const { prefix = '' } = config;
    const filePath = `${path}/${prefix}${fileName}`;
    // console.log({ filePath });
    return filePath;
  }

  getStorage() {
    // const config = this.app.config.upload;
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // console.log('destination');
        let path;
        let dirname;
        try {
          path = this.getFilePath(req, file);
          dirname = path.split('/').slice(0, -1).join('/');
          this.createDir(dirname);
        } catch (err) {
          return cb(err);
        }
        return cb(null, dirname);
      },
      filename: (req, file, cb) => {
        let path;
        let filename;
        try {
          path = this.getFilePath(req, file);
          [filename] = path.split('/').reverse();
        } catch (err) {
          return cb(err);
        }
        // console.log('filename', filename);
        // this.createDir(filename);
        return cb(null, filename);
      },
    });
    return storage;
  }
}
