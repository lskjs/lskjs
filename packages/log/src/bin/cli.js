#!/usr/bin/env node

/* eslint-disable */

/**
 * Copyright 2016 Trent Mick. All rights reserved.
 * Copyright 2016 Joyent Inc. All rights reserved.
 *
 * bunyan -- filter and pretty-print Bunyan log files (line-delimited JSON)
 *
 * See <https://github.com/trentm/node-bunyan>.
 *
 * -*- mode: js -*-
 * vim: expandtab:ts=4:sw=4
 */
"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

var v033 = '\x1B'; // '\033';
var v0r = v033 + '[0m'; // '\033';

var VERSION = '1.8.1';
var p = console.log;

var util = require('util');

var pathlib = require('path');

var vm = require('vm');

var http = require('http');

var fs = require('fs');
var getMarker = require('@lskjs/utils/marker').default;

var warn = console.warn;

var child_process = require('child_process'),
    spawn = child_process.spawn,
    exec = child_process.exec,
    execFile = child_process.execFile;

var assert = require('assert');

var moment = null; // try {
//     var moment = require('moment');
// } catch (e) {
//     moment = null;
// }
//---- globals and constants

var nodeVer = process.versions.node.split('.').map(Number);
var nodeSpawnSupportsStdio = nodeVer[0] > 0 || nodeVer[1] >= 8; // Internal debug logging via `console.warn`.

var _DEBUG = false; // Output modes.

var OM_LONG = 1;
var OM_JSON = 2;
var OM_INSPECT = 3;
var OM_SIMPLE = 4;
var OM_SHORT = 5;
var OM_BUNYAN = 6;
var OM_FROM_NAME = {
  'long': OM_LONG,
  'paul': OM_LONG,

  /* backward compat */
  'json': OM_JSON,
  'inspect': OM_INSPECT,
  'simple': OM_SIMPLE,
  'short': OM_SHORT,
  'bunyan': OM_BUNYAN
}; // Levels

var TRACE = 10;
var DEBUG = 20;
var INFO = 30;
var WARN = 40;
var ERROR = 50;
var FATAL = 60;
var levelFromName = {
  'trace': TRACE,
  'debug': DEBUG,
  'info': INFO,
  'warn': WARN,
  'error': ERROR,
  'fatal': FATAL
};
var nameFromLevel = {};
var upperNameFromLevel = {};
var upperPaddedNameFromLevel = {};
Object.keys(levelFromName).forEach(function (name) {
  var lvl = levelFromName[name];
  nameFromLevel[lvl] = name;
  upperNameFromLevel[lvl] = name.toUpperCase();
  upperPaddedNameFromLevel[lvl] = '[' + name[0] + ']'; // upperPaddedNameFromLevel[lvl] = (
  //     name.length === 4 ? ' ' : '') + name.toUpperCase();
}); // Display time formats.

var TIME_UTC = 1; // the default, bunyan's native format

var TIME_LOCAL = 2; // Timezone formats: output format -> momentjs format string

var TIMEZONE_UTC_FORMATS = {
  "long": '[[]YYYY-MM-DD[T]HH:mm:ss.SSS[Z][]]',
  "short": 'HH:mm:ss.SSS[Z]'
};
var TIMEZONE_LOCAL_FORMATS = {
  "long": '[[]YYYY-MM-DD[T]HH:mm:ss.SSSZ[]]',
  "short": 'HH:mm:ss.SSS'
}; // The current raw input line being processed. Used for `uncaughtException`.

var currLine = null; // Child dtrace process, if any. Used for signal-handling.

var child = null; // Whether ANSI codes are being used. Used for signal-handling.

var usingAnsiCodes = false; // Used to tell the 'uncaughtException' handler that '-c CODE' is being used.

var gUsingConditionOpts = false; // Pager child process, and output stream to which to write.

var pager = null;
var stdout = process.stdout; // Whether we are reading from stdin.

var readingStdin = false; //---- support functions

function getVersion() {
  return VERSION;
}

var format = util.format;

if (!format) {
  /* BEGIN JSSTYLED */
  // If not node 0.6, then use its `util.format`:
  // <https://github.com/joyent/node/blob/master/lib/util.js#L22>:
  var inspect = util.inspect;
  var formatRegExp = /%[sdj%]/g;

  format = function format(f) {
    if (typeof f !== 'string') {
      var objects = [];

      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }

      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x) {
      if (i >= len) return x;

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          return JSON.stringify(args[i++]);

        case '%%':
          return '%';

        default:
          return x;
      }
    });

    for (var x = args[i]; i < len; x = args[++i]) {
      if (x === null || (0, _typeof2["default"])(x) !== 'object') {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }

    return str;
  };
  /* END JSSTYLED */

}

function indent(s) {
  return '   ' + s.split(/\r?\n/).join('\n' + v033 + "[37m" +  ' - ' + v0r);
}

function objCopy(obj) {
  if (obj === null) {
    return null;
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    var copy = {};
    Object.keys(obj).forEach(function (k) {
      copy[k] = obj[k];
    });
    return copy;
  }
}

function printHelp() {
  /* BEGIN JSSTYLED */
  p('Usage:');
  p('  bunyan [OPTIONS] [FILE ...]');
  p('  ... | bunyan [OPTIONS]');
  p('  bunyan [OPTIONS] -p PID');
  p('');
  p('Filter and pretty-print Bunyan log file content.');
  p('');
  p('General options:');
  p('  -h, --help    print this help info and exit');
  p('  --version     print version of this command and exit');
  p('');
  p('Runtime log snooping (via DTrace, only on supported platforms):');
  p('  -p PID        Process bunyan:log-* probes from the process');
  p('                with the given PID. Can be used multiple times,');
  p('                or specify all processes with "*", or a set of');
  p('                processes whose command & args match a pattern');
  p('                with "-p NAME".');
  p('');
  p('Filtering options:');
  p('  -l, --level LEVEL');
  p('                Only show messages at or above the specified level.');
  p('                You can specify level *names* or the internal numeric');
  p('                values.');
  p('  -c, --condition CONDITION');
  p('                Run each log message through the condition and');
  p('                only show those that return truish. E.g.:');
  p('                    -c \'this.pid == 123\'');
  p('                    -c \'this.level == DEBUG\'');
  p('                    -c \'this.msg.indexOf("boom") != -1\'');
  p('                "CONDITION" must be legal JS code. `this` holds');
  p('                the log record. The TRACE, DEBUG, ... FATAL values');
  p('                are defined to help with comparing `this.level`.');
  p('  --strict      Suppress all but legal Bunyan JSON log lines. By default');
  p('                non-JSON, and non-Bunyan lines are passed through.');
  p('');
  p('Output options:');
  p('  --pager       Pipe output into `less` (or $PAGER if set), if');
  p('                stdout is a TTY. This overrides $BUNYAN_NO_PAGER.');
  p('                Note: Paging is only supported on node >=0.8.');
  p('  --no-pager    Do not pipe output into a pager.');
  p('  --color       Colorize output. Defaults to try if output');
  p('                stream is a TTY.');
  p('  --no-color    Force no coloring (e.g. terminal doesn\'t support it)');
  p('  -o, --output MODE');
  p('                Specify an output mode/format. One of');
  p('                  long: (the default) pretty');
  p('                  json: JSON output, 2-space indent');
  p('                  json-N: JSON output, N-space indent, e.g. "json-4"');
  p('                  bunyan: 0 indented JSON, bunyan\'s native format');
  p('                  inspect: node.js `util.inspect` output');
  p('                  short: like "long", but more concise');
  p('  -j            shortcut for `-o json`');
  p('  -0            shortcut for `-o bunyan`');
  p('  -L, --time local');
  p('                Display time field in local time, rather than UTC.');
  p('');
  p('Environment Variables:');
  p('  BUNYAN_NO_COLOR    Set to a non-empty value to force no output ');
  p('                     coloring. See "--no-color".');
  p('  BUNYAN_NO_PAGER    Disable piping output to a pager. ');
  p('                     See "--no-pager".');
  p('');
  p('See <https://github.com/trentm/node-bunyan> for more complete docs.');
  p('Please report bugs to <https://github.com/trentm/node-bunyan/issues>.');
  /* END JSSTYLED */
}
/*
 * If the user specifies multiple input sources, we want to print out records
 * from all sources in a single, chronologically ordered stream.  To do this
 * efficiently, we first assume that all records within each source are ordered
 * already, so we need only keep track of the next record in each source and
 * the time of the last record emitted.  To avoid excess memory usage, we
 * pause() streams that are ahead of others.
 *
 * 'streams' is an object indexed by source name (file name) which specifies:
 *
 *    stream        Actual stream object, so that we can pause and resume it.
 *
 *    records       Array of log records we've read, but not yet emitted.  Each
 *                  record includes 'line' (the raw line), 'rec' (the JSON
 *                  record), and 'time' (the parsed time value).
 *
 *    done          Whether the stream has any more records to emit.
 */


var streams = {};

function hashCode(s = ''){
  return String(s).split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

function gotRecord(file, line, rec, opts, stylize) {
  var time = new Date(rec.time);
  streams[file]['records'].push({
    line: line,
    rec: rec,
    time: time
  });
  emitNextRecord(opts, stylize);
}

function filterRecord(rec, opts) {
  if (opts.level && rec.level < opts.level) {
    return false;
  }

  if (opts.condFuncs) {
    var recCopy = objCopy(rec);

    for (var i = 0; i < opts.condFuncs.length; i++) {
      var pass = opts.condFuncs[i].call(recCopy);
      if (!pass) return false;
    }
  } else if (opts.condVm) {
    for (var i = 0; i < opts.condVm.length; i++) {
      var pass = opts.condVm[i].runInNewContext(rec);
      if (!pass) return false;
    }
  }

  return true;
}

function emitNextRecord(opts, stylize) {
  var ofile, ready, minfile, rec;

  for (;;) {
    /*
     * Take a first pass through the input streams to see if we have a
     * record from all of them.  If not, we'll pause any streams for
     * which we do already have a record (to avoid consuming excess
     * memory) and then wait until we have records from the others
     * before emitting the next record.
     *
     * As part of the same pass, we look for the earliest record
     * we have not yet emitted.
     */
    minfile = undefined;
    ready = true;

    for (ofile in streams) {
      if (streams[ofile].stream === null || !streams[ofile].done && streams[ofile].records.length === 0) {
        ready = false;
        break;
      }

      if (streams[ofile].records.length > 0 && (minfile === undefined || streams[minfile].records[0].time > streams[ofile].records[0].time)) {
        minfile = ofile;
      }
    }

    if (!ready || minfile === undefined) {
      for (ofile in streams) {
        if (!streams[ofile].stream || streams[ofile].done) continue;

        if (streams[ofile].records.length > 0) {
          if (!streams[ofile].paused) {
            streams[ofile].paused = true;
            streams[ofile].stream.pause();
          }
        } else if (streams[ofile].paused) {
          streams[ofile].paused = false;
          streams[ofile].stream.resume();
        }
      }

      return;
    }
    /*
     * Emit the next record for 'minfile', and invoke ourselves again to
     * make sure we emit as many records as we can right now.
     */


    rec = streams[minfile].records.shift();
    emitRecord(rec.rec, rec.line, opts, stylize);
  }
}
/**
 * Return a function for the given JS code that returns.
 *
 * If no 'return' in the given javascript snippet, then assume we are a single
 * statement and wrap in 'return (...)'. This is for convenience for short
 * '-c ...' snippets.
 */


function funcWithReturnFromSnippet(js) {
  // auto-"return"
  if (js.indexOf('return') === -1) {
    if (js.substring(js.length - 1) === ';') {
      js = js.substring(0, js.length - 1);
    }

    js = 'return (' + js + ')';
  } // Expose level definitions to condition func context


  var varDefs = [];
  Object.keys(upperNameFromLevel).forEach(function (lvl) {
    varDefs.push(format('var %s = %d;', upperNameFromLevel[lvl], lvl));
  });
  varDefs = varDefs.join('\n') + '\n';
  return new Function(varDefs + js);
}
/**
 * Parse the command-line options and arguments into an object.
 *
 *    {
 *      'args': [...]       // arguments
 *      'help': true,       // true if '-h' option given
 *       // etc.
 *    }
 *
 * @return {Object} The parsed options. `.args` is the argument list.
 * @throws {Error} If there is an error parsing argv.
 */


function parseArgv(argv) {
  var parsed = {
    args: [],
    help: false,
    color: null,
    paginate: null,
    outputMode: OM_LONG,
    jsonIndent: 2,
    level: null,
    strict: false,
    pids: null,
    pidsType: null,
    timeFormat: TIME_UTC // one of the TIME_ constants

  }; // Turn '-iH' into '-i -H', except for argument-accepting options.

  var args = argv.slice(2); // drop ['node', 'scriptname']

  var newArgs = [];
  var optTakesArg = {
    'd': true,
    'o': true,
    'c': true,
    'l': true,
    'p': true
  };

  for (var i = 0; i < args.length; i++) {
    if (args[i].charAt(0) === '-' && args[i].charAt(1) !== '-' && args[i].length > 2) {
      var splitOpts = args[i].slice(1).split('');

      for (var j = 0; j < splitOpts.length; j++) {
        newArgs.push('-' + splitOpts[j]);

        if (optTakesArg[splitOpts[j]]) {
          var optArg = splitOpts.slice(j + 1).join('');

          if (optArg.length) {
            newArgs.push(optArg);
          }

          break;
        }
      }
    } else {
      newArgs.push(args[i]);
    }
  }

  args = newArgs; // Expose level definitions to condition vm context

  var condDefines = [];
  Object.keys(upperNameFromLevel).forEach(function (lvl) {
    condDefines.push(format('Object.prototype.%s = %s;', upperNameFromLevel[lvl], lvl));
  });
  condDefines = condDefines.join('\n') + '\n';
  var endOfOptions = false;

  while (args.length > 0) {
    var arg = args.shift();

    switch (arg) {
      case '--':
        endOfOptions = true;
        break;

      case '-h': // display help and exit

      case '--help':
        parsed.help = true;
        break;

      case '--version':
        parsed.version = true;
        break;

      case '--strict':
        parsed.strict = true;
        break;

      case '--color':
        parsed.color = true;
        break;

      case '--no-color':
        parsed.color = false;
        break;

      case '--pager':
        parsed.paginate = true;
        break;

      case '--no-pager':
        parsed.paginate = false;
        break;

      case '-o':
      case '--output':
        var name = args.shift();
        var idx = name.lastIndexOf('-');

        if (idx !== -1) {
          var indentation = Number(name.slice(idx + 1));

          if (!isNaN(indentation)) {
            parsed.jsonIndent = indentation;
            name = name.slice(0, idx);
          }
        }

        parsed.outputMode = OM_FROM_NAME[name];

        if (parsed.outputMode === undefined) {
          throw new Error('unknown output mode: "' + name + '"');
        }

        break;

      case '-j':
        // output with JSON.stringify
        parsed.outputMode = OM_JSON;
        break;

      case '-0':
        parsed.outputMode = OM_BUNYAN;
        break;

      case '-L':
        parsed.timeFormat = TIME_LOCAL;

        if (!moment) {
          throw new Error('could not find moment package required for "-L"');
        }

        break;

      case '--time':
        var timeArg = args.shift();

        switch (timeArg) {
          case 'utc':
            parsed.timeFormat = TIME_UTC;
            break;

          case 'local':
            parsed.timeFormat = TIME_LOCAL;

            if (!moment) {
              throw new Error('could not find moment package ' + 'required for "--time=local"');
            }

            break;

          case undefined:
            throw new Error('missing argument to "--time"');

          default:
            throw new Error(format('invalid time format: "%s"', timeArg));
        }

        break;

      case '-p':
        if (!parsed.pids) {
          parsed.pids = [];
        }

        var pidArg = args.shift();
        var pid = +pidArg;

        if (!isNaN(pid) || pidArg === '*') {
          if (parsed.pidsType && parsed.pidsType !== 'num') {
            throw new Error(format('cannot mix PID name and ' + 'number arguments: "%s"', pidArg));
          }

          parsed.pidsType = 'num';

          if (!parsed.pids) {
            parsed.pids = [];
          }

          parsed.pids.push(isNaN(pid) ? pidArg : pid);
        } else {
          if (parsed.pidsType && parsed.pidsType !== 'name') {
            throw new Error(format('cannot mix PID name and ' + 'number arguments: "%s"', pidArg));
          }

          parsed.pidsType = 'name';
          parsed.pids = pidArg;
        }

        break;

      case '-l':
      case '--level':
        var levelArg = args.shift();
        var level = +levelArg;

        if (isNaN(level)) {
          level = +levelFromName[levelArg.toLowerCase()];
        }

        if (isNaN(level)) {
          throw new Error('unknown level value: "' + levelArg + '"');
        }

        parsed.level = level;
        break;

      case '-c':
      case '--condition':
        gUsingConditionOpts = true;
        var condition = args.shift();

        if (Boolean(process.env.BUNYAN_EXEC && process.env.BUNYAN_EXEC === 'vm')) {
          parsed.condVm = parsed.condVm || [];
          var scriptName = 'bunyan-condition-' + parsed.condVm.length;
          var code = condDefines + condition;
          var script;

          try {
            script = vm.createScript(code, scriptName);
          } catch (complErr) {
            throw new Error(format('illegal CONDITION code: %s\n' + '  CONDITION script:\n' + '%s\n' + '  Error:\n' + '%s', complErr, indent(code), indent(complErr.stack)));
          } // Ensure this is a reasonably safe CONDITION.


          try {
            script.runInNewContext(minValidRecord);
          } catch (condErr) {
            throw new Error(format(
            /* JSSTYLED */
            'CONDITION code cannot safely filter a minimal Bunyan log record\n' + '  CONDITION script:\n' + '%s\n' + '  Minimal Bunyan log record:\n' + '%s\n' + '  Filter error:\n' + '%s', indent(code), indent(JSON.stringify(minValidRecord, null, 2)), indent(condErr.stack)));
          }

          parsed.condVm.push(script);
        } else {
          parsed.condFuncs = parsed.condFuncs || [];
          parsed.condFuncs.push(funcWithReturnFromSnippet(condition));
        }

        break;

      default:
        // arguments
        if (!endOfOptions && arg.length > 0 && arg[0] === '-') {
          throw new Error('unknown option "' + arg + '"');
        }

        parsed.args.push(arg);
        break;
    }
  } //TODO: '--' handling and error on a first arg that looks like an option.


  return parsed;
}

function isInteger(s) {
  return s.search(/^-?[0-9]+$/) == 0;
} // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
// Suggested colors (some are unreadable in common cases):
// - Good: cyan, yellow (limited use), bold, green, magenta, red
// - Bad: blue (not visible on cmd.exe), grey (same color as background on
//   Solarized Dark theme from <https://github.com/altercation/solarized>, see
//   issue #160)


var colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

const colorsKeys = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', ]

function stylizeBg(str, color) {
  const colors3 = {
    red: v033 + "[41m",
    green: v033 + "[42m",
    yellow: v033 + "[43m",
    blue: v033 + "[44m",
    magenta: v033 + "[45m",
    cyan: v033 + "[46m",
    white: v033 + "[47m",
  }

  // console.log({str})
  if (!str) return '';
  var codes = colors3[color];
  if (!codes) return str;
  return codes + str + '\x1b[0m';
  // return '\x1b[45mqweqweqweqw\x1b[0m'
}


function stylizeWithColor(str, color) {
  if (!str) return '';
  var codes = colors[color];

  if (codes) {
    return v033 + '[' + codes[0] + 'm' + str + v033 + '[' + codes[1] + 'm';
  } else {
    return str;
  }
}

function stylizeWithoutColor(str, color) {
  return str;
}
/**
 * Is this a valid Bunyan log record.
 */


function isValidRecord(rec) {
  if (rec.v == null || rec.level == null || rec.name == null || rec.hostname == null || rec.pid == null || rec.time == null || rec.msg == null) {
    // Not valid Bunyan log.
    return false;
  } else {
    return true;
  }
}

var minValidRecord = {
  v: 0,
  //TODO: get this from bunyan.LOG_VERSION
  level: INFO,
  name: 'name',
  hostname: 'hostname',
  pid: 123,
  time: Date.now(),
  msg: 'msg'
};
/**
 * Parses the given log line and either emits it right away (for invalid
 * records) or enqueues it for emitting later when it's the next line to show.
 */

function handleLogLine(file, line, opts, stylize) {
  currLine = line; // intentionally global
  // Emit non-JSON lines immediately.

  var rec;

  if (!line) {
    if (!opts.strict) emit(line + '\n');
    return;
  } else if (line[0] !== '{') {
    if (!opts.strict) emit(line + '\n'); // not JSON

    return;
  } else {
    try {
      rec = JSON.parse(line);
    } catch (e) {
      if (!opts.strict) emit(line + '\n');
      return;
    }
  }

  if (!isValidRecord(rec)) {
    if (!opts.strict) emit(line + '\n');
    return;
  }

  if (!filterRecord(rec, opts)) return;
  if (file === null) return emitRecord(rec, line, opts, stylize);
  return gotRecord(file, line, rec, opts, stylize);
}
/**
 * Print out a single result, considering input options.
 */


function emitRecord(rec, line, opts, stylize) {
  var _short = false;

  switch (opts.outputMode) {
    case OM_SHORT:
      _short = true;

    /* jsl:fall-thru */

    case OM_LONG:
      //    [time] LEVEL: name[/comp]/pid on hostname (src): msg* (extras...)
      //        msg*
      //        --
      //        long and multi-line extras
      //        ...
      // If 'msg' is single-line, then it goes in the top line.
      // If 'req', show the request.
      // If 'res', show the response.
      // If 'err' and 'err.stack' then show that.
      if (!isValidRecord(rec)) {
        return emit(line + '\n');
      }

      delete rec.v; // Time.

      var time;

      if (!_short && opts.timeFormat === TIME_UTC) {
        // Fast default path: We assume the raw `rec.time` is a UTC time
        // in ISO 8601 format (per spec).
        time = '[' + rec.time + ']';
      } else if (!moment && opts.timeFormat === TIME_UTC) {
        // Don't require momentjs install, as long as not using TIME_LOCAL.
        time = rec.time.substr(11);
      } else {
        var tzFormat;
        var moTime = moment(rec.time);

        switch (opts.timeFormat) {
          case TIME_UTC:
            tzFormat = TIMEZONE_UTC_FORMATS[_short ? 'short' : 'long'];
            moTime.utc();
            break;

          case TIME_LOCAL:
            tzFormat = TIMEZONE_LOCAL_FORMATS[_short ? 'short' : 'long'];
            break;

          default:
            throw new Error('unexpected timeFormat: ' + opts.timeFormat);
        }

        ;
        time = moTime.format(tzFormat);
      }

      time = stylize(time, 'XXX');
      delete rec.time;
      var nameStr = rec.name;
      delete rec.name;

      if (rec.component) {
        nameStr += '/' + rec.component;
      }

      delete rec.component;
      if (!_short) nameStr += '/' + rec.pid;
      delete rec.pid;
      var level = upperPaddedNameFromLevel[rec.level] || 'LVL' + rec.level;

      if (opts.color) {
        var colorFromLevel = {
          10: 'white',
          // TRACE
          20: 'yellow',
          // DEBUG
          30: 'cyan',
          // INFO
          40: 'magenta',
          // WARN
          50: 'red',
          // ERROR
          60: 'inverse' // FATAL

        };
        level = stylize(level, colorFromLevel[rec.level]);
      }

      delete rec.level;
      var src = '';

      if (rec.src && rec.src.file) {
        var s = rec.src;

        if (s.func) {
          src = format(' (%s:%d in %s)', s.file, s.line, s.func);
        } else {
          src = format(' (%s:%d)', s.file, s.line);
        }

        src = stylize(src, 'green');
      }

      delete rec.src;
      var hostname = rec.hostname;
      delete rec.hostname;
      var extras = [];
      var details = [];
      var colors2 = colors;
      var colorStr = rec.color || rec.req_id || rec.reqId;

      var colorCode = hashCode(rec.color || rec.req_id || rec.reqId);
      var color =  colorCode === 0 ? null : colorsKeys[colorCode % Object.keys(colorsKeys).length];
      var createMarker = getMarker(rec.color || rec.req_id || rec.reqId);

      if (rec.req_id) {
        extras.push('req_id=' + rec.req_id);
      }

      delete rec.req_id;

      if (rec.reqId) {
        extras.push('reqId=' + rec.reqId);
      }
      delete rec.reqId;

      // if (rec.id) {
      //   extras.push('id=' + rec.id);
      // }
      // delete rec.id;


      var onelineMsg;

      if (rec.msg.indexOf('\n') !== -1) {
        onelineMsg = '';
        details.push(indent(stylize(rec.msg)));
      } else {
        onelineMsg = stylize(rec.msg);
        // onelineMsg = ' ' + stylize(rec.msg);
      }

      delete rec.msg;

      if (rec.req && (0, _typeof2["default"])(rec.req) === 'object') {
        var req = rec.req;
        delete rec.req;
        var headers = req.headers;

        if (!headers) {
          headers = '';
        } else if (typeof headers === 'string') {
          headers = '\n' + headers;
        } else if ((0, _typeof2["default"])(headers) === 'object') {
          headers = '\n' + Object.keys(headers).map(function (h) {
            return h + ': ' + headers[h];
          }).join('\n');
        }

        var s = format('%s %s HTTP/%s%s', req.method, req.url, req.httpVersion || '1.1', headers);
        delete req.url;
        delete req.method;
        delete req.httpVersion;
        delete req.headers;

        if (req.body) {
          s += '\n\n' + ((0, _typeof2["default"])(req.body) === 'object' ? JSON.stringify(req.body, null, 2) : req.body);
          delete req.body;
        }

        if (req.trailers && Object.keys(req.trailers) > 0) {
          s += '\n' + Object.keys(req.trailers).map(function (t) {
            return t + ': ' + req.trailers[t];
          }).join('\n');
        }

        delete req.trailers;
        details.push(indent(s)); // E.g. for extra 'foo' field on 'req', add 'req.foo' at
        // top-level. This *does* have the potential to stomp on a
        // literal 'req.foo' key.

        Object.keys(req).forEach(function (k) {
          rec['req.' + k] = req[k];
        });
      }

      if (rec.client_req && (0, _typeof2["default"])(rec.client_req) === 'object') {
        var client_req = rec.client_req;
        delete rec.client_req;
        var headers = client_req.headers;
        var hostHeaderLine = '';
        var s = '';

        if (client_req.address) {
          hostHeaderLine = '\nHost: ' + client_req.address;
          if (client_req.port) hostHeaderLine += ':' + client_req.port;
        }

        delete client_req.headers;
        delete client_req.address;
        delete client_req.port;
        s += format('%s %s HTTP/%s%s%s', client_req.method, client_req.url, client_req.httpVersion || '1.1', hostHeaderLine, headers ? '\n' + Object.keys(headers).map(function (h) {
          return h + ': ' + headers[h];
        }).join('\n') : '');
        delete client_req.method;
        delete client_req.url;
        delete client_req.httpVersion;

        if (client_req.body) {
          s += '\n\n' + ((0, _typeof2["default"])(client_req.body) === 'object' ? JSON.stringify(client_req.body, null, 2) : client_req.body);
          delete client_req.body;
        } // E.g. for extra 'foo' field on 'client_req', add
        // 'client_req.foo' at top-level. This *does* have the potential
        // to stomp on a literal 'client_req.foo' key.


        Object.keys(client_req).forEach(function (k) {
          rec['client_req.' + k] = client_req[k];
        });
        details.push(indent(s));
      }

      var _res = function _res(res) {
        var s = '';

        if (res.statusCode !== undefined) {
          s += format('HTTP/1.1 %s %s\n', res.statusCode, http.STATUS_CODES[res.statusCode]);
          delete res.statusCode;
        } // Handle `res.header` or `res.headers` as either a string or
        // and object of header key/value pairs. Prefer `res.header` if set
        // (TODO: Why? I don't recall. Typical of restify serializer?
        // Typical JSON.stringify of a core node HttpResponse?)


        var headerTypes = {
          string: true,
          object: true
        };
        var headers;

        if (res.header && headerTypes[(0, _typeof2["default"])(res.header)]) {
          headers = res.header;
          delete res.header;
        } else if (res.headers && headerTypes[(0, _typeof2["default"])(res.headers)]) {
          headers = res.headers;
          delete res.headers;
        }

        if (headers === undefined) {
          /* pass through */
        } else if (typeof headers === 'string') {
          s += headers.trimRight();
        } else {
          s += Object.keys(headers).map(function (h) {
            return h + ': ' + headers[h];
          }).join('\n');
        }

        if (res.body !== undefined) {
          var body = (0, _typeof2["default"])(res.body) === 'object' ? JSON.stringify(res.body, null, 2) : res.body;

          if (body.length > 0) {
            s += '\n\n' + body;
          }

          ;
          delete res.body;
        } else {
          s = s.trimRight();
        }

        if (res.trailer) {
          s += '\n' + res.trailer;
        }

        delete res.trailer;

        if (s) {
          details.push(indent(s));
        } // E.g. for extra 'foo' field on 'res', add 'res.foo' at
        // top-level. This *does* have the potential to stomp on a
        // literal 'res.foo' key.


        Object.keys(res).forEach(function (k) {
          rec['res.' + k] = res[k];
        });
      };

      if (rec.res && (0, _typeof2["default"])(rec.res) === 'object') {
        _res(rec.res);

        delete rec.res;
      }

      if (rec.client_res && (0, _typeof2["default"])(rec.client_res) === 'object') {
        _res(rec.client_res);

        delete rec.client_res;
      }

      if (rec.err && rec.err.stack) {
        var err = rec.err;

        if (typeof err.stack !== 'string') {
          details.push(indent(err.stack.toString()));
        } else {
          details.push(indent(err.stack));
        }

        delete err.message;
        delete err.name;
        delete err.stack; // E.g. for extra 'foo' field on 'err', add 'err.foo' at
        // top-level. This *does* have the potential to stomp on a
        // literal 'err.foo' key.

        Object.keys(err).forEach(function (k) {
          rec['err.' + k] = err[k];
        });
        delete rec.err;
      }

      var leftover = Object.keys(rec);

      for (var i = 0; i < leftover.length; i++) {
        var key = leftover[i];
        var value = rec[key];
        var stringified = false;

        if (typeof value !== 'string') {
          value = JSON.stringify(value, null, 2);
          stringified = true;
        }

        if (value.indexOf('\n') !== -1 || value.length > 50) {
          details.push(indent(key + ': ' + value));
        } else if (!stringified && (value.indexOf(' ') != -1 || value.length === 0)) {
          extras.push(key + '=' + JSON.stringify(value));
        } else {
          extras.push(key + '=' + value);
        }
      }

      extras = stylize(extras.length ? ' (' + extras.join(', ') + ')' : '', 'XXX');
      details = stylize(details.length ? details.join('\n    --\n') + '\n' : '', 'XXX');
      var marker = createMarker();
      // var marker = stylizeBg('🦏', color);
      // console.log({marker, color})
      var nameStr2 = nameStr;
      if (nameStr2) {
        nameStr2 = stylize(nameStr2, color)
      }
      if (!['app', 'uapp'].filter(function (name) { return nameStr.substr(0, name.length).toLowerCase() === name.toLowerCase();  }).length) {
        nameStr2 = nameStr2 + ': '
      }

      const template = onelineMsg ? '%s%s%s%s\n%s' : '%s%s%s%s%s';
     if (!onelineMsg) {
        details = details.trimLeft()
      }
      if (!_short) {
        emit(format('%s %s %s: %s on %s%s:%s%s\n%s', time, level, marker, nameStr2, hostname || '<no-hostname>', src, onelineMsg, extras, details))
      } else if (['app/req', 'uapp/req'].filter(function (name) {         return nameStr.substr(0, name.length).toLowerCase() === name.toLowerCase();      }).length) {
        emit(format('%s%s%s\n', level, marker, onelineMsg));
      } else {
        emit(format(template, level, marker, onelineMsg, extras, details)); // } else {}
      }
      break;

    case OM_INSPECT:
      emit(util.inspect(rec, false, Infinity, true) + '\n');
      break;

    case OM_BUNYAN:
      emit(JSON.stringify(rec, null, 0) + '\n');
      break;

    case OM_JSON:
      emit(JSON.stringify(rec, null, opts.jsonIndent) + '\n');
      break;

    case OM_SIMPLE:
      /* JSSTYLED */
      // <http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/SimpleLayout.html>
      if (!isValidRecord(rec)) {
        return emit(line + '\n');
      }

      emit(format('%s - %s\n', upperNameFromLevel[rec.level] || 'LVL' + rec.level, rec.msg));
      break;

    default:
      throw new Error('unknown output mode: ' + opts.outputMode);
  }
}

var stdoutFlushed = true;

function emit(s) {
  try {
    stdoutFlushed = stdout.write(s);
  } catch (e) {// Handle any exceptions in stdout writing in `stdout.on('error', ...)`.
  }
}
/**
 * A hacked up version of 'process.exit' that will first drain stdout
 * before exiting. *WARNING: This doesn't stop event processing.* IOW,
 * callers have to be careful that code following this call isn't
 * accidentally executed.
 *
 * In node v0.6 "process.stdout and process.stderr are blocking when they
 * refer to regular files or TTY file descriptors." However, this hack might
 * still be necessary in a shell pipeline.
 */


function drainStdoutAndExit(code) {
  if (_DEBUG) warn('(drainStdoutAndExit(%d))', code);
  stdout.on('drain', function () {
    cleanupAndExit(code);
  });

  if (stdoutFlushed) {
    cleanupAndExit(code);
  }
}
/**
 * Process all input from stdin.
 *
 * @params opts {Object} Bunyan options object.
 * @param stylize {Function} Output stylize function to use.
 * @param callback {Function} `function ()`
 */


function processStdin(opts, stylize, callback) {
  readingStdin = true;
  var leftover = ''; // Left-over partial line from last chunk.

  var stdin = process.stdin;
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', function (chunk) {
    var lines = chunk.split(/\r\n|\n/);
    var length = lines.length;

    if (length === 1) {
      leftover += lines[0];
      return;
    }

    if (length > 1) {
      handleLogLine(null, leftover + lines[0], opts, stylize);
    }

    leftover = lines.pop();
    length -= 1;

    for (var i = 1; i < length; i++) {
      handleLogLine(null, lines[i], opts, stylize);
    }
  });
  stdin.on('end', function () {
    if (leftover) {
      handleLogLine(null, leftover, opts, stylize);
      leftover = '';
    }

    callback();
  });
}
/**
 * Process bunyan:log-* probes from the given pid.
 *
 * @params opts {Object} Bunyan options object.
 * @param stylize {Function} Output stylize function to use.
 * @param callback {Function} `function (code)`
 */


