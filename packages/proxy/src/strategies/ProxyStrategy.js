import Module from '@lskjs/module';

export class ProxyStrategy extends Module {
  getProxy() {
    return null;
  }
  update() {}
  getStats() {
    return {};
  }
}

export default ProxyStrategy;
