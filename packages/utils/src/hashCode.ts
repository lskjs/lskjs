/* eslint-disable no-bitwise */
export const hashCode = (s: string | number): number => {
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

export default hashCode;