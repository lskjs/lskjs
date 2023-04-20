export const isTTY = Boolean(process?.stdout?.isTTY) || false

export default isTTY;
