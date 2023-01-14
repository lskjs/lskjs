export const isTTY =
  // @ts-ignore
  typeof window === 'undefined' ? require('tty').isatty(1) : false;

export default isTTY;
