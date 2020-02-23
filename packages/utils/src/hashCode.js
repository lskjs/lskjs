/* eslint-disable no-bitwise */
export default (...args) => {
  const s = args.length > 0 && args[0] !== undefined ? args[0] : '';
  if (typeof s === 'number') return s;
  return Math.abs(
    String(s)
      .split('')
      .reduce((a, b) => {
        const c = (a << 5) - a + b.charCodeAt(0);
        return c & c;
      }, 0) - 48,
  );
};
