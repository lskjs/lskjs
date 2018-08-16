import omit from 'lodash/omit';

export default (ctx) => {
  return function pack(data, info) {
    const pck = {
      code: info.code,
      message: info.message,
    };
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
    return this.json(pck);
  };
};
