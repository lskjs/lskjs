#!/usr/bin/env node
const fs = require('fs');
const { hasCra, run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  if (hasCra()) {
    await shell('lsk run dev:cra-and-server');
  } else if (fs.existsSync('index.server.js')) {
    await shell('lsk run dev:server');
  } else if (fs.existsSync('index.js')) {
    await shell('lsk run dev');
  } else {
    await shell('lsk run watch');
  }
};

run(main);