function processPids(opts, stylize, callback) {
  var leftover = ''; // Left-over partial line from last chunk.

  /**
   * Get the PIDs to dtrace.
   *
   * @param cb {Function} `function (errCode, pids)`
   */

  function getPids(cb) {
    if (opts.pidsType === 'num') {
      return cb(null, opts.pids);
    }

    if (process.platform === 'sunos') {
      execFile('/bin/pgrep', ['-lf', opts.pids], function (pidsErr, stdout, stderr) {
        if (pidsErr) {
          warn('bunyan: error getting PIDs for "%s": %s\n%s\n%s', opts.pids, pidsErr.message, stdout, stderr);
          return cb(1);
        }

        var pids = stdout.trim().split('\n').map(function (line) {
          return line.trim().split(/\s+/)[0];
        }).filter(function (pid) {
          return Number(pid) !== process.pid;
        });

        if (pids.length === 0) {
          warn('bunyan: error: no matching PIDs found for "%s"', opts.pids);
          return cb(2);
        }

        cb(null, pids);
      });
    } else {
      var regex = opts.pids;

      if (regex && /[a-zA-Z0-9_]/.test(regex[0])) {
        // 'foo' -> '[f]oo' trick to exclude the 'grep' PID from its
        // own search.
        regex = '[' + regex[0] + ']' + regex.slice(1);
      }

      exec(format('ps -A -o pid,command | grep \'%s\'', regex), function (pidsErr, stdout, stderr) {
        if (pidsErr) {
          warn('bunyan: error getting PIDs for "%s": %s\n%s\n%s', opts.pids, pidsErr.message, stdout, stderr);
          return cb(1);
        }

        var pids = stdout.trim().split('\n').map(function (line) {
          return line.trim().split(/\s+/)[0];
        }).filter(function (pid) {
          return Number(pid) !== process.pid;
        });

        if (pids.length === 0) {
          warn('bunyan: error: no matching PIDs found for "%s"', opts.pids);
          return cb(2);
        }

        cb(null, pids);
      });
    }
  }

  getPids(function (errCode, pids) {
    if (errCode) {
      return callback(errCode);
    }

    var probes = pids.map(function (pid) {
      if (!opts.level) return format('bunyan%s:::log-*', pid);
      var rval = [],
          l;

      for (l in levelFromName) {
        if (levelFromName[l] >= opts.level) rval.push(format('bunyan%s:::log-%s', pid, l));
      }

      if (rval.length != 0) return rval.join(',');
      warn('bunyan: error: level (%d) exceeds maximum logging level', opts.level);
      return drainStdoutAndExit(1);
    }).join(',');
    var argv = ['dtrace', '-Z', '-x', 'strsize=4k', '-x', 'switchrate=10hz', '-qn', format('%s{printf("%s", copyinstr(arg0))}', probes)]; //console.log('dtrace argv: %s', argv);

    var dtrace = spawn(argv[0], argv.slice(1), // Share the stderr handle to have error output come
    // straight through. Only supported in v0.8+.
    {
      stdio: ['pipe', 'pipe', process.stderr]
    });
    dtrace.on('error', function (e) {
      if (e.syscall === 'spawn' && e.errno === 'ENOENT') {
        console.error('bunyan: error: could not spawn "dtrace" ' + '("bunyan -p" is only supported on platforms with dtrace)');
      } else {
        console.error('bunyan: error: unexpected dtrace error: %s', e);
      }

      callback(1);
    });
    child = dtrace; // intentionally global

    function finish(code) {
      if (leftover) {
        handleLogLine(null, leftover, opts, stylize);
        leftover = '';
      }

      callback(code);
    }

    dtrace.stdout.setEncoding('utf8');
    dtrace.stdout.on('data', function (chunk) {
      var lines = chunk.split(/\r\n|\n/);
      var length = lines.length;

      if (length === 1) {
        leftover += lines[0];
        return;
      }

      if (length > 1) {
        handleLogLine(null, leftover + lines[0], opts, stylize);
      }

      leftover = lines.pop();
      length -= 1;

      for (var i = 1; i < length; i++) {
        handleLogLine(null, lines[i], opts, stylize);
      }
    });

    if (nodeSpawnSupportsStdio) {
      dtrace.on('exit', finish);
    } else {
      var countdownToFinish = function countdownToFinish(code) {
        returnCode = code;
        eventsRemaining--;

        if (eventsRemaining == 0) {
          finish(returnCode);
        }
      };

      // Fallback (for < v0.8) to pipe the dtrace process' stderr to
      // this stderr. Wait for all of (1) process 'exit', (2) stderr
      // 'end', and (2) stdout 'end' before returning to ensure all
      // stderr is flushed (issue #54).
      var returnCode = null;
      var eventsRemaining = 3;
      dtrace.stderr.pipe(process.stderr);
      dtrace.stderr.on('end', countdownToFinish);
      dtrace.stderr.on('end', countdownToFinish);
      dtrace.on('exit', countdownToFinish);
    }
  });
}
/**
 * Process all input from the given log file.
 *
 * @param file {String} Log file path to process.
 * @params opts {Object} Bunyan options object.
 * @param stylize {Function} Output stylize function to use.
 * @param callback {Function} `function ()`
 */


function processFile(file, opts, stylize, callback) {
  var stream = fs.createReadStream(file);

  if (/\.gz$/.test(file)) {
    stream = stream.pipe(require('zlib').createGunzip());
  } // Manually decode streams - lazy load here as per node/lib/fs.js


  var decoder = new (require('string_decoder').StringDecoder)('utf8');
  streams[file].stream = stream;
  stream.on('error', function (err) {
    streams[file].done = true;
    callback(err);
  });
  var leftover = ''; // Left-over partial line from last chunk.

  stream.on('data', function (data) {
    var chunk = decoder.write(data);

    if (!chunk.length) {
      return;
    }

    var lines = chunk.split(/\r\n|\n/);
    var length = lines.length;

    if (length === 1) {
      leftover += lines[0];
      return;
    }

    if (length > 1) {
      handleLogLine(file, leftover + lines[0], opts, stylize);
    }

    leftover = lines.pop();
    length -= 1;

    for (var i = 1; i < length; i++) {
      handleLogLine(file, lines[i], opts, stylize);
    }
  });
  stream.on('end', function () {
    streams[file].done = true;

    if (leftover) {
      handleLogLine(file, leftover, opts, stylize);
      leftover = '';
    } else {
      emitNextRecord(opts, stylize);
    }

    callback();
  });
}
/**
 * From node async module.
 */

/* BEGIN JSSTYLED */


function asyncForEach(arr, iterator, callback) {
  callback = callback || function () {};

  if (!arr.length) {
    return callback();
  }

  var completed = 0;
  arr.forEach(function (x) {
    iterator(x, function (err) {
      if (err) {
        callback(err);

        callback = function callback() {};
      } else {
        completed += 1;

        if (completed === arr.length) {
          callback();
        }
      }
    });
  });
}

;
/* END JSSTYLED */

/**
 * Cleanup and exit properly.
 *
 * Warning: this doesn't stop processing, i.e. process exit might be delayed.
 * It is up to the caller to ensure that no subsequent bunyan processing
 * is done after calling this.
 *
 * @param code {Number} exit code.
 * @param signal {String} Optional signal name, if this was exitting because
 *    of a signal.
 */

var cleanedUp = false;

function cleanupAndExit(code, signal) {
  // Guard one call.
  if (cleanedUp) {
    return;
  }

  cleanedUp = true;
  if (_DEBUG) warn('(bunyan: cleanupAndExit)'); // Clear possibly interrupted ANSI code (issue #59).

  if (usingAnsiCodes) {
    stdout.write(v033 + '[0m');
  } // Kill possible dtrace child.


  if (child) {
    child.kill(signal);
  }

  if (pager) {
    // Let pager know that output is done, then wait for pager to exit.
    stdout.end();
    pager.on('exit', function (pagerCode) {
      if (_DEBUG) warn('(bunyan: pager exit -> process.exit(%s))', pagerCode || code);
      process.exit(pagerCode || code);
    });
  } else {
    if (_DEBUG) warn('(bunyan: process.exit(%s))', code);
    process.exit(code);
  }
} //---- mainline


