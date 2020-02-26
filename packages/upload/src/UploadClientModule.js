import Module from '@lskjs/module';

export default class UploadClientModule extends Module {
  async uploadFile(file) {
    if (typeof window === 'undefined') return false;
    const { FormData } = window;
    const body = new FormData();
    body.append('file', file);
    const res = await this.app.api.fetch('/api/module/upload', {
      method: 'POST',
      headers: {
        'Content-Type': '!',
      },
      body,
    });
    return res.data;
  }
  async uploadImage(body) {
    const res = await this.app.api.fetch('/api/module/upload', {
      method: 'POST',
      headers: {
        'Content-Type': '!',
      },
      body,
    });
    return res.data;
  }
}
