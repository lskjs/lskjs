import Err from '@lskjs/err';
import get from 'lodash/get';
import sample from 'lodash/sample';

import { ProxyStrategy } from './ProxyStrategy';

export class RandomProxyStrategy extends ProxyStrategy {
  strategy = 'random';
  getProxy() {
    const list = this.getList();
    const fatalCount = this.getFatalCount();
    const count = list?.length;
    if (!count) throw new Err('PROXY_MANAGER_LIST_EMPTY', { count, fatalCount });
    return sample(list);
  }
}

export default RandomProxyStrategy;