process.on('SIGINT', function () {
  /**
   * Ignore SIGINT (Ctrl+C) if processing stdin -- we should process
   * remaining output from preceding process in the pipeline and
   * except *it* to close.
   */
  if (!readingStdin) {
    cleanupAndExit(1, 'SIGINT');
  }
});
process.on('SIGQUIT', function () {
  cleanupAndExit(1, 'SIGQUIT');
});
process.on('SIGTERM', function () {
  cleanupAndExit(1, 'SIGTERM');
});
process.on('SIGHUP', function () {
  cleanupAndExit(1, 'SIGHUP');
});
process.on('uncaughtException', function (err) {
  function _indent(s) {
    var lines = s.split(/\r?\n/);

    for (var i = 0; i < lines.length; i++) {
      lines[i] = '*     ' + lines[i];
    }

    return lines.join('\n');
  }

  var title = encodeURIComponent(format('Bunyan %s crashed: %s', getVersion(), String(err)));
  var e = console.error;
  e('```');
  e('* The Bunyan CLI crashed!');
  e('*');

  if (err.name === 'ReferenceError' && gUsingConditionOpts) {
    /* BEGIN JSSTYLED */
    e('* This crash was due to a "ReferenceError", which is often the result of given');
    e('* `-c CONDITION` code that doesn\'t guard against undefined values. If that is');
    /* END JSSTYLED */

    e('* not the problem:');
    e('*');
  }

  e('* Please report this issue and include the details below:');
  e('*');
  e('*    https://github.com/trentm/node-bunyan/issues/new?title=%s', title);
  e('*');
  e('* * *');
  e('* platform:', process.platform);
  e('* node version:', process.version);
  e('* bunyan version:', getVersion());
  e('* argv: %j', process.argv);
  e('* log line: %j', currLine);
  e('* stack:');
  e(_indent(err.stack));
  e('```');
  process.exit(1);
});

function main(argv) {
  try {
    var opts = parseArgv(argv);
  } catch (e) {
    warn('bunyan: error: %s', e.message);
    return drainStdoutAndExit(1);
  }

  if (opts.help) {
    printHelp();
    return;
  }

  if (opts.version) {
    console.log('bunyan ' + getVersion());
    return;
  }

  if (opts.pid && opts.args.length > 0) {
    warn('bunyan: error: can\'t use both "-p PID" (%s) and file (%s) args', opts.pid, opts.args.join(' '));
    return drainStdoutAndExit(1);
  }

  if (opts.color === null) {
    if (process.env.BUNYAN_NO_COLOR && process.env.BUNYAN_NO_COLOR.length > 0) {
      opts.color = false;
    } else {
      opts.color = process.stdout.isTTY;
    }
  }

  usingAnsiCodes = opts.color; // intentionally global

  var stylize = opts.color ? stylizeWithColor : stylizeWithoutColor; // Pager.

  var paginate = process.stdout.isTTY && process.stdin.isTTY && !opts.pids && // Don't page if following process output.
  opts.args.length > 0 && // Don't page if no file args to process.
  process.platform !== 'win32' && (nodeVer[0] > 0 || nodeVer[1] >= 8) && (opts.paginate === true || opts.paginate !== false && (!process.env.BUNYAN_NO_PAGER || process.env.BUNYAN_NO_PAGER.length === 0));

  if (paginate) {
    var pagerCmd = process.env.PAGER || 'less';
    /* JSSTYLED */

    assert.ok(pagerCmd.indexOf('"') === -1 && pagerCmd.indexOf("'") === -1, 'cannot parse PAGER quotes yet');
    var argv = pagerCmd.split(/\s+/g);
    var env = objCopy(process.env);

    if (env.LESS === undefined) {
      // git's default is LESS=FRSX. I don't like the 'S' here because
      // lines are *typically* wide with bunyan output and scrolling
      // horizontally is a royal pain. Note a bug in Mac's `less -F`,
      // such that SIGWINCH can kill it. If that rears too much then
      // I'll remove 'F' from here.
      env.LESS = 'FRX';
    }

    if (_DEBUG) warn('(pager: argv=%j, env.LESS=%j)', argv, env.LESS); // `pager` and `stdout` intentionally global.

    pager = spawn(argv[0], argv.slice(1), // Share the stderr handle to have error output come
    // straight through. Only supported in v0.8+.
    {
      env: env,
      stdio: ['pipe', 1, 2]
    });
    stdout = pager.stdin; // Early termination of the pager: just stop.

    pager.on('exit', function (pagerCode) {
      if (_DEBUG) warn('(bunyan: pager exit)');
      pager = null;
      stdout.end();
      stdout = process.stdout;
      cleanupAndExit(pagerCode);
    });
  } // Stdout error handling. (Couldn't setup until `stdout` was determined.)


  stdout.on('error', function (err) {
    if (_DEBUG) warn('(stdout error event: %s)', err);

    if (err.code === 'EPIPE') {
      drainStdoutAndExit(0);
    } else if (err.toString() === 'Error: This socket is closed.') {
      // Could get this if the pager closes its stdin, but hasn't
      // exited yet.
      drainStdoutAndExit(1);
    } else {
      warn(err);
      drainStdoutAndExit(1);
    }
  });
  var retval = 0;

  if (opts.pids) {
    processPids(opts, stylize, function (code) {
      cleanupAndExit(code);
    });
  } else if (opts.args.length > 0) {
    var files = opts.args;
    files.forEach(function (file) {
      streams[file] = {
        stream: null,
        records: [],
        done: false
      };
    });
    asyncForEach(files, function (file, next) {
      processFile(file, opts, stylize, function (err) {
        if (err) {
          warn('bunyan: %s', err.message);
          retval += 1;
        }

        next();
      });
    }, function (err) {
      if (err) {
        warn('bunyan: unexpected error: %s', err.stack || err);
        return drainStdoutAndExit(1);
      }

      cleanupAndExit(retval);
    });
  } else {
    processStdin(opts, stylize, function () {
      cleanupAndExit(retval);
    });
  }
}

