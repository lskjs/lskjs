export async function waitFn(fn: () => Promise<any>, interval = 10, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    // eslint-disable-next-line consistent-return
    const intervalId = setInterval(async () => {
      if (Date.now() - startedAt > timeout) {
        clearInterval(intervalId);
        return reject(new Error('Timeout'));
      }
      const value = await fn();
      if (value) {
        clearInterval(intervalId);
        return resolve(value);
      }
    }, interval);
  });
}
