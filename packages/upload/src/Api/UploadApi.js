import Api from '@lskjs/server-api';

export default class UploadApi extends Api {
  getRoutes() {
    return {
      'POST /file': ::this.file,
      'POST /files': ::this.files,
      'POST /image': ::this.image,
      'POST /photo': ::this.image,
    };
  }
  async file(req, res) {
    const upload = await this.app.module('upload');
    if (!upload) throw '!upload';
    await this.useMiddleware(upload.multer.single('file'), req, res);
    const { file } = req;
    if (!file) throw this.app.e('upload.emptyFile', { status: 400 });
    return upload.getFileInfo(file);
  }
  async files(req, res) {
    const upload = await this.app.module('upload');
    if (!upload) throw '!upload';
    await this.useMiddleware(upload.multer.any(), req, res);
    const { files = [] } = req;
    return Promise.map(files, (file) => upload.getFileInfo(file));
  }
  image() {
    throw 'not realized yet';
  }
}
