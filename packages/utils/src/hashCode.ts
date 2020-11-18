/* eslint-disable no-bitwise */
export default (s: string | number): number => {
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
