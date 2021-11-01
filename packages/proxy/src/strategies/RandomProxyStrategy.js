import Err from '@lskjs/err';
import get from 'lodash/get';
import sample from 'lodash/sample';

import { ProxyStrategy } from './ProxyStrategy';

export class RandomProxyStrategy extends ProxyStrategy {
  strategy = 'random';
  getProxy() {
    const list = get(this, 'manager.cache.list');
    if (!list?.length) throw new Err('PROXY_MANAGER_LIST_EMPTY');
    return sample(list);
  }
}

export default RandomProxyStrategy;
