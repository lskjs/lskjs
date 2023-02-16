import { IterateProxyStrategy } from './IterateProxyStrategy';
import { LinearProxyStrategy } from './LinearProxyStrategy';
import { RandomProxyStrategy } from './RandomProxyStrategy';

export default {
  iterate: IterateProxyStrategy,
  random: RandomProxyStrategy,
  linear: LinearProxyStrategy,
};
