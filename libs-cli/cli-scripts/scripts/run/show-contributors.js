#!/usr/bin/env node
const { run } = require('@lskjs/cli-utils');
const { map } = require('fishbird');
const { omit } = require('@lskjs/algos');
const { default: gitlog } = require('gitlog');

const getGitLog = (options = {}) =>
  new Promise((resolve, reject) => {
    gitlog(options, (err, packages) => {
      if (err) {
        reject(err);
      } else {
        resolve(packages);
      }
    });
  });

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    if (!acc[item[key]]) acc[item[key]] = [];
    acc[item[key]].push(item);
    return acc;
  }, {});

const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const min = (arr) => Math.min(...arr);
const max = (arr) => Math.max(...arr);

const main = async ({ isRoot, ctx, args, log, cwd } = {}) => {
  let path = cwd;
  if (args[0] === '--path') {
    // eslint-disable-next-line prefer-destructuring
    path = args[1];
    args.splice(0, 2);
  }
  const paths = path
    .split(',')
    .map((a) => a.trim().replace('~', process.env.HOME))
    .filter(Boolean);

  // eslint-disable-next-line no-shadow
  const res12 = await map(paths, async (path) => {
    try {
      const res = await getGitLog({
        repo: path,
        number: 100_000,
        execOptions: {
          maxBuffer: 100_000_000_000,
        },
        fields: ['authorName', 'authorEmail', 'authorDate'],
      });
      const byAuthors = groupBy(res, 'authorEmail');

      return Object.values(byAuthors).map((commits) => {
        const files = sum(commits.map((c) => c.files.length));
        const firstCommitedAt = min(commits.map((c) => new Date(c.authorDate)));
        const lastComiitedAt = max(commits.map((c) => new Date(c.authorDate)));
        const { authorName, authorEmail } = commits[0];
        return {
          path,
          authorName,
          authorEmail,
          commits: commits.length,
          files,
          firstCommitedAt: new Date(firstCommitedAt).toISOString(),
          lastComiitedAt: new Date(lastComiitedAt).toISOString(),
        };
      });
    } catch (err) {
      log.warn(path, 'err', err);
      return [];
    }
  });

  const res2 = res12.flat();

  // eslint-disable-next-line no-shadow
  const res3 = res2.flat().map(({ path, ...options }) => {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(process.env.HOME, '~');
    const project = path.split('/')[2];
    // const licenseUrl = options.licensesPath && options.licenses[0] && options.licenses[0].url;
    return {
      path,
      project,
      ...options,
    };
  });

  console.log(JSON.stringify(res3, null, 4));
};

module.exports = run(main);
