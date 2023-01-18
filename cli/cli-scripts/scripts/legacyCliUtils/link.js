#!/usr/bin/env node
const { shell } = require('./shell');
const { findBin } = require('./findBin');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const link = async ({ from, to, ...options }) => {
  // TODO: pass options
  await shell(`${findBin('nodemon')} --quiet  --watch ${from} --delay 1 --exec 'lsk copy' -- ${from} ${to}`);
};

module.exports = {
  link,
};
