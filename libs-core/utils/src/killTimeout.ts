export default () => {
  if (typeof process === 'undefined') return;
  let timeout;
  if (process && process.env.KILLTIMEOUT) {
    timeout = +process.env.KILLTIMEOUT || 0;
  }
  if (timeout) {
    timeout *= 0.9 + Math.random() * 0.2;
  }
  if (timeout) {
    const code = 1;
    // eslint-disable-next-line no-console
    console.log(`process will be exited with code ${code} in ${timeout / 1000} seconds`);
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(`process.exit(${code})`);
      process.exit(code);
    }, timeout);
  }
};
