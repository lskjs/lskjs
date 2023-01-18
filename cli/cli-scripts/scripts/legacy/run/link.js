#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell, log } = require('@lskjs/cli-utils');

const main = async () => {
  log.debug('You can override me here: scrips/run/link.js');
  log.debug('========== EXAMPLE  START ==========');
  await shell(`cat ${__dirname}/../hooks/link-all.js`);
  log.debug('========== EXAMPLE FINISH ==========');
};

run(main);
