#!/usr/bin/env node

const split = require('split');
const through = require('through');
const { Logger } = require('../Logger');
const { tryJSONparse } = require('../utils/tryJSONparse');

const log = new Logger();

const { stdin } = process;
// stdin.resume();
// stdin.setEncoding('utf8');
// stdin.on('data', (chunk) => {
//   console.log({ chunk });
// });

// /**
//  * Parses the given log line and either emits it right away (for invalid
//  * records) or enqueues it for emitting later when it's the next line to show.
//  */
// function handleLogLine(file, line, opts, stylize) {
//   console.log({ line });
//   // if (exiting) {
//   //     _selfTrace('warn: handleLogLine called while exiting');
//   //     return;
//   // }

//   // currLine = line; // intentionally global

//   // // Emit non-JSON lines immediately.
//   // var rec;
//   // if (!line) {
//   //     if (!opts.strict) emit(line + '\n');
//   //     return;
//   // } else if (line[0] !== '{') {
//   //     if (!opts.strict) emit(line + '\n');  // not JSON
//   //     return;
//   // } else {
//   //     try {
//   //         rec = JSON.parse(line);
//   //     } catch (e) {
//   //         if (!opts.strict) emit(line + '\n');
//   //         return;
//   //     }
//   // }

//   // if (!isValidRecord(rec)) {
//   //     if (!opts.strict) emit(line + '\n');
//   //     return;
//   // }

//   // if (!filterRecord(rec, opts))
//   //     return;

//   // if (file === null)
//   //     return emitRecord(rec, line, opts, stylize);

//   // return gotRecord(file, line, rec, opts, stylize);
// }

// /**
//  * Process all input from stdin.
//  *
//  * @params opts {Object} Bunyan options object.
//  * @param stylize {Function} Output stylize function to use.
//  * @param callback {Function} `function ()`
//  */
// function processStdin(opts, stylize, callback) {
//   let leftover = ''; // Left-over partial line from last chunk.
//   const { stdin } = process;
//   stdin.resume();
//   stdin.setEncoding('utf8');
//   stdin.on('data', (chunk) => {
//     const lines = chunk.split(/\r\n|\n/);
//     let { length } = lines;
//     if (length === 1) {
//       leftover += lines[0];
//       return;
//     }

//     if (length > 1) {
//       handleLogLine(null, leftover + lines[0], opts, stylize);
//     }
//     leftover = lines.pop();
//     length -= 1;
//     for (let i = 1; i < length; i++) {
//       handleLogLine(null, lines[i], opts, stylize);
//     }
//   });
//   stdin.on('end', () => {
//     if (leftover) {
//       handleLogLine(null, leftover, opts, stylize);
//       leftover = '';
//     }
//     callback();
//   });
// }

// processStdin({}, {}, () => {
//   console.log(123123)
// });

// // // log.__logger(...args: any[])
// // console.log('=====================');

// // process.on('beforeExit', (code) => {
// //   console.log('Process beforeExit event with code: ', code);
// // });

// // process.on('exit', (code) => {
// //   console.log('Process exit event with code: ', code);
// // });

// // process.on('warning', (warning) => {
// //   console.warn(warning.name); // Print the warning name
// //   console.warn(warning.message); // Print the warning message
// //   console.warn(warning.stack); // Print the stack trace
// // });

// // process.on('SIGINT', () => {
// //   console.log('Received SIGINT');
// // });
// // process.on('SIGTERM', () => {
// //   console.log('Received SIGTERM');
// // });
// // // process.on('SIGKILL', () => {
// // //   console.log('Received SIGKILL');
// // // });
// // process.on('SIGPIPE', () => {
// //   console.log('Received SIGPIPE');
// // });

// // process.stdin.on('data', (data) => {
// //   console.log({ data });
// // });

// // process.stdin.pipe(split()).pipe(
// //   through(function (raw) {
// //     console.log('pipe', { raw });
// //     this.emit('data', `${raw}\n`);
// //   }),
// // );

// // // process.stdin.on('readable', () => {
// // //   let chunk: string | Buffer;
// // //   while ((chunk = process.stdin.read()) !== null) {
// // //     // do something
// // //     process.stdout.write(chunk);
// // //   }
// // // });

process.stdin
  .pipe(split())
  .pipe(
    through(function (raw) {
      if (!raw) {
        this.emit('data', `${raw}\n`);
        return;
      }
      // console.log('raw', { raw });
      // this.emit('data', `${raw.toUpperCase()}\n`);

      // console.log(line.toUpperCase());
      const data = tryJSONparse(raw);
      if (data) {
        log.prettyLog(data);
        // console.log('======');
        // console.log({ data });
        // console.log('======');
      } else {
        log.log(raw);
      }
      // this.emit('data', `${raw.toUpperCase()}\n`);
    }),
  )
  .pipe(process.stdout);
