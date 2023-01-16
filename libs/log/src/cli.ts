#!/usr/bin/env node
import readline from 'readline';
import split from 'split';
import through from 'through';

import { log } from './log';
import { prettyRawLog } from './pretty/prettyRawLog';

if (process.env.LSK_LOG_READLINE !== '0') {
  readline
    .createInterface({
      input: process.stdin,
      // output: process.stdout,
    })
    .on('line', (raw) => {
      prettyRawLog(log, raw);
    });
} else {
  process.stdin
    .pipe(split())
    .pipe(
      through(function (raw) {
        if (!raw) {
          // @ts-ignore
          this.emit('data', `${raw}\n`);
          return;
        }
        prettyRawLog(log, raw);
      })
    )
    .pipe(process.stdout);
}
