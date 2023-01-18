#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const projectDir = `${process.env.HOME}/projects`;

const itens = [
  'module',
  'log2',

  'server',
  'server-api',
  'db',
  'i18',
  'mailer',
  'permit',
  'auth',
  'upload',
  'grant',
  'bots',

  'reactapp',
  'uapp',
];

const main = async () => {
  const cwd = process.cwd();
  itens.forEach((item) => {
    // Осознанно без await
    shell(`lsk link ${projectDir}/lskjs/packages/${item}/build ${cwd}/packages/app/node_modules/@lskjs/${item}`);
  });
};

run(main);
