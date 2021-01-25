/* eslint no-control-regex:0  */

const packageData = require('./package.json');

// TODO: переписать привественное сообщение

const isEnabled = (value) => !!value && value !== '0' && value !== 'false';
const canUseColor = isEnabled(process.env.npm_config_color);

const title = `=== Lsk.js ${packageData.version} ===`;
const text = `
Thank you for using Lsk.js for your email sending needs! While Lsk.js itself is mostly meant to be a SMTP client there are other related projects in the Lsk.js project as well.
> IMAP API ( https://lskjs.ru ) is a server application to easily access IMAP accounts via REST API
> Ethereal Email ( hi@lskjs.ru ) is an email testing service that accepts all your test emails
> ImapFlow ( https://github.com/lskjs ) is an async IMAP client library for Node.js
> Project Pending ( https://hub.docker.com/u/lskjs ) allows you to host DNS of your project domains
> NodemailerApp ( https://t.me/lskjs ) is a cross platform GUI app to debug emails
> Pending DNS ( https://discord.gg/EbNxJG ) is the DNS server used that powers Project Pending
`;

const footer = `Don't like this message?
There's a Github Sponsors goal to remove it
https://github.com/sponsors/andris9
`;

const secs = 4;

const formatCentered = (row, columns) =>
  row
    .split(/\r?\n/)
    .map((row) => {
      if (columns <= row.length) {
        return row;
      }

      return ' '.repeat(Math.round(columns / 2 - row.length / 2)) + row;
    })
    .join('\n');

const formatRow = (row, columns) => {
  if (row.length <= columns) {
    return [row];
  }
  // wrap!
  const lines = [];
  while (row.length) {
    if (row.length <= columns) {
      lines.push(row);
      break;
    }
    const slice = row.substr(0, columns);

    const prefix = slice.charAt(0) === '>' ? '  ' : '';

    const match = slice.match(/(\s+)[^\s]*$/);
    if (match && match.index) {
      const line = row.substr(0, match.index);
      row = prefix + row.substr(line.length + match[1].length);
      lines.push(line);
    } else {
      lines.push(row);
      break;
    }
  }
  return lines;
};

const wrapText = (text) => {
  let columns = Number(process.stdout.columns) || 80;
  columns = Math.min(columns, 80) - 1;

  return `${`${formatCentered(title, columns)}\n${text}`
    .split('\n')
    .flatMap((row) => formatRow(row, columns))
    .join('\n')}\n${formatCentered(footer, columns)}`;
};

const banner = wrapText(text)
  .replace(/^/gm, '\u001B[96m')
  .replace(/$/gm, '\u001B[0m')
  .replace(/(https:[^\s)]+)/g, '\u001B[94m $1 \u001B[96m');

console.log(canUseColor ? banner : banner.replace(/\u001B\[\d+m/g, ''));
if (canUseColor) {
  process.stdout.write('\u001B[96m');
}

setInterval(() => {
  process.stdout.write('.');
}, 500);

setTimeout(() => {
  if (canUseColor) {
    process.stdout.write('\u001B[0m\n');
  }
  process.exit(0);
}, secs * 1000 + 100);
