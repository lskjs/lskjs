import Err from '@lskjs/err';
import Module from '@lskjs/module';
import fs from 'fs';
import random from 'lodash/random';
import multer from 'multer';
import nodepath from 'path';

import { mimetypes } from './mimetypes';

export class UploadServerModule extends Module {
  mimetypes = mimetypes;
  async init() {
    await super.init();
    if (this.config.mimetypes) this.mimetypes = this.config.mimetypes;
    // if (!this.config.url) throw new Err('!url');
    this.initStorage();
    this.multer = this.getMulter();
  }

  getMulter() {
    // const { config } = this;
    this.log.trace('set mimetypes', this.mimetypes);
    const fileFilter = (req, file, cb) => {
      if (Array.isArray(this.mimetypes)) {
        if (this.mimetypes.indexOf(file.mimetype) === -1) {
          return cb(new Err('upload.invalidMimetype', 'You are not allowed to upload files with this extension'));
        }
      }
      return cb(null, true);
    };
    const limits = {};
    const maxSize = this.config.maxSize || (this.config.local && this.config.local.maxSize);
    if (maxSize) {
      const fileSize = parseFloat(maxSize) * 1024 * 1024;
      this.log.trace('set maxSize', maxSize);
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
      throw new Err('Guest can not upload files', { status: 403 });
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

export default UploadServerModule;
