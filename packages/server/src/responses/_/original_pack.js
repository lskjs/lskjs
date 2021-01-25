import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import omit from 'lodash/omit';

export default (ctx) =>
  function pack(raw = {}, info) {
    const res = this;
    const config = get(ctx, 'config.response', __DEV__ ? { log: false, debug: true } : {});
    // const isRaw = get(raw, '__raw', false) || get(raw, '__pack', false);
    const isLog = Boolean(get(raw, '__log') == null ? config.log : get(raw, '__log'));
    const status = info.status || get(raw, '__status', null);
    let isJson;
    let wrap;
    let data;
    if (typeof get(raw, '__raw') !== 'undefined') {
      wrap = false;
      isJson = false;
      data = raw.__raw;
    } else {
      wrap = !get(raw, '__pack', false);
      isJson = true;
      if (isPlainObject(raw)) {
        data = omit(raw, ['__pack', '__raw', '__log', '__status']);
      } else {
        data = raw;
      }
    }
    let result;
    if (wrap) {
      result = {
        code: info.code,
        message: info.message,
        data,
      };
    } else {
      result = data;
    }
    if (status) {
      res.status(status);
    }
    if (wrap && config.debug) {
      if (info.err) {
        result.err = info.err;
      }
      if (info.debug) {
        result.debug = info.debug;
      }
      if (info.stack) {
        result.stack = info.stack;
      }
    }
    if (isLog) {
      ctx.log.trace('>>>>>>');
      console.log(isJson ? JSON.stringify(result, null, 2) : result); // eslint-disable-line no-console
      ctx.log.trace('<<<<<<');
    }
    return isJson ? res.json(result) : res.send(result);
  };
