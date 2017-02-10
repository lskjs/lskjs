import _ from 'lodash';

export default (ctx) => {
  return function pack(data, info) {
    const pck = {
      code: info.code,
      message: info.message,
    };
    if (data) {
      if (data.__pack) {
        Object.assign(pck, _.omit(data, ['__pack']));
      } else {
        pack.data = data;
      }
    }
    if (__DEV__ && info.err) {
      pack.err = info.err;
    }
    return this.json(pack);
  };
};
