import Module from '@lskjs/module';

export default class UploadClientModule extends Module {
  name = 'UploadClientModule';
  async uploadFile(file) {
    if (typeof window === 'undefined') return false;
    const { FormData } = window;
    const data = new FormData();
    data.append('file', file);
    const res = await this.app.api.fetch('/api/module/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
    return res.data;
  }
  async uploadImage(data) {
    const res = await this.app.api.fetch('/api/module/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
    return res.data;
  }
}
