import Module from '@lskjs/module';
import filter from 'lodash/filter';
import get from 'lodash/get';

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
  getCount() {
    const list = get(this, 'manager.cache.list') || [];
    return list.length;
  }
  getFatalCount() {
    return this.getList().length - this.getCount();
  }
  getList() {
    const list = get(this, 'manager.cache.list') || [];

    return filter(list, (proxy) => !get(proxy, 'stats.fatal', 0));
  }
}

export default ProxyStrategy;
