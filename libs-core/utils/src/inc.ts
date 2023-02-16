import get from 'lodash/get';
import set from 'lodash/set';

export default (object, key, value = 1) => set(object, key, get(object, key, 0) + value);
