import { isDev } from '@lskjs/env';

export default () =>
  function resErr(pack) {
    // eslint-disable-next-line no-param-reassign
    if (typeof pack === 'string') pack = { message: pack };
    const { code, message, status, err, data = null, ...debug } = pack;

    // console.log('errORORORO', message, pack.message, pack);

    const res = {};
    if (!message) {
      if (typeof err === 'string') {
        res.message = err;
      } else {
        res.message = 'The error';
      }
    }
    if (!status || !(status >= 400 && status <= 600)) {
      res.status = 500;
    }
    if (!code) res.code = `status${res.status}`;
    if (debug && Object.keys(debug).length) {
      res.debug = debug;
    }
    if (err) {
      res.err = err;
    }
    if (isDev && pack.stack) {
      res.stack = pack.stack;
    }
    if (isDev && err && err.stack) {
      res.stack = err.stack;
    }
    if (res.stack) {
      const stack = res.stack.toString();
      res.stack = stack.split('\n').map((s) => s.trim());
    }

    return this.pack(data, { code, message, status, ...res });
  };
