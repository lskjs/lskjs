import Module from '@lskjs/module';

export class ProxyStrategy extends Module {
  strategy = 'unknown';
  getProxy() {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update() {}
  getStats() {
    return {};
  }
}

export default ProxyStrategy;
