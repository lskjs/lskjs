import _ from 'lodash';

export default (ctx) => {
  return function pack(data, info) {
    const pck = {
      code: info.code,
      message: info.message,
    };
    if (data) {
      if (data.__pack) {
        console.log('__pack! !!!');

        Object.assign(pck, _.omit(data, ['__pack']));
      } else {
        pck.data = data;
      }
    }
    if (__DEV__ && info.err) {
      pck.err = info.err;
    }
    console.log('json', data);
    return this.json(pck);
  };
};
