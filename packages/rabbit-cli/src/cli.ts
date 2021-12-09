#!/usr/bin/env node
import { Err } from '@lskjs/err';
import * as CLI from 'cli-flags';

import { publish } from './actions/publish';
import log from './log';

const { flags, args } = CLI.parse({
  flags: {
    uri: CLI.flags.string({ char: 'u' }),
    queue: CLI.flags.string({ char: 'q' }),
    prefetch: CLI.flags.string({ char: 'p' }),
    concurrency: CLI.flags.string({ char: 'c' }),
    extract: CLI.flags.string({ char: 'e' }),
    parse: CLI.flags.string(),
  },
  args: [{ name: 'action', required: true }],
});

const uri = flags.uri || process.env.AMQP_URI;
const defaultQueue = flags.queue || process.env.AMQP_QUEUE;
const concurrency = Number(flags.prefetch || process.env.AMQP_PREFETCH) || 10;
const maxPriority = Number(flags.concurrency || process.env.AMQP_MAX_PRIORITY) || 10;
// eslint-disable-next-line no-eval
const extractFn: (a: any) => any | null = flags.extract ? eval(flags.extract) : null;
// eslint-disable-next-line no-eval
const parseFn: (a: any) => any | null = flags.parse ? eval(flags.parse) : null;
const { action } = args;

const main = async () => {
  log.info('starting', { action }, { uri, defaultQueue, concurrency, maxPriority });
  if (!uri) throw new Err('!uri', 'use AMQP_URI');
  if (action === 'publish' || action === 'pub') {
    if (parseFn) parseFn('');
    if (extractFn) extractFn({});
    return publish({
      uri,
      defaultQueue,
      concurrency,
      maxPriority,
      extractFn,
      parseFn,
    });
  }
  throw new Err('!action', { action });
};

main().catch((err) => {
  log.error({ action }, err);
});
