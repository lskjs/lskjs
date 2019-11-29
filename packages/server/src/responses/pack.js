import omit from 'lodash/omit';
import get from 'lodash/get';

export default ctx => function pack(data = {}, info) {
  const res = this;
  const config = get(ctx, 'config.response', __DEV__ ? { log: true, debug: true } : {});
  const json = {
    code: info.code,
    message: info.message,
    ...omit(data, ['__pack', '__raw', '__log', '__status']),
  };
  const status = info.status || data.__status;
  if (status) {
    res.status(status);
  }
  const isLog = config.log || data.__log;
  if (!data) {
    if (isLog) {
      ctx.log.trace('>>>>>>');
      console.log(null); // eslint-disable-line no-console
      ctx.log.trace('<<<<< ');
    }
    return res.json(null);
  }
  if (data.__raw) {
    if (isLog) {
      ctx.log.trace('>>>>>>');
      console.log(data.__raw); // eslint-disable-line no-console
      ctx.log.trace('<<<<< ');
    }
    return res.send(data.__raw);
  }
  if (!data.__pack) {
    json.data = data;
  }
  if (config.debug && info.err) {
    json.err = info.err;
  }
  if (config.debug && info.debug) {
    json.debug = info.debug;
  }
  if (config.debug && info.stack) {
    json.stack = info.stack;
  }
  if (isLog) {
    ctx.log.trace('>>>>>>');
    console.log(JSON.stringify(json, null, 2)); // eslint-disable-line no-console
    ctx.log.trace('<<<<< ');
  }
  return res.json(json);
};
