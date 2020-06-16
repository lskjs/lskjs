import Module from '@lskjs/module';
import Promise from 'bluebird';

export default class UploadClientModule extends Module {
  name = 'UploadClientModule';
  async uploadFiles(files) {
    if (typeof window === 'undefined') throw '!FormData';
    return Promise.map(files, (file) => this.uploadFile(file));
  }
  async uploadFile(file) {
    if (typeof window === 'undefined') throw '!FormData';
    const { FormData } = window;
    const formData = new FormData();
    formData.append('file', file);
    const {
      data: { data },
    } = await this.app.apiq.post('/api/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
  async uploadImage(formData) {
    const {
      data: { data },
    } = await this.app.apiq.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
}
