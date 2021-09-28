#!/usr/bin/env node
import split from 'split';
import through from 'through';

import { log } from './log';
import { prettyRawLog } from './pretty/prettyRawLog';

process.stdin
  .pipe(split())
  .pipe(
    through(function (raw) {
      if (!raw) {
        this.emit('data', `${raw}\n`);
        return;
      }
      prettyRawLog(log, raw);
    }),
  )
  .pipe(process.stdout);
