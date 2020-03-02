import Module from '@lskjs/module';
import Promise from 'bluebird';

export default class UploadClientModule extends Module {
  name = 'UploadClientModule';
  async uploadFiles(files) {
    if (typeof window === 'undefined') throw '!FormData';
    return Promise.map(files, file => this.uploadFile(file));
  }
  async uploadFile(file) {
    if (typeof window === 'undefined') throw '!FormData';
    const { FormData } = window;
    const data = new FormData();
    data.append('file', file);
    const res = await this.app.apiq.post('/api/upload/file', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
  async uploadImage(formData) {
    const res = await this.app.apiq.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
}
