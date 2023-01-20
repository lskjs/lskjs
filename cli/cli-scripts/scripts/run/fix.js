#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */

const { sortPackageJson } = require('sort-package-json');

const { run, shellParallel, getCwdInfo, shell, findBin } = require('@lskjs/cli-utils');
const { omitNull, mapValues } = require('@lskjs/algos');
const { writeFile } = require('fs/promises');
const { existsSync } = require('fs');

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
  // eslint-disable-next-line no-param-reassign
  const defaultArgs = ['--sort', '--workspace', '--scripts', '--packageSafe'];
  if (!args.length) args = defaultArgs;
  if (args.includes('--package') || args.includes('--eslint')) {
    args = [...args, ...defaultArgs];
  }
  const packFilename = `${cwd}/package.json`;
  let pack = require(packFilename);
  if (args.includes('--deps') || args.includes('--workspace')) {
    pack.dependencies = omitNull(
      mapValues(pack.dependencies || {}, (v) => {
        if (v.startsWith('workspace:')) {
          const v2 = v.slice('workspace:'.length);
          return v2[0] === '^' ? v2 : `^${v2}`;
        }
        if (v.startsWith('link:')) return v.slice('link:'.length);
        return v;
      }),
    );
    if (!Object.keys(pack.dependencies || {}).length) {
      delete pack.dependencies;
    }
    if (!Object.keys(pack.devDependencies || {}).length) {
      delete pack.devDependencies;
    }
  }
  const debug = getCwdInfo({ cwd });
  const { isLib, isTs, isBabel, isApp } = debug;
  const { rootPath = cwd } = debug;
  const rootPack = require(`${rootPath}/package.json`);

  if (args.includes('--temp')) {
    delete pack.__debug;
    delete pack.scripts?.['test:watch'];
  }

  if (args.includes('--prepack')) {
    if (!pack.scripts) {
      if (isLib) {
        pack.scripts = {
          dev: '            lsk run dev',
          build: '          lsk run build',
          test: '           lsk run test',
          prepack: '        lsk run prepack',
          release: '        lsk run release',
        };
      }
      if (isApp) {
        pack.scripts = {
          dev: '            lsk run dev',
          build: '          lsk run build',
          test: '           lsk run test',
          prepack: '        lsk run prepack',
          release: '        lsk run release',
          start: '          lsk run start',
        };
      }
    }
    if (!pack.scripts.prepack && !isRoot) {
      pack.scripts.prepack = '        lsk run prepack';
    }
  }

  if (args.includes('--packageSafe')) {
    pack['//'] =
      '///////////========================/////////========================/////////========================/////////';
    pack['///'] =
      '//////////========================/////////========================/////////========================/////////';
    pack['////'] =
      '/////////========================/////////========================/////////========================/////////';

    if (!pack.scripts || args.includes('--scripts')) {
      if (isLib) {
        pack.scripts = {
          dev: '            lsk run dev',
          build: '          lsk run build',
          test: '           lsk run test',
          prepack: '        lsk run prepack',
          release: '        lsk run release',
          ...(pack.scripts || {}),
        };
      }
      if (isApp) {
        pack.scripts = {
          start: '          lsk run start',
          build: '          lsk run build',
          test: '           lsk run test',
          prepack: '        lsk run prepack',
          release: '        lsk run release',
          ...(pack.scripts || {}),
        };
      }
    }
    if (!pack.eslintConfig) {
      pack.eslintConfig = {
        extends: '@lskjs/eslint-config',
      };
    }
    if (!pack.jest) {
      pack.jest = {
        preset: '@lskjs/jest-config',
      };
    }
    if (!pack.prettier) {
      pack.prettier = '@lskjs/eslint-config/prettier';
    }
    if (!Object.keys(pack.dependencies || {}).length) {
      delete pack.dependencies;
    }
    if (!Object.keys(pack.devDependencies || {}).length) {
      delete pack.devDependencies;
    }

    if (!pack.author || pack.author.includes('Igor Suvorov')) {
      pack.author = 'Igor Suvorov <hi@isuvorov.com> (https://github.com/isuvorov)';
    }
    if (!pack.license) {
      if (rootPack.license) {
        pack.license = rootPack.license;
      } else if (pack.private === false) {
        pack.license = 'MIT';
      }
    }
    if (pack.access || pack.private === false) {
      delete pack.access;
      pack.private = false;
      if (!pack.publishConfig) {
        pack.publishConfig = {
          access: 'public',
          registry: 'https://registry.npmjs.org/',
        };
      }
    }
  }

  if (args.includes('--package')) {
    const relativePath = cwd.replace(rootPath, '');
    if (rootPack.repository?.includes('github.com')) {
      if (!isRoot) {
        pack.repository = `${rootPack.repository}/tree/master/${relativePath}`;
      }
      pack.bugs = `${rootPack.repository}/issues`;
      if (!pack.homepage) pack.homepage = pack.repository;
    }
    // if (!pack.workspaces && isRoot) {
    //   pack.workspaces = ['packages/*'];
    // }
    if (isLib && !isRoot) {
      const libFolder =
        // eslint-disable-next-line no-nested-ternary
        isTs || isBabel ? './lib' : existsSync(`${cwd}/src`) ? './src' : '.';
      if (!pack.main) pack.main = `${libFolder}/index.js`;
      if (isTs && !pack.types) pack.main = `${libFolder}/index.d.ts`;
      if (!pack.exports) {
        pack.exports = {
          '.': omitNull({
            import: `${libFolder}/index.mjs`,
            types: isTs ? `${libFolder}/index.d.ts` : null,
            default: `${libFolder}/index.js`,
          }),
          './*': omitNull({
            import: `${libFolder}/*.mjs`,
            types: isTs ? `${libFolder}/*.d.ts` : null,
            default: `${libFolder}/*.js`,
          }),
        };
      }
      if (!pack['size-limit'] && isLib && !isBabel) {
        pack['size-limit'] = [
          {
            path: `${libFolder}/index.js`,
            limit: '1kb',
          },
        ];
      }
      if (pack.private === undefined) {
        if (rootPack.private !== undefined) {
          pack.private = rootPack.private;
        } else {
          log.error('!private');
        }
      }
      if (!pack.private && !pack.description) {
        log.error('!description');
      }
      if ((!pack.private && !pack.keywords) || !pack.keywords.length) {
        log.error('!keywords');
      }
      if (!pack.files) {
        pack.files = ['lib', 'README.md', 'LICENCE'];
      }
    }
  }
  if (args.includes('--sort')) {
    // if (isRoot) {
    //   await shell(`${findBin('eslint')} --fix lerna.json`, { ctx });
    // }

    const sortOrder = [
      'name',
      'version',
      'description',
      'author',
      'contributors',
      'private',
      'workspaces',
      'scripts',
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',

      '//',

      'prettier',
      'eslintConfig',
      'jest',
      'files',
      'browser',
      'bin',
      'main',
      'types',
      'typings',
      'exports',
      'imports',
      'size-limit',

      '///',

      'productName',
      'repository',
      'homepage',
      'bugs',
      'engines',
      'license',
      'publishConfig',
      'keywords',

      '////',
    ];
    const sortOrderScripts = ['start', 'dev', 'build', 'test', 'prepack', 'release', 'release:ci'];
    pack = sortPackageJson(pack, { sortOrder });
    if (pack.scripts) {
      pack.scripts = sortPackageJson(pack.scripts, {
        sortOrder: sortOrderScripts,
      });
    }
  }
  await writeFile(`${cwd}/package.json`, `${JSON.stringify(pack, null, 2)}\n`);

  if (args.includes('--eslint')) {
    const stdio = ['inherit', 'ignore', 'ignore'];
    const cmd = `${findBin('eslint')} --fix`;
    if (existsSync(`${cwd}/src`)) {
      await shell(`${cmd} src`, { ctx });
    } else {
      await shell(`${cmd} .`, {
        ctx,
        stdio,
      }).catch((err) => {
        log.trace('[eslint err] in .', err);
      });
    }
    // if (existsSync(`${cwd}/scripts`)) {
    //   await shell(`${cmd} --fix scripts`, { ctx });
    // }
    if (existsSync(`${cwd}/tests`)) {
      await shell(`${cmd}  tests`, { ctx, stdio }).catch((err) => {
        log.trace('[eslint err] in test', err);
      });
    }
  }
};

module.exports = run(main);

// await shell('rm -rf ./lib/* ./coverage ./package', { ctx });
