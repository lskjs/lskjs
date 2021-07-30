import { isDev } from '@lskjs/utils/env';
import stringify from 'fast-safe-stringify';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import omit from 'lodash/omit';

export default (webserver) =>
  function pack(raw = {}, info) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const res = this;
    const config = get(webserver, 'config.server.response', isDev ? { log: false, debug: true } : {});
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
        if (isDev) {
          const dir = `/tmp/lsk`;
          try {
            require('fs').mkdirSync(dir, { recursive: true });
          } catch (e) {
            // ignore
          }
          try {
            const filename = `${dir}/res_${new Date().toISOString().replace(/[^a-zA-Z0-9]+/gi, '_')}.${type}`;
            webserver.log.trace(
              `>>>>> #${this.req.reqId} ${filename} [${str.length} bytes] ${isDev ? '[IGNORE]' : ''}`,
            );
            require('fs').writeFileSync(filename, str);
          } catch (e) {
            // ignore
          }
        }
        return;
      }
      // else
      webserver.log.trace('>>>>>');
      console.log(str); // eslint-disable-line no-console
      webserver.log.trace('<<<<<');
    };

    if (!isJson) {
      log(result, 'txt');
      return res.send(result);
    }
    try {
      log(stringify(result, null, 2), 'json');
    } catch (e) {
      // ignore
    }

    if (!res.get('Content-Type')) {
      res.set('Content-Type', 'application/json');
    }
    return res.send(stringify(result, null, isDev ? 2 : 0));
  };
