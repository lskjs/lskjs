import { isDev } from '@lskjs/utils/env';
import stringify from 'fast-safe-stringify';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import omit from 'lodash/omit';

export default (ctx) =>
  async function pack(raw = {}, info) {
    const { req } = this;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const res = this;
    const config =
      get(ctx, 'config.server.response') || get(ctx, 'config.response') || isDev ? { log: false, debug: true } : {};
    const status = info.status || get(raw, '__status', null);
    let isJson;
    let resultWrap;
    let data;
    if (typeof get(raw, '__raw') !== 'undefined') {
      resultWrap = false;
      isJson = false;
      data = raw.__raw;
    } else {
      resultWrap = !get(raw, '__pack', false);
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
    if (!data) data = {};
    const code = resultWrap ? info.code : data.code;
    let message = resultWrap ? info.message : data.message;
    if (message === code) message = undefined;
    if (code && !message) {
      const { i18 } = req;
      message = i18 && i18.exists(`errors.${code}`) ? i18.t(`errors.${code}`) : code;
    }
    let result;
    let resultType;
    if (resultWrap) {
      resultType = 'object';
      result = {
        code,
        message,
        data,
      };
    } else if (typeof data === 'string') {
      resultType = 'string';
      result = data;
      // TODO: other types
    } else {
      resultType = 'object';
      result = {
        ...data,
        code,
        message,
      };
    }

    if (status) {
      res.status(status);
    }

    if (resultWrap && config.debug) {
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
            ctx.log.trace(`>>>>> #${this.req.reqId} ${filename} [${str.length} bytes] ${isDev ? '[IGNORE]' : ''}`);
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
      log(stringify(result, null, 2), 'json');
    } catch (e) {
      // ignore
    }

    if (!res.get('Content-Type')) {
      res.set('Content-Type', 'application/json');
    }
    if (resultType === 'string') return res.send(result);
    return res.send(stringify(result, null, isDev ? 2 : 0));
  };
