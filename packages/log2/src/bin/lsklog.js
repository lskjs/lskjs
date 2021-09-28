#!/usr/bin/env node
const split = require('split');
const through = require('through');
const { Logger } = require('../Logger');
const { prettyRaw } = require('../utils/pretty');

const log = new Logger();
process.stdin
  .pipe(split())
  .pipe(
    through(function (raw) {
      if (!raw) {
        this.emit('data', `${raw}\n`);
        return;
      }
      prettyRaw(log, raw);
    }),
  )
  .pipe(process.stdout);
