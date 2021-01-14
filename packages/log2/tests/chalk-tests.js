/* eslint-disable no-console */
import chalk from 'chalk';

const ctx = new chalk.Instance({ level: 0 });

/* eslint-disable */
let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env);
	isTTY = process.stdout && process.stdout.isTTY;
}

export const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	)
}

function init(x, y) {
	let rgx = new RegExp(`\\x1b\\[${y}m`, 'g');
	let open = `\x1b[${x}m`, close = `\x1b[${y}m`;

	return function (txt) {
		if (!$.enabled || txt == null) return txt;
		return open + ((''+txt).includes(close) ? txt.replace(rgx, close + open) : txt) + close;
	};
}
/* eslint-enabled */
const debugColors = [
	20,	21,	26,	27,	32,	33,	38,	39,	40,	41,	42,	43,	44,	45,	56,	57,	62,	63,	68,	69,	74,	75,	76,	77,	78,	79,	80,	81,	92,	93,	98,	99,	112,	113,	128,	129,	134,	135,	148,	149,	160,	161,	162,	163,	164,	165,	166,	167,	168,	169,	170,	171,	172,	173,	178,	179,	184,	185,	196,	197,	198,	199,	200,	201,	202,	203,	204,	205,	206,	207,	208,	209,	214,	215,	220,	221
];

// const debugLength = debugColors

for (let bg = 0; bg < 2; bg++) {
	for (let bold = 0; bold < 2; bold++) {
		let row = ''
		for (let i = 0; i < 256; i++) {
			const color = debugColors[i] || 0;
			// if ( color % 10 !== 9) continue ;
			const str = ` [Test ${color}${bold ? ' bold' : ''}${bg ? ' BG' : ''}] `
			let log = chalk;
			if (bold) {
				log = log.bold;
			}
			if (bg) {
				log = log.bgAnsi(color);
			} else {
				log = log.ansi(color);
			}
			row += log(str)
		}
		console.log(row)
	}
}
// for (let code = 0; code < 256; code++) {
//   const color = init()
//   console.log('code ' + code)
// }
// 
// console.log(chalk.bold.rgb(10, 100, 200)('Hello!'));
// 
// const colors = require('colors/safe');

// console.log(colors.bold(colors.black('black')));
// console.log(colors.bold(colors.red('red')));
// console.log(colors.bold(colors.green('green')));
// console.log(colors.bold(colors.yellow('yellow')));
// console.log(colors.bold(colors.blue('blue')));
// console.log(colors.bold(colors.magenta('magenta')));
// console.log(colors.bold(colors.cyan('cyan')));
// console.log(colors.bold(colors.white('white')));
// console.log(colors.bold(colors.gray('gray')));
// console.log(colors.bold(colors.grey('grey')));

// console.log(colors.bold(colors.brightRed('brightRed')));
// console.log(colors.bold(colors.brightGreen('brightGreen')));
// console.log(colors.bold(colors.brightYellow('brightYellow')));
// console.log(colors.bold(colors.brightBlue('brightBlue')));
// console.log(colors.bold(colors.brightMagenta('brightMagenta')));
// console.log(colors.bold(colors.brightCyan('brightCyan')));
// console.log(colors.bold(colors.brightWhite('brightWhite')));

// console.log(colors.black('black'));
// console.log(colors.red('red'));
// console.log(colors.green('green'));
// console.log(colors.yellow('yellow'));
// console.log(colors.blue('blue'));
// console.log(colors.magenta('magenta'));
// console.log(colors.cyan('cyan'));
// console.log(colors.white('white'));
// console.log(colors.gray('gray'));
// console.log(colors.grey('grey'));

// console.log(colors.brightRed('brightRed'));
// console.log(colors.brightGreen('brightGreen'));
// console.log(colors.brightYellow('brightYellow'));
// console.log(colors.brightBlue('brightBlue'));
// console.log(colors.brightMagenta('brightMagenta'));
// console.log(colors.brightCyan('brightCyan'));
// console.log(colors.brightWhite('brightWhite'));

// console.log(colors.bgBlack('bgBlack'));
// console.log(colors.bgRed('bgRed'));
// console.log(colors.bgGreen('bgGreen'));
// console.log(colors.bgYellow('bgYellow'));
// console.log(colors.bgBlue('bgBlue'));
// console.log(colors.bgMagenta('bgMagenta'));
// console.log(colors.bgCyan('bgCyan'));
// console.log(colors.bgWhite('bgWhite'));
// console.log(colors.bgGray('bgGray'));
// console.log(colors.bgGrey('bgGrey'));

// console.log(colors.bgBrightRed('bgBrightRed'));
// console.log(colors.bgBrightGreen('bgBrightGreen'));
// console.log(colors.bgBrightYellow('bgBrightYellow'));
// console.log(colors.bgBrightBlue('bgBrightBlue'));
// console.log(colors.bgBrightMagenta('bgBrightMagenta'));
// console.log(colors.bgBrightCyan('bgBrightCyan'));
// console.log(colors.bgBrightWhite('bgBrightWhite'));

// console.log(colors.reset('reset'));
// console.log(colors.bold('bold'));
// console.log(colors.dim('dim'));
// console.log(colors.italic('italic'));
// console.log(colors.underline('underline'));
// console.log(colors.inverse('inverse'));
// console.log(colors.hidden('hidden'));
// console.log(colors.strikethrough('strikethrough'));

// console.log(colors.rainbow('rainbow'));
// console.log(colors.zebra('zebra'));
// console.log(colors.america('america'));
// console.log(colors.trap('trap'));
// console.log(colors.random('random'));
