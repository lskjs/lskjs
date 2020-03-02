import Module from '@lskjs/module';

export default class UploadClientModule extends Module {
  name = 'UploadClientModule';
  async uploadFile(file) {
    if (typeof window === 'undefined') return false;
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
