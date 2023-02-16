import Err from '@lskjs/err';
import Api from '@lskjs/server-api';

export class UploadApi extends Api {
  getRoutes() {
    return {
      'POST /file': this.file.bind(this),
      'POST /files': this.files.bind(this),
      'POST /image': this.image.bind(this),
      'POST /photo': this.image.bind(this),
    };
  }
  async file(req, res) {
    const upload = await this.app.module('upload');
    if (!upload) throw new Err('!upload');
    await this.useMiddleware(upload.multer.single('file'), req, res);
    const { file } = req;
    if (!file) throw new Err('upload.emptyFile', { status: 400 });
    return upload.getFileInfo(file);
  }
  async files(req, res) {
    const upload = await this.app.module('upload');
    if (!upload) throw new Err('!upload');
    await this.useMiddleware(upload.multer.any(), req, res);
    const { files = [] } = req;
    return Promise.map(files, (file) => upload.getFileInfo(file));
  }
  image() {
    throw new Err('not realized yet');
  }
}

export default UploadApi;
