import omit from 'lodash/omit';

export default (/* ctx */) => function pack(data = {}, info) {
  const res = this;
  const json = {
    code: info.code,
    message: info.message,
    ...omit(data, ['__pack', '__raw', '__status']),
  };
  const status = info.status || data.__status;
  if (status) {
    res.status(status);
  }
  if (!data) {
    return res.json(null);
  }
  if (data.__raw) {
    return res.send(data.__raw);
  }
  if (!data.__pack) {
    json.data = data;
  }
  if (__DEV__ && info.err) {
    json.err = info.err;
  }
  if (__DEV__ && info.debug) {
    json.debug = info.debug;
  }
  if (__DEV__ && info.stack) {
    json.stack = info.stack;
  }
  return res.json(json);
};
