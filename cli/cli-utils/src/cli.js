const { argv } = require('yargs/yargs')(process.argv.slice(2)).completion(
  'completion',
  (current, argv2, completionFilter, done) => {
    // if 'apple' present return default completions
    if (argv2._.includes('apple')) {
      completionFilter();
    } else {
      completionFilter((err, defaultCompletions) => {
        const filteredCompletions = defaultCompletions.filter(
          (completion) => !completion.includes('banana'),
        );
        // else return default completions w/o 'banana'
        done(filteredCompletions);
      });
    }
  },
);

console.log(argv);

// const yargs = require('yargs/yargs')(process.argv.slice(2));

// yargs
//   .command('get', 'make a get HTTP request', {
//     url: {
//       alias: 'u',
//       default: 'http://yargs.js.org/',
//     },
//   })
//   .completion('completion', function(current, argv) {
//     // 'current' is the current command being completed.
//     // 'argv' is the parsed arguments so far.
//     // simply return an array of completions.
//     return [
//       'foo',
//       'bar'
//     ];
//   })
//   .help().argv;
// // a fairly complex CLI defined using the yargs 3.0 API:
// const { argv } = require('yargs/yargs')(process.argv.slice(2))
//   .usage('Usage: $0 <cmd> [options]') // usage string of application.
//   .command('install', 'install a package (name@version)') // describe commands available.
//   .command(
//     'publish',
//     'publish the package inside the current working directory'
//   )
//   .option('f', {
//     // document options.
//     array: true, // even single values will be wrapped in [].
//     description: 'an array of files',
//     default: 'test.js',
//     alias: 'file',
//   })
//   .alias('f', 'fil')
//   .option('h', {
//     alias: 'help',
//     description: 'display help message',
//   })
//   .string(['user', 'pass'])
//   .implies('user', 'pass') // if 'user' is set 'pass' must be set.
//   .help('help')
//   .demand('q') // fail if 'q' not provided.
//   .version('1.0.1', 'version', 'display version information') // the version string.
//   .alias('version', 'v')
//   // show examples of application in action.
//   .example('npm install npm@latest -g', 'install the latest version of npm')
//   // final message to display when successful.
//   .epilog('for more information visit https://github.com/chevex/yargs')
//   // disable showing help on failures, provide a final message
//   // to display for errors.
//   .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
//   .help();

// // the parsed data is stored in argv.
// console.log(argv);

// // const { argv } = require('yargs/yargs')(process.argv.slice(2)).command(
// //   'math',
// //   'math description',
// //   (yargs) =>
// //     yargs
// //       .command(
// //         'add <a> <b>',
// //         'add description',
// //         (yargs) =>
// //           yargs
// //             .positional('a', {
// //               describe: 'addend "a"',
// //               type: 'number',
// //               default: 0,
// //             })
// //             .positional('b', {
// //               describe: 'addend "b"',
// //               type: 'number',
// //               default: 0,
// //             }),
// //         (argv) => {
// //           const { a, b } = argv;
// //           console.log(`${a} + ${b} = ${a + b}`);
// //         }
// //       )
// //       .command(
// //         'sum <numbers..>',
// //         'sum description',
// //         (yargs) =>
// //           yargs
// //             .positional('numbers', {
// //               describe: 'numbers to sum',
// //               type: 'array',
// //               default: [],
// //             })
// //             .check((argv) =>
// //               isArrayOfNumbers(argv.numbers)
// //                 ? true
// //                 : 'Positional argument "numbers" must only contain numbers'
// //             ),
// //         (argv) => {
// //           const sum = argv.numbers.reduce((a, b) => a + b, 0);
// //           console.log(`The sum of numbers is ${sum}`);
// //         }
// //       )
// // );

// // console.log({argv});

// // function isArrayOfNumbers(arr) {
// //   return Array.isArray(arr) && arr.every((n) => typeof n === 'number');
// // }

// // // NOTE: ".argv" and ".parse()" should only be used at top level, not inside builder functions.
