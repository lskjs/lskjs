import omit from 'lodash/omit';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';

export default ctx =>
  function pack(raw = {}, info) {
    const res = this;
    const config = get(ctx, 'config.server.response', __DEV__ ? { log: false, debug: true } : {});
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
      } else if (raw instanceof Error) {
        throw raw;
      } else if (isFunction(raw)) {
        data = {};
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

    const isLog = Boolean(get(data, '__log') == null ? config.log : get(data, '__log'));
    const log = (str, type) => {
      if (!isLog) return;
      let dest = isLog;
      if (isLog === true) dest = str && str.length > 100 ? 'file' : 'console';

      if (dest === 'file') {
        if (__DEV__) {
          const dir = `/tmp/lsk`;
          try {
            require('fs').mkdirSync(dir, { recursive: true });
          } catch (e) {
            // ignore
          }
          try {
            const filename = `${dir}/res_${new Date().toISOString().replace(/[^a-zA-Z0-9]+/gi, '_')}.${type}`;
            ctx.log.trace(`>>>>> #${this.req.reqId} ${filename} [${str.length} bytes] ${__DEV__ ? '[IGNORE]' : ''}`);
            require('fs').writeFileSync(filename, str);
          } catch (e) {
            // ignore
          }
        }
        return;
      }
      // else
      ctx.log.trace('>>>>>');
      console.log(str); // eslint-disable-line no-console
      ctx.log.trace('<<<<<');
    };

    if (!isJson) {
      log(result, 'txt');
      return res.send(result);
    }
    try {
      log(JSON.stringify(result, null, 2), 'json');
    } catch (e) {
      // ignore
    }
    return res.json(result);
  };
