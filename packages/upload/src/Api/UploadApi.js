import Api from '@lskjs/server-api';

export default class V5UploadCardApi extends Api {
  getRoutes() {
    return {
      'POST /file': ::this.file,
      'POST /files': ::this.files,
      'POST /image': ::this.image,
      'POST /photo': ::this.image,
    };
  }
  getFileInfo(file) {
    const { upload: config = {} } = this.app.config.upload;
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
      url: this.app.url(`/${file.path}`),
      path: `/${file.path}`,
      relative: `/${file.path}`,
      mimetype: file.mimetype,
      filename: file.originalname,
    };
  }
  async file(req, res) {
    const upload = await this.app.module('upload');
    if (!upload) throw '!upload';
    await this.useMiddleware(upload.multer.single('file'), req, res);
    const { file } = req;
    if (!file) throw this.app.e('upload.emptyFile', { status: 400 });
    return this.getFileInfo(file);
  }
  async files(req, res) {
    const upload = await this.app.module('upload');
    if (!upload) throw '!upload';
    await this.useMiddleware(upload.multer.any(), req, res);
    const { files = [] } = req;
    return Promise.map(files, file => this.getFileInfo(file));
  }
  image() {
    throw 'not realized yet';
  }
}
