import get from 'lodash/get';
import omit from 'lodash/omit';

export default (ctx) =>
  function pack(data = {}, info) {
    const res = this;
    const config = get(ctx, 'config.response', __DEV__ ? { log: true, debug: true } : {});
    let json = {
      code: info.code,
      message: info.message,
    };

    const dataData = omit(data, ['__pack', '__raw', '__log', '__status']);
    if (get(data, '__pack')) {
      json = { ...json, ...dataData };
    } else {
      json.data = dataData;
    }

    const status = info.status || get(data, '__status');
    if (status) {
      res.status(status);
    }
    const isLog = config.log || get(data, '__log');
    const log = (str, type) => {
      if (!isLog) return;
      let dest = isLog;
      if (isLog === true) dest = str && str.length > 100 ? 'file' : 'console';

      if (dest === 'file') {
        const filename = `/tmp/res_${new Date().toISOString().replace(/[^a-zA-Z0-9]+/gi, '_')}.${type}`;
        ctx.log.trace(`>>>>> #${this.req.reqId} ${filename} [${str.length} bytes] ${__DEV__ ? '[IGNORE]' : ''}`);
        if (__DEV__) {
          try {
            require('fs').writeFileSync(filename, str);
          } catch (e) {}
        }
        return;
      }
      ctx.log.trace('>>>>>');
      console.log(str); // eslint-disable-line no-console
      ctx.log.trace('<<<<<');
    };

    if (!data) {
      log(null, null);
      return res.json(null);
    }
    if (get(data, '__raw')) {
      log(get(data, '__raw'), 'string');
      return res.send(get(data, '__raw'));
    }
    if (!get(data, '__pack')) {
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
    log(JSON.stringify(json, null, 2), 'json');
    return res.json(json);
  };
