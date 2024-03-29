/* global window */
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import Bluebird from 'bluebird';

export class UploadClientModule extends Module {
  async uploadFiles(files) {
    if (typeof window === 'undefined') throw new Err('!FormData');
    return Bluebird.map(files, (file) => this.uploadFile(file));
  }
  async uploadFile(file) {
    const api = await this.app.module('api');
    if (typeof window === 'undefined') throw new Err('!FormData');
    const { FormData } = window;
    const formData = new FormData();
    formData.append('file', file);
    const {
      data: { data },
    } = await api.post('/api/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
  async uploadImage(formData) {
    const api = await this.app.module('api');
    const {
      data: { data },
    } = await api.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
}

export default UploadClientModule;
