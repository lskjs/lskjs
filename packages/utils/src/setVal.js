import get from 'lodash/get';
import set from 'lodash/set';
import getVal from './getVal';

export default (json, key, val) => {
  if (!key) return;
  if (get(json, key)) {
    console.log('Translate key duplicate', key, '');
  }
  if (val) {
    set(json, key, getVal(val));
  }
  // else {
  //   _.set(json, key, key);
  // }
};
