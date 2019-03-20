import omit from 'lodash/omit';

export default (ctx) => {
  return function pack(data, info) {
    const pck = {
      code: info.code,
      message: info.message,
    };
    if (info.status) {
      this.status(info.status);
    }
    if (data) {
      if (data.__pack) {
        Object.assign(pck, omit(data, ['__pack']));
      } else {
        pck.data = data;
      }
    }
    if (__DEV__ && info.err) {
      pck.err = info.err;
    }
    if (__DEV__ && info.debug) {
      pck.debug = info.debug;
    }
    if (__DEV__ && info.stack) {
      pck.stack = info.stack;
    }
    return this.json(pck);
  };
};
