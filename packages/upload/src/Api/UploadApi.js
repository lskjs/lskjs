import Api from '@lskjs/server-api';
import getFileExtension from '@lskjs/utils/getFileExtension';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export default class V5UploadCardApi extends Api {
  getRoutes() {
    return {
      'POST /file': ::this.file,
      'POST /files': ::this.files,
      'POST /image': ::this.image,
      'POST /photo': ::this.image,
    };
  }

  saveFile(file) {
    const { upload: config } = this.app.config.upload;

    if (config.s3) {
      return {
        name: file.fieldname,
        url: file.location,
        path: file.location,
        relative: `/${file.key}`,
        mimetype: file.contentType,
        filename: file.originalname,
      };
    }

    return {
      name: file.fieldname,
      url: `${config.url}/${file.path}`,
      path: `/${file.path}`,
      relative: `/${file.path}`,
      mimetype: file.mimetype,
      filename: file.originalname,
    };
  }

  iamge() {
    throw 'not realized yet';
  }
  async middleware(middleware, [req, res], callback) {
    return middleware(req, res, callback);
  }
  async file(...args) {
    const upload = await this.app.module('upload');
    if (!upload) throw '!upload';
    return this.middleware(upload.multer.single('file'), args, req => {
      const { file } = req;
      if (!file) throw this.app.e('upload.emptyFile', { status: 400 });
      return this.saveFile(file);
    });
  }
  async files(...args) {
    const upload = await this.app.module('upload');
    if (!upload) throw '!upload';
    return this.middleware(upload.multer.any(), args, req => {
      const { files = [] } = req;
      return Promise.map(files, file => this.saveFile(file));
    });
  }
}
