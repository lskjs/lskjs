#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const {
  run,
  shellParallel,
  getCwdInfo,
  shell,
  findBin,
} = require('@lskjs/cli-utils');
const { omitNull, mapValues } = require('@lskjs/algos');
const { writeFile } = require('fs/promises');

const main = async ({ isRoot, args, log, cwd, ctx } = {}) => {
  if (isRoot) {
    await shellParallel(`lsk run fix ${args.join(' ')}`, { ctx });
    // NOTE: осознанно нет return
  }
  // log.debug(111);
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // log.debug(222);
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // log.debug(333);
  if (!args.length) args = ['--sort', '--deps'];
  const packFilename = `${cwd}/package.json`;
  const pack = require(packFilename);
  if (args.includes('--deps')) {
    pack.dependencies = omitNull(
      mapValues(pack.dependencies || {}, (v) => {
        if (v.startsWith('workspace:')) return v.slice('workspace:'.length);
        if (v.startsWith('link:')) return v.slice('link:'.length);
        return v;
      })
    );
  }
  const debug = getCwdInfo({ cwd });
  const { isLib, isTs, isBabel, isApp } = debug;
  // pack.__debug = debug;
  if (args.includes('--package')) {
    // if (!pack.workspaces && isRoot) {
    //   pack.workspaces = ['packages/*'];
    // }
    if (!pack.scripts) {
      if (isLib) {
        pack.scripts = {
          build: '          lsk run build',
          dev: '            lsk run dev',
          release: '        lsk run release',
          test: '           lsk run test',
        };
      }
      if (isApp) {
        pack.scripts = {
          start: '          lsk run start',
          build: '          lsk run build',
          dev: '            lsk run dev',
          release: '        lsk run release',
          test: '           lsk run test',
        };
      }
    }
    if (!pack.eslintconfig) {
      pack.eslintconfig = {
        extends: '@lskjs/eslint-config',
      };
    }
    if (!pack.dependencies) {
      pack.dependencies = {};
    }
    if (!pack.devDependencies) {
      pack.devDependencies = {};
    }
    if (isLib && !isRoot) {
      const libFolder = isTs || isBabel ? 'lib' : 'src';
      if (!pack.main) pack.main = `${libFolder}/index.js`;
      if (isTs && !pack.types) pack.main = `${libFolder}/index.d.ts`;
      if (!pack.exports) {
        pack.exports = {
          '.': omitNull({
            import: `./${libFolder}/index.mjs`,
            types: isTs ? `./${libFolder}/index.d.ts` : null,
            default: `./${libFolder}/index.js`,
          }),
          './*': omitNull({
            import: `./${libFolder}/*.mjs`,
            types: isTs ? `./${libFolder}/*.d.ts` : null,
            default: `./${libFolder}/*.js`,
          }),
        };
      }
      if (!pack['size-limit']) {
        pack['size-limit'] = [
          {
            path: `${libFolder}/index.js`,
            limit: '1kb',
          },
        ];
      }
      if (!pack.description) {
        log.error('!description');
      }
      if (!pack.keywords || !pack.keywords.length) {
        log.error('!keywords');
      }
      if (!pack.files) {
        pack.files = ['lib', 'README.md', 'LICENCE'];
      }
      if (!pack.license && pack.access === 'public') {
        pack.license = 'MIT';
      }
      if (!pack.author || pack.author.includes('Igor Suvorov')) {
        pack.author =
          'Igor Suvorov <hi@isuvorov.com> (https://github.com/isuvorov)';
      }
      if (!pack.access && pack.publishConfig && pack.publishConfig.access) {
        pack.access = pack.publishConfig.access;
        delete pack.publishConfig.access;
        delete pack.publishConfig.registry;
        if (Object.keys(pack.publishConfig).length === 0)
          delete pack.publishConfig;
      }

      if (!pack.repository) {
        // TODO:
        // "homepage": "https://github.com/isuvorov/macrobe",
        // "repository": "https://github.com/isuvorov/macrobe",
        // "bugs": "http://github.com/isuvorov/macrobe/issues",
      }
      delete pack.jest;
      writeFile(`${cwd}/package.json`, JSON.stringify(pack, null, 6));
    }
    if (args.includes('--sort')) {
      if (isRoot) {
        await shell(`${findBin('eslint')} --fix lerna.json`, { ctx });
      }
      await shell(`${findBin('eslint')} --fix package.json`, { ctx });
    }
  }
};

module.exports = run(main);

// await shell('rm -rf ./lib/* ./coverage ./package', { ctx });
