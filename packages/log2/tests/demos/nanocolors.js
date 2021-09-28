/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const nanocolors = require('nanocolors');

const colors = [null, 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];
const bgColors = [null, 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];
const mods = [null, 'dim', 'bold'];
const mods2 = ['dim', 'bold', 'hidden', 'italic', 'underline', 'strikethrough', 'reset'];

console.log('nano colors');

for (const bgColor of bgColors) {
  for (const color of colors) {
    for (const mod of mods) {
      const text = [mod, bgColor || 'null', color || 'null'].filter(Boolean).join(' ');
      let res = `[${text}]`;
      if (color) res = nanocolors[color](res);
      if (bgColor) res = nanocolors[bgColor](res);
      if (mod) res = nanocolors[mod](res);
      console.log(`${res} - ${text}`);
    }
  }
  console.log();
}
console.log();
for (const mod of mods2) {
  const text = mod;
  let res = `[${text}]`;
  if (mod) res = nanocolors[mod](res);
  console.log(`${res} - ${text}`);
}
