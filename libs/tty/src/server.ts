import tty from 'tty';

export const isTTY = tty.isatty(1);
export default isTTY;
