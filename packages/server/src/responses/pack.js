import omit from 'lodash/omit';
import get from 'lodash/get';

export default ctx => function pack(raw = {}, info) {
  const res = this;
  const config = get(ctx, 'config.response', __DEV__ ? { log: false, debug: true } : {});
  const isRaw = get(raw, '__raw', false) || get(raw, '__pack', false);
  const isLog = Boolean(get(raw, '__log') === null ? config.log : get(raw, '__log'));
  const status = info.status || get(raw, '__status', null);
  const data = raw ? omit(raw, ['__pack', '__raw', '__log', '__status']) : null;

  const json = {
    code: info.code,
    message: info.message,
    data,
  };
  if (status) {
    res.status(status);
  }
  if (!data) {
    if (isLog) {
      ctx.log.trace('>>>>>>');
      console.log(null); // eslint-disable-line no-console
      ctx.log.trace('<<<<<<');
    }
    return res.json(null);
  }
  if (isRaw) {
    if (isLog) {
      ctx.log.trace('>>>>>>');
      console.log(data); // eslint-disable-line no-console
      ctx.log.trace('<<<<<<');
    }
    return res.send(data);
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
    ctx.log.trace('<<<<<<');
  }
  return res.json(json);
};