if (require.main === module) {
  // HACK guard for <https://github.com/trentm/json/issues/24>.
  // We override the `process.stdout.end` guard that core node.js puts in
  // place. The real fix is that `.end()` shouldn't be called on stdout
  // in node core. Node v0.6.9 fixes that. Only guard for v0.6.0..v0.6.8.
  if ([0, 6, 0] <= nodeVer && nodeVer <= [0, 6, 8]) {
    var stdout = process.stdout;

    stdout.end = stdout.destroy = stdout.destroySoon = function () {
      /* pass */
    };
  }

  main(process.argv);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vY2xpLmpzIl0sIm5hbWVzIjpbInYwMzMiLCJWRVJTSU9OIiwicCIsImNvbnNvbGUiLCJsb2ciLCJ1dGlsIiwicmVxdWlyZSIsInBhdGhsaWIiLCJ2bSIsImh0dHAiLCJmcyIsIndhcm4iLCJjaGlsZF9wcm9jZXNzIiwic3Bhd24iLCJleGVjIiwiZXhlY0ZpbGUiLCJhc3NlcnQiLCJtb21lbnQiLCJub2RlVmVyIiwicHJvY2VzcyIsInZlcnNpb25zIiwibm9kZSIsInNwbGl0IiwibWFwIiwiTnVtYmVyIiwibm9kZVNwYXduU3VwcG9ydHNTdGRpbyIsIl9ERUJVRyIsIk9NX0xPTkciLCJPTV9KU09OIiwiT01fSU5TUEVDVCIsIk9NX1NJTVBMRSIsIk9NX1NIT1JUIiwiT01fQlVOWUFOIiwiT01fRlJPTV9OQU1FIiwiVFJBQ0UiLCJERUJVRyIsIklORk8iLCJXQVJOIiwiRVJST1IiLCJGQVRBTCIsImxldmVsRnJvbU5hbWUiLCJuYW1lRnJvbUxldmVsIiwidXBwZXJOYW1lRnJvbUxldmVsIiwidXBwZXJQYWRkZWROYW1lRnJvbUxldmVsIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwibHZsIiwidG9VcHBlckNhc2UiLCJUSU1FX1VUQyIsIlRJTUVfTE9DQUwiLCJUSU1FWk9ORV9VVENfRk9STUFUUyIsIlRJTUVaT05FX0xPQ0FMX0ZPUk1BVFMiLCJjdXJyTGluZSIsImNoaWxkIiwidXNpbmdBbnNpQ29kZXMiLCJnVXNpbmdDb25kaXRpb25PcHRzIiwicGFnZXIiLCJzdGRvdXQiLCJyZWFkaW5nU3RkaW4iLCJnZXRWZXJzaW9uIiwiZm9ybWF0IiwiaW5zcGVjdCIsImZvcm1hdFJlZ0V4cCIsImYiLCJvYmplY3RzIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwiYXJncyIsImxlbiIsInN0ciIsIlN0cmluZyIsInJlcGxhY2UiLCJ4IiwiSlNPTiIsInN0cmluZ2lmeSIsImluZGVudCIsInMiLCJvYmpDb3B5Iiwib2JqIiwiQXJyYXkiLCJpc0FycmF5Iiwic2xpY2UiLCJjb3B5IiwiayIsInByaW50SGVscCIsInN0cmVhbXMiLCJnb3RSZWNvcmQiLCJmaWxlIiwibGluZSIsInJlYyIsIm9wdHMiLCJzdHlsaXplIiwidGltZSIsIkRhdGUiLCJlbWl0TmV4dFJlY29yZCIsImZpbHRlclJlY29yZCIsImxldmVsIiwiY29uZEZ1bmNzIiwicmVjQ29weSIsInBhc3MiLCJjYWxsIiwiY29uZFZtIiwicnVuSW5OZXdDb250ZXh0Iiwib2ZpbGUiLCJyZWFkeSIsIm1pbmZpbGUiLCJ1bmRlZmluZWQiLCJzdHJlYW0iLCJkb25lIiwicmVjb3JkcyIsInBhdXNlZCIsInBhdXNlIiwicmVzdW1lIiwic2hpZnQiLCJlbWl0UmVjb3JkIiwiZnVuY1dpdGhSZXR1cm5Gcm9tU25pcHBldCIsImpzIiwiaW5kZXhPZiIsInN1YnN0cmluZyIsInZhckRlZnMiLCJGdW5jdGlvbiIsInBhcnNlQXJndiIsImFyZ3YiLCJwYXJzZWQiLCJoZWxwIiwiY29sb3IiLCJwYWdpbmF0ZSIsIm91dHB1dE1vZGUiLCJqc29uSW5kZW50Iiwic3RyaWN0IiwicGlkcyIsInBpZHNUeXBlIiwidGltZUZvcm1hdCIsIm5ld0FyZ3MiLCJvcHRUYWtlc0FyZyIsImNoYXJBdCIsInNwbGl0T3B0cyIsImoiLCJvcHRBcmciLCJjb25kRGVmaW5lcyIsImVuZE9mT3B0aW9ucyIsImFyZyIsInZlcnNpb24iLCJpZHgiLCJsYXN0SW5kZXhPZiIsImluZGVudGF0aW9uIiwiaXNOYU4iLCJFcnJvciIsInRpbWVBcmciLCJwaWRBcmciLCJwaWQiLCJsZXZlbEFyZyIsInRvTG93ZXJDYXNlIiwiY29uZGl0aW9uIiwiQm9vbGVhbiIsImVudiIsIkJVTllBTl9FWEVDIiwic2NyaXB0TmFtZSIsImNvZGUiLCJzY3JpcHQiLCJjcmVhdGVTY3JpcHQiLCJjb21wbEVyciIsInN0YWNrIiwibWluVmFsaWRSZWNvcmQiLCJjb25kRXJyIiwiaXNJbnRlZ2VyIiwic2VhcmNoIiwiY29sb3JzIiwic3R5bGl6ZVdpdGhDb2xvciIsImNvZGVzIiwic3R5bGl6ZVdpdGhvdXRDb2xvciIsImlzVmFsaWRSZWNvcmQiLCJ2IiwiaG9zdG5hbWUiLCJtc2ciLCJub3ciLCJoYW5kbGVMb2dMaW5lIiwiZW1pdCIsInBhcnNlIiwiZSIsInNob3J0Iiwic3Vic3RyIiwidHpGb3JtYXQiLCJtb1RpbWUiLCJ1dGMiLCJuYW1lU3RyIiwiY29tcG9uZW50IiwiY29sb3JGcm9tTGV2ZWwiLCJzcmMiLCJmdW5jIiwiZXh0cmFzIiwiZGV0YWlscyIsInJlcV9pZCIsInJlcUlkIiwib25lbGluZU1zZyIsInJlcSIsImhlYWRlcnMiLCJoIiwibWV0aG9kIiwidXJsIiwiaHR0cFZlcnNpb24iLCJib2R5IiwidHJhaWxlcnMiLCJ0IiwiY2xpZW50X3JlcSIsImhvc3RIZWFkZXJMaW5lIiwiYWRkcmVzcyIsInBvcnQiLCJfcmVzIiwicmVzIiwic3RhdHVzQ29kZSIsIlNUQVRVU19DT0RFUyIsImhlYWRlclR5cGVzIiwic3RyaW5nIiwib2JqZWN0IiwiaGVhZGVyIiwidHJpbVJpZ2h0IiwidHJhaWxlciIsImNsaWVudF9yZXMiLCJlcnIiLCJ0b1N0cmluZyIsIm1lc3NhZ2UiLCJsZWZ0b3ZlciIsImtleSIsInZhbHVlIiwic3RyaW5naWZpZWQiLCJmaWx0ZXIiLCJJbmZpbml0eSIsInN0ZG91dEZsdXNoZWQiLCJ3cml0ZSIsImRyYWluU3Rkb3V0QW5kRXhpdCIsIm9uIiwiY2xlYW51cEFuZEV4aXQiLCJwcm9jZXNzU3RkaW4iLCJjYWxsYmFjayIsInN0ZGluIiwic2V0RW5jb2RpbmciLCJjaHVuayIsImxpbmVzIiwicG9wIiwicHJvY2Vzc1BpZHMiLCJnZXRQaWRzIiwiY2IiLCJwbGF0Zm9ybSIsInBpZHNFcnIiLCJzdGRlcnIiLCJ0cmltIiwicmVnZXgiLCJ0ZXN0IiwiZXJyQ29kZSIsInByb2JlcyIsInJ2YWwiLCJsIiwiZHRyYWNlIiwic3RkaW8iLCJzeXNjYWxsIiwiZXJybm8iLCJlcnJvciIsImZpbmlzaCIsImNvdW50ZG93blRvRmluaXNoIiwicmV0dXJuQ29kZSIsImV2ZW50c1JlbWFpbmluZyIsInBpcGUiLCJwcm9jZXNzRmlsZSIsImNyZWF0ZVJlYWRTdHJlYW0iLCJjcmVhdGVHdW56aXAiLCJkZWNvZGVyIiwiU3RyaW5nRGVjb2RlciIsImRhdGEiLCJhc3luY0ZvckVhY2giLCJhcnIiLCJpdGVyYXRvciIsImNvbXBsZXRlZCIsImNsZWFuZWRVcCIsInNpZ25hbCIsImtpbGwiLCJlbmQiLCJwYWdlckNvZGUiLCJleGl0IiwiX2luZGVudCIsInRpdGxlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibWFpbiIsIkJVTllBTl9OT19DT0xPUiIsImlzVFRZIiwiQlVOWUFOX05PX1BBR0VSIiwicGFnZXJDbWQiLCJQQUdFUiIsIm9rIiwiTEVTUyIsInJldHZhbCIsImZpbGVzIiwibmV4dCIsIm1vZHVsZSIsImRlc3Ryb3kiLCJkZXN0cm95U29vbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsSUFBSUEsSUFBSSxHQUFHLE1BQVgsQyxDQUFtQjs7QUFDbkIsSUFBSUMsT0FBTyxHQUFHLE9BQWQ7QUFFQSxJQUFJQyxDQUFDLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBaEI7O0FBQ0EsSUFBSUMsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFsQjs7QUFDQSxJQUFJQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQXJCOztBQUNBLElBQUlFLEVBQUUsR0FBR0YsT0FBTyxDQUFDLElBQUQsQ0FBaEI7O0FBQ0EsSUFBSUcsSUFBSSxHQUFHSCxPQUFPLENBQUMsTUFBRCxDQUFsQjs7QUFDQSxJQUFJSSxFQUFFLEdBQUdKLE9BQU8sQ0FBQyxJQUFELENBQWhCOztBQUNBLElBQUlLLElBQUksR0FBR1IsT0FBTyxDQUFDUSxJQUFuQjs7QUFDQSxJQUFJQyxhQUFhLEdBQUdOLE9BQU8sQ0FBQyxlQUFELENBQTNCO0FBQUEsSUFDSU8sS0FBSyxHQUFHRCxhQUFhLENBQUND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LHFCQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLHFFQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLHVFQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLHlCQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLDZCQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLGdFQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLDJEQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLDRDQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLGdEQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLDJEQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLGlFQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLG9FQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLGtFQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLDBFQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLG9FQUFELENBQUQ7QUFDQUEsRUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsaUJBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsZ0VBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsbUVBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsK0RBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsa0RBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsNERBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsa0NBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsdUVBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMscUJBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsdURBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMsOENBQUQsQ0FBRDtBQUNBQSxFQUFBQSxDQUFDLENBQUMscURBQUQsQ0FB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LElBQUk7QUFDUCxPQU5VLENBQVg7QUFPSCxLQVRPLEVBVVIsVUFBVXpFLEdBQVYsRUFBZTtBQUNYLFVBQUlBLEdBQUosRUFBUztBQUNMck4sUUFBQUEsSUFBSSxDQUFDLDhCQUFELEVBQWlDcU4sR0FBRyxDQUFDekQsS0FBSixJQUFheUQsR0FBOUMsQ0FBSjtBQUNBLGVBQU9XLGtCQUFrQixDQUFDLENBQUQsQ0FBekI7QUFDSDs7QUFDREUsTUFBQUEsY0FBYyxDQUFDMEQsTUFBRCxDQUFkO0FBQ0gsS0FoQk8sQ0FBWjtBQWtCSCxHQXZCTSxNQXVCQTtBQUNIekQsSUFBQUEsWUFBWSxDQUFDL0ksSUFBRCxFQUFPQyxPQUFQLEVBQWdCLFlBQVk7QUFDcEM2SSxNQUFBQSxjQUFjLENBQUMwRCxNQUFELENBQWQ7QUFDSCxLQUZXLENBQVo7QUFHSDtBQUNKOztBQUVELElBQUlqUyxPQUFPLENBQUN5UixJQUFSLEtBQWlCVyxNQUFyQixFQUE2QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsS0FBYXhSLE9BQWIsSUFBd0JBLE9BQU8sSUFBSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUF2QyxFQUFrRDtBQUM5QyxRQUFJeUMsTUFBTSxHQUFHeEMsT0FBTyxDQUFDd0MsTUFBckI7O0FBQ0FBLElBQUFBLE1BQU0sQ0FBQzhOLEdBQVAsR0FBYTlOLE1BQU0sQ0FBQ2dQLE9BQVAsR0FBaUJoUCxNQUFNLENBQUNpUCxXQUFQLEdBQXFCLFlBQVk7QUFDM0Q7QUFDSCxLQUZEO0FBR0g7O0FBRURiLEVBQUFBLElBQUksQ0FBQzVRLE9BQU8sQ0FBQzRHLElBQVQsQ0FBSjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICogQ29weXJpZ2h0IDIwMTYgVHJlbnQgTWljay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIENvcHlyaWdodCAyMDE2IEpveWVudCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogYnVueWFuIC0tIGZpbHRlciBhbmQgcHJldHR5LXByaW50IEJ1bnlhbiBsb2cgZmlsZXMgKGxpbmUtZGVsaW1pdGVkIEpTT04pXG4gKlxuICogU2VlIDxodHRwczovL2dpdGh1Yi5jb20vdHJlbnRtL25vZGUtYnVueWFuPi5cbiAqXG4gKiAtKi0gbW9kZToganMgLSotXG4gKiB2aW06IGV4cGFuZHRhYjp0cz00OnN3PTRcbiAqL1xuXG52YXIgdjAzMyA9ICdcXHgxQic7IC8vICdcXDAzMyc7XG52YXIgVkVSU0lPTiA9ICcxLjguMSc7XG5cbnZhciBwID0gY29uc29sZS5sb2c7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBwYXRobGliID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIHZtID0gcmVxdWlyZSgndm0nKTtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciB3YXJuID0gY29uc29sZS53YXJuO1xudmFyIGNoaWxkX3Byb2Nlc3MgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyksXG4gICAgc3Bhd24gPSBjaGlsZF9wcm9jZXNzLnNwYXduLFxuICAgIGV4ZWMgPSBjaGlsZF9wcm9jZXNzLmV4ZWMsXG4gICAgZXhlY0ZpbGUgPSBjaGlsZF9wcm9jZXNzLmV4ZWNGaWxlO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuXG52YXIgbW9tZW50ID0gbnVsbDtcbi8vIHRyeSB7XG4vLyAgICAgdmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuLy8gfSBjYXRjaCAoZSkge1xuLy8gICAgIG1vbWVudCA9IG51bGw7XG4vLyB9XG5cblxuLy8tLS0tIGdsb2JhbHMgYW5kIGNvbnN0YW50c1xuXG52YXIgbm9kZVZlciA9IHByb2Nlc3MudmVyc2lvbnMubm9kZS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xudmFyIG5vZGVTcGF3blN1cHBvcnRzU3RkaW8gPSAobm9kZVZlclswXSA+IDAgfHwgbm9kZVZlclsxXSA+PSA4KTtcblxuLy8gSW50ZXJuYWwgZGVidWcgbG9nZ2luZyB2aWEgYGNvbnNvbGUud2FybmAuXG52YXIgX0RFQlVHID0gZmFsc2U7XG5cbi8vIE91dHB1dCBtb2Rlcy5cbnZhciBPTV9MT05HID0gMTtcbnZhciBPTV9KU09OID0gMjtcbnZhciBPTV9JTlNQRUNUID0gMztcbnZhciBPTV9TSU1QTEUgPSA0O1xudmFyIE9NX1NIT1JUID0gNTtcbnZhciBPTV9CVU5ZQU4gPSA2O1xudmFyIE9NX0ZST01fTkFNRSA9IHtcbiAgICAnbG9uZyc6IE9NX0xPTkcsXG4gICAgJ3BhdWwnOiBPTV9MT05HLCAgLyogYmFja3dhcmQgY29tcGF0ICovXG4gICAgJ2pzb24nOiBPTV9KU09OLFxuICAgICdpbnNwZWN0JzogT01fSU5TUEVDVCxcbiAgICAnc2ltcGxlJzogT01fU0lNUExFLFxuICAgICdzaG9ydCc6IE9NX1NIT1JULFxuICAgICdidW55YW4nOiBPTV9CVU5ZQU5cbn07XG5cblxuLy8gTGV2ZWxzXG52YXIgVFJBQ0UgPSAxMDtcbnZhciBERUJVRyA9IDIwO1xudmFyIElORk8gPSAzMDtcbnZhciBXQVJOID0gNDA7XG52YXIgRVJST1IgPSA1MDtcbnZhciBGQVRBTCA9IDYwO1xuXG52YXIgbGV2ZWxGcm9tTmFtZSA9IHtcbiAgICAndHJhY2UnOiBUUkFDRSxcbiAgICAnZGVidWcnOiBERUJVRyxcbiAgICAnaW5mbyc6IElORk8sXG4gICAgJ3dhcm4nOiBXQVJOLFxuICAgICdlcnJvcic6IEVSUk9SLFxuICAgICdmYXRhbCc6IEZBVEFMXG59O1xudmFyIG5hbWVGcm9tTGV2ZWwgPSB7fTtcbnZhciB1cHBlck5hbWVGcm9tTGV2ZWwgPSB7fTtcbnZhciB1cHBlclBhZGRlZE5hbWVGcm9tTGV2ZWwgPSB7fTtcbk9iamVjdC5rZXlzKGxldmVsRnJvbU5hbWUpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbHZsID0gbGV2ZWxGcm9tTmFtZVtuYW1lXTtcbiAgICBuYW1lRnJvbUxldmVsW2x2bF0gPSBuYW1lO1xuICAgIHVwcGVyTmFtZUZyb21MZXZlbFtsdmxdID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIHVwcGVyUGFkZGVkTmFtZUZyb21MZXZlbFtsdmxdID0gJ1snICsgbmFtZVswXSArICddJ1xuICAgIC8vIHVwcGVyUGFkZGVkTmFtZUZyb21MZXZlbFtsdmxdID0gKFxuICAgIC8vICAgICBuYW1lLmxlbmd0aCA9PT0gNCA/ICcgJyA6ICcnKSArIG5hbWUudG9VcHBlckNhc2UoKTtcbn0pO1xuXG5cbi8vIERpc3BsYXkgdGltZSBmb3JtYXRzLlxudmFyIFRJTUVfVVRDID0gMTsgIC8vIHRoZSBkZWZhdWx0LCBidW55YW4ncyBuYXRpdmUgZm9ybWF0XG52YXIgVElNRV9MT0NBTCA9IDI7XG5cbi8vIFRpbWV6b25lIGZvcm1hdHM6IG91dHB1dCBmb3JtYXQgLT4gbW9tZW50anMgZm9ybWF0IHN0cmluZ1xudmFyIFRJTUVaT05FX1VUQ19GT1JNQVRTID0ge1xuICAgIGxvbmc6ICAnW1tdWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXVtdXScsXG4gICAgc2hvcnQ6ICdISDptbTpzcy5TU1NbWl0nXG59O1xudmFyIFRJTUVaT05FX0xPQ0FMX0ZPUk1BVFMgPSB7XG4gICAgbG9uZzogICdbW11ZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTWltdXScsXG4gICAgc2hvcnQ6ICdISDptbTpzcy5TU1MnXG59O1xuXG5cbi8vIFRoZSBjdXJyZW50IHJhdyBpbnB1dCBsaW5lIGJlaW5nIHByb2Nlc3NlZC4gVXNlZCBmb3IgYHVuY2F1Z2h0RXhjZXB0aW9uYC5cbnZhciBjdXJyTGluZSA9IG51bGw7XG5cbi8vIENoaWxkIGR0cmFjZSBwcm9jZXNzLCBpZiBhbnkuIFVzZWQgZm9yIHNpZ25hbC1oYW5kbGluZy5cbnZhciBjaGlsZCA9IG51bGw7XG5cbi8vIFdoZXRoZXIgQU5TSSBjb2RlcyBhcmUgYmVpbmcgdXNlZC4gVXNlZCBmb3Igc2lnbmFsLWhhbmRsaW5nLlxudmFyIHVzaW5nQW5zaUNvZGVzID0gZmFsc2U7XG5cbi8vIFVzZWQgdG8gdGVsbCB0aGUgJ3VuY2F1Z2h0RXhjZXB0aW9uJyBoYW5kbGVyIHRoYXQgJy1jIENPREUnIGlzIGJlaW5nIHVzZWQuXG52YXIgZ1VzaW5nQ29uZGl0aW9uT3B0cyA9IGZhbHNlO1xuXG4vLyBQYWdlciBjaGlsZCBwcm9jZXNzLCBhbmQgb3V0cHV0IHN0cmVhbSB0byB3aGljaCB0byB3cml0ZS5cbnZhciBwYWdlciA9IG51bGw7XG52YXIgc3Rkb3V0ID0gcHJvY2Vzcy5zdGRvdXQ7XG5cbi8vIFdoZXRoZXIgd2UgYXJlIHJlYWRpbmcgZnJvbSBzdGRpbi5cbnZhciByZWFkaW5nU3RkaW4gPSBmYWxzZTtcblxuXG5cbi8vLS0tLSBzdXBwb3J0IGZ1bmN0aW9uc1xuXG5mdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xuICAgIHJldHVybiBWRVJTSU9OO1xufVxuXG5cbnZhciBmb3JtYXQgPSB1dGlsLmZvcm1hdDtcbmlmICghZm9ybWF0KSB7XG4gICAgLyogQkVHSU4gSlNTVFlMRUQgKi9cbiAgICAvLyBJZiBub3Qgbm9kZSAwLjYsIHRoZW4gdXNlIGl0cyBgdXRpbC5mb3JtYXRgOlxuICAgIC8vIDxodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvYmxvYi9tYXN0ZXIvbGliL3V0aWwuanMjTDIyPjpcbiAgICB2YXIgaW5zcGVjdCA9IHV0aWwuaW5zcGVjdDtcbiAgICB2YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbiAgICBmb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQoZikge1xuICAgICAgICBpZiAodHlwZW9mIGYgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIGlmIChpID49IGxlbilcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIHN3aXRjaCAoeCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgICAgICAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgICAgICAgICAgIGNhc2UgJyVqJzogcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgICAgICAgICAgY2FzZSAnJSUnOiByZXR1cm4gJyUnO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICAgICAgICAgIGlmICh4ID09PSBudWxsIHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgLyogRU5EIEpTU1RZTEVEICovXG59XG5cbmZ1bmN0aW9uIGluZGVudChzKSB7XG4gICAgcmV0dXJuICcgICAgJyArIHMuc3BsaXQoL1xccj9cXG4vKS5qb2luKCdcXG4gICAgJyk7XG59XG5cbmZ1bmN0aW9uIG9iakNvcHkob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBjb3B5W2tdID0gb2JqW2tdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcmludEhlbHAoKSB7XG4gICAgLyogQkVHSU4gSlNTVFlMRUQgKi9cbiAgICBwKCdVc2FnZTonKTtcbiAgICBwKCcgIGJ1bnlhbiBbT1BUSU9OU10gW0ZJTEUgLi4uXScpO1xuICAgIHAoJyAgLi4uIHwgYnVueWFuIFtPUFRJT05TXScpO1xuICAgIHAoJyAgYnVueWFuIFtPUFRJT05TXSAtcCBQSUQnKTtcbiAgICBwKCcnKTtcbiAgICBwKCdGaWx0ZXIgYW5kIHByZXR0eS1wcmludCBCdW55YW4gbG9nIGZpbGUgY29udGVudC4nKTtcbiAgICBwKCcnKTtcbiAgICBwKCdHZW5lcmFsIG9wdGlvbnM6Jyk7XG4gICAgcCgnICAtaCwgLS1oZWxwICAgIHByaW50IHRoaXMgaGVscCBpbmZvIGFuZCBleGl0Jyk7XG4gICAgcCgnICAtLXZlcnNpb24gICAgIHByaW50IHZlcnNpb24gb2YgdGhpcyBjb21tYW5kIGFuZCBleGl0Jyk7XG4gICAgcCgnJyk7XG4gICAgcCgnUnVudGltZSBsb2cgc25vb3BpbmcgKHZpYSBEVHJhY2UsIG9ubHkgb24gc3VwcG9ydGVkIHBsYXRmb3Jtcyk6Jyk7XG4gICAgcCgnICAtcCBQSUQgICAgICAgIFByb2Nlc3MgYnVueWFuOmxvZy0qIHByb2JlcyBmcm9tIHRoZSBwcm9jZXNzJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIHdpdGggdGhlIGdpdmVuIFBJRC4gQ2FuIGJlIHVzZWQgbXVsdGlwbGUgdGltZXMsJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIG9yIHNwZWNpZnkgYWxsIHByb2Nlc3NlcyB3aXRoIFwiKlwiLCBvciBhIHNldCBvZicpO1xuICAgIHAoJyAgICAgICAgICAgICAgICBwcm9jZXNzZXMgd2hvc2UgY29tbWFuZCAmIGFyZ3MgbWF0Y2ggYSBwYXR0ZXJuJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIHdpdGggXCItcCBOQU1FXCIuJyk7XG4gICAgcCgnJyk7XG4gICAgcCgnRmlsdGVyaW5nIG9wdGlvbnM6Jyk7XG4gICAgcCgnICAtbCwgLS1sZXZlbCBMRVZFTCcpO1xuICAgIHAoJyAgICAgICAgICAgICAgICBPbmx5IHNob3cgbWVzc2FnZXMgYXQgb3IgYWJvdmUgdGhlIHNwZWNpZmllZCBsZXZlbC4nKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgWW91IGNhbiBzcGVjaWZ5IGxldmVsICpuYW1lcyogb3IgdGhlIGludGVybmFsIG51bWVyaWMnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgdmFsdWVzLicpO1xuICAgIHAoJyAgLWMsIC0tY29uZGl0aW9uIENPTkRJVElPTicpO1xuICAgIHAoJyAgICAgICAgICAgICAgICBSdW4gZWFjaCBsb2cgbWVzc2FnZSB0aHJvdWdoIHRoZSBjb25kaXRpb24gYW5kJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIG9ubHkgc2hvdyB0aG9zZSB0aGF0IHJldHVybiB0cnVpc2guIEUuZy46Jyk7XG4gICAgcCgnICAgICAgICAgICAgICAgICAgICAtYyBcXCd0aGlzLnBpZCA9PSAxMjNcXCcnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgICAgIC1jIFxcJ3RoaXMubGV2ZWwgPT0gREVCVUdcXCcnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgICAgIC1jIFxcJ3RoaXMubXNnLmluZGV4T2YoXCJib29tXCIpICE9IC0xXFwnJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIFwiQ09ORElUSU9OXCIgbXVzdCBiZSBsZWdhbCBKUyBjb2RlLiBgdGhpc2AgaG9sZHMnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgdGhlIGxvZyByZWNvcmQuIFRoZSBUUkFDRSwgREVCVUcsIC4uLiBGQVRBTCB2YWx1ZXMnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgYXJlIGRlZmluZWQgdG8gaGVscCB3aXRoIGNvbXBhcmluZyBgdGhpcy5sZXZlbGAuJyk7XG4gICAgcCgnICAtLXN0cmljdCAgICAgIFN1cHByZXNzIGFsbCBidXQgbGVnYWwgQnVueWFuIEpTT04gbG9nIGxpbmVzLiBCeSBkZWZhdWx0Jyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIG5vbi1KU09OLCBhbmQgbm9uLUJ1bnlhbiBsaW5lcyBhcmUgcGFzc2VkIHRocm91Z2guJyk7XG4gICAgcCgnJyk7XG4gICAgcCgnT3V0cHV0IG9wdGlvbnM6Jyk7XG4gICAgcCgnICAtLXBhZ2VyICAgICAgIFBpcGUgb3V0cHV0IGludG8gYGxlc3NgIChvciAkUEFHRVIgaWYgc2V0KSwgaWYnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgc3Rkb3V0IGlzIGEgVFRZLiBUaGlzIG92ZXJyaWRlcyAkQlVOWUFOX05PX1BBR0VSLicpO1xuICAgIHAoJyAgICAgICAgICAgICAgICBOb3RlOiBQYWdpbmcgaXMgb25seSBzdXBwb3J0ZWQgb24gbm9kZSA+PTAuOC4nKTtcbiAgICBwKCcgIC0tbm8tcGFnZXIgICAgRG8gbm90IHBpcGUgb3V0cHV0IGludG8gYSBwYWdlci4nKTtcbiAgICBwKCcgIC0tY29sb3IgICAgICAgQ29sb3JpemUgb3V0cHV0LiBEZWZhdWx0cyB0byB0cnkgaWYgb3V0cHV0Jyk7XG4gICAgcCgnICAgICAgICAgICAgICAgIHN0cmVhbSBpcyBhIFRUWS4nKTtcbiAgICBwKCcgIC0tbm8tY29sb3IgICAgRm9yY2Ugbm8gY29sb3JpbmcgKGUuZy4gdGVybWluYWwgZG9lc25cXCd0IHN1cHBvcnQgaXQpJyk7XG4gICAgcCgnICAtbywgLS1vdXRwdXQgTU9ERScpO1xuICAgIHAoJyAgICAgICAgICAgICAgICBTcGVjaWZ5IGFuIG91dHB1dCBtb2RlL2Zvcm1hdC4gT25lIG9mJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgICAgbG9uZzogKHRoZSBkZWZhdWx0KSBwcmV0dHknKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgICBqc29uOiBKU09OIG91dHB1dCwgMi1zcGFjZSBpbmRlbnQnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgICBqc29uLU46IEpTT04gb3V0cHV0LCBOLXNwYWNlIGluZGVudCwgZS5nLiBcImpzb24tNFwiJyk7XG4gICAgcCgnICAgICAgICAgICAgICAgICAgYnVueWFuOiAwIGluZGVudGVkIEpTT04sIGJ1bnlhblxcJ3MgbmF0aXZlIGZvcm1hdCcpO1xuICAgIHAoJyAgICAgICAgICAgICAgICAgIGluc3BlY3Q6IG5vZGUuanMgYHV0aWwuaW5zcGVjdGAgb3V0cHV0Jyk7XG4gICAgcCgnICAgICAgICAgICAgICAgICAgc2hvcnQ6IGxpa2UgXCJsb25nXCIsIGJ1dCBtb3JlIGNvbmNpc2UnKTtcbiAgICBwKCcgIC1qICAgICAgICAgICAgc2hvcnRjdXQgZm9yIGAtbyBqc29uYCcpO1xuICAgIHAoJyAgLTAgICAgICAgICAgICBzaG9ydGN1dCBmb3IgYC1vIGJ1bnlhbmAnKTtcbiAgICBwKCcgIC1MLCAtLXRpbWUgbG9jYWwnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgRGlzcGxheSB0aW1lIGZpZWxkIGluIGxvY2FsIHRpbWUsIHJhdGhlciB0aGFuIFVUQy4nKTtcbiAgICBwKCcnKTtcbiAgICBwKCdFbnZpcm9ubWVudCBWYXJpYWJsZXM6Jyk7XG4gICAgcCgnICBCVU5ZQU5fTk9fQ09MT1IgICAgU2V0IHRvIGEgbm9uLWVtcHR5IHZhbHVlIHRvIGZvcmNlIG5vIG91dHB1dCAnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgICAgICBjb2xvcmluZy4gU2VlIFwiLS1uby1jb2xvclwiLicpO1xuICAgIHAoJyAgQlVOWUFOX05PX1BBR0VSICAgIERpc2FibGUgcGlwaW5nIG91dHB1dCB0byBhIHBhZ2VyLiAnKTtcbiAgICBwKCcgICAgICAgICAgICAgICAgICAgICBTZWUgXCItLW5vLXBhZ2VyXCIuJyk7XG4gICAgcCgnJyk7XG4gICAgcCgnU2VlIDxodHRwczovL2dpdGh1Yi5jb20vdHJlbnRtL25vZGUtYnVueWFuPiBmb3IgbW9yZSBjb21wbGV0ZSBkb2NzLicpO1xuICAgIHAoJ1BsZWFzZSByZXBvcnQgYnVncyB0byA8aHR0cHM6Ly9naXRodWIuY29tL3RyZW50bS9ub2RlLWJ1bnlhbi9pc3N1ZXM+LicpO1xuICAgIC8qIEVORCBKU1NUWUxFRCAqL1xufVxuXG4vKlxuICogSWYgdGhlIHVzZXIgc3BlY2lmaWVzIG11bHRpcGxlIGlucHV0IHNvdXJjZXMsIHdlIHdhbnQgdG8gcHJpbnQgb3V0IHJlY29yZHNcbiAqIGZyb20gYWxsIHNvdXJjZXMgaW4gYSBzaW5nbGUsIGNocm9ub2xvZ2ljYWxseSBvcmRlcmVkIHN0cmVhbS4gIFRvIGRvIHRoaXNcbiAqIGVmZmljaWVudGx5LCB3ZSBmaXJzdCBhc3N1bWUgdGhhdCBhbGwgcmVjb3JkcyB3aXRoaW4gZWFjaCBzb3VyY2UgYXJlIG9yZGVyZWRcbiAqIGFscmVhZHksIHNvIHdlIG5lZWQgb25seSBrZWVwIHRyYWNrIG9mIHRoZSBuZXh0IHJlY29yZCBpbiBlYWNoIHNvdXJjZSBhbmRcbiAqIHRoZSB0aW1lIG9mIHRoZSBsYXN0IHJlY29yZCBlbWl0dGVkLiAgVG8gYXZvaWQgZXhjZXNzIG1lbW9yeSB1c2FnZSwgd2VcbiAqIHBhdXNlKCkgc3RyZWFtcyB0aGF0IGFyZSBhaGVhZCBvZiBvdGhlcnMuXG4gKlxuICogJ3N0cmVhbXMnIGlzIGFuIG9iamVjdCBpbmRleGVkIGJ5IHNvdXJjZSBuYW1lIChmaWxlIG5hbWUpIHdoaWNoIHNwZWNpZmllczpcbiAqXG4gKiAgICBzdHJlYW0gICAgICAgIEFjdHVhbCBzdHJlYW0gb2JqZWN0LCBzbyB0aGF0IHdlIGNhbiBwYXVzZSBhbmQgcmVzdW1lIGl0LlxuICpcbiAqICAgIHJlY29yZHMgICAgICAgQXJyYXkgb2YgbG9nIHJlY29yZHMgd2UndmUgcmVhZCwgYnV0IG5vdCB5ZXQgZW1pdHRlZC4gIEVhY2hcbiAqICAgICAgICAgICAgICAgICAgcmVjb3JkIGluY2x1ZGVzICdsaW5lJyAodGhlIHJhdyBsaW5lKSwgJ3JlYycgKHRoZSBKU09OXG4gKiAgICAgICAgICAgICAgICAgIHJlY29yZCksIGFuZCAndGltZScgKHRoZSBwYXJzZWQgdGltZSB2YWx1ZSkuXG4gKlxuICogICAgZG9uZSAgICAgICAgICBXaGV0aGVyIHRoZSBzdHJlYW0gaGFzIGFueSBtb3JlIHJlY29yZHMgdG8gZW1pdC5cbiAqL1xudmFyIHN0cmVhbXMgPSB7fTtcblxuZnVuY3Rpb24gZ290UmVjb3JkKGZpbGUsIGxpbmUsIHJlYywgb3B0cywgc3R5bGl6ZSlcbntcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKHJlYy50aW1lKTtcblxuICAgIHN0cmVhbXNbZmlsZV1bJ3JlY29yZHMnXS5wdXNoKHsgbGluZTogbGluZSwgcmVjOiByZWMsIHRpbWU6IHRpbWUgfSk7XG4gICAgZW1pdE5leHRSZWNvcmQob3B0cywgc3R5bGl6ZSk7XG59XG5cbmZ1bmN0aW9uIGZpbHRlclJlY29yZChyZWMsIG9wdHMpXG57XG4gICAgaWYgKG9wdHMubGV2ZWwgJiYgcmVjLmxldmVsIDwgb3B0cy5sZXZlbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuY29uZEZ1bmNzKSB7XG4gICAgICAgIHZhciByZWNDb3B5ID0gb2JqQ29weShyZWMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdHMuY29uZEZ1bmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFzcyA9IG9wdHMuY29uZEZ1bmNzW2ldLmNhbGwocmVjQ29weSk7XG4gICAgICAgICAgICBpZiAoIXBhc3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLmNvbmRWbSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdHMuY29uZFZtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFzcyA9IG9wdHMuY29uZFZtW2ldLnJ1bkluTmV3Q29udGV4dChyZWMpO1xuICAgICAgICAgICAgaWYgKCFwYXNzKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBlbWl0TmV4dFJlY29yZChvcHRzLCBzdHlsaXplKVxue1xuICAgIHZhciBvZmlsZSwgcmVhZHksIG1pbmZpbGUsIHJlYztcblxuICAgIGZvciAoOzspIHtcbiAgICAgICAgLypcbiAgICAgICAgICogVGFrZSBhIGZpcnN0IHBhc3MgdGhyb3VnaCB0aGUgaW5wdXQgc3RyZWFtcyB0byBzZWUgaWYgd2UgaGF2ZSBhXG4gICAgICAgICAqIHJlY29yZCBmcm9tIGFsbCBvZiB0aGVtLiAgSWYgbm90LCB3ZSdsbCBwYXVzZSBhbnkgc3RyZWFtcyBmb3JcbiAgICAgICAgICogd2hpY2ggd2UgZG8gYWxyZWFkeSBoYXZlIGEgcmVjb3JkICh0byBhdm9pZCBjb25zdW1pbmcgZXhjZXNzXG4gICAgICAgICAqIG1lbW9yeSkgYW5kIHRoZW4gd2FpdCB1bnRpbCB3ZSBoYXZlIHJlY29yZHMgZnJvbSB0aGUgb3RoZXJzXG4gICAgICAgICAqIGJlZm9yZSBlbWl0dGluZyB0aGUgbmV4dCByZWNvcmQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEFzIHBhcnQgb2YgdGhlIHNhbWUgcGFzcywgd2UgbG9vayBmb3IgdGhlIGVhcmxpZXN0IHJlY29yZFxuICAgICAgICAgKiB3ZSBoYXZlIG5vdCB5ZXQgZW1pdHRlZC5cbiAgICAgICAgICovXG4gICAgICAgIG1pbmZpbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChvZmlsZSBpbiBzdHJlYW1zKSB7XG5cbiAgICAgICAgICAgIGlmIChzdHJlYW1zW29maWxlXS5zdHJlYW0gPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAoIXN0cmVhbXNbb2ZpbGVdLmRvbmUgJiYgc3RyZWFtc1tvZmlsZV0ucmVjb3Jkcy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0cmVhbXNbb2ZpbGVdLnJlY29yZHMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgIChtaW5maWxlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtc1ttaW5maWxlXS5yZWNvcmRzWzBdLnRpbWUgPlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtc1tvZmlsZV0ucmVjb3Jkc1swXS50aW1lKSkge1xuICAgICAgICAgICAgICAgIG1pbmZpbGUgPSBvZmlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVhZHkgfHwgbWluZmlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKG9maWxlIGluIHN0cmVhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0cmVhbXNbb2ZpbGVdLnN0cmVhbSB8fCBzdHJlYW1zW29maWxlXS5kb25lKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChzdHJlYW1zW29maWxlXS5yZWNvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW29maWxlXS5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbXNbb2ZpbGVdLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1zW29maWxlXS5zdHJlYW0ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyZWFtc1tvZmlsZV0ucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbXNbb2ZpbGVdLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW1zW29maWxlXS5zdHJlYW0ucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgKiBFbWl0IHRoZSBuZXh0IHJlY29yZCBmb3IgJ21pbmZpbGUnLCBhbmQgaW52b2tlIG91cnNlbHZlcyBhZ2FpbiB0b1xuICAgICAgICAgKiBtYWtlIHN1cmUgd2UgZW1pdCBhcyBtYW55IHJlY29yZHMgYXMgd2UgY2FuIHJpZ2h0IG5vdy5cbiAgICAgICAgICovXG4gICAgICAgIHJlYyA9IHN0cmVhbXNbbWluZmlsZV0ucmVjb3Jkcy5zaGlmdCgpO1xuICAgICAgICBlbWl0UmVjb3JkKHJlYy5yZWMsIHJlYy5saW5lLCBvcHRzLCBzdHlsaXplKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBKUyBjb2RlIHRoYXQgcmV0dXJucy5cbiAqXG4gKiBJZiBubyAncmV0dXJuJyBpbiB0aGUgZ2l2ZW4gamF2YXNjcmlwdCBzbmlwcGV0LCB0aGVuIGFzc3VtZSB3ZSBhcmUgYSBzaW5nbGVcbiAqIHN0YXRlbWVudCBhbmQgd3JhcCBpbiAncmV0dXJuICguLi4pJy4gVGhpcyBpcyBmb3IgY29udmVuaWVuY2UgZm9yIHNob3J0XG4gKiAnLWMgLi4uJyBzbmlwcGV0cy5cbiAqL1xuZnVuY3Rpb24gZnVuY1dpdGhSZXR1cm5Gcm9tU25pcHBldChqcykge1xuICAgIC8vIGF1dG8tXCJyZXR1cm5cIlxuICAgIGlmIChqcy5pbmRleE9mKCdyZXR1cm4nKSA9PT0gLTEpIHtcbiAgICAgICAgaWYgKGpzLnN1YnN0cmluZyhqcy5sZW5ndGggLSAxKSA9PT0gJzsnKSB7XG4gICAgICAgICAgICBqcyA9IGpzLnN1YnN0cmluZygwLCBqcy5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBqcyA9ICdyZXR1cm4gKCcgKyBqcyArICcpJztcbiAgICB9XG5cbiAgICAvLyBFeHBvc2UgbGV2ZWwgZGVmaW5pdGlvbnMgdG8gY29uZGl0aW9uIGZ1bmMgY29udGV4dFxuICAgIHZhciB2YXJEZWZzID0gW107XG4gICAgT2JqZWN0LmtleXModXBwZXJOYW1lRnJvbUxldmVsKS5mb3JFYWNoKGZ1bmN0aW9uIChsdmwpIHtcbiAgICAgICAgdmFyRGVmcy5wdXNoKGZvcm1hdCgndmFyICVzID0gJWQ7JyxcbiAgICAgICAgICAgICAgICB1cHBlck5hbWVGcm9tTGV2ZWxbbHZsXSwgbHZsKSk7XG4gICAgfSk7XG4gICAgdmFyRGVmcyA9IHZhckRlZnMuam9pbignXFxuJykgKyAnXFxuJztcblxuICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKHZhckRlZnMgKyBqcykpO1xufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBjb21tYW5kLWxpbmUgb3B0aW9ucyBhbmQgYXJndW1lbnRzIGludG8gYW4gb2JqZWN0LlxuICpcbiAqICAgIHtcbiAqICAgICAgJ2FyZ3MnOiBbLi4uXSAgICAgICAvLyBhcmd1bWVudHNcbiAqICAgICAgJ2hlbHAnOiB0cnVlLCAgICAgICAvLyB0cnVlIGlmICctaCcgb3B0aW9uIGdpdmVuXG4gKiAgICAgICAvLyBldGMuXG4gKiAgICB9XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcGFyc2VkIG9wdGlvbnMuIGAuYXJnc2AgaXMgdGhlIGFyZ3VtZW50IGxpc3QuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyBhcmd2LlxuICovXG5mdW5jdGlvbiBwYXJzZUFyZ3YoYXJndikge1xuICAgIHZhciBwYXJzZWQgPSB7XG4gICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICBoZWxwOiBmYWxzZSxcbiAgICAgICAgY29sb3I6IG51bGwsXG4gICAgICAgIHBhZ2luYXRlOiBudWxsLFxuICAgICAgICBvdXRwdXRNb2RlOiBPTV9MT05HLFxuICAgICAgICBqc29uSW5kZW50OiAyLFxuICAgICAgICBsZXZlbDogbnVsbCxcbiAgICAgICAgc3RyaWN0OiBmYWxzZSxcbiAgICAgICAgcGlkczogbnVsbCxcbiAgICAgICAgcGlkc1R5cGU6IG51bGwsXG4gICAgICAgIHRpbWVGb3JtYXQ6IFRJTUVfVVRDICAvLyBvbmUgb2YgdGhlIFRJTUVfIGNvbnN0YW50c1xuICAgIH07XG5cbiAgICAvLyBUdXJuICctaUgnIGludG8gJy1pIC1IJywgZXhjZXB0IGZvciBhcmd1bWVudC1hY2NlcHRpbmcgb3B0aW9ucy5cbiAgICB2YXIgYXJncyA9IGFyZ3Yuc2xpY2UoMik7ICAvLyBkcm9wIFsnbm9kZScsICdzY3JpcHRuYW1lJ11cbiAgICB2YXIgbmV3QXJncyA9IFtdO1xuICAgIHZhciBvcHRUYWtlc0FyZyA9IHsnZCc6IHRydWUsICdvJzogdHJ1ZSwgJ2MnOiB0cnVlLCAnbCc6IHRydWUsICdwJzogdHJ1ZX07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcmdzW2ldLmNoYXJBdCgwKSA9PT0gJy0nICYmIGFyZ3NbaV0uY2hhckF0KDEpICE9PSAnLScgJiZcbiAgICAgICAgICAgIGFyZ3NbaV0ubGVuZ3RoID4gMilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHNwbGl0T3B0cyA9IGFyZ3NbaV0uc2xpY2UoMSkuc3BsaXQoJycpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzcGxpdE9wdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2goJy0nICsgc3BsaXRPcHRzW2pdKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0VGFrZXNBcmdbc3BsaXRPcHRzW2pdXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0QXJnID0gc3BsaXRPcHRzLnNsaWNlKGorMSkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRBcmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2gob3B0QXJnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdBcmdzLnB1c2goYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXJncyA9IG5ld0FyZ3M7XG5cbiAgICAvLyBFeHBvc2UgbGV2ZWwgZGVmaW5pdGlvbnMgdG8gY29uZGl0aW9uIHZtIGNvbnRleHRcbiAgICB2YXIgY29uZERlZmluZXMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyh1cHBlck5hbWVGcm9tTGV2ZWwpLmZvckVhY2goZnVuY3Rpb24gKGx2bCkge1xuICAgICAgICBjb25kRGVmaW5lcy5wdXNoKFxuICAgICAgICAgICAgZm9ybWF0KCdPYmplY3QucHJvdG90eXBlLiVzID0gJXM7JywgdXBwZXJOYW1lRnJvbUxldmVsW2x2bF0sIGx2bCkpO1xuICAgIH0pO1xuICAgIGNvbmREZWZpbmVzID0gY29uZERlZmluZXMuam9pbignXFxuJykgKyAnXFxuJztcblxuICAgIHZhciBlbmRPZk9wdGlvbnMgPSBmYWxzZTtcbiAgICB3aGlsZSAoYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBhcmcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIHN3aXRjaCAoYXJnKSB7XG4gICAgICAgICAgICBjYXNlICctLSc6XG4gICAgICAgICAgICAgICAgZW5kT2ZPcHRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy1oJzogLy8gZGlzcGxheSBoZWxwIGFuZCBleGl0XG4gICAgICAgICAgICBjYXNlICctLWhlbHAnOlxuICAgICAgICAgICAgICAgIHBhcnNlZC5oZWxwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy0tdmVyc2lvbic6XG4gICAgICAgICAgICAgICAgcGFyc2VkLnZlcnNpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLS1zdHJpY3QnOlxuICAgICAgICAgICAgICAgIHBhcnNlZC5zdHJpY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLS1jb2xvcic6XG4gICAgICAgICAgICAgICAgcGFyc2VkLmNvbG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy0tbm8tY29sb3InOlxuICAgICAgICAgICAgICAgIHBhcnNlZC5jb2xvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLS1wYWdlcic6XG4gICAgICAgICAgICAgICAgcGFyc2VkLnBhZ2luYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy0tbm8tcGFnZXInOlxuICAgICAgICAgICAgICAgIHBhcnNlZC5wYWdpbmF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLW8nOlxuICAgICAgICAgICAgY2FzZSAnLS1vdXRwdXQnOlxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gYXJncy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHZhciBpZHggPSBuYW1lLmxhc3RJbmRleE9mKCctJyk7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGVudGF0aW9uID0gTnVtYmVyKG5hbWUuc2xpY2UoaWR4KzEpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgaXNOYU4oaW5kZW50YXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuanNvbkluZGVudCA9IGluZGVudGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJzZWQub3V0cHV0TW9kZSA9IE9NX0ZST01fTkFNRVtuYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkLm91dHB1dE1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gb3V0cHV0IG1vZGU6IFwiJytuYW1lKydcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy1qJzogLy8gb3V0cHV0IHdpdGggSlNPTi5zdHJpbmdpZnlcbiAgICAgICAgICAgICAgICBwYXJzZWQub3V0cHV0TW9kZSA9IE9NX0pTT047XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICctMCc6XG4gICAgICAgICAgICAgICAgcGFyc2VkLm91dHB1dE1vZGUgPSBPTV9CVU5ZQU47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICctTCc6XG4gICAgICAgICAgICAgICAgcGFyc2VkLnRpbWVGb3JtYXQgPSBUSU1FX0xPQ0FMO1xuICAgICAgICAgICAgICAgIGlmICghbW9tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb3VsZCBub3QgZmluZCBtb21lbnQgcGFja2FnZSByZXF1aXJlZCBmb3IgXCItTFwiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLS10aW1lJzpcbiAgICAgICAgICAgICAgICB2YXIgdGltZUFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRpbWVBcmcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd1dGMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJzZWQudGltZUZvcm1hdCA9IFRJTUVfVVRDO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnRpbWVGb3JtYXQgPSBUSU1FX0xPQ0FMO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgZmluZCBtb21lbnQgcGFja2FnZSAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAncmVxdWlyZWQgZm9yIFwiLS10aW1lPWxvY2FsXCInKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgYXJndW1lbnQgdG8gXCItLXRpbWVcIicpO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ2ludmFsaWQgdGltZSBmb3JtYXQ6IFwiJXNcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXJnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLXAnOlxuICAgICAgICAgICAgICAgIGlmICghcGFyc2VkLnBpZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnBpZHMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHBpZEFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB2YXIgcGlkID0gKyhwaWRBcmcpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4ocGlkKSB8fCBwaWRBcmcgPT09ICcqJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VkLnBpZHNUeXBlICYmIHBhcnNlZC5waWRzVHlwZSAhPT0gJ251bScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ2Nhbm5vdCBtaXggUElEIG5hbWUgYW5kICdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICdudW1iZXIgYXJndW1lbnRzOiBcIiVzXCInLCBwaWRBcmcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucGlkc1R5cGUgPSAnbnVtJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJzZWQucGlkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnBpZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucGlkcy5wdXNoKGlzTmFOKHBpZCkgPyBwaWRBcmcgOiBwaWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZWQucGlkc1R5cGUgJiYgcGFyc2VkLnBpZHNUeXBlICE9PSAnbmFtZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ2Nhbm5vdCBtaXggUElEIG5hbWUgYW5kICdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICdudW1iZXIgYXJndW1lbnRzOiBcIiVzXCInLCBwaWRBcmcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucGlkc1R5cGUgPSAnbmFtZSc7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5waWRzID0gcGlkQXJnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy1sJzpcbiAgICAgICAgICAgIGNhc2UgJy0tbGV2ZWwnOlxuICAgICAgICAgICAgICAgIHZhciBsZXZlbEFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSArKGxldmVsQXJnKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obGV2ZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldmVsID0gK2xldmVsRnJvbU5hbWVbbGV2ZWxBcmcudG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihsZXZlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGxldmVsIHZhbHVlOiBcIicrbGV2ZWxBcmcrJ1wiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnNlZC5sZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLWMnOlxuICAgICAgICAgICAgY2FzZSAnLS1jb25kaXRpb24nOlxuICAgICAgICAgICAgICAgIGdVc2luZ0NvbmRpdGlvbk9wdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb24gPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKEJvb2xlYW4ocHJvY2Vzcy5lbnYuQlVOWUFOX0VYRUMgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuQlVOWUFOX0VYRUMgPT09ICd2bScpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmNvbmRWbSA9IHBhcnNlZC5jb25kVm0gfHwgW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHROYW1lID0gJ2J1bnlhbi1jb25kaXRpb24tJytwYXJzZWQuY29uZFZtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBjb25kRGVmaW5lcyArIGNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdDtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdCA9IHZtLmNyZWF0ZVNjcmlwdChjb2RlLCBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoY29tcGxFcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ2lsbGVnYWwgQ09ORElUSU9OIGNvZGU6ICVzXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJyAgQ09ORElUSU9OIHNjcmlwdDpcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnJXNcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnICBFcnJvcjpcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnJXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsRXJyLCBpbmRlbnQoY29kZSksIGluZGVudChjb21wbEVyci5zdGFjaykpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGlzIGlzIGEgcmVhc29uYWJseSBzYWZlIENPTkRJVElPTi5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5ydW5Jbk5ld0NvbnRleHQobWluVmFsaWRSZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChjb25kRXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEpTU1RZTEVEICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NPTkRJVElPTiBjb2RlIGNhbm5vdCBzYWZlbHkgZmlsdGVyIGEgbWluaW1hbCBCdW55YW4gbG9nIHJlY29yZFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICcgIENPTkRJVElPTiBzY3JpcHQ6XFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJyVzXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJyAgTWluaW1hbCBCdW55YW4gbG9nIHJlY29yZDpcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnJXNcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnICBGaWx0ZXIgZXJyb3I6XFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJyVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQoY29kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50KEpTT04uc3RyaW5naWZ5KG1pblZhbGlkUmVjb3JkLCBudWxsLCAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50KGNvbmRFcnIuc3RhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmNvbmRWbS5wdXNoKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5jb25kRnVuY3MgPSBwYXJzZWQuY29uZEZ1bmNzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQuY29uZEZ1bmNzLnB1c2goZnVuY1dpdGhSZXR1cm5Gcm9tU25pcHBldChjb25kaXRpb24pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICBpZiAoIWVuZE9mT3B0aW9ucyAmJiBhcmcubGVuZ3RoID4gMCAmJiBhcmdbMF0gPT09ICctJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gb3B0aW9uIFwiJythcmcrJ1wiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnNlZC5hcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL1RPRE86ICctLScgaGFuZGxpbmcgYW5kIGVycm9yIG9uIGEgZmlyc3QgYXJnIHRoYXQgbG9va3MgbGlrZSBhbiBvcHRpb24uXG5cbiAgICByZXR1cm4gcGFyc2VkO1xufVxuXG5cbmZ1bmN0aW9uIGlzSW50ZWdlcihzKSB7XG4gICAgcmV0dXJuIChzLnNlYXJjaCgvXi0/WzAtOV0rJC8pID09IDApO1xufVxuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuLy8gU3VnZ2VzdGVkIGNvbG9ycyAoc29tZSBhcmUgdW5yZWFkYWJsZSBpbiBjb21tb24gY2FzZXMpOlxuLy8gLSBHb29kOiBjeWFuLCB5ZWxsb3cgKGxpbWl0ZWQgdXNlKSwgYm9sZCwgZ3JlZW4sIG1hZ2VudGEsIHJlZFxuLy8gLSBCYWQ6IGJsdWUgKG5vdCB2aXNpYmxlIG9uIGNtZC5leGUpLCBncmV5IChzYW1lIGNvbG9yIGFzIGJhY2tncm91bmQgb25cbi8vICAgU29sYXJpemVkIERhcmsgdGhlbWUgZnJvbSA8aHR0cHM6Ly9naXRodWIuY29tL2FsdGVyY2F0aW9uL3NvbGFyaXplZD4sIHNlZVxuLy8gICBpc3N1ZSAjMTYwKVxudmFyIGNvbG9ycyA9IHtcbiAgICAnYm9sZCcgOiBbMSwgMjJdLFxuICAgICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAgICdibHVlJyA6IFszNCwgMzldLFxuICAgICdjeWFuJyA6IFszNiwgMzldLFxuICAgICdncmVlbicgOiBbMzIsIDM5XSxcbiAgICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgICAncmVkJyA6IFszMSwgMzldLFxuICAgICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBjb2xvcikge1xuICAgIGlmICghc3RyKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgdmFyIGNvZGVzID0gY29sb3JzW2NvbG9yXTtcbiAgICBpZiAoY29kZXMpIHtcbiAgICAgICAgcmV0dXJuIHYwMzMgKyAnWycgKyBjb2Rlc1swXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICAgICAgICAgICB2MDMzICsgJ1snICsgY29kZXNbMV0gKyAnbSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRob3V0Q29sb3Ioc3RyLCBjb2xvcikge1xuICAgIHJldHVybiBzdHI7XG59XG5cblxuLyoqXG4gKiBJcyB0aGlzIGEgdmFsaWQgQnVueWFuIGxvZyByZWNvcmQuXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRSZWNvcmQocmVjKSB7XG4gICAgaWYgKHJlYy52ID09IG51bGwgfHxcbiAgICAgICAgICAgIHJlYy5sZXZlbCA9PSBudWxsIHx8XG4gICAgICAgICAgICByZWMubmFtZSA9PSBudWxsIHx8XG4gICAgICAgICAgICByZWMuaG9zdG5hbWUgPT0gbnVsbCB8fFxuICAgICAgICAgICAgcmVjLnBpZCA9PSBudWxsIHx8XG4gICAgICAgICAgICByZWMudGltZSA9PSBudWxsIHx8XG4gICAgICAgICAgICByZWMubXNnID09IG51bGwpIHtcbiAgICAgICAgLy8gTm90IHZhbGlkIEJ1bnlhbiBsb2cuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG52YXIgbWluVmFsaWRSZWNvcmQgPSB7XG4gICAgdjogMCwgICAvL1RPRE86IGdldCB0aGlzIGZyb20gYnVueWFuLkxPR19WRVJTSU9OXG4gICAgbGV2ZWw6IElORk8sXG4gICAgbmFtZTogJ25hbWUnLFxuICAgIGhvc3RuYW1lOiAnaG9zdG5hbWUnLFxuICAgIHBpZDogMTIzLFxuICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgbXNnOiAnbXNnJ1xufTtcblxuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gbG9nIGxpbmUgYW5kIGVpdGhlciBlbWl0cyBpdCByaWdodCBhd2F5IChmb3IgaW52YWxpZFxuICogcmVjb3Jkcykgb3IgZW5xdWV1ZXMgaXQgZm9yIGVtaXR0aW5nIGxhdGVyIHdoZW4gaXQncyB0aGUgbmV4dCBsaW5lIHRvIHNob3cuXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUxvZ0xpbmUoZmlsZSwgbGluZSwgb3B0cywgc3R5bGl6ZSkge1xuICAgIGN1cnJMaW5lID0gbGluZTsgLy8gaW50ZW50aW9uYWxseSBnbG9iYWxcblxuICAgIC8vIEVtaXQgbm9uLUpTT04gbGluZXMgaW1tZWRpYXRlbHkuXG4gICAgdmFyIHJlYztcbiAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgaWYgKCFvcHRzLnN0cmljdCkgZW1pdChsaW5lICsgJ1xcbicpO1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChsaW5lWzBdICE9PSAneycpIHtcbiAgICAgICAgaWYgKCFvcHRzLnN0cmljdCkgZW1pdChsaW5lICsgJ1xcbicpOyAgLy8gbm90IEpTT05cbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZWMgPSBKU09OLnBhcnNlKGxpbmUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoIW9wdHMuc3RyaWN0KSBlbWl0KGxpbmUgKyAnXFxuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWRSZWNvcmQocmVjKSkge1xuICAgICAgICBpZiAoIW9wdHMuc3RyaWN0KSBlbWl0KGxpbmUgKyAnXFxuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWZpbHRlclJlY29yZChyZWMsIG9wdHMpKVxuICAgICAgICByZXR1cm47XG5cbiAgICBpZiAoZmlsZSA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGVtaXRSZWNvcmQocmVjLCBsaW5lLCBvcHRzLCBzdHlsaXplKTtcblxuICAgIHJldHVybiBnb3RSZWNvcmQoZmlsZSwgbGluZSwgcmVjLCBvcHRzLCBzdHlsaXplKTtcbn1cblxuLyoqXG4gKiBQcmludCBvdXQgYSBzaW5nbGUgcmVzdWx0LCBjb25zaWRlcmluZyBpbnB1dCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBlbWl0UmVjb3JkKHJlYywgbGluZSwgb3B0cywgc3R5bGl6ZSkge1xuICAgIHZhciBzaG9ydCA9IGZhbHNlO1xuXG4gICAgc3dpdGNoIChvcHRzLm91dHB1dE1vZGUpIHtcbiAgICBjYXNlIE9NX1NIT1JUOlxuICAgICAgICBzaG9ydCA9IHRydWU7XG4gICAgICAgIC8qIGpzbDpmYWxsLXRocnUgKi9cblxuICAgIGNhc2UgT01fTE9ORzpcbiAgICAgICAgLy8gICAgW3RpbWVdIExFVkVMOiBuYW1lWy9jb21wXS9waWQgb24gaG9zdG5hbWUgKHNyYyk6IG1zZyogKGV4dHJhcy4uLilcbiAgICAgICAgLy8gICAgICAgIG1zZypcbiAgICAgICAgLy8gICAgICAgIC0tXG4gICAgICAgIC8vICAgICAgICBsb25nIGFuZCBtdWx0aS1saW5lIGV4dHJhc1xuICAgICAgICAvLyAgICAgICAgLi4uXG4gICAgICAgIC8vIElmICdtc2cnIGlzIHNpbmdsZS1saW5lLCB0aGVuIGl0IGdvZXMgaW4gdGhlIHRvcCBsaW5lLlxuICAgICAgICAvLyBJZiAncmVxJywgc2hvdyB0aGUgcmVxdWVzdC5cbiAgICAgICAgLy8gSWYgJ3JlcycsIHNob3cgdGhlIHJlc3BvbnNlLlxuICAgICAgICAvLyBJZiAnZXJyJyBhbmQgJ2Vyci5zdGFjaycgdGhlbiBzaG93IHRoYXQuXG4gICAgICAgIGlmICghaXNWYWxpZFJlY29yZChyZWMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1pdChsaW5lICsgJ1xcbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIHJlYy52O1xuXG4gICAgICAgIC8vIFRpbWUuXG4gICAgICAgIHZhciB0aW1lO1xuICAgICAgICBpZiAoIXNob3J0ICYmIG9wdHMudGltZUZvcm1hdCA9PT0gVElNRV9VVEMpIHtcbiAgICAgICAgICAgIC8vIEZhc3QgZGVmYXVsdCBwYXRoOiBXZSBhc3N1bWUgdGhlIHJhdyBgcmVjLnRpbWVgIGlzIGEgVVRDIHRpbWVcbiAgICAgICAgICAgIC8vIGluIElTTyA4NjAxIGZvcm1hdCAocGVyIHNwZWMpLlxuICAgICAgICAgICAgdGltZSA9ICdbJyArIHJlYy50aW1lICsgJ10nO1xuICAgICAgICB9IGVsc2UgaWYgKCFtb21lbnQgJiYgb3B0cy50aW1lRm9ybWF0ID09PSBUSU1FX1VUQykge1xuICAgICAgICAgICAgLy8gRG9uJ3QgcmVxdWlyZSBtb21lbnRqcyBpbnN0YWxsLCBhcyBsb25nIGFzIG5vdCB1c2luZyBUSU1FX0xPQ0FMLlxuICAgICAgICAgICAgdGltZSA9IHJlYy50aW1lLnN1YnN0cigxMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdHpGb3JtYXQ7XG4gICAgICAgICAgICB2YXIgbW9UaW1lID0gbW9tZW50KHJlYy50aW1lKTtcbiAgICAgICAgICAgIHN3aXRjaCAob3B0cy50aW1lRm9ybWF0KSB7XG4gICAgICAgICAgICBjYXNlIFRJTUVfVVRDOlxuICAgICAgICAgICAgICAgIHR6Rm9ybWF0ID0gVElNRVpPTkVfVVRDX0ZPUk1BVFNbc2hvcnQgPyAnc2hvcnQnIDogJ2xvbmcnXTtcbiAgICAgICAgICAgICAgICBtb1RpbWUudXRjKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRJTUVfTE9DQUw6XG4gICAgICAgICAgICAgICAgdHpGb3JtYXQgPSBUSU1FWk9ORV9MT0NBTF9GT1JNQVRTW3Nob3J0ID8gJ3Nob3J0JyA6ICdsb25nJ107XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCB0aW1lRm9ybWF0OiAnICsgb3B0cy50aW1lRm9ybWF0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aW1lID0gbW9UaW1lLmZvcm1hdCh0ekZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGltZSA9IHN0eWxpemUodGltZSwgJ1hYWCcpO1xuICAgICAgICBkZWxldGUgcmVjLnRpbWU7XG5cbiAgICAgICAgdmFyIG5hbWVTdHIgPSByZWMubmFtZTtcbiAgICAgICAgZGVsZXRlIHJlYy5uYW1lO1xuXG4gICAgICAgIGlmIChyZWMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICBuYW1lU3RyICs9ICcvJyArIHJlYy5jb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHJlYy5jb21wb25lbnQ7XG5cbiAgICAgICAgaWYgKCFzaG9ydClcbiAgICAgICAgICAgIG5hbWVTdHIgKz0gJy8nICsgcmVjLnBpZDtcbiAgICAgICAgZGVsZXRlIHJlYy5waWQ7XG5cbiAgICAgICAgdmFyIGxldmVsID0gKHVwcGVyUGFkZGVkTmFtZUZyb21MZXZlbFtyZWMubGV2ZWxdIHx8ICdMVkwnICsgcmVjLmxldmVsKTtcbiAgICAgICAgaWYgKG9wdHMuY29sb3IpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckZyb21MZXZlbCA9IHtcbiAgICAgICAgICAgICAgICAxMDogJ3doaXRlJywgICAgLy8gVFJBQ0VcbiAgICAgICAgICAgICAgICAyMDogJ3llbGxvdycsICAgLy8gREVCVUdcbiAgICAgICAgICAgICAgICAzMDogJ2N5YW4nLCAgICAgLy8gSU5GT1xuICAgICAgICAgICAgICAgIDQwOiAnbWFnZW50YScsICAvLyBXQVJOXG4gICAgICAgICAgICAgICAgNTA6ICdyZWQnLCAgICAgIC8vIEVSUk9SXG4gICAgICAgICAgICAgICAgNjA6ICdpbnZlcnNlJywgIC8vIEZBVEFMXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV2ZWwgPSBzdHlsaXplKGxldmVsLCBjb2xvckZyb21MZXZlbFtyZWMubGV2ZWxdKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgcmVjLmxldmVsO1xuXG4gICAgICAgIHZhciBzcmMgPSAnJztcbiAgICAgICAgaWYgKHJlYy5zcmMgJiYgcmVjLnNyYy5maWxlKSB7XG4gICAgICAgICAgICB2YXIgcyA9IHJlYy5zcmM7XG4gICAgICAgICAgICBpZiAocy5mdW5jKSB7XG4gICAgICAgICAgICAgICAgc3JjID0gZm9ybWF0KCcgKCVzOiVkIGluICVzKScsIHMuZmlsZSwgcy5saW5lLCBzLmZ1bmMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzcmMgPSBmb3JtYXQoJyAoJXM6JWQpJywgcy5maWxlLCBzLmxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JjID0gc3R5bGl6ZShzcmMsICdncmVlbicpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSByZWMuc3JjO1xuXG4gICAgICAgIHZhciBob3N0bmFtZSA9IHJlYy5ob3N0bmFtZTtcbiAgICAgICAgZGVsZXRlIHJlYy5ob3N0bmFtZTtcblxuICAgICAgICB2YXIgZXh0cmFzID0gW107XG4gICAgICAgIHZhciBkZXRhaWxzID0gW107XG5cbiAgICAgICAgaWYgKHJlYy5yZXFfaWQpIHtcbiAgICAgICAgICAgIGV4dHJhcy5wdXNoKCdyZXFfaWQ9JyArIHJlYy5yZXFfaWQpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSByZWMucmVxX2lkO1xuICAgICAgICBpZiAocmVjLnJlcUlkKSB7XG4gICAgICAgICAgICBleHRyYXMucHVzaCgncmVxSWQ9JyArIHJlYy5yZXFJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHJlYy5yZXFJZDtcblxuICAgICAgICB2YXIgb25lbGluZU1zZztcbiAgICAgICAgaWYgKHJlYy5tc2cuaW5kZXhPZignXFxuJykgIT09IC0xKSB7XG4gICAgICAgICAgICBvbmVsaW5lTXNnID0gJyc7XG4gICAgICAgICAgICBkZXRhaWxzLnB1c2goaW5kZW50KHN0eWxpemUocmVjLm1zZykpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uZWxpbmVNc2cgPSAnICcgKyBzdHlsaXplKHJlYy5tc2cpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSByZWMubXNnO1xuXG4gICAgICAgIGlmIChyZWMucmVxICYmIHR5cGVvZiAocmVjLnJlcSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgcmVxID0gcmVjLnJlcTtcbiAgICAgICAgICAgIGRlbGV0ZSByZWMucmVxO1xuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSByZXEuaGVhZGVycztcbiAgICAgICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChoZWFkZXJzKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzID0gJ1xcbicgKyBoZWFkZXJzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKGhlYWRlcnMpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMgPSAnXFxuJyArIE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcChmdW5jdGlvbiAoaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaCArICc6ICcgKyBoZWFkZXJzW2hdO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHMgPSBmb3JtYXQoJyVzICVzIEhUVFAvJXMlcycsIHJlcS5tZXRob2QsXG4gICAgICAgICAgICAgICAgcmVxLnVybCxcbiAgICAgICAgICAgICAgICByZXEuaHR0cFZlcnNpb24gfHwgJzEuMScsXG4gICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlbGV0ZSByZXEudXJsO1xuICAgICAgICAgICAgZGVsZXRlIHJlcS5tZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgcmVxLmh0dHBWZXJzaW9uO1xuICAgICAgICAgICAgZGVsZXRlIHJlcS5oZWFkZXJzO1xuICAgICAgICAgICAgaWYgKHJlcS5ib2R5KSB7XG4gICAgICAgICAgICAgICAgcyArPSAnXFxuXFxuJyArICh0eXBlb2YgKHJlcS5ib2R5KSA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeShyZXEuYm9keSwgbnVsbCwgMikgOiByZXEuYm9keSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlcS5ib2R5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcS50cmFpbGVycyAmJiBPYmplY3Qua2V5cyhyZXEudHJhaWxlcnMpID4gMCkge1xuICAgICAgICAgICAgICAgIHMgKz0gJ1xcbicgKyBPYmplY3Qua2V5cyhyZXEudHJhaWxlcnMpLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCArICc6ICcgKyByZXEudHJhaWxlcnNbdF07XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgcmVxLnRyYWlsZXJzO1xuICAgICAgICAgICAgZGV0YWlscy5wdXNoKGluZGVudChzKSk7XG4gICAgICAgICAgICAvLyBFLmcuIGZvciBleHRyYSAnZm9vJyBmaWVsZCBvbiAncmVxJywgYWRkICdyZXEuZm9vJyBhdFxuICAgICAgICAgICAgLy8gdG9wLWxldmVsLiBUaGlzICpkb2VzKiBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gc3RvbXAgb24gYVxuICAgICAgICAgICAgLy8gbGl0ZXJhbCAncmVxLmZvbycga2V5LlxuICAgICAgICAgICAgT2JqZWN0LmtleXMocmVxKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgcmVjWydyZXEuJyArIGtdID0gcmVxW2tdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWMuY2xpZW50X3JlcSAmJiB0eXBlb2YgKHJlYy5jbGllbnRfcmVxKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBjbGllbnRfcmVxID0gcmVjLmNsaWVudF9yZXE7XG4gICAgICAgICAgICBkZWxldGUgcmVjLmNsaWVudF9yZXE7XG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IGNsaWVudF9yZXEuaGVhZGVycztcbiAgICAgICAgICAgIHZhciBob3N0SGVhZGVyTGluZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHMgPSAnJztcbiAgICAgICAgICAgIGlmIChjbGllbnRfcmVxLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICBob3N0SGVhZGVyTGluZSA9ICdcXG5Ib3N0OiAnICsgY2xpZW50X3JlcS5hZGRyZXNzO1xuICAgICAgICAgICAgICAgIGlmIChjbGllbnRfcmVxLnBvcnQpXG4gICAgICAgICAgICAgICAgICAgIGhvc3RIZWFkZXJMaW5lICs9ICc6JyArIGNsaWVudF9yZXEucG9ydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRfcmVxLmhlYWRlcnM7XG4gICAgICAgICAgICBkZWxldGUgY2xpZW50X3JlcS5hZGRyZXNzO1xuICAgICAgICAgICAgZGVsZXRlIGNsaWVudF9yZXEucG9ydDtcbiAgICAgICAgICAgIHMgKz0gZm9ybWF0KCclcyAlcyBIVFRQLyVzJXMlcycsIGNsaWVudF9yZXEubWV0aG9kLFxuICAgICAgICAgICAgICAgIGNsaWVudF9yZXEudXJsLFxuICAgICAgICAgICAgICAgIGNsaWVudF9yZXEuaHR0cFZlcnNpb24gfHwgJzEuMScsXG4gICAgICAgICAgICAgICAgaG9zdEhlYWRlckxpbmUsXG4gICAgICAgICAgICAgICAgKGhlYWRlcnMgP1xuICAgICAgICAgICAgICAgICAgICAnXFxuJyArIE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGggKyAnOiAnICsgaGVhZGVyc1toXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpIDpcbiAgICAgICAgICAgICAgICAgICAgJycpKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRfcmVxLm1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRfcmVxLnVybDtcbiAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRfcmVxLmh0dHBWZXJzaW9uO1xuICAgICAgICAgICAgaWYgKGNsaWVudF9yZXEuYm9keSkge1xuICAgICAgICAgICAgICAgIHMgKz0gJ1xcblxcbicgKyAodHlwZW9mIChjbGllbnRfcmVxLmJvZHkpID09PSAnb2JqZWN0JyA/XG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGNsaWVudF9yZXEuYm9keSwgbnVsbCwgMikgOlxuICAgICAgICAgICAgICAgICAgICBjbGllbnRfcmVxLmJvZHkpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRfcmVxLmJvZHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFLmcuIGZvciBleHRyYSAnZm9vJyBmaWVsZCBvbiAnY2xpZW50X3JlcScsIGFkZFxuICAgICAgICAgICAgLy8gJ2NsaWVudF9yZXEuZm9vJyBhdCB0b3AtbGV2ZWwuIFRoaXMgKmRvZXMqIGhhdmUgdGhlIHBvdGVudGlhbFxuICAgICAgICAgICAgLy8gdG8gc3RvbXAgb24gYSBsaXRlcmFsICdjbGllbnRfcmVxLmZvbycga2V5LlxuICAgICAgICAgICAgT2JqZWN0LmtleXMoY2xpZW50X3JlcSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgIHJlY1snY2xpZW50X3JlcS4nICsga10gPSBjbGllbnRfcmVxW2tdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRldGFpbHMucHVzaChpbmRlbnQocykpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX3JlcyhyZXMpIHtcbiAgICAgICAgICAgIHZhciBzID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHMgKz0gZm9ybWF0KCdIVFRQLzEuMSAlcyAlc1xcbicsIHJlcy5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICAgICAgICBodHRwLlNUQVRVU19DT0RFU1tyZXMuc3RhdHVzQ29kZV0pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByZXMuc3RhdHVzQ29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBgcmVzLmhlYWRlcmAgb3IgYHJlcy5oZWFkZXJzYCBhcyBlaXRoZXIgYSBzdHJpbmcgb3JcbiAgICAgICAgICAgIC8vIGFuZCBvYmplY3Qgb2YgaGVhZGVyIGtleS92YWx1ZSBwYWlycy4gUHJlZmVyIGByZXMuaGVhZGVyYCBpZiBzZXRcbiAgICAgICAgICAgIC8vIChUT0RPOiBXaHk/IEkgZG9uJ3QgcmVjYWxsLiBUeXBpY2FsIG9mIHJlc3RpZnkgc2VyaWFsaXplcj9cbiAgICAgICAgICAgIC8vIFR5cGljYWwgSlNPTi5zdHJpbmdpZnkgb2YgYSBjb3JlIG5vZGUgSHR0cFJlc3BvbnNlPylcbiAgICAgICAgICAgIHZhciBoZWFkZXJUeXBlcyA9IHtzdHJpbmc6IHRydWUsIG9iamVjdDogdHJ1ZX07XG4gICAgICAgICAgICB2YXIgaGVhZGVycztcbiAgICAgICAgICAgIGlmIChyZXMuaGVhZGVyICYmIGhlYWRlclR5cGVzW3R5cGVvZiAocmVzLmhlYWRlcildKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycyA9IHJlcy5oZWFkZXI7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlcy5oZWFkZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5oZWFkZXJzICYmIGhlYWRlclR5cGVzW3R5cGVvZiAocmVzLmhlYWRlcnMpXSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMgPSByZXMuaGVhZGVycztcbiAgICAgICAgICAgICAgICBkZWxldGUgcmVzLmhlYWRlcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGVhZGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLyogcGFzcyB0aHJvdWdoICovXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAoaGVhZGVycykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcyArPSBoZWFkZXJzLnRyaW1SaWdodCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzICs9IE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcChcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGgpIHsgcmV0dXJuIGggKyAnOiAnICsgaGVhZGVyc1toXTsgfSkuam9pbignXFxuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLmJvZHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gKHR5cGVvZiAocmVzLmJvZHkpID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IEpTT04uc3RyaW5naWZ5KHJlcy5ib2R5LCBudWxsLCAyKSA6IHJlcy5ib2R5KTtcbiAgICAgICAgICAgICAgICBpZiAoYm9keS5sZW5ndGggPiAwKSB7IHMgKz0gJ1xcblxcbicgKyBib2R5IH07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlcy5ib2R5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gcy50cmltUmlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMudHJhaWxlcikge1xuICAgICAgICAgICAgICAgIHMgKz0gJ1xcbicgKyByZXMudHJhaWxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSByZXMudHJhaWxlcjtcbiAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5wdXNoKGluZGVudChzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFLmcuIGZvciBleHRyYSAnZm9vJyBmaWVsZCBvbiAncmVzJywgYWRkICdyZXMuZm9vJyBhdFxuICAgICAgICAgICAgLy8gdG9wLWxldmVsLiBUaGlzICpkb2VzKiBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gc3RvbXAgb24gYVxuICAgICAgICAgICAgLy8gbGl0ZXJhbCAncmVzLmZvbycga2V5LlxuICAgICAgICAgICAgT2JqZWN0LmtleXMocmVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgcmVjWydyZXMuJyArIGtdID0gcmVzW2tdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVjLnJlcyAmJiB0eXBlb2YgKHJlYy5yZXMpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgX3JlcyhyZWMucmVzKTtcbiAgICAgICAgICAgIGRlbGV0ZSByZWMucmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWMuY2xpZW50X3JlcyAmJiB0eXBlb2YgKHJlYy5jbGllbnRfcmVzKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIF9yZXMocmVjLmNsaWVudF9yZXMpO1xuICAgICAgICAgICAgZGVsZXRlIHJlYy5jbGllbnRfcmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlYy5lcnIgJiYgcmVjLmVyci5zdGFjaykge1xuICAgICAgICAgICAgdmFyIGVyciA9IHJlYy5lcnJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGVyci5zdGFjaykgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5wdXNoKGluZGVudChlcnIuc3RhY2sudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXRhaWxzLnB1c2goaW5kZW50KGVyci5zdGFjaykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgZGVsZXRlIGVyci5uYW1lO1xuICAgICAgICAgICAgZGVsZXRlIGVyci5zdGFjaztcbiAgICAgICAgICAgIC8vIEUuZy4gZm9yIGV4dHJhICdmb28nIGZpZWxkIG9uICdlcnInLCBhZGQgJ2Vyci5mb28nIGF0XG4gICAgICAgICAgICAvLyB0b3AtbGV2ZWwuIFRoaXMgKmRvZXMqIGhhdmUgdGhlIHBvdGVudGlhbCB0byBzdG9tcCBvbiBhXG4gICAgICAgICAgICAvLyBsaXRlcmFsICdlcnIuZm9vJyBrZXkuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhlcnIpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgICAgICByZWNbJ2Vyci4nICsga10gPSBlcnJba107XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGVsZXRlIHJlYy5lcnI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVmdG92ZXIgPSBPYmplY3Qua2V5cyhyZWMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlZnRvdmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gbGVmdG92ZXJbaV07XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZWNba2V5XTtcbiAgICAgICAgICAgIHZhciBzdHJpbmdpZmllZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpO1xuICAgICAgICAgICAgICAgIHN0cmluZ2lmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgfHwgdmFsdWUubGVuZ3RoID4gNTApIHtcbiAgICAgICAgICAgICAgICBkZXRhaWxzLnB1c2goaW5kZW50KGtleSArICc6ICcgKyB2YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaW5naWZpZWQgJiYgKHZhbHVlLmluZGV4T2YoJyAnKSAhPSAtMSB8fFxuICAgICAgICAgICAgICAgIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXh0cmFzLnB1c2goa2V5ICsgJz0nICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXh0cmFzLnB1c2goa2V5ICsgJz0nICsgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0cmFzID0gc3R5bGl6ZShcbiAgICAgICAgICAgIChleHRyYXMubGVuZ3RoID8gJyAoJyArIGV4dHJhcy5qb2luKCcsICcpICsgJyknIDogJycpLCAnWFhYJyk7XG4gICAgICAgIGRldGFpbHMgPSBzdHlsaXplKFxuICAgICAgICAgICAgKGRldGFpbHMubGVuZ3RoID8gZGV0YWlscy5qb2luKCdcXG4gICAgLS1cXG4nKSArICdcXG4nIDogJycpLCAnWFhYJyk7XG4gICAgICAgIGlmICghc2hvcnQpXG4gICAgICAgICAgICBlbWl0KGZvcm1hdCgnJXMgJXM6ICVzIG9uICVzJXM6JXMlc1xcbiVzJyxcbiAgICAgICAgICAgICAgICB0aW1lLFxuICAgICAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgICAgIG5hbWVTdHIsXG4gICAgICAgICAgICAgICAgaG9zdG5hbWUgfHwgJzxuby1ob3N0bmFtZT4nLFxuICAgICAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgICAgICBvbmVsaW5lTXNnLFxuICAgICAgICAgICAgICAgIGV4dHJhcyxcbiAgICAgICAgICAgICAgICBkZXRhaWxzKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBpZihbJ2FwcC9yZXEnLCAndWFwcC9yZXEnXS5maWx0ZXIobmFtZSA9PiBuYW1lU3RyLnN1YnN0cigwLCBuYW1lLmxlbmd0aCkudG9Mb3dlckNhc2UoKT09PSBuYW1lLnRvTG93ZXJDYXNlKCkpLmxlbmd0aCkge1xuICAgICAgICAgIC8vIGlmKG5hbWVTdHIuc3Vic3RyKDAsICdhcHAvcmVxJy5sZW5ndGgpID09PSAnYXBwL3JlcScpIHtcbiAgICAgICAgICAgIGVtaXQoZm9ybWF0KCclcyVzXFxuJyxcbiAgICAgICAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICAgICAgICBvbmVsaW5lTXNnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKFsnYXBwJywgJ3VhcHAnXS5maWx0ZXIobmFtZSA9PiBuYW1lU3RyLnN1YnN0cigwLCBuYW1lLmxlbmd0aCkudG9Mb3dlckNhc2UoKT09PSBuYW1lLnRvTG93ZXJDYXNlKCkpLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gaWYobmFtZVN0ci5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgICBlbWl0KGZvcm1hdCgnJXMgJXM6JXMlc1xcbiVzJyxcbiAgICAgICAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgICAgICAgbmFtZVN0cixcbiAgICAgICAgICAgICAgICAgIG9uZWxpbmVNc2csXG4gICAgICAgICAgICAgICAgICBleHRyYXMsXG4gICAgICAgICAgICAgICAgICBkZXRhaWxzKSk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge31cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbWl0KGZvcm1hdCgnJXMgJXMgJXM6JXMlc1xcbiVzJyxcbiAgICAgICAgICAgICAgICB0aW1lLFxuICAgICAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgICAgIG5hbWVTdHIsXG4gICAgICAgICAgICAgICAgb25lbGluZU1zZyxcbiAgICAgICAgICAgICAgICBleHRyYXMsXG4gICAgICAgICAgICAgICAgZGV0YWlscykpO1xuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIE9NX0lOU1BFQ1Q6XG4gICAgICAgIGVtaXQodXRpbC5pbnNwZWN0KHJlYywgZmFsc2UsIEluZmluaXR5LCB0cnVlKSArICdcXG4nKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIE9NX0JVTllBTjpcbiAgICAgICAgZW1pdChKU09OLnN0cmluZ2lmeShyZWMsIG51bGwsIDApICsgJ1xcbicpO1xuICAgICAgICBicmVhaztcblxuICAgIGNhc2UgT01fSlNPTjpcbiAgICAgICAgZW1pdChKU09OLnN0cmluZ2lmeShyZWMsIG51bGwsIG9wdHMuanNvbkluZGVudCkgKyAnXFxuJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBPTV9TSU1QTEU6XG4gICAgICAgIC8qIEpTU1RZTEVEICovXG4gICAgICAgIC8vIDxodHRwOi8vbG9nZ2luZy5hcGFjaGUub3JnL2xvZzRqLzEuMi9hcGlkb2NzL29yZy9hcGFjaGUvbG9nNGovU2ltcGxlTGF5b3V0Lmh0bWw+XG4gICAgICAgIGlmICghaXNWYWxpZFJlY29yZChyZWMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1pdChsaW5lICsgJ1xcbicpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXQoZm9ybWF0KCclcyAtICVzXFxuJyxcbiAgICAgICAgICAgIHVwcGVyTmFtZUZyb21MZXZlbFtyZWMubGV2ZWxdIHx8ICdMVkwnICsgcmVjLmxldmVsLFxuICAgICAgICAgICAgcmVjLm1zZykpO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gb3V0cHV0IG1vZGU6ICcrb3B0cy5vdXRwdXRNb2RlKTtcbiAgICB9XG59XG5cblxudmFyIHN0ZG91dEZsdXNoZWQgPSB0cnVlO1xuZnVuY3Rpb24gZW1pdChzKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgc3Rkb3V0Rmx1c2hlZCA9IHN0ZG91dC53cml0ZShzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXhjZXB0aW9ucyBpbiBzdGRvdXQgd3JpdGluZyBpbiBgc3Rkb3V0Lm9uKCdlcnJvcicsIC4uLilgLlxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgaGFja2VkIHVwIHZlcnNpb24gb2YgJ3Byb2Nlc3MuZXhpdCcgdGhhdCB3aWxsIGZpcnN0IGRyYWluIHN0ZG91dFxuICogYmVmb3JlIGV4aXRpbmcuICpXQVJOSU5HOiBUaGlzIGRvZXNuJ3Qgc3RvcCBldmVudCBwcm9jZXNzaW5nLiogSU9XLFxuICogY2FsbGVycyBoYXZlIHRvIGJlIGNhcmVmdWwgdGhhdCBjb2RlIGZvbGxvd2luZyB0aGlzIGNhbGwgaXNuJ3RcbiAqIGFjY2lkZW50YWxseSBleGVjdXRlZC5cbiAqXG4gKiBJbiBub2RlIHYwLjYgXCJwcm9jZXNzLnN0ZG91dCBhbmQgcHJvY2Vzcy5zdGRlcnIgYXJlIGJsb2NraW5nIHdoZW4gdGhleVxuICogcmVmZXIgdG8gcmVndWxhciBmaWxlcyBvciBUVFkgZmlsZSBkZXNjcmlwdG9ycy5cIiBIb3dldmVyLCB0aGlzIGhhY2sgbWlnaHRcbiAqIHN0aWxsIGJlIG5lY2Vzc2FyeSBpbiBhIHNoZWxsIHBpcGVsaW5lLlxuICovXG5mdW5jdGlvbiBkcmFpblN0ZG91dEFuZEV4aXQoY29kZSkge1xuICAgIGlmIChfREVCVUcpIHdhcm4oJyhkcmFpblN0ZG91dEFuZEV4aXQoJWQpKScsIGNvZGUpO1xuICAgIHN0ZG91dC5vbignZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFudXBBbmRFeGl0KGNvZGUpO1xuICAgIH0pO1xuICAgIGlmIChzdGRvdXRGbHVzaGVkKSB7XG4gICAgICAgIGNsZWFudXBBbmRFeGl0KGNvZGUpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFByb2Nlc3MgYWxsIGlucHV0IGZyb20gc3RkaW4uXG4gKlxuICogQHBhcmFtcyBvcHRzIHtPYmplY3R9IEJ1bnlhbiBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSBzdHlsaXplIHtGdW5jdGlvbn0gT3V0cHV0IHN0eWxpemUgZnVuY3Rpb24gdG8gdXNlLlxuICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gYGZ1bmN0aW9uICgpYFxuICovXG5mdW5jdGlvbiBwcm9jZXNzU3RkaW4ob3B0cywgc3R5bGl6ZSwgY2FsbGJhY2spIHtcbiAgICByZWFkaW5nU3RkaW4gPSB0cnVlO1xuICAgIHZhciBsZWZ0b3ZlciA9ICcnOyAgLy8gTGVmdC1vdmVyIHBhcnRpYWwgbGluZSBmcm9tIGxhc3QgY2h1bmsuXG4gICAgdmFyIHN0ZGluID0gcHJvY2Vzcy5zdGRpbjtcbiAgICBzdGRpbi5yZXN1bWUoKTtcbiAgICBzdGRpbi5zZXRFbmNvZGluZygndXRmOCcpO1xuICAgIHN0ZGluLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IGNodW5rLnNwbGl0KC9cXHJcXG58XFxuLyk7XG4gICAgICAgIHZhciBsZW5ndGggPSBsaW5lcy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGxlZnRvdmVyICs9IGxpbmVzWzBdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGhhbmRsZUxvZ0xpbmUobnVsbCwgbGVmdG92ZXIgKyBsaW5lc1swXSwgb3B0cywgc3R5bGl6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGVmdG92ZXIgPSBsaW5lcy5wb3AoKTtcbiAgICAgICAgbGVuZ3RoIC09IDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZUxvZ0xpbmUobnVsbCwgbGluZXNbaV0sIG9wdHMsIHN0eWxpemUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgc3RkaW4ub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGxlZnRvdmVyKSB7XG4gICAgICAgICAgICBoYW5kbGVMb2dMaW5lKG51bGwsIGxlZnRvdmVyLCBvcHRzLCBzdHlsaXplKTtcbiAgICAgICAgICAgIGxlZnRvdmVyID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbn1cblxuXG4vKipcbiAqIFByb2Nlc3MgYnVueWFuOmxvZy0qIHByb2JlcyBmcm9tIHRoZSBnaXZlbiBwaWQuXG4gKlxuICogQHBhcmFtcyBvcHRzIHtPYmplY3R9IEJ1bnlhbiBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSBzdHlsaXplIHtGdW5jdGlvbn0gT3V0cHV0IHN0eWxpemUgZnVuY3Rpb24gdG8gdXNlLlxuICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gYGZ1bmN0aW9uIChjb2RlKWBcbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc1BpZHMob3B0cywgc3R5bGl6ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgbGVmdG92ZXIgPSAnJzsgIC8vIExlZnQtb3ZlciBwYXJ0aWFsIGxpbmUgZnJvbSBsYXN0IGNodW5rLlxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBQSURzIHRvIGR0cmFjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYiB7RnVuY3Rpb259IGBmdW5jdGlvbiAoZXJyQ29kZSwgcGlkcylgXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGlkcyhjYikge1xuICAgICAgICBpZiAob3B0cy5waWRzVHlwZSA9PT0gJ251bScpIHtcbiAgICAgICAgICAgIHJldHVybiBjYihudWxsLCBvcHRzLnBpZHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnc3Vub3MnKSB7XG4gICAgICAgICAgICBleGVjRmlsZSgnL2Jpbi9wZ3JlcCcsIFsnLWxmJywgb3B0cy5waWRzXSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocGlkc0Vyciwgc3Rkb3V0LCBzdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZHNFcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2J1bnlhbjogZXJyb3IgZ2V0dGluZyBQSURzIGZvciBcIiVzXCI6ICVzXFxuJXNcXG4lcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5waWRzLCBwaWRzRXJyLm1lc3NhZ2UsIHN0ZG91dCwgc3RkZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYigxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcGlkcyA9IHN0ZG91dC50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmUudHJpbSgpLnNwbGl0KC9cXHMrLylbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChwaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHBpZCkgIT09IHByb2Nlc3MucGlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdidW55YW46IGVycm9yOiBubyBtYXRjaGluZyBQSURzIGZvdW5kIGZvciBcIiVzXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMucGlkcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IoMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcGlkcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZWdleCA9IG9wdHMucGlkcztcbiAgICAgICAgICAgIGlmIChyZWdleCAmJiAvW2EtekEtWjAtOV9dLy50ZXN0KHJlZ2V4WzBdKSkge1xuICAgICAgICAgICAgICAgIC8vICdmb28nIC0+ICdbZl1vbycgdHJpY2sgdG8gZXhjbHVkZSB0aGUgJ2dyZXAnIFBJRCBmcm9tIGl0c1xuICAgICAgICAgICAgICAgIC8vIG93biBzZWFyY2guXG4gICAgICAgICAgICAgICAgcmVnZXggPSAnWycgKyByZWdleFswXSArICddJyArIHJlZ2V4LnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhlYyhmb3JtYXQoJ3BzIC1BIC1vIHBpZCxjb21tYW5kIHwgZ3JlcCBcXCclc1xcJycsIHJlZ2V4KSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocGlkc0Vyciwgc3Rkb3V0LCBzdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZHNFcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2J1bnlhbjogZXJyb3IgZ2V0dGluZyBQSURzIGZvciBcIiVzXCI6ICVzXFxuJXNcXG4lcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5waWRzLCBwaWRzRXJyLm1lc3NhZ2UsIHN0ZG91dCwgc3RkZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYigxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcGlkcyA9IHN0ZG91dC50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmUudHJpbSgpLnNwbGl0KC9cXHMrLylbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAocGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihwaWQpICE9PSBwcm9jZXNzLnBpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2J1bnlhbjogZXJyb3I6IG5vIG1hdGNoaW5nIFBJRHMgZm91bmQgZm9yIFwiJXNcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5waWRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYigyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBwaWRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGlkcyhmdW5jdGlvbiAoZXJyQ29kZSwgcGlkcykge1xuICAgICAgICBpZiAoZXJyQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyckNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByb2JlcyA9IHBpZHMubWFwKGZ1bmN0aW9uIChwaWQpIHtcbiAgICAgICAgICAgIGlmICghb3B0cy5sZXZlbClcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0KCdidW55YW4lczo6OmxvZy0qJywgcGlkKTtcblxuICAgICAgICAgICAgdmFyIHJ2YWwgPSBbXSwgbDtcblxuICAgICAgICAgICAgZm9yIChsIGluIGxldmVsRnJvbU5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWxGcm9tTmFtZVtsXSA+PSBvcHRzLmxldmVsKVxuICAgICAgICAgICAgICAgICAgICBydmFsLnB1c2goZm9ybWF0KCdidW55YW4lczo6OmxvZy0lcycsIHBpZCwgbCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocnZhbC5sZW5ndGggIT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gcnZhbC5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgIHdhcm4oJ2J1bnlhbjogZXJyb3I6IGxldmVsICglZCkgZXhjZWVkcyBtYXhpbXVtIGxvZ2dpbmcgbGV2ZWwnLFxuICAgICAgICAgICAgICAgIG9wdHMubGV2ZWwpO1xuICAgICAgICAgICAgcmV0dXJuIGRyYWluU3Rkb3V0QW5kRXhpdCgxKTtcbiAgICAgICAgfSkuam9pbignLCcpO1xuICAgICAgICB2YXIgYXJndiA9IFsnZHRyYWNlJywgJy1aJywgJy14JywgJ3N0cnNpemU9NGsnLFxuICAgICAgICAgICAgJy14JywgJ3N3aXRjaHJhdGU9MTBoeicsICctcW4nLFxuICAgICAgICAgICAgZm9ybWF0KCclc3twcmludGYoXCIlc1wiLCBjb3B5aW5zdHIoYXJnMCkpfScsIHByb2JlcyldO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkdHJhY2UgYXJndjogJXMnLCBhcmd2KTtcbiAgICAgICAgdmFyIGR0cmFjZSA9IHNwYXduKGFyZ3ZbMF0sIGFyZ3Yuc2xpY2UoMSksXG4gICAgICAgICAgICAvLyBTaGFyZSB0aGUgc3RkZXJyIGhhbmRsZSB0byBoYXZlIGVycm9yIG91dHB1dCBjb21lXG4gICAgICAgICAgICAvLyBzdHJhaWdodCB0aHJvdWdoLiBPbmx5IHN1cHBvcnRlZCBpbiB2MC44Ky5cbiAgICAgICAgICAgIHtzdGRpbzogWydwaXBlJywgJ3BpcGUnLCBwcm9jZXNzLnN0ZGVycl19KTtcbiAgICAgICAgZHRyYWNlLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5zeXNjYWxsID09PSAnc3Bhd24nICYmIGUuZXJybm8gPT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYnVueWFuOiBlcnJvcjogY291bGQgbm90IHNwYXduIFwiZHRyYWNlXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICcoXCJidW55YW4gLXBcIiBpcyBvbmx5IHN1cHBvcnRlZCBvbiBwbGF0Zm9ybXMgd2l0aCBkdHJhY2UpJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2J1bnlhbjogZXJyb3I6IHVuZXhwZWN0ZWQgZHRyYWNlIGVycm9yOiAlcycsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soMSk7XG4gICAgICAgIH0pXG4gICAgICAgIGNoaWxkID0gZHRyYWNlOyAvLyBpbnRlbnRpb25hbGx5IGdsb2JhbFxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmlzaChjb2RlKSB7XG4gICAgICAgICAgICBpZiAobGVmdG92ZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVMb2dMaW5lKG51bGwsIGxlZnRvdmVyLCBvcHRzLCBzdHlsaXplKTtcbiAgICAgICAgICAgICAgICBsZWZ0b3ZlciA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soY29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBkdHJhY2Uuc3Rkb3V0LnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gICAgICAgIGR0cmFjZS5zdGRvdXQub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICAgICAgICAgIHZhciBsaW5lcyA9IGNodW5rLnNwbGl0KC9cXHJcXG58XFxuLyk7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gbGluZXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxlZnRvdmVyICs9IGxpbmVzWzBdO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTG9nTGluZShudWxsLCBsZWZ0b3ZlciArIGxpbmVzWzBdLCBvcHRzLCBzdHlsaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlZnRvdmVyID0gbGluZXMucG9wKCk7XG4gICAgICAgICAgICBsZW5ndGggLT0gMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVMb2dMaW5lKG51bGwsIGxpbmVzW2ldLCBvcHRzLCBzdHlsaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG5vZGVTcGF3blN1cHBvcnRzU3RkaW8pIHtcbiAgICAgICAgICAgIGR0cmFjZS5vbignZXhpdCcsIGZpbmlzaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFjayAoZm9yIDwgdjAuOCkgdG8gcGlwZSB0aGUgZHRyYWNlIHByb2Nlc3MnIHN0ZGVyciB0b1xuICAgICAgICAgICAgLy8gdGhpcyBzdGRlcnIuIFdhaXQgZm9yIGFsbCBvZiAoMSkgcHJvY2VzcyAnZXhpdCcsICgyKSBzdGRlcnJcbiAgICAgICAgICAgIC8vICdlbmQnLCBhbmQgKDIpIHN0ZG91dCAnZW5kJyBiZWZvcmUgcmV0dXJuaW5nIHRvIGVuc3VyZSBhbGxcbiAgICAgICAgICAgIC8vIHN0ZGVyciBpcyBmbHVzaGVkIChpc3N1ZSAjNTQpLlxuICAgICAgICAgICAgdmFyIHJldHVybkNvZGUgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGV2ZW50c1JlbWFpbmluZyA9IDM7XG4gICAgICAgICAgICBmdW5jdGlvbiBjb3VudGRvd25Ub0ZpbmlzaChjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuQ29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgZXZlbnRzUmVtYWluaW5nLS07XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50c1JlbWFpbmluZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaChyZXR1cm5Db2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkdHJhY2Uuc3RkZXJyLnBpcGUocHJvY2Vzcy5zdGRlcnIpO1xuICAgICAgICAgICAgZHRyYWNlLnN0ZGVyci5vbignZW5kJywgY291bnRkb3duVG9GaW5pc2gpO1xuICAgICAgICAgICAgZHRyYWNlLnN0ZGVyci5vbignZW5kJywgY291bnRkb3duVG9GaW5pc2gpO1xuICAgICAgICAgICAgZHRyYWNlLm9uKCdleGl0JywgY291bnRkb3duVG9GaW5pc2gpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuLyoqXG4gKiBQcm9jZXNzIGFsbCBpbnB1dCBmcm9tIHRoZSBnaXZlbiBsb2cgZmlsZS5cbiAqXG4gKiBAcGFyYW0gZmlsZSB7U3RyaW5nfSBMb2cgZmlsZSBwYXRoIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW1zIG9wdHMge09iamVjdH0gQnVueWFuIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHN0eWxpemUge0Z1bmN0aW9ufSBPdXRwdXQgc3R5bGl6ZSBmdW5jdGlvbiB0byB1c2UuXG4gKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBgZnVuY3Rpb24gKClgXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NGaWxlKGZpbGUsIG9wdHMsIHN0eWxpemUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oZmlsZSk7XG4gICAgaWYgKC9cXC5neiQvLnRlc3QoZmlsZSkpIHtcbiAgICAgICAgc3RyZWFtID0gc3RyZWFtLnBpcGUocmVxdWlyZSgnemxpYicpLmNyZWF0ZUd1bnppcCgpKTtcbiAgICB9XG4gICAgLy8gTWFudWFsbHkgZGVjb2RlIHN0cmVhbXMgLSBsYXp5IGxvYWQgaGVyZSBhcyBwZXIgbm9kZS9saWIvZnMuanNcbiAgICB2YXIgZGVjb2RlciA9IG5ldyAocmVxdWlyZSgnc3RyaW5nX2RlY29kZXInKS5TdHJpbmdEZWNvZGVyKSgndXRmOCcpO1xuXG4gICAgc3RyZWFtc1tmaWxlXS5zdHJlYW0gPSBzdHJlYW07XG5cbiAgICBzdHJlYW0ub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBzdHJlYW1zW2ZpbGVdLmRvbmUgPSB0cnVlO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0pO1xuXG4gICAgdmFyIGxlZnRvdmVyID0gJyc7ICAvLyBMZWZ0LW92ZXIgcGFydGlhbCBsaW5lIGZyb20gbGFzdCBjaHVuay5cbiAgICBzdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgY2h1bmsgPSBkZWNvZGVyLndyaXRlKGRhdGEpO1xuICAgICAgICBpZiAoIWNodW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lcyA9IGNodW5rLnNwbGl0KC9cXHJcXG58XFxuLyk7XG4gICAgICAgIHZhciBsZW5ndGggPSBsaW5lcy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGxlZnRvdmVyICs9IGxpbmVzWzBdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGhhbmRsZUxvZ0xpbmUoZmlsZSwgbGVmdG92ZXIgKyBsaW5lc1swXSwgb3B0cywgc3R5bGl6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGVmdG92ZXIgPSBsaW5lcy5wb3AoKTtcbiAgICAgICAgbGVuZ3RoIC09IDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZUxvZ0xpbmUoZmlsZSwgbGluZXNbaV0sIG9wdHMsIHN0eWxpemUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RyZWFtc1tmaWxlXS5kb25lID0gdHJ1ZTtcbiAgICAgICAgaWYgKGxlZnRvdmVyKSB7XG4gICAgICAgICAgICBoYW5kbGVMb2dMaW5lKGZpbGUsIGxlZnRvdmVyLCBvcHRzLCBzdHlsaXplKTtcbiAgICAgICAgICAgIGxlZnRvdmVyID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbWl0TmV4dFJlY29yZChvcHRzLCBzdHlsaXplKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xufVxuXG5cbi8qKlxuICogRnJvbSBub2RlIGFzeW5jIG1vZHVsZS5cbiAqL1xuLyogQkVHSU4gSlNTVFlMRUQgKi9cbmZ1bmN0aW9uIGFzeW5jRm9yRWFjaChhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG4gICAgaWYgKCFhcnIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cbiAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xuICAgICAgICBpdGVyYXRvcih4LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVkICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA9PT0gYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuLyogRU5EIEpTU1RZTEVEICovXG5cblxuXG4vKipcbiAqIENsZWFudXAgYW5kIGV4aXQgcHJvcGVybHkuXG4gKlxuICogV2FybmluZzogdGhpcyBkb2Vzbid0IHN0b3AgcHJvY2Vzc2luZywgaS5lLiBwcm9jZXNzIGV4aXQgbWlnaHQgYmUgZGVsYXllZC5cbiAqIEl0IGlzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZW5zdXJlIHRoYXQgbm8gc3Vic2VxdWVudCBidW55YW4gcHJvY2Vzc2luZ1xuICogaXMgZG9uZSBhZnRlciBjYWxsaW5nIHRoaXMuXG4gKlxuICogQHBhcmFtIGNvZGUge051bWJlcn0gZXhpdCBjb2RlLlxuICogQHBhcmFtIHNpZ25hbCB7U3RyaW5nfSBPcHRpb25hbCBzaWduYWwgbmFtZSwgaWYgdGhpcyB3YXMgZXhpdHRpbmcgYmVjYXVzZVxuICogICAgb2YgYSBzaWduYWwuXG4gKi9cbnZhciBjbGVhbmVkVXAgPSBmYWxzZTtcbmZ1bmN0aW9uIGNsZWFudXBBbmRFeGl0KGNvZGUsIHNpZ25hbCkge1xuICAgIC8vIEd1YXJkIG9uZSBjYWxsLlxuICAgIGlmIChjbGVhbmVkVXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhbmVkVXAgPSB0cnVlO1xuICAgIGlmIChfREVCVUcpIHdhcm4oJyhidW55YW46IGNsZWFudXBBbmRFeGl0KScpO1xuXG4gICAgLy8gQ2xlYXIgcG9zc2libHkgaW50ZXJydXB0ZWQgQU5TSSBjb2RlIChpc3N1ZSAjNTkpLlxuICAgIGlmICh1c2luZ0Fuc2lDb2Rlcykge1xuICAgICAgICBzdGRvdXQud3JpdGUodjAzMyArICdbMG0nKTtcbiAgICB9XG5cbiAgICAvLyBLaWxsIHBvc3NpYmxlIGR0cmFjZSBjaGlsZC5cbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgY2hpbGQua2lsbChzaWduYWwpO1xuICAgIH1cblxuICAgIGlmIChwYWdlcikge1xuICAgICAgICAvLyBMZXQgcGFnZXIga25vdyB0aGF0IG91dHB1dCBpcyBkb25lLCB0aGVuIHdhaXQgZm9yIHBhZ2VyIHRvIGV4aXQuXG4gICAgICAgIHN0ZG91dC5lbmQoKTtcbiAgICAgICAgcGFnZXIub24oJ2V4aXQnLCBmdW5jdGlvbiAocGFnZXJDb2RlKSB7XG4gICAgICAgICAgICBpZiAoX0RFQlVHKVxuICAgICAgICAgICAgICAgIHdhcm4oJyhidW55YW46IHBhZ2VyIGV4aXQgLT4gcHJvY2Vzcy5leGl0KCVzKSknLFxuICAgICAgICAgICAgICAgICAgICBwYWdlckNvZGUgfHwgY29kZSk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQocGFnZXJDb2RlIHx8IGNvZGUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX0RFQlVHKSB3YXJuKCcoYnVueWFuOiBwcm9jZXNzLmV4aXQoJXMpKScsIGNvZGUpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoY29kZSk7XG4gICAgfVxufVxuXG5cblxuLy8tLS0tIG1haW5saW5lXG5cbnByb2Nlc3Mub24oJ1NJR0lOVCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBJZ25vcmUgU0lHSU5UIChDdHJsK0MpIGlmIHByb2Nlc3Npbmcgc3RkaW4gLS0gd2Ugc2hvdWxkIHByb2Nlc3NcbiAgICAgKiByZW1haW5pbmcgb3V0cHV0IGZyb20gcHJlY2VkaW5nIHByb2Nlc3MgaW4gdGhlIHBpcGVsaW5lIGFuZFxuICAgICAqIGV4Y2VwdCAqaXQqIHRvIGNsb3NlLlxuICAgICAqL1xuICAgIGlmICghcmVhZGluZ1N0ZGluKSB7XG4gICAgICAgIGNsZWFudXBBbmRFeGl0KDEsICdTSUdJTlQnKTtcbiAgICB9XG59KTtcbnByb2Nlc3Mub24oJ1NJR1FVSVQnLCBmdW5jdGlvbiAoKSB7IGNsZWFudXBBbmRFeGl0KDEsICdTSUdRVUlUJyk7IH0pO1xucHJvY2Vzcy5vbignU0lHVEVSTScsIGZ1bmN0aW9uICgpIHsgY2xlYW51cEFuZEV4aXQoMSwgJ1NJR1RFUk0nKTsgfSk7XG5wcm9jZXNzLm9uKCdTSUdIVVAnLCBmdW5jdGlvbiAoKSB7IGNsZWFudXBBbmRFeGl0KDEsICdTSUdIVVAnKTsgfSk7XG5cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgZnVuY3Rpb24gKGVycikge1xuICAgIGZ1bmN0aW9uIF9pbmRlbnQocykge1xuICAgICAgICB2YXIgbGluZXMgPSBzLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmVzW2ldID0gJyogICAgICcgKyBsaW5lc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KGZvcm1hdChcbiAgICAgICAgJ0J1bnlhbiAlcyBjcmFzaGVkOiAlcycsIGdldFZlcnNpb24oKSwgU3RyaW5nKGVycikpKTtcbiAgICB2YXIgZSA9IGNvbnNvbGUuZXJyb3I7XG4gICAgZSgnYGBgJyk7XG4gICAgZSgnKiBUaGUgQnVueWFuIENMSSBjcmFzaGVkIScpO1xuICAgIGUoJyonKTtcbiAgICBpZiAoZXJyLm5hbWUgPT09ICdSZWZlcmVuY2VFcnJvcicgJiYgZ1VzaW5nQ29uZGl0aW9uT3B0cykge1xuICAgICAgICAvKiBCRUdJTiBKU1NUWUxFRCAqL1xuICAgICAgICBlKCcqIFRoaXMgY3Jhc2ggd2FzIGR1ZSB0byBhIFwiUmVmZXJlbmNlRXJyb3JcIiwgd2hpY2ggaXMgb2Z0ZW4gdGhlIHJlc3VsdCBvZiBnaXZlbicpO1xuICAgICAgICBlKCcqIGAtYyBDT05ESVRJT05gIGNvZGUgdGhhdCBkb2VzblxcJ3QgZ3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgdmFsdWVzLiBJZiB0aGF0IGlzJyk7XG4gICAgICAgIC8qIEVORCBKU1NUWUxFRCAqL1xuICAgICAgICBlKCcqIG5vdCB0aGUgcHJvYmxlbTonKTtcbiAgICAgICAgZSgnKicpO1xuICAgIH1cbiAgICBlKCcqIFBsZWFzZSByZXBvcnQgdGhpcyBpc3N1ZSBhbmQgaW5jbHVkZSB0aGUgZGV0YWlscyBiZWxvdzonKTtcbiAgICBlKCcqJyk7XG4gICAgZSgnKiAgICBodHRwczovL2dpdGh1Yi5jb20vdHJlbnRtL25vZGUtYnVueWFuL2lzc3Vlcy9uZXc/dGl0bGU9JXMnLCB0aXRsZSk7XG4gICAgZSgnKicpO1xuICAgIGUoJyogKiAqJyk7XG4gICAgZSgnKiBwbGF0Zm9ybTonLCBwcm9jZXNzLnBsYXRmb3JtKTtcbiAgICBlKCcqIG5vZGUgdmVyc2lvbjonLCBwcm9jZXNzLnZlcnNpb24pO1xuICAgIGUoJyogYnVueWFuIHZlcnNpb246JywgZ2V0VmVyc2lvbigpKTtcbiAgICBlKCcqIGFyZ3Y6ICVqJywgcHJvY2Vzcy5hcmd2KTtcbiAgICBlKCcqIGxvZyBsaW5lOiAlaicsIGN1cnJMaW5lKTtcbiAgICBlKCcqIHN0YWNrOicpO1xuICAgIGUoX2luZGVudChlcnIuc3RhY2spKTtcbiAgICBlKCdgYGAnKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcblxuXG5mdW5jdGlvbiBtYWluKGFyZ3YpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgb3B0cyA9IHBhcnNlQXJndihhcmd2KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHdhcm4oJ2J1bnlhbjogZXJyb3I6ICVzJywgZS5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGRyYWluU3Rkb3V0QW5kRXhpdCgxKTtcbiAgICB9XG4gICAgaWYgKG9wdHMuaGVscCkge1xuICAgICAgICBwcmludEhlbHAoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0cy52ZXJzaW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdidW55YW4gJyArIGdldFZlcnNpb24oKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdHMucGlkICYmIG9wdHMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm4oJ2J1bnlhbjogZXJyb3I6IGNhblxcJ3QgdXNlIGJvdGggXCItcCBQSURcIiAoJXMpIGFuZCBmaWxlICglcykgYXJncycsXG4gICAgICAgICAgICBvcHRzLnBpZCwgb3B0cy5hcmdzLmpvaW4oJyAnKSk7XG4gICAgICAgIHJldHVybiBkcmFpblN0ZG91dEFuZEV4aXQoMSk7XG4gICAgfVxuICAgIGlmIChvcHRzLmNvbG9yID09PSBudWxsKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5CVU5ZQU5fTk9fQ09MT1IgJiZcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5CVU5ZQU5fTk9fQ09MT1IubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3B0cy5jb2xvciA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cy5jb2xvciA9IHByb2Nlc3Muc3Rkb3V0LmlzVFRZO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVzaW5nQW5zaUNvZGVzID0gb3B0cy5jb2xvcjsgLy8gaW50ZW50aW9uYWxseSBnbG9iYWxcbiAgICB2YXIgc3R5bGl6ZSA9IChvcHRzLmNvbG9yID8gc3R5bGl6ZVdpdGhDb2xvciA6IHN0eWxpemVXaXRob3V0Q29sb3IpO1xuXG4gICAgLy8gUGFnZXIuXG4gICAgdmFyIHBhZ2luYXRlID0gKFxuICAgICAgICBwcm9jZXNzLnN0ZG91dC5pc1RUWSAmJlxuICAgICAgICBwcm9jZXNzLnN0ZGluLmlzVFRZICYmXG4gICAgICAgICFvcHRzLnBpZHMgJiYgLy8gRG9uJ3QgcGFnZSBpZiBmb2xsb3dpbmcgcHJvY2VzcyBvdXRwdXQuXG4gICAgICAgIG9wdHMuYXJncy5sZW5ndGggPiAwICYmIC8vIERvbid0IHBhZ2UgaWYgbm8gZmlsZSBhcmdzIHRvIHByb2Nlc3MuXG4gICAgICAgIHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicgJiZcbiAgICAgICAgKG5vZGVWZXJbMF0gPiAwIHx8IG5vZGVWZXJbMV0gPj0gOCkgJiZcbiAgICAgICAgKG9wdHMucGFnaW5hdGUgPT09IHRydWUgfHxcbiAgICAgICAgICAgIChvcHRzLnBhZ2luYXRlICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICghcHJvY2Vzcy5lbnYuQlVOWUFOX05PX1BBR0VSIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkJVTllBTl9OT19QQUdFUi5sZW5ndGggPT09IDApKSkpO1xuICAgIGlmIChwYWdpbmF0ZSkge1xuICAgICAgICB2YXIgcGFnZXJDbWQgPSBwcm9jZXNzLmVudi5QQUdFUiB8fCAnbGVzcyc7XG4gICAgICAgIC8qIEpTU1RZTEVEICovXG4gICAgICAgIGFzc2VydC5vayhwYWdlckNtZC5pbmRleE9mKCdcIicpID09PSAtMSAmJiBwYWdlckNtZC5pbmRleE9mKFwiJ1wiKSA9PT0gLTEsXG4gICAgICAgICAgICAnY2Fubm90IHBhcnNlIFBBR0VSIHF1b3RlcyB5ZXQnKTtcbiAgICAgICAgdmFyIGFyZ3YgPSBwYWdlckNtZC5zcGxpdCgvXFxzKy9nKTtcbiAgICAgICAgdmFyIGVudiA9IG9iakNvcHkocHJvY2Vzcy5lbnYpO1xuICAgICAgICBpZiAoZW52LkxFU1MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZ2l0J3MgZGVmYXVsdCBpcyBMRVNTPUZSU1guIEkgZG9uJ3QgbGlrZSB0aGUgJ1MnIGhlcmUgYmVjYXVzZVxuICAgICAgICAgICAgLy8gbGluZXMgYXJlICp0eXBpY2FsbHkqIHdpZGUgd2l0aCBidW55YW4gb3V0cHV0IGFuZCBzY3JvbGxpbmdcbiAgICAgICAgICAgIC8vIGhvcml6b250YWxseSBpcyBhIHJveWFsIHBhaW4uIE5vdGUgYSBidWcgaW4gTWFjJ3MgYGxlc3MgLUZgLFxuICAgICAgICAgICAgLy8gc3VjaCB0aGF0IFNJR1dJTkNIIGNhbiBraWxsIGl0LiBJZiB0aGF0IHJlYXJzIHRvbyBtdWNoIHRoZW5cbiAgICAgICAgICAgIC8vIEknbGwgcmVtb3ZlICdGJyBmcm9tIGhlcmUuXG4gICAgICAgICAgICBlbnYuTEVTUyA9ICdGUlgnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfREVCVUcpIHdhcm4oJyhwYWdlcjogYXJndj0laiwgZW52LkxFU1M9JWopJywgYXJndiwgZW52LkxFU1MpO1xuICAgICAgICAvLyBgcGFnZXJgIGFuZCBgc3Rkb3V0YCBpbnRlbnRpb25hbGx5IGdsb2JhbC5cbiAgICAgICAgcGFnZXIgPSBzcGF3bihhcmd2WzBdLCBhcmd2LnNsaWNlKDEpLFxuICAgICAgICAgICAgLy8gU2hhcmUgdGhlIHN0ZGVyciBoYW5kbGUgdG8gaGF2ZSBlcnJvciBvdXRwdXQgY29tZVxuICAgICAgICAgICAgLy8gc3RyYWlnaHQgdGhyb3VnaC4gT25seSBzdXBwb3J0ZWQgaW4gdjAuOCsuXG4gICAgICAgICAgICB7ZW52OiBlbnYsIHN0ZGlvOiBbJ3BpcGUnLCAxLCAyXX0pO1xuICAgICAgICBzdGRvdXQgPSBwYWdlci5zdGRpbjtcblxuICAgICAgICAvLyBFYXJseSB0ZXJtaW5hdGlvbiBvZiB0aGUgcGFnZXI6IGp1c3Qgc3RvcC5cbiAgICAgICAgcGFnZXIub24oJ2V4aXQnLCBmdW5jdGlvbiAocGFnZXJDb2RlKSB7XG4gICAgICAgICAgICBpZiAoX0RFQlVHKSB3YXJuKCcoYnVueWFuOiBwYWdlciBleGl0KScpO1xuICAgICAgICAgICAgcGFnZXIgPSBudWxsO1xuICAgICAgICAgICAgc3Rkb3V0LmVuZCgpXG4gICAgICAgICAgICBzdGRvdXQgPSBwcm9jZXNzLnN0ZG91dDtcbiAgICAgICAgICAgIGNsZWFudXBBbmRFeGl0KHBhZ2VyQ29kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFN0ZG91dCBlcnJvciBoYW5kbGluZy4gKENvdWxkbid0IHNldHVwIHVudGlsIGBzdGRvdXRgIHdhcyBkZXRlcm1pbmVkLilcbiAgICBzdGRvdXQub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoX0RFQlVHKSB3YXJuKCcoc3Rkb3V0IGVycm9yIGV2ZW50OiAlcyknLCBlcnIpO1xuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFUElQRScpIHtcbiAgICAgICAgICAgIGRyYWluU3Rkb3V0QW5kRXhpdCgwKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnIudG9TdHJpbmcoKSA9PT0gJ0Vycm9yOiBUaGlzIHNvY2tldCBpcyBjbG9zZWQuJykge1xuICAgICAgICAgICAgLy8gQ291bGQgZ2V0IHRoaXMgaWYgdGhlIHBhZ2VyIGNsb3NlcyBpdHMgc3RkaW4sIGJ1dCBoYXNuJ3RcbiAgICAgICAgICAgIC8vIGV4aXRlZCB5ZXQuXG4gICAgICAgICAgICBkcmFpblN0ZG91dEFuZEV4aXQoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXJuKGVycik7XG4gICAgICAgICAgICBkcmFpblN0ZG91dEFuZEV4aXQoMSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciByZXR2YWwgPSAwO1xuICAgIGlmIChvcHRzLnBpZHMpIHtcbiAgICAgICAgcHJvY2Vzc1BpZHMob3B0cywgc3R5bGl6ZSwgZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgICAgIGNsZWFudXBBbmRFeGl0KGNvZGUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG9wdHMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmaWxlcyA9IG9wdHMuYXJncztcbiAgICAgICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgc3RyZWFtc1tmaWxlXSA9IHsgc3RyZWFtOiBudWxsLCByZWNvcmRzOiBbXSwgZG9uZTogZmFsc2UgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXN5bmNGb3JFYWNoKGZpbGVzLFxuICAgICAgICAgICAgZnVuY3Rpb24gKGZpbGUsIG5leHQpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzRmlsZShmaWxlLCBvcHRzLCBzdHlsaXplLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2J1bnlhbjogJXMnLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR2YWwgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FybignYnVueWFuOiB1bmV4cGVjdGVkIGVycm9yOiAlcycsIGVyci5zdGFjayB8fCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhaW5TdGRvdXRBbmRFeGl0KDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGVhbnVwQW5kRXhpdChyZXR2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3NTdGRpbihvcHRzLCBzdHlsaXplLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhbnVwQW5kRXhpdChyZXR2YWwpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICAgIC8vIEhBQ0sgZ3VhcmQgZm9yIDxodHRwczovL2dpdGh1Yi5jb20vdHJlbnRtL2pzb24vaXNzdWVzLzI0Pi5cbiAgICAvLyBXZSBvdmVycmlkZSB0aGUgYHByb2Nlc3Muc3Rkb3V0LmVuZGAgZ3VhcmQgdGhhdCBjb3JlIG5vZGUuanMgcHV0cyBpblxuICAgIC8vIHBsYWNlLiBUaGUgcmVhbCBmaXggaXMgdGhhdCBgLmVuZCgpYCBzaG91bGRuJ3QgYmUgY2FsbGVkIG9uIHN0ZG91dFxuICAgIC8vIGluIG5vZGUgY29yZS4gTm9kZSB2MC42LjkgZml4ZXMgdGhhdC4gT25seSBndWFyZCBmb3IgdjAuNi4wLi52MC42LjguXG4gICAgaWYgKFswLCA2LCAwXSA8PSBub2RlVmVyICYmIG5vZGVWZXIgPD0gWzAsIDYsIDhdKSB7XG4gICAgICAgIHZhciBzdGRvdXQgPSBwcm9jZXNzLnN0ZG91dDtcbiAgICAgICAgc3Rkb3V0LmVuZCA9IHN0ZG91dC5kZXN0cm95ID0gc3Rkb3V0LmRlc3Ryb3lTb29uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLyogcGFzcyAqL1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG1haW4ocHJvY2Vzcy5hcmd2KTtcbn1cbiJdfQ==
//# sourceMappingURL=cli.js.map