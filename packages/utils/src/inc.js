import set from 'lodash/set';
import get from 'lodash/get';

export default (object, key, value = 1) => set(object, key, get(object, key, 0) + value);
