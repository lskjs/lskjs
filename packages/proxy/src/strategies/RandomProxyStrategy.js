import sample from 'lodash/sample';
import { ProxyStrategy } from './ProxyStrategy';

export class RandomProxyStrategy extends ProxyStrategy {
  getProxy() {
    return sample(this.manager.list);
  }
}

export default RandomProxyStrategy;
