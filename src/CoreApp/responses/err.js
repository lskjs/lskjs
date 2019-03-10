
export default ctx => function (pack) {
  const {
    code,
    message,
    status,
    err,
    ...debug
  } = pack;

  console.log('errORORORO', message, pack.message, pack);


  const res = {};
  if (!message) {
    if (typeof err === 'string') {
      res.message = err;
    } else {
      res.message = 'The error';
    }
  }
  if (!res.code) res.code = 1;
  if (!status || !(status >= 400 && status <= 600)) {
    res.status = 500;
  }
  if (debug && Object.keys(debug).length) {
    res.debug = debug;
  }
  if (err) {
    res.err = err;
  }
  if (__DEV__ && pack.stack) {
    res.stack = pack.stack;
  }
  if (__DEV__ && err && err.stack) {
    res.stack = err.stack;
  }
  if (res.stack) {
    const stack = res.stack.toString();
    res.stack = stack.split('\n').map(s => s.trim());
  }

  return this.pack(null, { code, message, status, ...res });
};

